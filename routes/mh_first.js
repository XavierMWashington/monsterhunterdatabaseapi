const express = require('express')
const router = express.Router()
const bootScraper = require('../jsfiles/bootstrapScraper')
const { formatAndMessenger } = require('../jsfiles/pingAndFormat')
const { searchScraper } = require('../jsfiles/searchScraper')

const monsters = []

//let imageUrl = ''


router.get('/', async (req, res) => {
    await bootScraper.scraper("First_Generation", monsters, "Velociprey")
    await bootScraper.scraper("First_Generation", monsters, "Velocidrome")
    formatAndMessenger(monsters, res)
})

router.get('/smallmonsters', async (req, res) => {

    await bootScraper.scraper("First_Generation", monsters, "Velociprey")
    formatAndMessenger(monsters, res)

})

router.get('/largemonsters', async (req, res) => {

    await bootScraper.scraper("First_Generation", monsters, "Velocidrome")
    formatAndMessenger(monsters, res)
    
})

router.get("/search/", async (req, res) => {
    monsterName = req.query.id
    await searchScraper(monsterName, monsters, ["First_Generation"])
    formatAndMessenger(monsters, res)
})

module.exports = router

