const express = require('express');
const app = express();
const path = require('path');
//===============================================================================================//

//allow cross-origin resource sharing for development
const cors = require('cors');
app.use(cors());

// logs all api requests to the console
const morgan = require('morgan');
app.use(morgan('dev'));


// middleware to parse all POST/PUT/PATCH body request as req.body on backend
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // handle json data
app.use(bodyParser.urlencoded({ extended: true })); // handle URL-encoded data


// import routes
//===========================================================================
require('./routes/fetchJobs')(app);


// test routes
app.get('/test', (req, res) => {
    res.send("hello @ test");
});


// =================================================================================================
// SERVER CONFIGURATION                                                                           //
// =================================================================================================
// // development route. needs to changed for production
if (process.env.NODE_ENV === 'production') {
    console.log('******** in production environment ********');

    app.use(express.static(path.resolve(__dirname, 'client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


// currently always defaults to port specified in dotenv
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("NodeJS server started on port: " + PORT);
});