import * as config from '../../../build/contracts/Welandam.json';
//import * as configOracle from '../../../build/contracts/PriceOracleInterface.json';

let welandam = null;
let dxOracle = null;

let selectedNetwork = null;
const supportedNetworks = Object.keys(config.networks);

export default class Contracts {
	constructor() {
		throw new Error('Do not instantiate!');
	}

	static getSupportedNetworks = () => {
		return supportedNetworks;
	};

	static setNetwork = networkId => {
		if (supportedNetworks.indexOf(networkId) < 0) {
			throw new Error(
				`No configuration defined for network:${networkId}. Application supports only ${supportedNetworks.join(
					','
				)}`
			);
		}
		selectedNetwork = networkId;
		let { web3 } = window;

		// initialize contracts
		welandam = web3.eth
			.contract(config.abi)
			.at(config.networks[selectedNetwork].address);
		// dxOracle = web3.eth
		// 	.contract(configOracle.abi)
		// 	.at(configOracle.networks[selectedNetwork].address);
		// Display this item details
		// let usdEthPrice = dxOracle.getUSDETHPrice();
		// When hitting buy, set the correct value in metamask
	};

	static Welandam() {
		if (!welandam)
			throw new Error(
				`You must first define the network. Call Contract.setNetwork}`
			);
		return welandam;
	}

	static DxOracle() {
		if (!dxOracle)
			throw new Error(
				`You must first define the network. Call Contract.setNetwork}`
			);
		return dxOracle;
	}

	static isTweetStreamBytecode(bytecode) {
		return config.deployedBytecode === bytecode;
	}
}
