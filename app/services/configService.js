(function () {
    'use strict'
    angular.module('app')
        .service('configService', function ($q) {

            this.getGridConfig = getGridConfig

            var gridConfig = [
                { columnName: 'id', displayName: 'Id', link : true },
                { columnName: 'name', displayName: 'Name' ,link : true},
                { columnName: 'city', displayName: 'City' },
                { columnName: 'email', displayName: 'Email' },      
                {columnName : 'button', displayName : 'Action', action :[{button: 'delete', icon:'glyphicon-trash'}]}
            ];

            function getGridConfig() {
                return $q.when(gridConfig);
            }
        });
})();