const PORT = process.env.PORT || 8000;

const express = require('express') //serverside essential

const app = express()


global.gatheredNames = []
global.activated = false
global.redisLoaded = false
global.fatherMonsterArray = []

app.set('view engine', 'ejs')

app.get('/',(req, res) => {

    res.send("Welcome to the database!")
    
})

const userRouterSearch = require('./routes/search.js')

const userRouter1st = require('./routes/mh_first')
const userRouter2nd = require('./routes/mh_second')
const userRouter3rd = require('./routes/mh_third')
const userRouter4th = require('./routes/mh_fourth')
const userRouter5th = require('./routes/mh_fifth')
// const userRouterWi = require('./routes/mhwi')
// const userRouterRs = require('./routes/mhrs');

app.use("/search", userRouterSearch)

app.use("/mh_first", userRouter1st)
app.use("/mh_second", userRouter2nd)
app.use("/mh_third", userRouter3rd)
app.use("/mh_fourth", userRouter4th)
app.use("/mh_fifth", userRouter5th)
// app.use("/mhwi", userRouterWi)
// app.use("/mhrs", userRouterRs)


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


process.on('exit', code => {
    console.log("The app has finished! Closing the Redis Client...")
    redisClient.quit()
})

