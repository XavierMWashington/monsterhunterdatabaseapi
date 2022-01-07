// const redis = require('redis')
// const url = require("url-parse")

// let redisClient
// if(process.env.REDISCLOUD_URL){
//     let redisURL = url(process.env.REDISCLOUD_URL);
//     redisClient = redis.createClient(redisURL)
//     redisClient.connect()
//     console.log("Redis is connected to heroku")
// } else {
//     redisClient = redis.createClient()
// }

// exports.redisClient = redisClient