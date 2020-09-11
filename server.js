// Setup empty JS object to act as endpoint for all routes
projectData = [];
// Require Express to run server and routes
const express = require('express')
// Start up an instance of app
const app = express()
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
var cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

//Add GET route
app.get('/all', (req, res) => {
    res.send(projectData);
    projectData = [];
})

//Add POST route
app.post('/add', (req, res) => {
    console.log(req.body);
    fullEntry = {
        date : req.body.date,
        temp : req.body.temp,
        entry : req.body.entry
    }
    projectData.push(fullEntry);
})

// Setup Server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})