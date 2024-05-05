

const express = require('express');
const router = express.Router();
const currencies = require('../controllers/currencies')
const { verifyToken } = require("../controllers/auth")


router.get('/currenciesList', verifyToken, currencies.getCurrencies)


module.exports = router;

