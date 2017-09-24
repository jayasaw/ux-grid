(function () {
    'use strict'
    angular.module('app')
        .service('configService', function ($q) {

            this.getGridConfig = getGridConfig
            this.getUserGridConfig = getUserGridConfig;

            var gridConfig = [
                { columnName: 'id', displayName: 'Id', link: true },
                { columnName: 'name', displayName: 'Name', link: true },
                { columnName: 'city', displayName: 'City' },
                { columnName: 'email', displayName: 'Email' },
                {
                    columnName: 'button', displayName: 'Action', action: [{ button: 'delete', icon: 'glyphicon-trash' },
                    ]
                }
            ];

            var userGridConfig = [
                { columnName: 'id', displayName: 'Id', link: true },
                { columnName: 'name', displayName: 'Name', link: true, isFilter:true  },
                { columnName: 'city', displayName: 'City', isFilter:true  },
                { columnName: 'phone', displayName: 'Phone' },
                { columnName: 'email', displayName: 'Email',isFilter:true },
                { columnName: 'website', displayName: 'Website' }
            ];

            function getGridConfig() {
                return $q.when(gridConfig);
            }

            function getUserGridConfig() {
                return $q.when(userGridConfig);
            }




        });
})();