const mongoose = require("mongoose")

module.exports = () => {
    mongoose.connect(process.env.DB_STRING,{useNewUrlParser:true})

    mongoose.connection.on("open", () => {
        console.log("MongoDB'ye bağlandık kanka")
    })
    mongoose.connection.on("error", () => {
        console.log("Bağlanamadık kanka")
    })
    mongoose.Promise = global.Promise
}