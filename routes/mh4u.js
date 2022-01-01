const express = require('express')
const router = express.Router()
const axios = require('axios') //allows for immediate html interactiot
const cheerio = require('cheerio') //allows for webscraping
const scrapper = require('../jsfiles/scrappingFunctions')

const monsters = []
var imageDisplay = false

let html = ''
let $ = ''
let url = ''

// let gatheredNames = []
// let imageUrl = ''


router.get('/', async (req, res) => {

    await axios.get('https://monsterhunter.fandom.com/wiki/MH4U:_Monsters')
        .then((responses) => {

            //---load all monsters---

            html = responses.data
            $ = cheerio.load(html)

            $('tbody tr td a ', html).each(function() {
                const name = $(this).text().trim()
                url = 'https://monsterhunter.fandom.com' + $(this).attr('href')
                //imageUrl = $(this).next().find('img').attr('src')

                if(!gatheredNames.includes(name) && gatheredNames.length > 0){               
                     monsters.push({
                        name, 
                        url//,
                        //imageUrl
                    })
                }

                //imageUrl = $(this).find('img').attr('src')
                gatheredNames.push(name)

            })

        })
        .then( () => scrapper.getFurtherInfo(monsters))
        .catch((err) => console.log(err))

    res.json(monsters)
    console.log("DING!! :D")
    
})

router.get('/smallmonsters', async (req, res) => {

    await axios.get('https://monsterhunter.fandom.com/wiki/MH4U:_Monsters')
        .then((responses) => {

            //---load small monsters---

            html = responses.data
            $ = cheerio.load(html)

            $('tbody:contains("Felyne") tr td a ', html).each( async function() {
                const name = $(this).text().trim()
                url = 'https://monsterhunter.fandom.com' + $(this).attr('href')
                console.log("content: "  + typeof imageUrl + " /// ")


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

    await axios.get('https://monsterhunter.fandom.com/wiki/MH4U:_Monsters')
        .then((responses) => {

            //---load large monsters---

            html = responses.data
            $ = cheerio.load(html)

            $('tbody:contains("Ukanlos") tr td a ', html).each(function() {
                const name = $(this).text().trim()
                url = 'https://monsterhunter.fandom.com' + $(this).attr('href')


                if(!gatheredNames.includes(name) && gatheredNames.length > 0){               
                     monsters.push({
                        name, 
                        url//,
                        //imageUrl
                    })
                }
                imageUrl = $(this).find('img').attr('src')
                gatheredNames.push(name)

            })
        })
        .then( () => scrapper.getFurtherInfo(monsters))
        .catch((err) => console.log(err))



    res.json(monsters)
    console.log("DING!! :D")
    
})

module.exports = router

