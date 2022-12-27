const express = require('express')
const mongoose = require('mongoose')
const app = express();
var cors = require('cors')
require('dotenv/config');


app.use(cors())
mongoose.connect(process.env.DB_URL)
const characterSchema = new mongoose.Schema({});
const housesSchema = new mongoose.Schema({});

const getCharacters = async () => {
    const character = mongoose.model('characters', characterSchema, 'characters')
    const data = await character.find();
    // console.warn(data);
    return data
    
}


const getHouses = async () => {
    const houses = mongoose.model('houses', housesSchema, 'houses')
    const data = await houses.find();
    // console.warn(data);
    return data
}

const getHouse = async (id) => {
    const houses = mongoose.model('houses', housesSchema, 'houses')
    const data = await houses.findById(id);
    // console.warn(data);
    return data
}

app.get('/characters', async (req, res) => {
    let characters = await getCharacters()
    res.send(JSON.stringify(characters))
})


app.get('/houses', async (req, res) => {
    let houses = await getHouses()
    res.send(JSON.stringify(houses))
})

app.get('/houses/:houseId', async (req, res) => {
    let houseId = req.params.houseId
    let houses = await getHouse(houseId)
    res.send(JSON.stringify(houses))
})


app.listen(5000);