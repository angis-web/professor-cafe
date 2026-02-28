
const express = require('express');
const cors = require('cors');
const menuRoutes = require('./routes/menuRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/menu', menuRoutes);

app.listen(5000, () => {
    console.log("Server running on port http://localhost:5000/api/menu");
});
