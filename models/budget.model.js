const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BudgetSchema = new Schema({
    uid: { type: String, required: true },
    forDate
  

});

const Budget = mongoose.model('budget', BudgetSchema);

module.exports = { Budget };
