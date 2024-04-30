const { Category } = require("../models/category.model");

exports.create = (req, res) => {
    const { userId, name, type } = req.body;

    const newCategory = new Category({
        userId,
        name,
        type
    });

    newCategory.save()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the category."
            });
        });
};

exports.findAll = (req, res) => {
    Category.find()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving categories.",
            });
        });
};

exports.findById = (req, res) => {
    const categoryId = req.params.id;
    Category.findById(categoryId)
        .then((data) => {
            if (!data) {
                return res.status(404).send({ message: "Category not found" });
            }
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving category.",
            });
        });
};

exports.updateById = (req, res) => {
    const categoryId = req.params.id;
    const updateData = req.body;

    Category.findByIdAndUpdate(categoryId, updateData, { new: true })
        .then((data) => {
            if (!data) {
                return res.status(404).send({ message: "Category not found" });
            }
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while updating category.",
            });
        });
};

exports.deleteById = (req, res) => {
    const categoryId = req.params.id;
    Category.findByIdAndRemove(categoryId)
        .then((data) => {
            if (!data) {
                return res.status(404).send({ message: "Category not found" });
            }
            res.send({ message: "Category deleted successfully" });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while deleting category.",
            });
        });
};
