
const { fork } = require('child_process')
//const { response } = require('express')
//const res = require('express/lib/response')


formatAndMessenger = function(monsterArray, response){
    let activated = true

    response.write('[{"placeholderPingData": "delete this object after download"')
    setInterval(() => {
        if(activated) {
            response.write(',"placeholderPingData": "delete this object after download"')
            console.log("Metro")
        }
        // metronome = 10000
    }, 5000)

    const childProcess = fork('./jsfiles/generalScrapingFunctions')
    childProcess.send({"monsterArray": monsterArray})
    childProcess.on("message", message => {
        response.write("},")
        response.write(JSON.stringify(message).substring(1))
        activated = false
        console.log("Ding!")
        response.end()
    })
}

exports.formatAndMessenger = formatAndMessenger