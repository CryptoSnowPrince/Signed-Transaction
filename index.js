import Web3 from 'web3';
import fs from 'fs';
import config from './config.js'
import dotenv from 'dotenv';
dotenv.config();

const rawdata = fs.readFileSync('./contract/test.json');
const testABI = JSON.parse(rawdata);

// create signer
const web3 = new Web3(config.rpc.https[config.chainID]);
const signer = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);

// create test contract
const testContract = new web3.eth.Contract(testABI, config.test[config.chainID]);

// default gas price for sending transactions
const DEFAULT_GAS_PRICE = config.DEFAULT_GAS_PRICE;

// interval function has to be locked when other transaction occured
var LOCK_FUNCTION = false;

var interval_index = 0;
setInterval(async () => {
    if (LOCK_FUNCTION)
        return;

    LOCK_FUNCTION = true;

    try {
        const tx = await testContract.methods.rebase(interval_index);
        await sendTx(signer, tx, DEFAULT_GAS_PRICE, 0);
    }
    catch (e) {
        console.log(e);
    }

    interval_index++;
    LOCK_FUNCTION = true;
}, 1000);

const sendTx = async (account, tx, gasPrice, value) => {
    var gas = 21000000;
    const data = tx.encodeABI();
    let gasFee = await tx.estimateGas({ from: signer.address });
    var nonce = await web3.eth.getTransactionCount(signer.address);
    nonce = web3.utils.toHex(nonce);

    const option = {
        from: account.address,
        to: tx._parent._address,
        data: data,
        nonce,
        gas: web3.utils.toHex(parseInt(gasFee * 1.5)),
        gasPrice: web3.utils.toHex(gasPrice),
    };

    const signedTx = await web3.eth.accounts.signTransaction(option, account.privateKey);
    await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
        .on('transactionHash', function (hash) {
            console.log('transactionHash : ', hash);
        })
        .on('confirmation', function (confirmationNumber, receipt) {
            console.log("transaction is done");
        })
        .on('receipt', function (receipt) {
            console.log("Transaction receipt: ", receipt);
        })
        .on('error', function (error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
            console.log('Attack failed: ', error)
        });
}
