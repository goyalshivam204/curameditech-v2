const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const userRouter = require("./src/routes/UserRoute");

const PORT = process.env.PORT || 3000;

const connectDatabase = require("./src/config/connectDatabase");
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


// Cookie parsing
app.use(cookieParser());

// middleware
app.use(morgan('combined'));


// Load environment variables from .env file
dotenv.config();


// Connect to database
connectDatabase();


app.get('/', (req, res) => {
    res.send('Server !!');
});

app.use("/api", pythonRouter);
app.use("/api",userRouter);
// app.use("/api",);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
