const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // replace with your MySQL username
    password: '', // replace with your MySQL password
    database: 'farmers_market'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL connected...');
});

app.use(cors());
app.use(bodyParser.json());

// Endpoint to get products
app.get('/api/products', (req, res) => {
    const sql = 'SELECT * FROM products';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Endpoint to add a product (for admin use)
app.post('/api/products', (req, res) => {
    const { name, price, quantity } = req.body;
    const sql = 'INSERT INTO products (name, price, quantity) VALUES (?, ?, ?)';
    db.query(sql, [name, price, quantity], (err, result) => {
        if (err) throw err;
        res.send('Product added');
    });
});

// Endpoint to register a user
app.post('/api/register', (req, res) => {
    const { email, password } = req.body;
    const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
    db.query(sql, [email, password], (err, result) => {
        if (err) throw err;
        res.send('User registered');
    });
});

// Endpoint to authenticate a user (simple example)
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(sql, [email, password], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.send('Login successful');
        } else {
            res.status(401).send('Invalid credentials');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
