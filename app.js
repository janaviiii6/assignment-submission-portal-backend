require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const app = express();

app.use(express.json());
app.use(cors());

const userRoute = require("./routes/user");

app.use("/",userRoute);

// Database connection 
const mongoDBURL = process.env.MONGODB_URL;
mongoose
.connect(mongoDBURL)
.then(() => {
    console.log("Connected to Database");
})
.catch((err) => {
    console.error("Database connection failed: ", err);
});


//Listen to the Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});