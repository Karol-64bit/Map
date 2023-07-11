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
            category text,
            price text,
            congestion text,
            image text
            )`,
        (err) => {
            if (err) {
                // Table already created
                console.log('Table "PLaces" already created')
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO places (name, description, description_long, lat, lon, category, price, congestion, image) VALUES (?,?,?,?,?,?,?,?,?)'
                db.run(insert, [
                    "Wrocław",
                    "Is at the top of many lists of the most beautiful cities in Poland.",
                    "On the one hand, the huge Market Square with the Gothic Town Hall or the charming Ostrów Tumski, the oldest part of the city, impresses. On the other hand, Wrocław is associated as an exceptionally modern city - its eclecticism can be seen both in its architecture and in its amazing atmosphere.",
                    "51.111457986087935",
                    "17.03717151533756",
                    "city",
                    "low",
                    "moderate",
                    "https://i.ibb.co/BzTQ9Yj/day-background.jpg"
                ])
                db.run(insert, [
                    "Warsaw",
                    "This is the capital of Poland",
                    "Warsaw is the center of our society's life. It is an important cultural, scientific, political and economic center.",
                    "52.231437358001884",
                    "21.01381383487476",
                    "city",
                    "high",
                    "crowded",
                    "https://i.ibb.co/BzTQ9Yj/day-background.jpg"])
                db.run(insert, [
                    "Gdańsk",
                    "This is a city in the northern part of Poland",
                    "Gdańsk itself is a charming city, and if you add to this the proximity of the sea, you can truly be enchanted. The famous fountain with Neptune, the amazing Artus Court or the impressive Town Hall are just examples of places that you must see when visiting Gdańsk.",
                    "54.35125588350789",
                    "18.646080185092636",
                    "city",
                    "high",
                    "moderate",
                    "https://i.ibb.co/BzTQ9Yj/day-background.jpg"])

                db.run(insert, [
                    "Hel",
                    "Hel is full of beautiful beaches attracting millions of tourists.",
                    "Due to the weather conditions - strong wind, high waves and, according to the Travelist magazine, over 70 sunny days a year - the beach is most often visited by lovers of water fun. Interestingly, the beach on Hel, as the only one from Poland, was included in the prestigious European Best Destinations ranking, taking 10th place.",
                    "54.60832188018254",
                    "18.800735916994903",
                    "beach",
                    "low",
                    "crowded",
                    "https://i.ibb.co/BzTQ9Yj/day-background.jpg"])
                db.run(insert, [
                    "Świnoujście",
                    "The beach is among the cleanest and warmest in the country",
                    "The winner of the ranking for the most beautiful beach at the Polish seaside, once again, was Świnoujście. Completely deserved, because for years it has been considered one of the cleanest and warmest in the country - in the season the water temperature reaches even 26 degrees.",
                    "53.92274786253203",
                    "14.261116469196226",
                    "beach",
                    "medium",
                    "crowded",
                    "https://i.ibb.co/BzTQ9Yj/day-background.jpg"])
                db.run(insert, [
                    "Kołobrzeg",
                    "one of the most popular beaches during the tourist season.",
                    "In Kołobrzeg, on the beach you can rent beach baskets, deckchairs and other utensils that make sunbathing more pleasant. There are many attractions for children - excess energy can be discharged on inflatable toys: trampolines, slides, etc.",
                    "54.187919728460784",
                    "15.593752401620906",
                    "beach",
                    "high",
                    "crowded",
                    "https://i.ibb.co/BzTQ9Yj/day-background.jpg"])
                db.run(insert, [
                    "Malbork",
                    "Castle in Malbork",
                    "It is the largest preserved medieval castle in Europe. The three-section defensive fortress in the Gothic style consists of the Low Castle, the Middle Castle and the High Castle.",
                    "54.03983963631113",
                    "19.028021402094723",
                    "castle",
                    "medium",
                    "crowded",
                    "https://i.ibb.co/BzTQ9Yj/day-background.jpg"])
                db.run(insert, [
                    "Wawel",
                    "Castle in Cracow",
                    "For centuries, Wawel was the seat of Polish kings. Currently, it is a symbol of statehood and one of the most important museums in Poland. More than a million tourists visit it every year.",
                    "50.053830234905305",
                    "19.93471030013709",
                    "castle",
                    "low",
                    "crowded",
                    "https://i.ibb.co/BzTQ9Yj/day-background.jpg"])
                db.run(insert, [
                    "Książ",
                    "Castle in Wałbrzych",
                    "Książ castle is often called the pearl of Lower Silesia or the Fairytale castle. These expressions do not come out of thin air, it is the biggest castle in the region, built on a rock cliff and beautifully surrounded by the forest.",
                    "50.842315644878674",
                    "16.29181418267564",
                    "castle",
                    "high",
                    "moderate",
                    "https://i.ibb.co/BzTQ9Yj/day-background.jpg"])
                
                db.run(insert, [
                    "Gubałówka",
                    "Gubałówka is a peak towering over Zakopane",
                    "Due to the possibility of going up by funicular railway, Gubałówka is the most frequently visited peak of the Tatra Mountains. A great attraction for children are bobsleigh, i.e. a gravitational slide, and adults will certainly appreciate the beauty of the panorama stretching from the top.",
                    "49.30771809972189",
                    "19.93700682809742",
                    "mountain",
                    "medium",
                    "crowded",
                    "https://i.ibb.co/BzTQ9Yj/day-background.jpg"])
                db.run(insert, [
                    "Krościenko nad Dunajcem",
                    "It is one of the most famous tourist and summer resorts.",
                    "Pieniny is a place worth visiting at any time of the year. In spring, summer and autumn, it impresses with beautiful views, and in winter it additionally provides attractions in the form of ski slopes. Therefore, when visiting the Pieniny Mountains, it is worth staying in a guest house adapted to the conditions in the mountains.",
                    "49.4410976673669",
                    "20.427335577793727",
                    "mountain",
                    "high",
                    "moderate",
                    "https://i.ibb.co/BzTQ9Yj/day-background.jpg"])
                db.run(insert, [
                    "Ustrzyki Górne",
                    "It is a small settlement at the mouth of the Terebowiec stream to Wołosatka, located on the route of the Bieszczady bypass",
                    "The Bieszczady Mountains are an extremely extensive and attractive mountain range, which is part of the Eastern Carpathians. They lie between Poland, Slovakia and Ukraine. Many people consider the Bieszczady Mountains to be the most beautiful mountains in Poland, because the views are breathtaking even for the most experienced travelers.",
                    "49.27715597963902",
                    "22.52253677700643",
                    "mountain",
                    "high",
                    "moderate",
                    "https://i.ibb.co/BzTQ9Yj/day-background.jpg"])

                db.run(insert, [
                    "Biebrzański Park Narodowy",
                    "The largest national park in Poland, and is located in the north-eastern part of the country, in the Podlaskie Voivodeship.",
                    "It has existed since 1993 and offers tourists wonderful, untouched nature and a peaceful holiday away from cities and crowds. They have not heard of crowds here, but there are a lot of places where it is difficult to find other tourists at all",
                    "53.49694950438412",
                    "22.7532055229156",
                    "park",
                    "low",
                    "less crowded",
                    "https://i.ibb.co/BzTQ9Yj/day-background.jpg"])
                db.run(insert, [
                    "Słowiński Park Narodowy",
                    "short description",
                    "The Słowiński National Park is particularly famous for its shifting dunes stretching between Rowy and Łeba. The most popular are Wydma Czołpińska and Wydma Łącka. The Czołpińska Dune can be reached from the village of Czołpino, following the red trail.",
                    "53.49622488349215",
                    "22.751448626534412",
                    "park",
                    "low",
                    "less crowded",
                    "https://i.ibb.co/BzTQ9Yj/day-background.jpg"])
                db.run(insert, [
                    "Białowieski Park Narodowy",
                    "short description",
                    "The park covers part of the Białowieża Forest, which is the only lowland forest in Europe preserved in a natural state. The largest area of ​​the park is occupied by oak-lime-hornbeam forests of the oak-hornbeam type. The deciduous trees are dominated by oaks, hornbeams, maples, ashes and alders, while the coniferous trees are dominated by pines and spruces.",
                    "52.710368734310116",
                    "23.847813122589777",
                    "park",
                    "low",
                    "less crowded",
                    "https://i.ibb.co/BzTQ9Yj/day-background.jpg"])

                console.log("Successfully inserted into 'places' table")
        
            }
        }); 
        db.run(`CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            password TEXT 
        )`, (err) => {
            if (err) {
                // Table already created
                console.log("Table 'users' already exists")
            } else {
                var insertAdmin = 'INSERT INTO users (username, password) VALUES (?,?)'
                db.run(insertAdmin, [
                    "admin",
                    "$2a$10$J5kFP4DPsdXGXMfdXF4iyu.nvAmowlvKQCRcWklx5CwAUpnfFeNom"
                ])
                console.log("Successfully created 'users' table and inserted admin record")
            }
        });   

        db.run(`CREATE TABLE opinions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            content TEXT,
            user_name TEXT,
            user_id INTEGER,
            place_id INTEGER
        )`, (err) => {
            if (err) {
                // Table already created
                console.log("Table 'opinions' already exists")
                // console.log(err)
            } else {
                console.log("Successfully created 'opinions' table")
            }
        });
    }
});


module.exports = db