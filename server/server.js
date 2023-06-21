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


// app.get("/api/category/:categories", (req, res, next) => {
//   var categories = req.params.categories.split(",");

//   var placeholders = categories.map(() => "?").join(",");

//   var sql = "SELECT * FROM places WHERE category IN (" + placeholders + ")";
//   var params = categories;

//   console.log("1");
//   console.log(sql);
//   console.log(params);

//   db.all(sql, params, (err, rows) => {
//     if (err) {
//       res.status(400).json({ "error": err.message });
//       return;
//     }
//     res.json({
//       "message": "success",
//       "data": rows
//     });
//   });
// });

// app.get("/api/categoryandprice/:categories/:price", (req, res, next) => {
//   var categories = req.params.categories.split(",");
//   var price = req.params.price;

//   var placeholders = categories.map(() => "?").join(",");
  
//   var sql = "SELECT * FROM places WHERE category IN (" + placeholders + ")";
//   var params = categories;

//   sql += " AND price = ?";
//   params.push(price);

//   console.log("2");
//   console.log(sql);
//   console.log(params);
  
//   db.all(sql, params, (err, rows) => {
//     if (err) {
//       res.status(400).json({ "error": err.message });
//       return;
//     }
//     res.json({
//       "message": "success",
//       "data": rows
//     });
//   });
// });

app.get("/api/test/:categories/:price/:congestions", (req, res, next) => {
  console.log("api work")
  var categories = req.params.categories.split(",");
  var price = req.params.price.split(",");;
  var congestions = req.params.congestions.split(",");

  var categoryPlaceholders = categories.map(() => "?").join(",");
  var pricePlaceholders = price.map(() => "?").join(",");
  var congestionsPlaceholders = congestions.map(() => "?").join(",");
  

  var sql = "SELECT * FROM places";

  var params = [];

  if (categories.length > 0) {
    sql += " WHERE category IN (" + categoryPlaceholders + ")";
    params = params.concat(categories);
  }

  if (price.length > 0) {
    sql +=
      (params.length > 0 ? " AND" : " WHERE") +
      " price IN (" +
      pricePlaceholders +
      ")";
    params = params.concat(price);
  }

  if (congestions.length > 0) {
    sql +=
      (params.length > 0 ? " AND" : " WHERE") +
      " congestion IN (" +
      congestionsPlaceholders +
      ")";
    params = params.concat(congestions);
  }
  console.log("2");
  console.log(sql);
  console.log(params);

  db.all(sql, params, (err, rows) => {
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


app.get("/api/test2/:request", (req, res, next) => {
  console.log("api work");
  var request = req.params.request

  var sql = "SELECT * FROM places ";
  sql +=request;
  var params = [];

  console.log(sql);
  // console.log(params);

  db.all(sql, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    console.log(rows)
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