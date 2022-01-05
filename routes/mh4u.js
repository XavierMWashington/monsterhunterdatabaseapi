const express = require('express')
const router = express.Router()
const bootScraper = require('../jsfiles/bootstrapScraper')

const monsters = []

router.get('/', async (req, res) => {
    await bootScraper.scraper("MH4U:_Monsters", monsters, "Felyne")
    await bootScraper.scraper("MH4U:_Monsters", monsters, "Ukanlos")
    formatAndMessenger(monsters, res)
    
})

router.get('/smallmonsters', async (req, res) => {

    await bootScraper.scraper("MH4U:_Monsters", monsters, "Felyne")
    formatAndMessenger(monsters, res)
 
})

router.get('/largemonsters', async (req, res) => {

    await bootScraper.scraper("MH4U:_Monsters", monsters, "Ukanlos")
    formatAndMessenger(monsters, res)

    
})

module.exports = router