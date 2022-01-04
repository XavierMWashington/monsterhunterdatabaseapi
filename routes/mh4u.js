const express = require('express')
const router = express.Router()
const bootScraper = require('../jsfiles/bootstrapScraper')
const { fork } = require('child_process')


const monsters = []

router.get('/', async (req, res) => {
    await bootScraper.scraper("MH4U:_Monsters", monsters, "Felyne")
    await bootScraper.scraper("MH4U:_Monsters", monsters, "Ukanlos")
    res.json(monsters)
    console.log("DING!! :D")  
    
})

router.get('/smallmonsters', async (req, res) => {

    await bootScraper.scraper("MH4U:_Monsters", monsters, "Felyne")
    res.json(monsters)
    console.log("DING!! :D")  
})

router.get('/largemonsters', async (req, res) => {

    await bootScraper.scraper("MH4U:_Monsters", monsters, "Ukanlos")
    res.json(monsters)
    console.log("DING!! :D")
    
})

module.exports = router