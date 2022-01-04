const express = require('express')
const router = express.Router()
const bootScraper = require('../jsfiles/bootstrapScraper')
const { fork } = require('child_process')


const monsters = []

router.get('/', async (req, res) => {
    await bootScraper.scraper("Second_Generation", monsters, "Felyne")
    await bootScraper.scraper("Second_Generation", monsters, "Ukanlos")
    res.json(monsters)
    console.log("DING!! :D")  
    
})

router.get('/smallmonsters', async (req, res) => {

    await bootScraper.scraper("Second_Generation", monsters, "Shakalaka")
    res.json(monsters)
    console.log("DING!! :D")  
})

router.get('/largemonsters', async (req, res) => {

    await bootScraper.scraper("Second_Generation", monsters, "Ukanlos")
    res.json(monsters)
    console.log("DING!! :D")
    
})

module.exports = router