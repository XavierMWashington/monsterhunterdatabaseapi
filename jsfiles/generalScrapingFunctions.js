const cheerio = require('cheerio') //allows for webscraping
const splitter = require('./titleFactoring')
const axios = require('axios') //allows for immediate html interactiot
const { redisClient } = require('../redisHandler')

process.on('message', async message => {
    await getFurtherInfo(message.monsterArray)
    process.send(message.monsterArray)
    process.exit()
})


// let redisURL = new url(process.env.REDISCLOUD_URL, {no_ready_check: true}) || 8000
// console.log("Reddis running on this url: " + redisURL)

// let redisClient = redis.createClient(redisURL)
//let cachedMonsters = []

//redisClient = redis.createClient()


const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

let englishTitle = '' 
let className = ''
let elements = [] 
let ailments = [] 
let weaknesses = []
let habitats = []
let size = ''
let generation = ''

let physiologyReached = false
let abilitiesReached = false
let behaviorReached = false

function transferObjectData(transferee, object){
    transferee = object
    transferee["Englishtitles"] = object.englishTitles
    transferee["className"] = object.className
    transferee["elements"] = object.elements
    transferee["ailments"] = object.ailments
    transferee["weaknessses"] = object.weaknesses
    transferee["habitats"] = object.habitats
    transferee["size"] = object.size
    transferee["generation"] = object.generation
    transferee["physiology"] = object.physiology
    transferee["abilities"] = object.abilities
    transferee["behavior"] = object.behavior

}


async function getFurtherInfo(monsterArray){

    const monsterCount = monsterArray.length
    let iter = 0

    //redisClient.connect()


    let cachedMonsters = []

    cachedMonsters = await redisClient.get("loadedMonsters", (error, loadedMonsters) => {})
    
    cachedMonsters = JSON.parse(cachedMonsters)

    //console.log(cachedMonsters)
    


    console.log("Getting Information")
     await Promise.all(monsterArray.map(monster => axios.get(monster.url)
        .then(response => {


            // monster["englishTitles"] = null
            // monster["className"] = null
            // monster["elements"] = null
            // monster["ailments"] = null
            // monster["weaknesses"] = null
            // monster["habitats"] = null
            // monster["size"] = null
            // monster["generation"] = null
            // monster["physiology"] = null
            // monster["abilities"] = null
            // monster["behavior"] = null

            

            try{
                for( i = 0; i < cachedMonsters.length; i++){
                    if(cachedMonsters[i].url ==  monster.url){
                        //monster = cachedMonsters[i]
                        //console.log(cachedMonsters[i])
                        //transferObjectData(monster, cachedMonsters[i])
                        // monster = JSON.stringify(cachedMonsters[i])
                        // monster = JSON.parse(monster)
                        monster = Object.assign(monster, cachedMonsters[i])
                        console.log("Cached monster (" + cachedMonsters[i].name + ") loaded")
                        iter++
                        return 
                    }
                }
            } catch (TypeError){

            }

            const html = response.data
            const $ =  cheerio.load(html)

            //console.log(monster["englishTitles"])
            

            //**********/
            //Obtain the titles
            //**********/

            $('section div:contains("English Title")', html).each(function (){
                //console.log($(this).text().trim())
                englishTitle = $(this).text().trim().replace(/\n|\t|English Title/g, '')
                englishTitle = splitter.splitFromCap(englishTitle.split(''))
            })

            if (englishTitle == null || englishTitle.includes("N/A") || englishTitle.includes("?") || englishTitle.includes("(")) englishTitle = "None"

            monster["englishTitles"] = englishTitle
            englishTitle = null

            //**********/
            //Obtain the classes
            //**********/           

            $('aside:contains("Monster Class") section div:contains("Monster Class") div a', html).each(function (){

                className = $(this).text().trim()
            })

            if (className == null || className.includes("N/A")) className = "None"
            else if(!alphabet.includes(className[0])) className = "Elder Dragon"

            monster["className"] = className
            className = null

            //**********/
            //Obtain the elements
            //**********/   
            
            elements = []

            $('aside:contains("Elements") section div:contains("Elements") div small a', html).each(function (){

                const element = $(this).text()//.trim()//.replace(/\n|\t|/g, '')

                if(element != null && element != "" && !element.includes("MH")){
                    elements.push(element)
                }
            })

            if (elements == null || elements.includes("N/A") || elements.length == 0) elements = ["None"]

            monster["elements"] = elements
            //elements = null

            //**********/
            //Obtain the ailments
            //**********/   
            
            ailments = []

            $('aside:contains("Elements") section div:contains("Ailments") div small a', html).each(function (){

                const ailment = $(this).text()//.trim()//.replace(/\n|\t|/g, '')

                if(ailment != null && ailment != "" && !ailment.includes("MH") && !ailment.includes("Gen")){
                    ailments.push(ailment)
                }
            })

            if (ailments == null || ailments.includes("N/A") || ailments.length == 0) ailments = ["None"]

            monster["ailments"] = ailments

            //**********/
            //Obtain the weaknesses
            //**********/ 

            weaknesses = []

            $('aside section:contains("Elements") div:contains("Weakest to") div small a', html).each(function (){

                const weakness = $(this).text()//.trim().replace(/\n|\t|/g, '')

                if(weakness != null && weakness != "" && !weakness.includes("MH") && !weakness.includes("Enraged")){
                    weaknesses.push(weakness)
                }
            })

            if (weaknesses == null || weaknesses.includes("N/A") || weaknesses.length == 0) weaknesses = ["None"]

            monster["weaknesses"] = weaknesses     
            
            //**********/
            //Obtain the habitats
            //**********/ 

            habitats = []

            $('aside section:contains("Elements") div:contains("Habitat") div a', html).each(function (){

                const habitat = $(this).text()//.trim().replace(/\n|\t|/g, '')

                if(habitat != null && habitat != ""){
                    habitats.push(habitat)
                }
            })

            if (habitats == null || habitats.includes("N/A") || habitats.length == 0) habitats = ["None"]

            monster["habitats"] = habitats  

            //**********/
            //Obtain the sizes
            //**********/ 

            $('aside section:contains("Elements") div:contains("Size") div', html).each(function (){

                size = $(this).text().trim().replace(/~|cm|/g, '').replace(/\s/, "cm ~ ").concat("cm").toLowerCase()

                if(size.includes("small") || size.includes("medium") || size.includes("average") || size.includes("large")){
                    size = size.slice(0, -2)
                }

                if(size.toUpperCase().includes("NONE"))size = "None Listed"

            })

            monster["size"] = size
            
            //**********/
            //Obtain the generation
            //**********/ 


            $('aside section:contains("Elements") div:contains("Generation") div a', html).each(function (){

                generation = $(this).text().trim()

            })

            if (generation == null || generation.includes("N/A") || generation.length == 0) generation = "None"

            monster["generation"] = generation 

            //**********/
            //Obtain extra information
            //**********/ 

            $('div h2, div p', html).each(function (){

                //generation = $(this).text().trim()
                //console.log($(this).text().trim())
                if($(this).text().trim() == "Physiology"){
                    physiologyReached = true
                } else if (physiologyReached){
                    monster["physiology"] = $(this).text().trim()
                    physiologyReached = false
                }

                if($(this).text().trim() == "Abilities" || 
                   $(this).text().trim() == "Behavior and Abilities" ||
                   $(this).text().trim() == "Abilities and Behavior"){
                    abilitiesReached = true
                } else if (abilitiesReached){
                    monster["abilities"] = $(this).text().trim()
                    abilitiesReached = false
                }

                if($(this).text().trim() == "Behavior"){
                    behaviorReached = true
                } else if (behaviorReached){
                    monster["behavior"] = $(this).text().trim()
                    behaviorReached = false
                }

            })

            iter++ 
            console.log("Monster number " + iter + "/" + monsterCount + " has been loaded")
            //redisClient.set("loadedMonsters", monsterArray)

        })))

    redisClient.set("loadedMonsters", JSON.stringify(monsterArray))

}

exports.getFurtherInfo = getFurtherInfo