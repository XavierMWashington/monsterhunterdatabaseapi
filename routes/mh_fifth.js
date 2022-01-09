const express = require('express')
const router = express.Router()
const bootScraper = require('../jsfiles/bootstrapScraper')
const { formatAndMessenger } = require('../jsfiles/pingAndFormat')
//const { fork } = require('child_process')

const monsters = []

//let imageUrl = ''


router.get('/', async (req, res) => {
    await bootScraper.scraper("Fifth_Generation", monsters, "Izuchi")
    await bootScraper.scraper("Fifth_Generation", monsters, "Jyuratodus")
    formatAndMessenger(monsters, res)
})

router.get('/smallmonsters', async (req, res) => {

    await bootScraper.scraper("Fifth_Generation", monsters, "Izuchi")
    formatAndMessenger(monsters, res)

})

router.get('/largemonsters', async (req, res) => {

    await bootScraper.scraper("Fifth_Generation", monsters, "Jyuratodus")
    formatAndMessenger(monsters, res)
    
})

module.exports = router

