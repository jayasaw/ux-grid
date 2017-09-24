(function () {
    'use strict'
    angular.module('app')
        .controller('uxGridCtrl', function () {
            var vm = this;
            vm.filterCriteria = filterCriteria;
            vm.getPageCounts = getPageCounts;


            vm.search = {}
            function sortRow(row) {


            }

            function goTo(page) {

            }

            function filterCriteria() {

                var criteria = {};
                if (vm.gridSetting) {
                    vm.gridSetting.forEach(function (item) {
                        if (item.isFilter) {
                            criteria[item.columnName] = vm.search[item.columnName];
                        }

                    });
                }

                console.log(criteria);

                return criteria;

            }


            function getPageCounts(pageSize) {
                pageSize = 5;
                var pages = [];
                if (vm.rowSetting) {
                    var mod = vm.rowSetting.length % pageSize;
                    // if(mod){
                    //     (vm.rowSetting.length / pageSize) + 1;
                    // } else {
                    //     vm.rowSetting.length / pageSize;
                    // }
                    var pageCount = mod ? (vm.rowSetting.length / pageSize) + 1 : vm.rowSetting.length / pageSize;
                    for (var i = 1; i <= pageCount; i++) {
                        pages.push(i);
                    }

                }
                return pages;
            }




            function activate() {
                vm.pageNo = 1;
            }

            activate();
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
                    rowSetting: '=',
                    delete: '&',
                    filterCon: '='
                }
            }
        })
})();