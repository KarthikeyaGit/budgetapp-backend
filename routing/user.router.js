

const express = require('express');
const router = express.Router();
const user = require('../controllers/user.controller')

const { verifyToken } = require("../controllers/auth")

router.get('/userAllUsers', verifyToken, user.findAll)
router.post('/getUserByEmail', verifyToken, user.findByEmail)
router.put('/updateByEmail', verifyToken, user.updateByEmail)
router.post('/create', user.create)
router.post('/updateCurrencyById', user.updateCurrencyById)


module.exports = router;

