const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(express.static('public')); // Serve static files from the 'public' directory
app.use(cors());
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'practical_1'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

app.use(express.json());

// Get all employees
// Get all employees
app.get('/api/employees', (req, res) => {
    let sql = 'SELECT * FROM employees';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching employees:', err); // Log error
            return res.status(500).send('Server Error'); // Return an error response
        }
        console.log(results)
        res.json(results);
    });
});


// Add a new employee
app.post('/api/employees', (req, res) => {
    let employee = req.body;
    let sql = 'INSERT INTO employees SET ?';
    db.query(sql, employee, (err, result) => {
        if (err) throw err;
        res.send('Employee added...');
    });
});

// Update an employee
app.put('/api/employees/:id', (req, res) => {
    let newInfo = req.body;
    let sql = `UPDATE employees SET ? WHERE e_id = ${req.params.id}`;
    db.query(sql, newInfo, (err, result) => {
        if (err) throw err;
        res.send('Employee updated...');
    });
});

// Delete an employee
app.delete('/api/employees/:id', (req, res) => {
    let sql = `DELETE FROM employees WHERE e_id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('Employee deleted...');
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
