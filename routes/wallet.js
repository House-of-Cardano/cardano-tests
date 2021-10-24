const express = require('express');

const getInformation = require('../queries/wallet');

const router = express.Router();

router.get('/information', getInformation.walletQueryInformation);

router.get('/server', getInformation.walletQueryServer);

router.get('/info', getInformation.walletQueryInfo);

router.get('/parameters', getInformation.walletQueryParameters);

router.get('/clock', getInformation.walletQueryClock);

router.get('/generate-seed', getInformation.walletGenerateSeed);

router.get('/generate-wallet', getInformation.walletGenerateWallet);

module.exports = router;