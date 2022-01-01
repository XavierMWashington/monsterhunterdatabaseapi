const PORT = 8000;

const express = require('express') //serverside essential
const axios = require('axios') //allows for immediate html interactiot
const cheerio = require('cheerio') //allows for webscraping
const path = require('path')


const app = express()

const monsters = []
const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
let count = 0

let html = ''
let $ = ''
let url = ''

global.gatheredNames = []

// app.set('views',  path.join(__dirname, "myviews"))
app.set('view engine', 'ejs')


app.get('/', async (req, res) => {

    await Promise.all(alphabet.map(index => axios.get(`https://monsterhunter.fandom.com/wiki/Category:Monsters?from=${index}`)
        .then((responses) => {
            //console.log("First then")

            html = responses.data
            $ = cheerio.load(html)

            $('.category-page__member-link', html).each(function() {
                const name = $(this).text().trim()
                url = 'https://monsterhunter.fandom.com' + $(this).attr('href')

                monsters.push({
                    name, 
                    url
                })

            })
            //res.json(monsters)
        })))
        .then ( async()  => {
            console.log("Getting Information")
             await Promise.all(monsters.map(monster => axios.get(monster.url)
                .then(response => {
                    //console.log(monster)
                    //console.log(monster.url)
                    //count++
    
                    html = response.data
                    $ =  cheerio.load(html)                
    
                    $('section div:contains("English Title")', html).each(function (){
                        //console.log($(this).text().trim())
                        englishTitle = $(this).text().trim()
                        monster["englishTitle"] = englishTitle
                        //console.log(monsters[monster])
                        //console.log(count)
    
                        //monsters[index]["englishTitle"] = englishTitle
                    })
    
                })))
        })
        .catch((err) => console.log(err))



    res.json(monsters)
    console.log("DING!!! :D")
    
})

const userRouterU = require('./routes/mh')
const userRouterFu = require('./routes/mhfu')
const userRouter3u = require('./routes/mh3u')
const userRouter4u = require('./routes/mh4u')
const userRouterGu = require('./routes/mhgu')
const userRouterWi = require('./routes/mhwi')
const userRouterRs = require('./routes/mhrs')

app.use("/mh", userRouterU)
app.use("/mhfu", userRouterFu)
app.use("/mh3u", userRouter3u)
app.use("/mh4u", userRouter4u)
app.use("/mhgu", userRouterGu)
app.use("/mhwi", userRouterWi)
app.use("/mhrs", userRouterRs)


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

