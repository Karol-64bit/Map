const express = require('express')
const app = express()
var db = require("./database.js")
const cors = require('cors');
app.use(cors());
// Server port
var HTTP_PORT = 5001

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
    app.setMaxListeners(0);

});


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


// Default response for any other request
app.use(function(req, res){
  res.status(404);
});