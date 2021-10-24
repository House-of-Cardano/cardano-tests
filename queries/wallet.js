const axios = require('axios');

const { Seed, WalletServer } = require('cardano-wallet-js');
let walletServer = WalletServer.init('http://localhost:1337/v2');

exports.walletQueryInformation = async (req, res) => {
        try {
            const response = await axios({
                url: "http://localhost:1337/v2/network/information",
                method: "get"
            });
            res.status(200).json(response.data);
        } catch (err) {
            res.status(500).json({ message: err });
        }
    };

exports.walletQueryInfo = async (req, res) => {
    let information = await walletServer.getNetworkInformation();
    res.status(200).json(information);
};

exports.walletQueryServer = (req, res) => {
res.status(200).json(walletServer.url)
console.log(`The walletserver is ${walletServer.url}`);
};

exports.walletQueryParameters = async (req, res) => {
    let parameters = await walletServer.getNetworkParameters();
    res.status(200).json(parameters);
};

exports.walletQueryClock = async (req, res) => {
    let clock = await walletServer.getNetworkClock();
    res.status(200).json(clock);
};

exports.walletGenerateSeed = (req, res) => {
    let recoveryPhrase = Seed.generateRecoveryPhrase(24);
    let words = Seed.toMnemonicList(recoveryPhrase);
    res.status(200).json(words);
};

exports.walletGenerateWallet = async (req, res) => {
let recoveryPhrase = Seed.generateRecoveryPhrase();
let mnemonic_sentence = Seed.toMnemonicList(recoveryPhrase);
let passphrase = 'tangocrypto';
let name = 'tangocrypto-wallet';
let wallet = await walletServer.createOrRestoreShelleyWallet(name, mnemonic_sentence, passphrase);
// let addresses = await wallet.getAddresses(); // list will contain at least 20 address
// res.status(200).json(addresses);
// console.log(addresses);
let unusedAddresses = await wallet.getUnusedAddresses();
let totalBalance = wallet.getTotalBalance();
let availableBalance = wallet.getAvailableBalance();
res.status(200).json(unusedAddresses);
};