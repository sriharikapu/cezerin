const Welandam = artifacts.require('./Welandam.sol');
const Web3Utils = require('web3-utils');

contract('Welandam', accounts => {
	it('...should confirm some order and unlock funds', async () => {
		const welandamInstance = await Welandam.deployed();
		let amount = 0.1;

		let scbalance = await web3.eth.getBalance(welandamInstance.address);
		assert.equal(0, scbalance.toNumber());

		let x = Web3Utils.randomHex(16);
		// Confirm non existing order should fail
		await welandamInstance
			.confirmOrder(x)
			.then(function(tx) {
				assert.fail(0, 0, 'Should not be able to confirm order');
			})
			.catch(function(e) {
				assert.equal(
					e.message,
					'VM Exception while processing transaction: revert'
				);
			});

		let tx = await welandamInstance.recordOrder(
			x,
			1,
			web3.toWei(amount, 'ether'),
			[accounts[0]],
			accounts[0],
			accounts[0],
			accounts[0],
			2,
			{ from: accounts[0], value: web3.toWei(amount, 'ether') }
		);

		assert.equal(x, tx.logs[0].args.id);
		assert.equal('OrderRecorded', tx.logs[0].event);

		let order = await welandamInstance.orders(x);
		assert.equal(order[0], x, 'order was not stored properly');
		assert.equal(
			order[2],
			web3.toWei(amount, 'ether'),
			'order was not stored properly'
		);
		assert.equal(order[4], accounts[0], 'order was not stored properly');
		assert.equal(order[7], 1, 'order status was not stored properly');

		let relayers = await welandamInstance.getRelayersPerOrderId(x);
		assert.equal(relayers[0], accounts[0], 'order was not stored properly');

		// Balance of ether in smart contract should have been updated
		scbalance = await web3.eth.getBalance(welandamInstance.address);
		assert.equal(amount, web3.fromWei(scbalance.toNumber(), 'ether'));

		let account0BalanceBeforeConfirm = await web3.eth.getBalance(accounts[0]);

		// Unlock funds from other account not involved should fail
		await welandamInstance
			.unlockFundsForOrder(x, { from: accounts[1] })
			.then(function(tx) {
				assert.fail(0, 0, 'Should not be able to unlock funds');
			})
			.catch(function(e) {
				assert.equal(
					e.message,
					'VM Exception while processing transaction: revert'
				);
			});

		tx = await welandamInstance.confirmOrder(x, { from: accounts[0] });
		order = await welandamInstance.orders(x);

		assert.equal(order[7], 2, 'status was not stored properly');
		assert.equal('OrderConfirmed', tx.logs[0].event);
		assert.equal(x, tx.logs[0].args.id);
		assert.equal(accounts[0], tx.logs[0].args.by);

		// Balance of ether in smart contract has been reduced
		scbalance = await web3.eth.getBalance(welandamInstance.address);
		assert.equal(0, scbalance.toNumber());
		// Balance of ether in customer has been increased
		let account0Balance = await web3.eth.getBalance(accounts[0]);
		assert.equal(
			true,
			account0Balance.toNumber() > account0BalanceBeforeConfirm.toNumber()
		);

		// Try to unlock funds again should fail
		await welandamInstance
			.unlockFundsForOrder(x, { from: accounts[0] })
			.then(function(tx) {
				assert.fail(0, 0, 'Should not be able to unlock funds');
			})
			.catch(function(e) {
				assert.equal(
					e.message,
					'VM Exception while processing transaction: revert'
				);
			});
	});

	it('...should return funds to customer after expiration time', async () => {
		const welandamInstance = await Welandam.deployed();
		let amount = 0.1;

		let scbalance = await web3.eth.getBalance(welandamInstance.address);
		assert.equal(0, scbalance.toNumber());

		let x = Web3Utils.randomHex(16);
		await welandamInstance.recordOrder(
			x,
			1,
			web3.toWei(amount, 'ether'),
			[accounts[0]],
			accounts[0],
			accounts[0],
			accounts[0],
			1,
			{ from: accounts[0], value: web3.toWei(amount, 'ether') }
		);
		let order = await welandamInstance.orders(x);
		assert.equal(order[0], x, 'order was not stored properly');
		assert.equal(
			order[2],
			web3.toWei(amount, 'ether'),
			'order was not stored properly'
		);
		assert.equal(order[4], accounts[0], 'order was not stored properly');
		assert.equal(order[7], 1, 'order status was not stored properly');

		// Creating some transactions, to force expiration
		await welandamInstance.recordOrder(
			Web3Utils.randomHex(16),
			1,
			web3.toWei(amount, 'ether'),
			[accounts[0]],
			accounts[0],
			accounts[0],
			accounts[0],
			2,
			{ from: accounts[0], value: web3.toWei(amount, 'ether') }
		);
		await welandamInstance.recordOrder(
			Web3Utils.randomHex(16),
			1,
			web3.toWei(amount, 'ether'),
			[accounts[0]],
			accounts[0],
			accounts[0],
			accounts[0],
			2,
			{ from: accounts[0], value: web3.toWei(amount, 'ether') }
		);

		// Confirmation on expired order changes status to Expired and transfers funds back to customer
		let tx = await welandamInstance.confirmOrder(x, { from: accounts[0] });
		assert.equal('OrderExpired', tx.logs[0].event);
		assert.equal(x, tx.logs[0].args.id);
		order = await welandamInstance.orders(x);
		assert.equal(order[7], 3, 'status was not stored properly');
	});
});
