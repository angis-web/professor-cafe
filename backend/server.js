const express = require('express');
const cors = require('cors');
const connectDB = require('./db'); // Looks in the same folder
const menuRoutes = require('./routes/menuRoutes'); // Goes UP one folder then into ROUTER

const app = express();

app.use(cors());
app.use(express.json());

// Connect to Database
connectDB();

app.use('/api/menu', menuRoutes);

// Use the Port from .env or default to 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});