const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;
const path = require('path');

// const db = require('./config/db');
// Connect to the database
require('dotenv').config();

// app.use(fileUpload());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
const cors = require('cors');

app.use(cors());
app.use('/upload', express.static(path.join(__dirname, 'upload')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/default-song-poster.jpg', express.static(path.join(__dirname, 'upload', 'default-song-poster.jpg')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set view engine
app.set('view engine', 'ejs');

// Set the views directory (optional if using default `/views`)
app.set('views', path.join(__dirname, 'views'));
// Serve static files from uploads directory
app.use('/uploads', express.static('uploads'));
// Database connection
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://mitulbhimani281:mF6u0wongMtNZE3l@cluster0.t7dse.mongodb.net/TheBlackTurn").then((res) => {
    console.log('Database connected successfully');
})
    .catch((err) => {
        console.log('Error connecting to the database:', err);
    });

// Middleware to parse JSON and URL-encoded data
app.get('/', (req, res) => {
  console.log('Welcome to the API');
  res.render('Home'); // views/Home.ejs
});

// Import routes
app.use('/blogs', require('./routes/blog'));
app.use('/user', require('./routes/userRoutes'));

// ReleseNewAlbum
app.use('/ReleseNewAlbum', require('./routes/ReleseNewAlbumRoute'));
app.use('/NOC', require('./routes/Noc'));
app.use('/OnlyCallerTune', require('./routes/OnlyCallerTuneRoutes'))

// singlesongwithct
app.use("/singlesongCT", require("./routes/singleSongCTRoutes"))

// singlesongwitoutct                                                                             
app.use("/singlesongWithoutCT", require("./routes/singleSongWithoutCTRoutes"))

// feedback
app.use('/feedback', require('./routes/Help&Support'));

app.listen(port, (err) => {
    if (err) {
        console.error('Error starting server:', err);
    } else {
        console.log(`Server is running on port http://localhost:${port}`);
    }
});