const express = require('express')
const router = express.Router()
const bootScraper = require('../jsfiles/bootstrapScraper')
const { searchScraper } = require('../jsfiles/searchScraper')


router.get('/', async (req, res) => {
    await bootScraper.scraper("Second_Generation", global.fatherMonsterArray, "Shakalaka")
    await bootScraper.scraper("Second_Generation", global.fatherMonsterArray, "Ukanlos")
    formatAndMessenger(global.fatherMonsterArray, res)
   
})

router.get('/smallmonsters', async (req, res) => {

    await bootScraper.scraper("Second_Generation", global.fatherMonsterArray, "Shakalaka")
    formatAndMessenger(global.fatherMonsterArray, res)

})

router.get('/largemonsters', async (req, res) => {

    await bootScraper.scraper("Second_Generation", global.fatherMonsterArray, "Ukanlos")
    formatAndMessenger(global.fatherMonsterArray, res)
    
})

router.get("/search", async (req, res) => {
    const monsterName = req.query.id
    await searchScraper(monsterName, global.fatherMonsterArray, ["Second_Generation"])
    formatAndMessenger(global.fatherMonsterArray, res)
})


module.exports = router