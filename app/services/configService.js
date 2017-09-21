(function () {
    'use strict'
    angular.module('app')
        .service('configService', function ($q) {

            this.getGridConfig = getGridConfig

            var gridConfig = [
                { columnName: 'id', displayName: 'Id' },
                { columnName: 'name', displayName: 'Name' },
                { columnName: 'city', displayName: 'City' },
                { columnName: 'email', displayName: 'Email' }
            ];

            function getGridConfig() {
                return $q.when(gridConfig);
            }
        });
})();