const redisClient = require("../redisClient")

function Rooms() {
    this.client = redisClient.getClient()
}

module.exports = new Rooms()

Rooms.prototype.upsert = roomName => {
    this.client.hset(
        "rooms",
        roomName,
        JSON.stringify({
            connectionId,
            roomName,
            when: Date.now()
        }),
        err => {
            if (err)
                console.log(err)
        }
    )
}

Rooms.prototype.list = function (callback) {
	let roomList = [];

	this.client.hgetall('rooms', function (err, users) {
		if (err) {
		  console.error(err);
		  return callback([]);
		}
        /*
		for (let room in rooms){
			active.push(JSON.parse(rooms[room]));
		} */

		return callback(roomList);
	})
};