const express = require('express');
const router = express.Router();
const Menu = require('../menu'); // Ensure you created the menu.js model file

// GET all menu items
router.get('/', async (req, res) => {
    try {
        // MongoDB equivalent of 'SELECT * FROM Menu'
        const items = await Menu.find(); 
        res.json(items);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// ADD menu item
router.post('/', async (req, res) => {
    try {
        const { name, price, category, image } = req.body;
        
        // MongoDB equivalent of 'INSERT INTO Menu...'
        const newItem = new Menu({ name, price, category, image });
        await newItem.save();
        
        res.status(201).json({ message: "Menu item added successfully" });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// DELETE menu item
router.delete('/:id', async (req, res) => {
    try {
        // MongoDB equivalent of 'DELETE FROM Menu WHERE id = @id'
        await Menu.findByIdAndDelete(req.params.id);
        res.json({ message: "Item deleted successfully" });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// UPDATE menu item
router.put('/:id', async (req, res) => {
    try {
        const { name, price, category, image } = req.body;

        // MongoDB equivalent of 'UPDATE Menu SET...'
        await Menu.findByIdAndUpdate(req.params.id, {
            name,
            price,
            category,
            image
        });

        res.json({ message: "Item updated successfully" });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;