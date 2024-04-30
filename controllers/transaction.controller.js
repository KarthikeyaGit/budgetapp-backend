const { Transaction } = require("../models/transaction.model");

exports.create = (req, res) => {
  const { userId, amount, category, description } = req.body;

  const newTransaction = new Transaction({
    userId,
    amount,
    category,
    description
  });

  newTransaction.save()
    .then((data) => {
      res.send(data); 
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the transaction."
      });
    });
};

exports.findAll = (req, res) => {
  Transaction.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving transactions.",
      });
    });
};

exports.findById = (req, res) => {
  const transactionId = req.params.id;
  Transaction.findById(transactionId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: "Transaction not found" });
      }
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving transaction.",
      });
    });
};

exports.updateById = (req, res) => {
  const transactionId = req.params.id;
  const updateData = req.body;

  Transaction.findByIdAndUpdate(transactionId, updateData, { new: true })
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: "Transaction not found" });
      }
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while updating transaction.",
      });
    });
};

exports.deleteById = (req, res) => {
  const transactionId = req.params.id;
  Transaction.findByIdAndRemove(transactionId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: "Transaction not found" });
      }
      res.send({ message: "Transaction deleted successfully" });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while deleting transaction.",
      });
    });
};
