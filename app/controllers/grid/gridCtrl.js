(function () {
    'use strict'
    angular.module('app')
        .controller('gridCtrl', function (configService, dataService, $q) {
            var vm = this;
            this.cuttext = false;
            this.pastetext = false;
            this.copytext = false;

            var gridConfig = [];
            vm.search = true;
          
          

            // Get Grid Data
            function fetchGridData() {
                gridConfig.push(configService.getGridConfig());
                gridConfig.push(dataService.getGridData());

                $q.all(gridConfig).then(function (res) {
                    vm.columnData = res[0];
                    vm.rowData = res[1];
                })
            }


            // get user grid data
            function fetchUserData() {
                gridConfig.push(configService.getUserGridConfig());
                gridConfig.push(dataService.getUserData());

                $q.all(gridConfig).then(function (res) {
                    vm.columnData = res[0];
                    vm.rowData = res[1];
                })
            }

      

            // pushing promise to one array to resolve it at omnce


            // configService.getGridConfig().then(function (response) {
            //     vm.columnData = response;

            //     dataService.getGridData().then(function (response) {
            //         vm.rowData = response;
            //     })

            // });

            vm.delete = function (id) {
                dataService.deleteData(id);
            }


            function activate() {
                // fetchGridData();
                 fetchUserData();
            }

            // Initializing controller;
            activate();


        });
})();