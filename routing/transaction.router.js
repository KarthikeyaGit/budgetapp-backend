const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaction.controller');

router.get('/getAllTransactions', transactionController.findAll);
router.get('/getTransactionById/:id', transactionController.findById);
router.post('/createTransaction', transactionController.create);
router.put('/updateTransactionById/:id', transactionController.updateById);
router.delete('/deleteTransactionById/:id', transactionController.deleteById);

module.exports = router;
