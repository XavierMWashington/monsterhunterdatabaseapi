const redis = require('redis')
const url = require("url-parse")

let redisClient
if(process.env.REDIS_URL){
    let redisURL = process.env.REDIS_URL
    redisClient = redis.createClient(redisURL, process.env.PORT)
    redisClient.connect().catch(err => console.log(err))
    console.log("Redis is connected to heroku\nurl:" + redisURL)
} else {
    redisClient = redis.createClient()
}

exports.redisClient = redisClient