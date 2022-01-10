const express = require('express')
const router = express.Router()
const { searchScraper } = require('../jsfiles/searchScraper')
const { formatAndMessenger } = require('../jsfiles/pingAndFormat')
const generations = ["First_Generation", "Second_Generation", "Third_Generation", "Fourth_Generation", "Fifth_Generation"]


const monsters = []


router.get("/", async (req, res) => {
    let monsterName = req.query.id
    await searchScraper(monsterName, monsters, generations)
    formatAndMessenger(monsters, res)
})

module.exports = router