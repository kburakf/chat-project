app.controller('chatController', ['$scope', 'userFactory', 'chatFactory', ($scope, userFactory, chatFactory) => {
    /**
     * initialization
     */

    function init() {
        userFactory.getUser().then(user => {
            $scope.user = user;
        })
    }

    init();

    /**
     * Angular variables
     */
    $scope.onlineList = [];
    $scope.roomList = [];
    $scope.activeTab = 1;
    $scope.chatClicked = false;
    $scope.loadingMessages = false;
    $scope.chatName = "";
    $scope.roomId = "";
    $scope.message = "";
    $scope.messages = [];

    $scope.user = {};

    /**
     * Socket.io event handling.
     */
    const socket = io.connect("http://localhost:3000");

    socket.on('onlineList', users => {
        $scope.onlineList = users;
        $scope.$apply();
    });

    /*socket.on("roomList",rooms=>{
        $scope.roomList = rooms
        $scope.$apply()
    })*/

    $scope.newRoom = () => {
        //let randomName = Math.random().toString(36).substring(7)

        let roomName = window.prompt("Enter room name")
        if (roomName != null && roomName != "") {
            socket.emit("newRoom", roomName)
        }
        socket.emit("newRoom", randomName)
    }
    $scope.changeTab = tab => {
        $scope.activeTab = tab
    }
}]);