const Category = require("../models/category");
const mongoose = require('mongoose'); 

// Get all categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find({ deletedAt: null });
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get category by ID
exports.getCategoryById = async (req, res) => {
    try {
        // Data yang ditampilkan hanya yang deletedAt nya null
        const category = await Category.findOne({ _id: req.params.id, deletedAt: null });
    
        if (!category) {
          return res.status(404).json({ message: "Kategori tidak ditemukan" });
        }
    
        res.status(200).json(category);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };

// Create category
exports.createCategory = async (req, res) => {
    try {
        const category = new Category({
          _id: new mongoose.Types.ObjectId(), 
          name: req.body.name,
          createdAt: new Date(),
          updatedAt: new Date()
        });
    
        await category.save();
        res.status(201).json(category);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };

// Update category
exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!category) return res.status(404).json({ message: "Kategori tidak ditemukan" });
        res.status(200).json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete category
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) return res.status(404).json({ message: "Kategori tidak ditemukan" });
        res.status(200).json({ message: "Kategori berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
