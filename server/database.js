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
                    "https://ocdn.eu/pulscms-transforms/1/VEnk9kpTURBXy9hZmZmNGU1ODBjZmI5NGI4YTRmZWZlNjIxMTNjMzgzYy5qcGeTlQPNAe4AzRvHzQ-gkwmmNjIyNDAwBpMFzQSwzQJ23gABoTAB/wroclaw.jpg"
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
                    "https://warsawtour.pl/wp-content/uploads/2023/03/Panorama-Warszawy-z-Widok-Towers-fot.-Filip-Kwiatkowski-1.jpg"])
                db.run(insert, [
                    "Gdańsk",
                    "This is a city in the northern part of Poland",
                    "Gdańsk itself is a charming city, and if you add to this the proximity of the sea, you can truly be enchanted. The famous fountain with Neptune, the amazing Artus Court or the impressive Town Hall are just examples of places that you must see when visiting Gdańsk.",
                    "54.35125588350789",
                    "18.646080185092636",
                    "city",
                    "high",
                    "moderate",
                    "https://pomorskie.travel/wp-content/uploads/2021/03/Gdansk-i-jego-atrakcje-fot.-M.Ochocki-Pomorskie.Travel-4.jpg"])

                db.run(insert, [
                    "Hel",
                    "Hel is full of beautiful beaches attracting millions of tourists.",
                    "Due to the weather conditions - strong wind, high waves and, according to the Travelist magazine, over 70 sunny days a year - the beach is most often visited by lovers of water fun. Interestingly, the beach on Hel, as the only one from Poland, was included in the prestigious European Best Destinations ranking, taking 10th place.",
                    "54.60832188018254",
                    "18.800735916994903",
                    "beach",
                    "low",
                    "crowded",
                    "https://blog.noclegi.pl/wp-content/uploads/Hel-atrakcje-%E2%80%93-TOP-8.-miejsc-kt%C3%B3re-warto-zobaczy%C4%87.jpg"])
                db.run(insert, [
                    "Świnoujście",
                    "The beach is among the cleanest and warmest in the country",
                    "The winner of the ranking for the most beautiful beach at the Polish seaside, once again, was Świnoujście. Completely deserved, because for years it has been considered one of the cleanest and warmest in the country - in the season the water temperature reaches even 26 degrees.",
                    "53.92274786253203",
                    "14.261116469196226",
                    "beach",
                    "medium",
                    "crowded",
                    "https://iswinoujscie.pl/im/artykuly/75892_03082022.jpg"])
                db.run(insert, [
                    "Kołobrzeg",
                    "one of the most popular beaches during the tourist season.",
                    "In Kołobrzeg, on the beach you can rent beach baskets, deckchairs and other utensils that make sunbathing more pleasant. There are many attractions for children - excess energy can be discharged on inflatable toys: trampolines, slides, etc.",
                    "54.187919728460784",
                    "15.593752401620906",
                    "beach",
                    "high",
                    "crowded",
                    "https://ocdn.eu/pulscms-transforms/1/1NSk9kpTURBXy9iZTQyMDRkNGQ3YzlmYTg1NTBkYjJmNWJhOWI4MTBjZS5qcGeTlQMDAM0VUc0L_pMJpjFjYTc5MQaTBc0EsM0Cdt4AAaEwAQ/kolobrzeg-i-okolice-ciekawostki-zwiedzanie-historia-co-zobaczyc-przewodnik.jpg"])
                db.run(insert, [
                    "Malbork",
                    "Castle in Malbork",
                    "It is the largest preserved medieval castle in Europe. The three-section defensive fortress in the Gothic style consists of the Low Castle, the Middle Castle and the High Castle.",
                    "54.03983963631113",
                    "19.028021402094723",
                    "castle",
                    "medium",
                    "crowded",
                    "https://przekraczajacgranice.pl/wp-content/uploads/2022/08/zamek-w-malborku-1.jpg"])
                db.run(insert, [
                    "Wawel",
                    "Castle in Cracow",
                    "For centuries, Wawel was the seat of Polish kings. Currently, it is a symbol of statehood and one of the most important museums in Poland. More than a million tourists visit it every year.",
                    "50.053830234905305",
                    "19.93471030013709",
                    "castle",
                    "low",
                    "crowded",
                    "https://ocdn.eu/pulscms-transforms/1/_5Bk9kpTURBXy9mYzlmYjJmZDc3Yjc2ZGZkZWRlMmNiNmM0YmFhZGExOC5qcGeTlQMAzKrNFVjNDAGVAs0EsADDw5MJpjEzOGMwMAbeAAGhMAE/zamek-krolewski-na-wawelu-krakow.jpeg"])
                db.run(insert, [
                    "Książ",
                    "Castle in Wałbrzych",
                    "Książ castle is often called the pearl of Lower Silesia or the Fairytale castle. These expressions do not come out of thin air, it is the biggest castle in the region, built on a rock cliff and beautifully surrounded by the forest.",
                    "50.842315644878674",
                    "16.29181418267564",
                    "castle",
                    "high",
                    "moderate",
                    "https://images.zwierciadlo.pl/_resource/res/path/8a/0e/8a0ebfe6-802f-453d-b232-1a98a08b62a2_f750x750"])
                
                db.run(insert, [
                    "Gubałówka",
                    "Gubałówka is a peak towering over Zakopane",
                    "Due to the possibility of going up by funicular railway, Gubałówka is the most frequently visited peak of the Tatra Mountains. A great attraction for children are bobsleigh, i.e. a gravitational slide, and adults will certainly appreciate the beauty of the panorama stretching from the top.",
                    "49.30771809972189",
                    "19.93700682809742",
                    "mountain",
                    "medium",
                    "crowded",
                    "https://www.goralpoleca.pl/blog/wp-content/uploads/2019/09/20121009_AB4_2376-1.jpg"])
                db.run(insert, [
                    "Krościenko nad Dunajcem",
                    "It is one of the most famous tourist and summer resorts.",
                    "Pieniny is a place worth visiting at any time of the year. In spring, summer and autumn, it impresses with beautiful views, and in winter it additionally provides attractions in the form of ski slopes. Therefore, when visiting the Pieniny Mountains, it is worth staying in a guest house adapted to the conditions in the mountains.",
                    "49.4410976673669",
                    "20.427335577793727",
                    "mountain",
                    "high",
                    "moderate",
                    "https://visitmalopolska.pl/documents/20194/1657207/Widok+z+lotu+ptakaKro%C5%9Bcienko+nad+Dunajcem/9046b281-627d-4ebc-9e07-53d9a1bae09e?t=1638308563891&imageThumbnail=5"])
                db.run(insert, [
                    "Ustrzyki Górne",
                    "It is a small settlement at the mouth of the Terebowiec stream to Wołosatka, located on the route of the Bieszczady bypass",
                    "The Bieszczady Mountains are an extremely extensive and attractive mountain range, which is part of the Eastern Carpathians. They lie between Poland, Slovakia and Ukraine. Many people consider the Bieszczady Mountains to be the most beautiful mountains in Poland, because the views are breathtaking even for the most experienced travelers.",
                    "49.27715597963902",
                    "22.52253677700643",
                    "mountain",
                    "high",
                    "moderate",
                    "https://www.bieszczady.net.pl/wp-content/uploads/2019/05/DSC01375-750x450.jpg"])

                db.run(insert, [
                    "Biebrzański Park Narodowy",
                    "The largest national park in Poland, and is located in the north-eastern part of the country, in the Podlaskie Voivodeship.",
                    "It has existed since 1993 and offers tourists wonderful, untouched nature and a peaceful holiday away from cities and crowds. They have not heard of crowds here, but there are a lot of places where it is difficult to find other tourists at all",
                    "53.49694950438412",
                    "22.7532055229156",
                    "national park",
                    "low",
                    "less crowded",
                    "https://zaciszezieloneogrody.pl/wp-content/uploads/2020/03/Biebrzan%CC%81ski-Park-Narodowy.jpeg"])
                db.run(insert, [
                    "Słowiński Park Narodowy",
                    "short description",
                    "The Słowiński National Park is particularly famous for its shifting dunes stretching between Rowy and Łeba. The most popular are Wydma Czołpińska and Wydma Łącka. The Czołpińska Dune can be reached from the village of Czołpino, following the red trail.",
                    "53.49622488349215",
                    "22.751448626534412",
                    "national park",
                    "low",
                    "less crowded",
                    "https://www.polska.travel/wp-content/uploads/2022/12/wydmy_slowinski_pn_1170-2.jpg"])
                db.run(insert, [
                    "Białowieski Park Narodowy",
                    "short description",
                    "The park covers part of the Białowieża Forest, which is the only lowland forest in Europe preserved in a natural state. The largest area of ​​the park is occupied by oak-lime-hornbeam forests of the oak-hornbeam type. The deciduous trees are dominated by oaks, hornbeams, maples, ashes and alders, while the coniferous trees are dominated by pines and spruces.",
                    "52.710368734310116",
                    "23.847813122589777",
                    "national park",
                    "low",
                    "less crowded",
                    "https://podrozesylvia.pl/wp-content/uploads/2021/03/Bialowieza.jpg"])
                db.run(insert, [
                    "Energylandia",
                    "Energylandia is the largest amusement park in the country, at 70 hectares.",
                    "Energylandia is an amusement park located in Zator, Lesser Poland, in southern Poland. It is approximately 50 kilometres away from Kraków and 335 kilometres away from Warsaw, Poland's capital city. Energylandia is the largest amusement park in the country, at 70 hectares.",
                    "49.99954061672213",
                    "19.41131362648161",
                    "amusement park",
                    "high",
                    "crowded",
                    "https://lh3.googleusercontent.com/p/AF1QipMWx6Y5MdMF9nyWDV5Lf0_hb7F64L3Cbw9KelHY=s680-w680-h510"])  
                db.run(insert, [
                    "Zatorland Amusement Park",
                    "Theme park with animatronic dinosaurs, giant insects, mythical creatures & classic funfair rides.",
                    "Energylandia is an amusement park located in Zator, Lesser Poland, in southern Poland. It is approximately 50 kilometres away from Kraków and 335 kilometres away from Warsaw, Poland's capital city. Energylandia is the largest amusement park in the country, at 70 hectares.",
                    "49.988715370753674",
                    "19.441994710258086",
                    "amusement park",
                    "medium",
                    "crowded",
                    "https://lh3.googleusercontent.com/p/AF1QipMN0wLbGXnKKZ-f87ThDL_fmbLU_OpwgesP1VUj=s680-w680-h510"])
                db.run(insert, [
                    "Legendia Silesian Amusement Park",
                    "Legendia is an amusement park located within Silesian Park in the center of the Upper Silesian Metropolitan Union, Silesia, Poland. It has an area of 26 ha. In 2008, the park saw 253,000 visitors.",
                    "Energylandia is an amusement park located in Zator, Lesser Poland, in southern Poland. It is approximately 50 kilometres away from Kraków and 335 kilometres away from Warsaw, Poland's capital city. Energylandia is the largest amusement park in the country, at 70 hectares.",
                    "50.27340111387848",
                    "18.991439192556975",
                    "amusement park",
                    "medium",
                    "crowded",
                    "https://lh3.googleusercontent.com/p/AF1QipMDCbFJhKKHphpW0vevElgJj0V2GS4GC2TxyIWA=s680-w680-h510"])
                db.run(insert, [
                    "Aquapark Kalisz",
                    "Water park with slides & leisure pools, 25m swimming pool, ice rink, sauna zone & fitness classes.",
                    "Energylandia is an amusement park located in Zator, Lesser Poland, in southern Poland. It is approximately 50 kilometres away from Kraków and 335 kilometres away from Warsaw, Poland's capital city. Energylandia is the largest amusement park in the country, at 70 hectares.",
                    "51.75678154681491",
                    "18.102074581236643",
                    "aqua park",
                    "low",
                    "crowded",
                    "https://lh3.googleusercontent.com/p/AF1QipMssHQIWNt04R36YVKZDL33koOH7Ob-iUQCBmkN=s680-w680-h510"])
                db.run(insert, [
                    "Termy Maltańskie",
                    "Sprawling aquatic complex with 15+ indoor & outdoor pools, water slides, a lazy river, saunas & spa",
                    "Energylandia is an amusement park located in Zator, Lesser Poland, in southern Poland. It is approximately 50 kilometres away from Kraków and 335 kilometres away from Warsaw, Poland's capital city. Energylandia is the largest amusement park in the country, at 70 hectares.",
                    "52.40578293295723",
                    "16.973907306411963",
                    "aqua park",
                    "medium",
                    "crowded",
                    "https://www.dzieckowpodrozy.pl/wp-content/uploads/Aquapark-poznan-atrakcje-dla-dzieci.jpg"])    
                db.run(insert, [
                    "Aqua Lublin",
                    "Saunas with colored lights & music, whirlpool baths & indoor swimming in an Olympic-sized pool.",
                    "Energylandia is an amusement park located in Zator, Lesser Poland, in southern Poland. It is approximately 50 kilometres away from Kraków and 335 kilometres away from Warsaw, Poland's capital city. Energylandia is the largest amusement park in the country, at 70 hectares.",
                    "51.23682254941263",
                    "22.568992780015066",
                    "aqua park",
                    "medium",
                    "crowded",
                    "https://lh3.googleusercontent.com/p/AF1QipOdvpRpYZ7wqcZwuhknh8UcmpBEs3ex6I5KgXXT=s680-w680-h510"])       


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