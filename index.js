const PORT = process.env.PORT || 8000;

const express = require('express') //serverside essential

const app = express()



global.gatheredNames = []
global.activated = false
global.redisLoaded = false

const redis = require('redis')

app.set('view engine', 'ejs')

app.get('/',(req, res) => {

    res.send("Welcome to the database!")
    
})

const userRouterU = require('./routes/mh')
const userRouterFu = require('./routes/mhfu')
const userRouter3u = require('./routes/mh3u')
const userRouter4u = require('./routes/mh4u')
const userRouterGu = require('./routes/mhgu')
const userRouterWi = require('./routes/mhwi')
const userRouterRs = require('./routes/mhrs');

app.use("/mh", userRouterU)
app.use("/mhfu", userRouterFu)
app.use("/mh3u", userRouter3u)
app.use("/mh4u", userRouter4u)
app.use("/mhgu", userRouterGu)
app.use("/mhwi", userRouterWi)
app.use("/mhrs", userRouterRs)


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

