(function () {
    'use strict';

    app.controller('templateController', templateController);
    
    function templateController($scope) {
        $scope.firstName = "John";
        $scope.lastName = "Doe";
    };

})();