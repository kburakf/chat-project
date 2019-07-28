const socketio = require("socket.io");
const socketAuthorization = require('../middleware/socketAuth');
const io = socketio()
const socketApi = {}
socketApi.io = io

// libs
const Users = require("./lib/Users")
const Rooms = require("./lib/Rooms")

io.use(socketAuthorization);

const redisAdapter = require("socket.io-redis");

io.adapter(redisAdapter({
	host: process.env.REDIS_URI,
	port: process.env.REDIS_PORT,
	pass: process.env.REDIS_PASS
}));

io.on("connection", socket => {
	console.log("girdi : " + socket.request.user.name)
	
	Users.upsert(socket.id, socket.request.user)

	Users.list(users => {
		io.emit("onlineList",users)
	})

	/*Rooms.list(rooms => {
		io.emit("roomList", rooms)
	}) */

	
	socket.on("newRoom", roomName => {
		Rooms.upsert(roomName)
		Rooms.list(rooms => {
			io.emit("roomList", rooms)
		})
	})

	socket.on("disconnect", () => {
		Users.remove(socket.request.user.googleId)

		Users.list(users => {
			io.emit("onlineList", users)
		})
	})
})

module.exports = socketApi;