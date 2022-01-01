const express = require('express')
const router = express.Router()
const axios = require('axios') //allows for immediate html interaction
const cheerio = require('cheerio') //allows for webscraping
const scrapper = require('../jsfiles/scrappingFunctions')

const monsters = []


let html = ''
let $ = ''
let url = ''

//let imageUrl = ''


router.get('/', async (req, res) => {

    await axios.get('https://monsterhunter.fandom.com/wiki/First_Generation')
        .then((responses) => {

            //---load all monsters---

            html = responses.data
            $ = cheerio.load(html)

            $('tbody tr td a ', html).each(function() {
                const name = $(this).text().trim()
                url = 'https://monsterhunter.fandom.com' + $(this).attr('href')
                if(!gatheredNames.includes(name) && gatheredNames.length > 0){               
                     monsters.push({
                        name, 
                        url//,
                        //imageUrl
                    })
                }
            
                //imageUrl = $(this).find('img').attr('data-src')
                gatheredNames.push(name)

            })

        })
        .then( () => scrapper.getFurtherInfo(monsters))
        .catch((err) => console.log(err))

    res.json(monsters)
    console.log("DING!! :D")
    
})

router.get('/smallmonsters', async (req, res) => {

    await axios.get('https://monsterhunter.fandom.com/wiki/First_Generation')
        .then((responses) => {

            //---load small monsters---

            html = responses.data
            $ = cheerio.load(html)

            $('tbody:contains("Felyne") tr td a ', html).each(function() {
                const name = $(this).text().trim()
                url = 'https://monsterhunter.fandom.com' + $(this).attr('href')
                if(!gatheredNames.includes(name) && gatheredNames.length > 0){               
                     monsters.push({
                        name, 
                        url//,
                        //imageUrl
                    })
                }

                //imageUrl = $(this).find('img').attr('data-src')
                gatheredNames.push(name)

            })

        })
        .then( () => scrapper.getFurtherInfo(monsters))
        .catch((err) => console.log(err))

    res.json(monsters)
    console.log("DING!! :D")
    
})

router.get('/largemonsters', async (req, res) => {

    await axios.get('https://monsterhunter.fandom.com/wiki/First_Generation')
        .then((responses) => {

            //---load large monsters---

            html = responses.data
            $ = cheerio.load(html)

            $('tbody:contains("Velocidrome") tr td a ', html).each(function() {
                const name = $(this).text().trim()
                url = 'https://monsterhunter.fandom.com' + $(this).attr('href')
                if(!gatheredNames.includes(name) && gatheredNames.length > 0){               
                     monsters.push({
                        name, 
                        url//,
                        //imageUrl
                    })
                }

                //imageUrl = $(this).find('img').attr('data-src')
                gatheredNames.push(name)

            })
        })
        .then( () => scrapper.getFurtherInfo(monsters))
        .catch((err) => console.log(err))



    res.json(monsters)
    console.log("DING!! :D")
    
})

module.exports = router

