const express = require('express')
const router = express.Router()
const axios = require('axios') //allows for immediate html interaction
const cheerio = require('cheerio') //allows for webscraping
const scrapper = require('../jsfiles/scrappingFunctions')

const monsters = []


let html = ''
let $ = ''
let url = ''

// let gatheredNames = []


router.get('/', async (req, res) => {

    await axios.get('https://monsterhunter.fandom.com/wiki/MHWI:_Monsters')
        .then((responses) => {

            //---load all monsters---

            html = responses.data
            $ = cheerio.load(html)

            $('.thumb div a', html).each(function() {
                const name = $(this).attr('title').split("(")[0].trim()
                url = 'https://monsterhunter.fandom.com' + $(this).attr('href')
                imageUrl = $(this).find('img').attr('data-src')

                if(!gatheredNames.includes(name) && gatheredNames.length > 0){               
                     monsters.push({
                        name, 
                        url//,
                        //imageUrl
                    })
                }
                gatheredNames.push(name)

            })

        })
        .then( () => scrapper.getFurtherInfo(monsters))
        .catch((err) => console.log(err))

    res.json(monsters)
    console.log("DING!! :D")
    
})

router.get('/smallmonsters', async (req, res) => {

    await axios.get('https://monsterhunter.fandom.com/wiki/MHWI:_Monsters')
        .then((responses) => {

            //---load small monsters---

            html = responses.data
            $ = cheerio.load(html)

            $('#gallery-0 .thumb div a', html).each(function() {
                const name = $(this).attr('title').split("(")[0].trim()

                url = 'https://monsterhunter.fandom.com' + $(this).attr('href')
                //imageUrl = $(this).find('img').attr('data-src')
                //console.log(imageUrl)

                if(!gatheredNames.includes(name) && gatheredNames.length > 0){               
                     
                    monsters.push({
                        name, 
                        url//,
                        //imageUrl
                    })
                }
                
                gatheredNames.push(name)

            })

        })
        .then( () => scrapper.getFurtherInfo(monsters))
        .catch((err) => console.log(err))

    res.json(monsters)
    console.log("DING!! :D")
    
})

router.get('/largemonsters', async (req, res) => {

    await axios.get('https://monsterhunter.fandom.com/wiki/MHWI:_Monsters')
        .then((responses) => {

            //---load large monsters---

            html = responses.data
            $ = cheerio.load(html)

            $('#gallery-1 .thumb div a', html).each(function() {

                const name = $(this).attr('title').split("(")[0].trim()
                url = 'https://monsterhunter.fandom.com' + $(this).attr('href')
                //imageUrl = $(this).find('img').attr('data-src')

                if(!gatheredNames.includes(name) && gatheredNames.length > 0){               
                     monsters.push({
                        name, 
                        url//,
                        //imageUrl
                    })
                }
                gatheredNames.push(name)

            })
        })
        .then( () => scrapper.getFurtherInfo(monsters))
        .catch((err) => console.log(err))



    res.json(monsters)
    console.log("DING!! :D")
    
})

module.exports = router

