(function () {
    'use strict'
    angular.module('app')
        .controller('uxGridCtrl', function () {
            var vm = this;


            vm.tableDeafultColumnSize = 200;
            vm.enableSave = [];
            vm.search = {}


            /**
             * controller function
             */
            vm.filterCriteria = filterCriteria;
            vm.sortColumn = sortColumn;
            vm.getPageCounts = getPageCounts;
            vm.actionClick = actionClick;
            vm.addRow = addRow;
            vm.getTableWidth = getTableWidth;
            vm.saveRow = saveRow;
            vm.showActionButton = showActionButton;


            /**
             * 
             * criteria filter for searching of each column
             *
             */
            function filterCriteria() {

                var criteria = {};
                if (vm.gridColumns) {
                    vm.gridColumns.forEach(function (item) {
                        if (item.isFilter) {
                            criteria[item.columnName] = vm.search[item.columnName];
                        }

                    });
                }

                return criteria;

            }


            /**
             * 
             * Get page count for pagination
             *
             * @param {*} pageSize 
             */
            function getPageCounts(pageSize) {
                pageSize = 5;
                var pages = [];
                if (vm.gridRows) {
                    var mod = vm.gridRows.length % pageSize;
                    // if(mod){
                    //     (vm.gridRows.length / pageSize) + 1;
                    // } else {
                    //     vm.gridRows.length / pageSize;
                    // }
                    var pageCount = mod ? (vm.gridRows.length / pageSize) + 1 : vm.gridRows.length / pageSize;
                    for (var i = 1; i <= pageCount; i++) {
                        pages.push(i);
                    }

                }
                return pages;
            }

            /**
             * 
             * sorting function
             * @param {*} grid 
             */
            function sortColumn(grid) {

                console.log(grid);

                if (grid.sortOrder == 'asc') {
                    vm.gridRows.sort(function (a, b) {
                        return a[grid.columnName] > b[grid.columnName] ? -1 : 1;
                    });
                    grid.sortOrder = 'desc';
                } else {
                    vm.gridRows.sort(function (a, b) {
                        return a[grid.columnName] < b[grid.columnName] ? -1 : 1;
                    });

                    grid.sortOrder = 'asc';
                }


            }

            /**
             * 
             * inline action button for each row 
             * 
             * @param {*} row 
             * @param {*} action 
             * @param {*} rowIndex 
             */


            function actionClick(row, action, rowIndex) {
                console.log(action);
                console.log(row);
                if (action === 'delete') {
                    deletRow(row);
                }
                if (action === 'edit') {
                    editRow(row, rowIndex);
                }

                if (action === 'save') {
                    saveEditeRow(row, rowIndex);
                }
            }


            /**
             * 
             * edit rows
             * 
             * @param {*} row 
             * @param {*} rowIndex 
             */
            function editRow(row, rowIndex) {
                toggaleSaveEditFn(rowIndex);
            }

            /**
             * 
             * Saved edited row 
             * 
             * @param {*} row 
             * @param {*} rowIndex 
             */
            function saveEditeRow(row, rowIndex) {
                toggaleSaveEditFn(rowIndex);
            }


            /**
             * show inputs to add the values
             * 
             */
            function addRow() {
                vm.showSave = true;
                vm.addedRow = null;
            }

            /**
             * Save added row;
             */
            function saveRow() {
                vm.showSave = false;
                vm.gridRows.unshift(vm.addedRow);

            }

            /**
             * Toggle betwen edit and save for each row 
             * 
             * @param {*} rowIndex 
             */
            function toggaleSaveEditFn(rowIndex) {
                vm.enableSave[rowIndex] = !vm.enableSave[rowIndex];
            }


            /**
             * 
             * 
             * 
             * @param {* delete row by comparing each column value} row 
             */
            function deletRow(row) {

                var matched = false;
                for (var i = 0; i < vm.gridRows.length; i++) {
                    var item = vm.gridRows[i];
                    for (var prop in row) {
                        if (row[prop] === item[prop]) {
                            matched = true;
                        } else {
                            matched = false;
                            break;
                        }
                    }
                    if (matched) {
                        vm.gridRows.splice(i, 1);
                        break;
                    }

                }


            }

            /**
             * 
             * Get full withd of table by adding all column width;
             * 
             */
            function getTableWidth() {
                var width = 0;
                if (vm.gridColumns) {
                    vm.gridColumns.forEach(function (item) {
                        width = width + (item.size ? +item.size.substring(0, item.size.length - 2) : vm.tableDeafultColumnSize);
                    });
                }

                return { width: width == 0 ? '100%' : width + 'px' };

            }

            /**
             * 
             * Toggle between save and edit button
             * 
             * @param {* action type name} action 
             * @param {* selected action row index} rowIndex 
             */
            function showActionButton(action, rowIndex) {
                if (action === 'save') {
                    return vm.enableSave[rowIndex];
                } else if (action === 'edit') {

                    return !vm.enableSave[rowIndex];
                }

                return true;
            }


            /**
             * 
             * activate function for the controller;
             * 
             */
            function activate() {
                vm.pageNo = 1;
            }

            /**
             * activate controller
             */
            activate();
        })
        .directive('uxGrid', function () {
            return {
                restrict: 'E',
                templateUrl: 'app/directives/ux-grid/ux-grid.html',
                controller: 'uxGridCtrl',
                controllerAs: 'uxGrid',
                bindToController: true,
                scope: {
                    gridColumns: '=',
                    gridRows: '=',
                    delete: '@',
                    edit: '=',
                    save: '=',
                    filterCon: '='
                }
            }
        })
})();