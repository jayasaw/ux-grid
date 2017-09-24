(function () {
    'use strict'
    angular.module('app')
        .controller('gridCtrl', function (configService, dataService) {
            var vm = this;
            this.cuttext = false;
            this.pastetext = false;
            this.copytext = false;


            configService.getGridConfig().then(function (response) {
                vm.columnData = response;

                dataService.getGridData().then(function(response){
                    vm.rowData = response;
                })

            });

         vm.delete = function(id){
            dataService.deleteData(id); 
         }


        });
})();