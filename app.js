const express = require('express');
const connection = require('./config');

const app = express();
console.log('Database connection module imported:', typeof connection.query);
// app.get('/', (req, res) => {
//     res.render('hello.ejs');
// });

app.get('/', (req, res) => {
    connection.query(
        'SELECT * FROM users',
        (error, results) => {
            if (error) {
                console.error('Error connecting to the database:', error.stack);
                res.status(500).send('Error connecting to the database');
            }
            console.log(results);
            res.render('hello.ejs');
        }
    );
});
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});