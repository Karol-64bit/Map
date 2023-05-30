const express = require('express')
const app = express()
var db = require("./database.js")

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
          "message":"success",
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

app.get("/api/category/:category", (req, res, next) => {
  var sql = "select * from places where category = ?"
  var params = [req.params.category]
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

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Zastąp * adresem Twojej aplikacji front-end
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

// Default response for any other request
app.use(function(req, res){
  res.status(404);
});