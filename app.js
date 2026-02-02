// Import the express module

import express from 'express';


// Create an instance of an Express application

const app = express();


// Define the port number where our server will listen

const PORT = 3000;

app.use(express.static('public'));


// Define a default "route" ('/')


app.get('/', (req, res) => {
    res.sendFile('home.html', { root: '.' });
});


// Start the server and listen on the specified port

app.listen(PORT, () => {

    console.log(`Server is running at http://localhost:${PORT}`);

});


