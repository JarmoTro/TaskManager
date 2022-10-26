const express = require('express');
const app = express();
const cors = require('cors');
const db = require('../Backend/db')
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONNECTION)
app.use(cors());
app.use(express.json());

app.listen(process.env.PORT || 3000 , () => {
    console.log("API is now running.")
});