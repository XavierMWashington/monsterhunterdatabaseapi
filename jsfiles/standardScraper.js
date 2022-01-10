const axios = require('axios') //allows for immediate html interaction
const cheerio = require('cheerio') //allows for webscraping
//const generalScraper = require('./generalScrapingFunctions')

const scraper = async function(urlSlug, monsterArray, galleryIndex){
    await axios.get(`https://monsterhunter.fandom.com/wiki/${urlSlug}`)
    .then((responses) => {

        html = responses.data
        $ = cheerio.load(html)

        $(`#gallery-${galleryIndex} .thumb div a`, html).each(function() {

            const name = $(this).attr('title').split("(")[0].trim()
            url = 'https://monsterhunter.fandom.com' + $(this).attr('href')
            //imageUrl = $(this).find('img').attr('data-src')

            if(!gatheredNames.includes(name) && gatheredNames.length > 0){               
                 monsterArray.push({
                    name, 
                    url//,
                    //imageUrl
                })
            }
            gatheredNames.push(name)

        })
    })
    //.then( () => generalScraper.getFurtherInfo(monsterArray))
    .catch((err) => console.log(err))
}

exports.scraper = scraper