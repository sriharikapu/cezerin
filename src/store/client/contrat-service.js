import * as config from '../../../build/contracts/Welandam.json';

let welandam = null;

let selectedNetwork = null;
const supportedNetworks = Object.keys(config.networks);

export default class Contracts {
	constructor() {
		throw new Error("Do not instantiate!")
	}

	static getSupportedNetworks = () => {
		return supportedNetworks;
	};

	static setNetwork = (networkId) => {
		if (supportedNetworks.indexOf(networkId) < 0) {
			throw new Error(`No configuration defined for network:${networkId}. Application supports only ${supportedNetworks.join(',')}`)
		}
		selectedNetwork = networkId;
		let {web3} = window;

		// initialize contracts
		welandam = web3.eth.contract(config.abi).at(config.networks[selectedNetwork].address);
	};

	static Welandam() {
		if (!welandam) throw new Error(`You must first define the network. Call Contract.setNetwork}`)
		return welandam;
	}

	static isTweetStreamBytecode(bytecode) {
		return config.deployedBytecode === bytecode;
	}

}

