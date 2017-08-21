(function () {
    'use strict';

    app.directive('templateDirective', templateDirective);

    function templateDirective() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/template.html'
        };

        return directive;
    }
})();