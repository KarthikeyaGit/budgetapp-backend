const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');

router.get('/getAllCategories', categoryController.findAll);
router.get('/getCategoryById/:id', categoryController.findById);
router.post('/createCategory', categoryController.create);
router.put('/updateCategoryById/:id', categoryController.updateById);
router.delete('/deleteCategoryById/:id', categoryController.deleteById);

module.exports = router;
