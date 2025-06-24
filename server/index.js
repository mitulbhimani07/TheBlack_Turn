const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;
const db = require('./config/db');
// Connect to the database
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
const cors = require('cors');
app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome to the API');
});
// Import routes
app.use('/blogs', require('./routes/blog'));
app.listen(port, (err) => {
    if (err) {
        console.error('Error starting server:', err);
    } else {
        console.log(`Server is running on port http://localhost:${port}`);
    }
});