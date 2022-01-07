//****************
//Redis Handling
//*/

const redis = require('redis')
const url = require("url-parse")

const redisURL = new url(process.env.REDISCLOUD_URL, {no_ready_check: true}) || 8000
console.log("Reddis running on this url: " + redisURL)

const redisClient = redis.createClient(redisURL)

redisClient.connect()


exports.redisClient = redisClient