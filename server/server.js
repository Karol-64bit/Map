const express = require('express')
const app = express()

const data = [
    {
      "id": 1,
      "name": "rzeszów",
      "description": "to jest miasto",
      "description_longer": "dasdas sdasd asdas adsd",
      "lon": "10",
      "lag": "180",
      "category": {
        "castle": "true",
        "beach": "false",
        "city": "true"
      }
    },
    {
      "id": 2,
      "name": "warszawa",
      "description": "to jest stolica",
      "description_longer": "lorem ipsum dolor sit amet",
      "lon": "20",
      "lag": "250",
      "category": {
        "castle": "false",
        "beach": "false",
        "city": "true"
      }
    },
    {
      "id": 3,
      "name": "kraków",
      "description": "to jest miasto królewskie",
      "description_longer": "consectetur adipiscing elit",
      "lon": "15",
      "lag": "220",
      "category": {
        "castle": "true",
        "beach": "false",
        "city": "true"
      }
    }
  ];


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Zastąp * adresem Twojej aplikacji front-end
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.get('/api', (req, res) => {
    res.json(data);
})


app.listen(5000, () => { console.log('listening on 5000'); });


// nazwa, wpółrzędne, opis, kategoria, 

