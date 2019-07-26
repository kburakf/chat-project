const mongoose = require("mongoose")

module.exports = () => {
    mongoose.connect(process.env.DB_STRING, {
        useNewUrlParser: true,
        useCreateIndex: true
    })/*,err=>{
        if(err)
        console.log("Bağlanamadık kanka")
        else
        console.log("MongoDB'ye bağlandık kanka")
    }) */

     mongoose.connection.on("open", () => {
         console.log("MongoDB'ye bağlandık kanka")
     })
     mongoose.connection.on("error", () => {
         console.log("Bağlanamadık kanka")
     }) 
    mongoose.Promise = global.Promise
}