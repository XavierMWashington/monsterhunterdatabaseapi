const express = require('express')
const router = express.Router()
const bootScraper = require('../jsfiles/bootstrapScraper')
const { fork } = require('child_process')

const monsters = []

//let imageUrl = ''


router.get('/', async (req, res) => {
    await bootScraper.scraper("First Generation", monsters, "Velociprey")
    await bootScraper.scraper("First Generation", monsters, "Velocidrome")
    res.json(monsters)
    console.log("DING!! :D")  
    
})

router.get('/smallmonsters', async (req, res) => {

    await bootScraper.scraper("First Generation", monsters, "Velociprey")

    const childProcess = fork('./jsfiles/generalScrapingFunctions')
    childProcess.send({"monsterArray": monsters, "clientResponse": res})
    childProcess.on("message", message => {
        res.write(JSON.stringify(message))
        res.end(message)
    })

    console.log("DING!! :D")  
    res.write("Loading Content")
})

router.get('/largemonsters', async (req, res) => {

    await bootScraper.scraper("First Generation", monsters, "Velocidrome")
    res.json(monsters)
    console.log("DING!! :D")
    
})

module.exports = router

