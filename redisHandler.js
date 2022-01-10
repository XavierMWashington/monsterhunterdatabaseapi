const redis = require('redis')

let redisClient

if(process.env.REDIS_URL){
    let redisURL = process.env.REDIS_URL
    redisClient = redis.createClient({url: redisURL})
    console.log("Attempting to connect to redis-heroku\nurl:" + redisURL)
} else {
    redisClient = redis.createClient()
    console.log("Attempting to connect to localhost redis")
}

redisClient.on ("error", (err) =>{
    console.log(`Redis error: ${err}`)
    if(!process.env.REDIS_URL){
        console.log("Local host refused\nDid you remember to start your redis server?\n\n")
    }

})


exports.redisClient = redisClient