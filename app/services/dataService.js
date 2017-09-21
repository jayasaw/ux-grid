(function () {
    'use strict'
    angular.module('app')
        .service('dataService', function ($q) {

            this.getGridData = getGridData;

            var gridData = [
                { id: 1, name: 'abc', city: 'jamshedpur', email: 'ja@gmail.com' },
                { id: 2, name: 'abce', city: 'Ranchi', email: 'jaya@gmail.com' },
                { id: 3, name: 'abcf', city: 'pune', email: 'jayasaw@gmail.com' },
                { id: 4, name: 'abcg', city: 'kolkata', email: 'jaya24@gmail.com' },
                { id: 5, name: 'abch', city: 'jsr', email: 'jaya12@gmail.com' }
            ];

            function getGridData() {
                return $q.when(gridData)
            }

        });
})();