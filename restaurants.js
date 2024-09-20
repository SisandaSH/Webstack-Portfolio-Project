const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Database connection settings
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'restaurant_chooser'
});

// Connect to database
db.connect((err) => {
  if (err) {
    console.error('error connecting:', err);
    return;
  }
  console.log('connected as id ' + db.threadId);
});

// Define routes
app.get('/restaurants', (req, res) => {
  const query = `SELECT * FROM restaurants`;
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error retrieving restaurants' });
    } else {
      res.send(results);
    }
  });
});

app.get('/options', (req, res) => {
  const query = `SELECT * FROM options`;
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error retrieving options' });
    } else {
      res.send(results);
    }
  });
});

app.post('/user-choice', (req, res) => {
  const { userId, restaurantId, optionId } = req.body;
  const query = `INSERT INTO user_choices (user_id, restaurant_id, option_id) VALUES (?, ?, ?)`;
  db.query(query, [userId, restaurantId, optionId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error saving user choice' });
    } else {
      res.send({ message: 'User choice saved successfully' });
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
