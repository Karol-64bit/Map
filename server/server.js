const express = require('express')
const app = express()
var db = require("./database.js")
const cors = require('cors');
app.use(cors());
// Server port
var HTTP_PORT = 5000 

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

// Root endpoint
app.get("/", (req, res, next) => {
  res.json({"message":"Ok"})
});

// API endpoints

app.get("/api/places", (req, res, next) => {
  var sql = "select * from places"
  var params = []
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.json({
          // "message":"success",
          // "data":rows
          "data":rows
      })
    });
});

app.get("/api/places/:id", (req, res, next) => {
  var sql = "select * from places where id = ?"
  var params = [req.params.id]
  db.get(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.json({
          "message":"success",
          "data":row
      })
    });
});

app.get("/api/category/:categories", (req, res, next) => {
  var categories = req.params.categories.split(",");

  var placeholders = categories.map(() => "?").join(",");

  var sql = "SELECT * FROM places WHERE category IN (" + placeholders + ")";
  var params = categories;

  console.log(sql);

  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": rows
    });
  });
});

app.get("/api/categoryandprice/:categories/:price", (req, res, next) => {
  var categories = req.params.categories.split(",");
  var price = req.params.price;

  var placeholders = categories.map(() => "?").join(",");
  
  var sql = "SELECT * FROM places WHERE category IN (" + placeholders + ")";
  var params = categories;

  sql += " AND price = ?";
  params.push(price);

  console.log(sql);
  
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": rows
    });
  });
});



app.get("/api/test/", (req, res, next) => {
  const sql = "SELECT name FROM sqlite_master WHERE type='table'";

  // Wykonanie zapytania
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return;
    }
  
    // Wyświetlenie nazw tabel
    rows.forEach(row => {
      console.log(row.name);
    });
  });
});


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

// Default response for any other request
app.use(function(req, res){
  res.status(404);
});