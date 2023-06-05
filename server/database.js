var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            description text, 
            description_long text, 
            lat text, 
            lon text,
            category text
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO places (name, description, description_long, lat, lon, category) VALUES (?,?,?,?,?,?)'
                db.run(insert, ["rzeszów","to jest miasto","to jest miasto dlugi opis","10","180","city"])
                db.run(insert, ["warszawa","to jest stolica","to jest stolica dlugi opis","20","190","city"])
                db.run(insert, ["hel","to jest miasto","to jest miasto dlugi opis","30","210","beach"])
            }
        });  
    }
});


module.exports = db