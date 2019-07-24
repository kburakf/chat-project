const auth = require("./auth")
const users = require("./users")
const index = require("./index")

module.exports = app =>{
    app.use("/auth",auth)
    app.use("/users",users)
    app.use("/",index)
}