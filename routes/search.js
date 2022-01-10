const express = require('express')
const router = express.Router()
const { searchScraper } = require('../jsfiles/searchScraper')
const { formatAndMessenger } = require('../jsfiles/pingAndFormat')
const generations = ["First_Generation", "Second_Generation", "Third_Generation", "Fourth_Generation", "Fifth_Generation"]



router.get("/", async (req, res) => {
    const monsterName = req.query.name
    await searchScraper(monsterName, global.fatherMonsterArray, generations)
    formatAndMessenger(global.fatherMonsterArray, res)
})

module.exports = router