const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    account_balance: { type: Number, default: 0 },
    currency: { type: String }
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };
