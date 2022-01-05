const express = require('express')
const router = express.Router()
const standardScraper = require('../jsfiles/standardScraper')

const monsters = []


router.get('/', async (req, res) => {

    await standardScraper.scraper("MHWI:_Monsters", monsters, "0")
    await standardScraper.scraper("MHWI:_Monsters", monsters, "1")
    formatAndMessenger(monsters, res)
    
})

router.get('/smallmonsters', async (req, res) => {

    await standardScraper.scraper("MHWI:_Monsters", monsters, "0")
    formatAndMessenger(monsters, res)
    
})

router.get('/largemonsters', async (req, res) => {

    await standardScraper.scraper("MHWI:_Monsters", monsters, "1")
    formatAndMessenger(monsters, res)

})

module.exports = router