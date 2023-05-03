const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const mysqlConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.use(express.json());
app.use(cors({
  origin: 'http://127.0.0.1:5500'
}))

app.get('/events', function (req, res) {
  mysqlConnection.query('select * from ccl_events', function(err, results) {
    if (err) {
      res.send('An error occured');
      return;
    }
    res.send(results);
  });
});

app.post('/events', function (req, res) {
  mysqlConnection.query(
    'INSERT INTO ccl_events (author, title, description, date) VALUES (?, ?, ?, ?)', 
    [req.body.author, req.body.title, req.body.description, req.body.date], 
    function(err, results)  {
      if (err) {
        res.send('An error occured');
        return;
      }
      res.send('Successfully creating the event');
  })
})


mysqlConnection.connect(function (err) {
  if (err) {
    console.log(err);
    return;
  }
  app.listen(3000, function () {
    console.log("HTTP Server running on port 3000");
  })
  
});
