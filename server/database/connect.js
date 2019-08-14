require('dotenv').config()
const mongoose = require('mongoose')
const connect = () => {
    try {
        mongoose.connect(process.env.DB).then(console.log('Connected to mongoDB'))
    } catch (error) {
        console.log("Contact me for the database password, it is likely missing! I don't want to put it on github because bots scan public repos for keys!")
    }
}

module.exports = connect