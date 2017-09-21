(function () {
    'use strict'
    angular.module('app')
        .controller('uxGridCtrl', function () {
            var vm = this;

            function sortRow(row) {


            }
        })
        .directive('myGrid', function () {
            return {
                restrict: 'E',
                templateUrl: 'app/directives/ux-grid/ux-grid.html',
                controller: 'uxGridCtrl',
                controllerAs: 'myGridCtrl',
                bindToController: true,
                scope: {
                    gridSetting: '=',
                    rowSetting : '='
                }
            }
        })
})();