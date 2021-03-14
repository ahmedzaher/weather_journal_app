// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

const app = express();

/* Middleware*/
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

const getProjectData = (req, res) => res.send(projectData);
const addTemp = (temp) => {
    projectData.push(temp);
}

app.get('/all', getProjectData);
app.post('/temp', addTemp)




// Setup Server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});