const mongoose = require("mongoose");

const connectDatabase = () => {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((result) => {
            console.log(`mongoose connected and results are: ${result}`);
        }).catch((err) => {
            console.log(`mongoose connection failed due to some error:${err}`);
        });

}
module.exports = connectDatabase;