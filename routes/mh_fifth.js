const express = require('express')
const router = express.Router()
const bootScraper = require('../jsfiles/bootstrapScraper')
const { formatAndMessenger } = require('../jsfiles/pingAndFormat')
const { searchScraper } = require('../jsfiles/searchScraper')

//let imageUrl = ''


router.get('/', async (req, res) => {
    await bootScraper.scraper("Fifth_Generation", global.fatherMonsterArray, "Izuchi")
    await bootScraper.scraper("Fifth_Generation", global.fatherMonsterArray, "Jyuratodus")
    formatAndMessenger(global.fatherMonsterArray, res)
})

router.get('/smallmonsters', async (req, res) => {

    await bootScraper.scraper("Fifth_Generation", global.fatherMonsterArray, "Izuchi")
    formatAndMessenger(global.fatherMonsterArray, res)

})

router.get('/largemonsters', async (req, res) => {

    await bootScraper.scraper("Fifth_Generation", global.fatherMonsterArray, "Jyuratodus")
    formatAndMessenger(global.fatherMonsterArray, res)
    
})

router.get("/search/", async (req, res) => {
    const monsterName = req.query.name
    await searchScraper(monsterName, global.fatherMonsterArray, ["Fifth_Generation"])
    formatAndMessenger(global.fatherMonsterArray, res)
})


module.exports = router

