const express = require('express'); // Express, is a back end web application framework for Node.js
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors')

app.use(cors()) // Use this after the variable declaration
// Middleware
app.use(express.json());
// app.use(bodyParser.json({ limit: '500kb' }));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static('public'));
const PORT = process.env.PORT || 5050;

const mongoURI = "mongodb://localhost/Employee-Time-Card"

const db = process.env.MONGODB_URI || mongoURI
const connectDB = async () => {
    try {
        await mongoose.connect(db, {

        });

        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }

};

connectDB();

// API and View routes
app.use(routes);

app.listen(PORT, () => console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`));