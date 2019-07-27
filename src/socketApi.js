const socketio = require("socket.io");
const socketAuthorization = require('../middleware/socketAuth');
const io = socketio()
const socketApi = {
	io
}

// libs
const Users = require("./lib/users")

io.use(socketAuthorization);

const redisAdapter = require("socket.io-redis");

io.adapter(redisAdapter({
	host: process.env.REDIS_URI,
	port: process.env.REDIS_PORT,
	pass: process.env.REDIS_PASS
}));

io.on("connection", socket => {
	console.log("çalışsanaaa")

	Users.upsert(socket.id,socket.request.name)

	Users.list(users=>{
		io.emit("onlineList",users)
	})
	socket.on("disconnect",()=>{
		Users.remove(socket.request.user.googleId)
		
		Users.list(users=>{
			io.emit("onlineList",users)
		})
	})
})

module.exports = socketApi;