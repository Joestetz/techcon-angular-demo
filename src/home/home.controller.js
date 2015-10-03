(function (window, angular, undefined) {
  'use strict';

  angular.module('demoApp')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['FilterManager', 'MultiselectFilterControl', 'DropdownFilterControl', 'TextboxFilterControl'];

  function HomeController(FilterManager, MultiselectFilterControl, DropdownFilterControl, TextboxFilterControl) {
    var vm = this;

    var filterConfig = {
      controls: [
        new MultiselectFilterControl({
          title: 'Employee Group',
          dtoKey: 'groups',
          data: [
            {
              id: 0,
              title: 'Group A'
            },
            {
              id: 1,
              title: 'Group B'
            },
            {
              id: 2,
              title: 'Group C'
            }
          ]
        }),
        new MultiselectFilterControl({
          title: 'Payroll Policy',
          dtoKey: 'policies',
          data: [
            {
              id: 0,
              title: 'Policy A'
            },
            {
              id: 1,
              title: 'Policy B'
            },
            {
              id: 2,
              title: 'Policy C'
            }
          ]
        }),
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
        }),
        new TextboxFilterControl({
          title: 'First Name',
          dtoKey: 'firstName'
        }),
        new TextboxFilterControl({
          title: 'Last Name',
          dtoKey: 'lastName'
        })
      ]
    };

    vm.filterManager = new FilterManager(filterConfig);
  }

})(window, window.angular);