const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;
// const db = require('./config/db');
// Connect to the database
require('dotenv').config();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
const cors = require('cors');
app.use(cors());

// Database connection
const mongoose = require('mongoose');
    mongoose.connect("mongodb+srv://mitulbhimani281:mF6u0wongMtNZE3l@cluster0.t7dse.mongodb.net/TheBlackTurn").then((res)=>{
        console.log('Database connected successfully');  
    })
    .catch((err) => {
        console.log('Error connecting to the database:', err);
    });
// Middleware to parse JSON and URL-encoded data
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});
// Import routes
app.use('/blogs', require('./routes/blog'));
app.use('/user', require('./routes/userRoutes'));

app.listen(port, (err) => {
    if (err) {
        console.error('Error starting server:', err);
    } else {
        console.log(`Server is running on port http://localhost:${port}`);
    }
});