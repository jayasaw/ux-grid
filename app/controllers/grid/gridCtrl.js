(function () {
    'use strict'
    angular.module('app')
        .controller('gridCtrl', function (configService, dataService) {
            var vm = this;

            configService.getGridConfig().then(function (response) {
                vm.columnData = response;

                dataService.getGridData().then(function(response){
                    vm.rowData = response;
                })

            });

        });
})();