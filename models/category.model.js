const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    type: { type: String, default: 'default' } // 'default' or 'custom'
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
