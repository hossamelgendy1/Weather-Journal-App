// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');


// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

const port = 5000;
// Setup Server
const server = app.listen(port, ()=> {
    console.log("server running...");
    console.log(`localhost:${port}`);
});


// Post Route
app.post('/post', (req, res)=>{
    projectData.date = req.body.date;
    projectData.temp = req.body.temp;
    projectData.content = req.body.content;
    res.send(projectData);
});



// Callback function to complete GET 
app.get('/get', (req, res)=> {
    res.send(projectData);
    console.log(projectData)
  });


