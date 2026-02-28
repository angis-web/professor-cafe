const express = require('express');
const router = express.Router();
const { sql, pool, poolConnect } = require('../db');

router.get('/', async (req, res) => {
    try {
        await poolConnect;
        const result = await pool.request().query('SELECT * FROM Menu');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// ADD menu item
router.post('/', async (req, res) => {
    try {
        const { name, price, category, image } = req.body;

        await poolConnect;

        await pool.request()
            .input('name', sql.NVarChar, name)
            .input('price', sql.Decimal(10, 2), price)
            .input('category', sql.NVarChar, category)
            .input('image', sql.NVarChar, image)
            .query(`
                INSERT INTO Menu (name, price, category, image)
                VALUES (@name, @price, @category, @image)
            `);
        
        res.status(201).json({message: "Menu item added successfully"});

    } catch (err) {
        res.status(500).send(err.message);
    }
})

// DELETE menu item
router.delete('/:id', async (req, res) => {
    try {
        await poolConnect;

        await pool.request()
            .input('id', sql.Int, req.params.id)
            .query('DELETE FROM Menu WHERE id = @id');

        res.json({ message: "Item deleted successfully" });

    } catch (err) {
        res.status(500).send(err.message);
    }
});

// UPDATE menu item
router.put('/:id', async (req, res) => {
    try {
        const { name, price, category, image } = req.body;

        await poolConnect;

        await pool.request()
            .input('id', sql.Int, req.params.id)
            .input('name', sql.NVarChar, name)
            .input('price', sql.Decimal(10,2), price)
            .input('category', sql.NVarChar, category)
            .input('image', sql.NVarChar, image)
            .query(`
                UPDATE Menu
                SET name = @name,
                    price = @price,
                    category = @category,
                    image = @image
                WHERE id = @id
            `);

        res.json({ message: "Item updated successfully" });

    } catch (err) {
        res.status(500).send(err.message);
    }
});

// router.post('/', async (req, res) => {
//    console.log(req.body)
// })

module.exports = router;