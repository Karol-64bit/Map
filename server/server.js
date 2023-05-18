const express = require('express')
const app = express()

app.get('/api', (req, res) => {
    res.json({"locations": ["locationOne", "locationTwo", "locationThree"]});
})


app.listen(5000, () => { console.log('listening on 5000'); });


// nazwa, wpółrzędne, opis, kategoria, 

