const express = require('express');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;

const connectDatabase = require("./src/connectDatabase");
const bodyParser = require('body-parser');
const pythonRouter = require("./src/routes/pythonRoute");

// Allows cors.
const corsOptions = {
    origin: 'http://localhost:8000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


// Load environment variables from .env file
dotenv.config();


// Connect to database
// connectDatabase();









app.get('/', (req, res) => {
    res.send('Server !!');
});

app.use("/api",pythonRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
