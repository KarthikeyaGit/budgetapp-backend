

const express = require('express');
const router = express.Router();
const currencies = require('../controllers/currencies')
const { verifyToken } = require("../controllers/auth")


router.get('/currenciesList', currencies.getCurrencies)
router.post('/updatCurrentByUid', currencies.updateCurrencyByUid )

module.exports = router;

