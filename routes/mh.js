const express = require('express')
const router = express.Router()
const bootScraper = require('../jsfiles/bootstrapScraper')
const { formatAndMessenger } = require('../jsfiles/pingAndFormat')
//const { fork } = require('child_process')

const monsters = []

//let imageUrl = ''


router.get('/', async (req, res) => {
    await bootScraper.scraper("First Generation", monsters, "Velociprey")
    await bootScraper.scraper("First Generation", monsters, "Velocidrome")
    formatAndMessenger(monsters, res)
})

router.get('/smallmonsters', async (req, res) => {

    await bootScraper.scraper("First Generation", monsters, "Velociprey")
    formatAndMessenger(monsters, res)

})

router.get('/largemonsters', async (req, res) => {

    await bootScraper.scraper("First Generation", monsters, "Velocidrome")
    formatAndMessenger(monsters, res)
    
})

module.exports = router

