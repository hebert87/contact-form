// Import the express module

import express from 'express';


// Create an instance of an Express application

const app = express();

// creating a memory for contacts
const contacts = [];

//middleware to parse data
app.use(express.urlencoded({ extended: true }));


// Define the port number where our server will listen

const PORT = 3000;

app.use(express.static('public'));


// Define a default "route" ('/')

app.get('/', (req, res) => {
    res.sendFile('home.html', { root: '.' });
});

// 
app.post('/submit-contact', (req, res) => {
    const contact = req.body;
    contacts.push(contact);
    res.redirect('/confirmation');
});

// confirmation root
app.get('/confirmation', (req, res) => {
res.sendFile('confirmation.html', { root: '.' });
});

app.get('/admin', (req, res) => {
    res.json(contacts);
});

// Start the server and listen on the specified port

app.listen(PORT, () => {

    console.log(`Server is running at http://localhost:${PORT}`);

});


