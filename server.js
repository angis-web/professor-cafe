const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

// This is your "Static" data (Fake Database)
const menuData = [
{ Name: 'Classic Burger', Price: 120, Category: 'food', ImageURL: 'images/burger 1.jpg' },
{ Name: 'Fresh Juice', Price: 80, Category: 'drinks', ImageURL: 'images/juice 1.jpg' },
{ Name: 'Special Pizza', Price: 200, Category: 'food', ImageURL: 'images/pizza 1.jpg' },
{ Name: 'Strong Coffee', Price: 50, Category: 'coffee', ImageURL: 'images/coffee 1.jpg' }
];

app.get('/api/menu', (req, res) => {
res.json(menuData);
});

const PORT = 5000;
app.listen(PORT, () => {
console.log("Server started on http://localhost:5000");
});