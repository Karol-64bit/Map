const express = require('express')
const app = express()
var db = require("./database.js")
const cors = require('cors');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
app.use(cors());
// Server port
var HTTP_PORT = 5001

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
    app.setMaxListeners(0);

});
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Root endpoint
app.get("/", (req, res, next) => {
  res.json({"message":"Ok"})
});

// API endpoints


app.get("/api/locations", (req, res, next) => {
  console.log("api work");


  let conditions = [];

  console.log(req.query.category);
  console.log(req.query.price);
  console.log(req.query.congestion);

  if (req.query.category) {

    conditions.push(`category IN (${req.query.category})`);
  }

  if (req.query.price) {
    conditions.push(`price IN (${req.query.price})`);
  }

  if (req.query.congestion) {
    conditions.push(`congestion IN (${req.query.congestion})`);
  }

  let sql = "SELECT * FROM places";

  if (conditions.length > 0) {
    sql += " WHERE " + conditions.join(" AND ");
  }

  console.log(sql);
  console.log(req.query.params);

  db.all(sql, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    res.json({
      message: "success",
      data: rows,
    });
  });
});



// Middleware JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, 'secret_key', (err, user) => {
    if (err) {
      console.error(err);
      return res.status(403).json({ error: 'Forbidden' });
    }

    req.user = user;
    next();
  });
};


// Endpoint register
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (row) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      db.run(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [username, hashedPassword],
        (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
          }

          res.status(201).json({ message: "User registered successfully" });
        }
      );
    });
  });
});

// Endpoint login
app.post('/api/login', (req, res) => {
  console.log(req.query.username, req.query.password)
  console.log("ok");
  const { username, password } = req.body;

  db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (!row) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

      if (row.password==password){
        
        const token = jwt.sign({ username: row.username }, "secret_key");
        res.status(200).json({ token });
      }
      else{
          res.status(401).json({ error: "Invalid credentials" });
      }


    });
  });

// Default response for any other request
app.use(function(req, res){
  res.status(404);
});