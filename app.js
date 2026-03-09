// Import modules
import express from 'express';
import mysql2 from 'mysql2';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

// Create Express app
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files from "public" folder
app.use(express.static('public'));

// Create MySQL connection pool
const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}).promise();

// Define server port
const PORT = 3000;

// Routes

// Home / resume page
app.get('/', (req, res) => {
    res.render('home'); // your EJS home page with resume
});

// Contact form page
app.get('/contact', (req, res) => {
    res.render('contact');
});

// Submit contact form
app.post('/submit-contact', async (req, res) => {
    const sql = `
    INSERT INTO contacts
    (name, lastName, jobTitle, company, linkedin, email, meeting, other, message, mailingList, emailForm, timestamp)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
        req.body['first-name'],
        req.body['last-name'],
        req.body['job-title'],
        req.body['company'],
        req.body['linkedin'],
        req.body['email'],
        req.body['meeting'],
        req.body['other'],
        req.body['message'],
        req.body['mailing-list'] ? 'Yes' : 'No', // convert checkbox to Yes/No
        req.body['format'] || 'HTML', // default to HTML
        new Date().toLocaleString() // full timestamp
    ];

    try {
        await pool.execute(sql, params);
        res.redirect('/confirmation');
    } catch(err) {
        console.error("Database error:", err);
        res.send("Database error");
    }
});

// Confirmation page (show last submitted contact)
app.get('/confirmation', async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM contacts ORDER BY id DESC LIMIT 1");
        const contact = rows[0];
        res.render('confirmation', { contact });
    } catch(err) {
        console.error("Database error:", err);
        res.send("Database error");
    }
});

// Admin page (show all contacts)
app.get('/admin', async (req, res) => {
    try {
        const [contacts] = await pool.query("SELECT * FROM contacts ORDER BY id DESC");
        res.render('admin', { contacts });
    } catch(err) {
        console.error("Database error:", err);
        res.send("Database error");
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});