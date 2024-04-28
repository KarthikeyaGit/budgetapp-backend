const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// User Schema
const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Login Schema
const LoginSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  ipAddress: { type: String, required: true },
  loginTime: { type: Date, default: Date.now }
});

// Transaction Schema
const TransactionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  transactionDate: { type: Date, default: Date.now }
});

// Category Schema
const CategorySchema = new Schema({
  name: { type: String, required: true, unique: true }
});

const User = mongoose.model('User', UserSchema);
const Login = mongoose.model('Login', LoginSchema);
const Transaction = mongoose.model('Transaction', TransactionSchema);
const Category = mongoose.model('Category', CategorySchema);

module.exports = { User, Login, Transaction, Category };
