import axios from "axios";
import { ethers } from 'ethers';


// export getTop() {
    
// }
export async function connectToEth() {
    window.ethereum.enable()
    const address = await _getAddress();
    console.log(address);

}

function _getProvider() {
    return window.web3 ? new ethers.providers.Web3Provider(window.web3.currentProvider) : ethers.getDefaultProvider('rinkeby');
}

function _getAddress(callback) {
const provider = _getProvider();
const signer = provider.getSigner();
return signer.getAddress();
}