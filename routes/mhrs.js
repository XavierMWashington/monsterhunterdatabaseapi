const express = require('express')
const router = express.Router()
const standardScraper = require('../jsfiles/standardScraper')

const monsters = []


router.get('/', async (req, res) => {

    await standardScraper.scraper("MHRS:_Monsters", monsters, "0")
    await standardScraper.scraper("MHRS:_Monsters", monsters, "1")
    res.json(monsters)
    console.log("DING!! :D")
    
})

router.get('/smallmonsters', async (req, res) => {

    await standardScraper.scraper("MHRS:_Monsters", monsters, "0")
    res.json(monsters)
    console.log("DING!! :D")
    
})

router.get('/largemonsters', async (req, res) => {

    await standardScraper.scraper("MHRS:_Monsters", monsters, "1")
    res.json(monsters)
    console.log("DING!! :D")
})

module.exports = router