//Hopefully, all future websites continue to use the bootstrap style of formatting

const axios = require('axios') //allows for immediate html interaction
const cheerio = require('cheerio') //allows for webscraping

const searchScraper = async function(target, monsterArray, generationList){
    //monsterArray = []
    let found = false
    let foundName = ""
    target = target.replace(/_/g," ");

    await Promise.all(generationList.map(generation => axios.get(`https://monsterhunter.fandom.com/wiki/${generation}`)
        .then( async (responses) => {            

            html = responses.data
            $ = cheerio.load(html)

            $(`tbody tr td a `, html).each(function() {

                const name = $(this).text().trim()

                //console.log(name)

                if(name.toLowerCase() == target.toLowerCase()){
                    foundName = name
                    let url = 'https://monsterhunter.fandom.com' + $(this).attr('href')
                    found = true  
                    

                    if (!gatheredNames.includes(name)){               
                        monsterArray.push({
                            name, 
                            url
                        })
                    }

                    gatheredNames.push(name)

                }                 

            })
        })
        //.then(() => {})
        .catch((err) => console.log(err))
    ))

    if(found){
        console.log("Search Successful. " + foundName + " has been located")
        monsterArray = []
        return foundName
    }
    
}

exports.searchScraper = searchScraper