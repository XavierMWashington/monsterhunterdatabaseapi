const express = require('express')
const router = express.Router()
const bootScraper = require('../jsfiles/bootstrapScraper')


const monsters = []

router.get('/', async (req, res) => {
    await bootScraper.scraper("Second_Generation", monsters, "Shakalaka")
    await bootScraper.scraper("Second_Generation", monsters, "Ukanlos")
    formatAndMessenger(monsters, res)
   
})

router.get('/smallmonsters', async (req, res) => {

    await bootScraper.scraper("Second_Generation", monsters, "Shakalaka")
    formatAndMessenger(monsters, res)

})

router.get('/largemonsters', async (req, res) => {

    await bootScraper.scraper("Second_Generation", monsters, "Ukanlos")
    formatAndMessenger(monsters, res)
    
})

module.exports = router