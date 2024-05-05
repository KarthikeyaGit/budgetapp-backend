const express = require('express');
const router = express.Router();
const loginuser = require('../controllers/login.controller');

router.post('/login', loginuser.login);

module.exports = router;

