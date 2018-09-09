var HDWalletProvider = require("truffle-hdwallet-provider");

var mnemonic = "tumble gas embody bright agree pony smoke laptop index sight shallow hungry";
// 0xd77c534aed04d7ce34cd425073a033db4fbe6a9d
// b5fffc3933d93dc956772c69b42c4bc66123631a24e3465956d80b5b604a2d13
module.exports = {
	// See <http://truffleframework.com/docs/advanced/configuration>
	// for more about customizing your Truffle configuration!
	networks: {
		rinkeby: {
			provider: () =>
				new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/b999b0e08a564d9d8fa7f6e94c125153"),
			network_id: "4", // rinkeby network ID
			gas: 4712388
		},
		development: {
			host: '127.0.0.1',
			port: 8545,
			network_id: '*', // Match any network id
			gas: 4712388
		}
	}
};
