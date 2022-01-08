const redis = require('redis')

let redisClient
if(process.env.REDIS_URL){
    let redisURL = process.env.REDIS_URL
    redisClient = redis.createClient({url: redisURL})
    redisClient.connect().catch(err => console.log(err))
    console.log("Redis is connected to heroku\nurl:" + redisURL)
} else {
    redisClient = redis.createClient()
    redisClient.connect().catch(err => console.error(err))
}

exports.redisClient = redisClient