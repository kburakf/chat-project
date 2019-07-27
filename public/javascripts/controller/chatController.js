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
}]);