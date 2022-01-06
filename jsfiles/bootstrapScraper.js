const axios = require('axios') //allows for immediate html interaction
const cheerio = require('cheerio') //allows for webscraping

const scraper = async function(urlSlug, monsterArray, flagger){
    await axios.get(`https://monsterhunter.fandom.com/wiki/${urlSlug}`)
    .then( async (responses) => {

        html = responses.data
        $ = cheerio.load(html)

        $(`tbody:contains("${flagger}") tr td a `, html).each(function() {

            const name = $(this).text().trim()
            url = 'https://monsterhunter.fandom.com' + $(this).attr('href')
                        
            if (!gatheredNames.includes(name) && gatheredNames.length > 0){               
                monsterArray.push({
                    name, 
                    url
                })
            }
            

            gatheredNames.push(name)
        })
    })
    //.then(() => {})
    .catch((err) => console.log(err))
}



exports.scraper = scraper