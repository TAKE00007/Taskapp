const express = require('express');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
    // ootakeshunnoMacBook-Pro.local
    host: 'localhost',
    user: 'root',
    // port: 3306,
    password: 'Shun_0728',
    database: 'taskapp'
});

// データベース接続時にエラーを表示
connection.connect((err) => {
    if (err) {
        console.log('error connecting: ' + err.stack);
        return;
    }
    console.log('success');
});

// app.get('/', (req, res) => {
//     res.render('hello.ejs');
// });

app.get('/', (req, res) => {
    connection.query(
        'SELECT * FROM users',
        (error, results) => {
            console.log(results);
            res.render('hello.ejs');
        }
    );
});
app.listen(3000);