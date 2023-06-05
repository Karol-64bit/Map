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
                db.run(insert, ["rzeszów","to jest miasto","to jest miasto dlugi opis","50.04118062823397","21.99908104034367","city"])
                db.run(insert, ["warszawa","to jest stolica","to jest stolica dlugi opis","52.227601405358534","21.01466388459734","city"])
                db.run(insert, ["hel","to jest plaża","to jest plaża dlugi opis","54.60832188018254","18.800735916994903","beach"])
                db.run(insert, ["malbork","to jest zamek","to jest zamek dlugi opis","54.03983963631113","19.028021402094723","castle"])
            }
        });  
    }
});
module.exports = db