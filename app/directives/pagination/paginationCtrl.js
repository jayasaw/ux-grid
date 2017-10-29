(function(){
    'use strict'
    angular.module('app')
    .controller('paginationCtrl', function(){
        var vm  = this;

        
       vm.getPageCounts = getPageCounts;

        function getPageCounts(pageSize) {
            pageSize = 5;
            var pages = [];
            if (vm.rowCount !== 0) {
                var mod = vm.rowCount % pageSize;
                // if(mod){
                //     (vm.rowCount / pageSize) + 1;
                // } else {
                //     vm.rowCount / pageSize;
                // }
                var pageCount = mod ? (vm.rowCount / pageSize) + 1 : vm.rowCount / pageSize;
                for (var i = 1; i <= pageCount; i++) {
                    pages.push(i);
                }

            }
            return pages;
        }
    })

    .directive('dirPagination', function(){
        return {
            restrict :'E',
            templateUrl : 'app/directives/pagination/pagination.html',
            controller : 'paginationCtrl',
            controllerAs : 'pagination',
            bindToController : true,
            scope : {
                rowCount : '=',
                pages : '=',
                pageNo : '=',
               

            }
        }
    })

})();