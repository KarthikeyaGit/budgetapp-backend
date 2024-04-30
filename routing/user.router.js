

const express = require('express');
const router = express.Router();
const user = require('../controllers/user.controller')

router.get('/userAllUsers', user.findAll)
router.post('/getUserByEmail', user.findByEmail)
router.put('/updateByEmail', user.updateByEmail)
router.post('/create', user.create)

module.exports = router;

