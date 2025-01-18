const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/dbconn');
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = process.env.PORT || 4000;

connectDB()
app.use(cors());
app.use(express.json());



app.use('/', require('./routes/register'));


mongoose.connection.once('open' , ()=>{
    console.log('Connected DataBase ..........')
    app.listen(PORT, ()=> {
        console.log(`Server running on port ${PORT}........`);
    });
})
mongoose.connection.on('error', (err) => {
    console.log(err)
})
