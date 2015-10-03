(function (window, angular, undefined) {
  'use strict';

  angular.module('demoApp.filter-final')
    .directive('filterDropdown', filterDropdown);

  function filterDropdown() {
    return {
      restrict: 'E',
      scope: {
        controlObj: '='
      },
      templateUrl: 'components/filter-final/controls/dropdown/filter-dropdown.html',
      controller: ctrlFn,
      controllerAs: 'vm',
      bindToController: true
    };
  }

  ctrlFn.$inject = ['$scope'];

  function ctrlFn($scope) {
    /*jshint validthis: true */
    var vm = this;

    vm.options = {
      optionLabel: { title: vm.controlObj.options.placeholderText, id: -1 },
      dataTextField: 'title',
      dataValueField: 'id'
    };

    vm.dataSource = new kendo.data.DataSource({
      data: vm.controlObj.data
    });

    $scope.$watchCollection(function () {
      return vm.controlObj.data;
    }, function (newVal, oldVal) {
      if (angular.equals(newVal, oldVal)) return;

      vm.dataSource = new kendo.data.DataSource({
        data: vm.controlObj.data
      });
    });
  }

})(window, window.angular);