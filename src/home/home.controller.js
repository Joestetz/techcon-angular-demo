(function (window, angular, undefined) {
  'use strict';

  angular.module('demoApp')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['FilterManager', 'DropdownFilterControl'];

  function HomeController(FilterManager, DropdownFilterControl) {
    var vm = this;

    var filterConfig = {
      controls: [
        new DropdownFilterControl({
          title: 'Salary Type',
          dtoKey: 'salary',
          data: [
            {
              id: 0,
              title: 'Hourly'
            }, {
              id: 1,
              title: 'Salary'
            }
          ]
        }),
        new DropdownFilterControl({
          title: 'Is Active',
          dtoKey: 'isActive',
          data: [
            {
              id: 0,
              title: 'No'
            }, {
              id: 1,
              title: 'Yes'
            }
          ]
        })
      ]
    };

    vm.filterManager = new FilterManager(filterConfig);
  }

})(window, window.angular);