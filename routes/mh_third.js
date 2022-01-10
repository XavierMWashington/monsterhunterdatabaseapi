const express = require('express')
const router = express.Router()
const bootScraper = require('../jsfiles/bootstrapScraper')
const { formatAndMessenger } = require('../jsfiles/pingAndFormat')
const { searchScraper } = require('../jsfiles/searchScraper')

//let imageUrl = ''


router.get('/', async (req, res) => {
    await bootScraper.scraper("Third_Generation", global.fatherMonsterArray, "Jaggi")
    await bootScraper.scraper("Third_Generation", global.fatherMonsterArray, "Ceadeus")
    formatAndMessenger(global.fatherMonsterArray, res)
})

router.get('/smallmonsters', async (req, res) => {

    await bootScraper.scraper("Third_Generation", global.fatherMonsterArray, "Jaggi")
    formatAndMessenger(global.fatherMonsterArray, res)

})

router.get('/largemonsters', async (req, res) => {

    await bootScraper.scraper("Third_Generation", global.fatherMonsterArray, "Ceadeus")
    formatAndMessenger(global.fatherMonsterArray, res)
    
})

router.get("/search/", async (req, res) => {
    const monsterName = req.query.id
    await searchScraper(monsterName, global.fatherMonsterArray, ["Third_Generation"])
    formatAndMessenger(global.fatherMonsterArray, res)
})


module.exports = router

