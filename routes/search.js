const express = require('express')
const router = express.Router()
const { searchScraper } = require('../jsfiles/searchScraper')
const { formatAndMessenger } = require('../jsfiles/pingAndFormat')
//const { fork } = require('child_process')

const monsters = []


router.get("/", async (req, res) => {
    let monsterName = req.query.id
    await searchScraper(monsterName, monsters)
    formatAndMessenger(monsters, res)
})

module.exports = router