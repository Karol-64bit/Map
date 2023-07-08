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


// Endpoint locations
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
  const { username, password } = req.body;

  db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (!row) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    bcrypt.compare(password, row.password, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (!result) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ username: row.username }, 'secret_key');

      res.status(200).json({ token });
    });
  });
});


//opinions ???
app.get("/api/opinions", (req, res, next) => {
  console.log("api work");

  console.log(req.query.place);

  const place_id = req.query.place

  let sql = "SELECT * FROM opinion";

  if (conditions.length > 0) {
    sql += " WHERE place_id = " + place_id;
  }

  console.log(sql);

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

// Endpoint Add new location
app.post('/api/newlocation', (req, res) => {
  const {
    name,
    description,
    lat,
    lon,
    category,
    price,
    congestion,
  } = req.body;

  db.run(
    "INSERT INTO places (name, description, description_long, lat, lon, category, price, congestion) VALUES (?,?,?,?,?,?,?,?)",
    [
      name,
      description,
      "nothing",
      lat,
      lon,
      category,
      price,
      congestion,
    ],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      res.status(201).json({ message: "User registered successfully" });
    }
  );
});


// Endpoint all locations
app.get("/api/alllocations", (req, res, next) => {
  console.log("api: all locations");

  let sql = "SELECT * FROM places";

  console.log(sql);


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

// Endpoint delete location
app.delete("/api/location/:id", (req, res, next) => {
  console.log("api: delete location");

  const id = req.params.id;

  let sql = "DELETE FROM places WHERE id = ?";

  db.run(sql, id, (err) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    res.json({
      message: "success",
      data: id,
    });
  });
});


// Endpoint edit location
app.put("/api/location/:id", (req, res, next) => {
  console.log("api: edit location");

  const id = req.params.id;
  const { name, description, lat, lon, category, price, congestion } = req.body;

  let sql = `
    UPDATE places 
    SET name = ?, description = ?,description_long = ?, lat = ?, lon = ?, category = ?, price = ?, congestion = ?
    WHERE id = ?
  `;

  db.run(sql, [name, description,"nothing", lat, lon, category, price, congestion, id], (err) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    res.json({
      message: "success",
      data: id,
    });
  });
});



// Default response for any other request
app.use(function(req, res){
  res.status(404);
});