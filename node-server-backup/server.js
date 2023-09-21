const express = require('express');
const dotenv = require('dotenv');
const connectDatabase = require("./src/connectDatabase");


// Load environment variables from .env file
dotenv.config();

connectDatabase();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Server !!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
