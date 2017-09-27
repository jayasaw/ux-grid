(function () {
    'use strict'
    angular.module('app')
        .controller('uxGridCtrl', function () {
            var vm = this;

            vm.filterCriteria = filterCriteria;
            vm.sortColumn = sortColumn;
            vm.getPageCounts = getPageCounts;
            vm.tableDeafultColumnSize = 200;


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


            /**
             * 
             * sorting function
             * @param {*} grid 
             */
            function sortColumn(grid) {

                console.log(grid);

                if (grid.sortOrder == 'asc') {
                    vm.rowSetting.sort(function (a, b) {
                        return a[grid.columnName] > b[grid.columnName] ? -1 : 1;
                    });
                    grid.sortOrder = 'desc';
                } else {
                    vm.rowSetting.sort(function (a, b) {
                        return a[grid.columnName] < b[grid.columnName] ? -1 : 1;
                    });

                    grid.sortOrder = 'asc';
                }


            }

            // inline action button function call

            vm.actionClick = function (row, action) {
                console.log(action);
                console.log(row);
                if (action === 'delete') {
                    deletRow(row);
                }
                if (action === 'edit') {
                    vm.saveEnabled = true;
                    editRow(row);
                }

                if (action === 'save') {
                    vm.saveEnabled = false;
                    saveRow(row);
                }
            }


            function deletRow(row) {

                var matched = false;
                for (var i = 0; i < vm.rowSetting.length; i++) {
                    var item = vm.rowSetting[i];
                    for (var prop in row) {
                        if (row[prop] === item[prop]) {
                            matched = true;
                        } else {
                            matched = false;
                            break;
                        }
                    }
                    if (matched) {
                        vm.rowSetting.splice(i, 1);
                        break;
                    }

                }


            }

            vm.getTableWidth = function () {
                var width = 0;
                if (vm.gridSetting) {
                    vm.gridSetting.forEach(function (item) {
                        width = width + (item.size ? +item.size.substring(0, item.size.length - 2) : vm.tableDeafultColumnSize);
                    });
                }

                return { width: width == 0 ? '100%' : width + 'px' };

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
                    delete: '=',
                    edit: '=',
                    save: '=',
                    filterCon: '='
                }
            }
        })
})();