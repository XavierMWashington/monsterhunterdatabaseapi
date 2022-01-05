const express = require('express')
const router = express.Router()
const standardScraper = require('../jsfiles/standardScraper')
const { fork } = require('child_process')

const monsters = []


router.get('/', async (req, res) => {

    await standardScraper.scraper("MH3U:_Monsters", monsters, "0")
    await standardScraper.scraper("MH3U:_Monsters", monsters, "1")

    
    let activated = true

    res.write('[{"placeholderPingData": "delete this object after download"')
    setInterval(() => {
        if(activated) {
            res.write(',"placeholderPingData": "delete this object after download"')
            console.log("Metro")
        }
        // metronome = 10000
    }, 5000)

    const childProcess = fork('./jsfiles/generalScrapingFunctions')
    childProcess.send({"monsterArray": monsters})
    childProcess.on("message", message => {
        res.write("},")
        res.write(JSON.stringify(message).substring(1))
        activated = false
        console.log("Ding!")
        res.end()
    })
    
})

router.get('/smallmonsters', async (req, res) => {

    await standardScraper.scraper("MH3U:_Monsters", monsters, "0")

    let activated = true

    res.write('[{"placeholderPingData": "delete this object after download"')
    setInterval(() => {
        if(activated) {
            res.write(',"placeholderPingData": "delete this object after download"')
            console.log("Metro")
        }
        // metronome = 10000
    }, 5000)

    const childProcess = fork('./jsfiles/generalScrapingFunctions')
    childProcess.send({"monsterArray": monsters})
    childProcess.on("message", message => {
        res.write("},")
        res.write(JSON.stringify(message).substring(1))
        activated = false
        console.log("Ding!")
        res.end()
    })
    
})

router.get('/largemonsters', async (req, res) => {

    await standardScraper.scraper("MH3U:_Monsters", monsters, "1")

    let activated = true

    res.write('[{"placeholderPingData": "delete this object after download"')
    setInterval(() => {
        if(activated) {
            res.write(',"placeholderPingData": "delete this object after download"')
            console.log("Metro")
        }
        // metronome = 10000
    }, 5000)

    const childProcess = fork('./jsfiles/generalScrapingFunctions')
    childProcess.send({"monsterArray": monsters})
    childProcess.on("message", message => {
        res.write("},")
        res.write(JSON.stringify(message).substring(1))
        activated = false
        console.log("Ding!")
        res.end()
    })
})

module.exports = router

