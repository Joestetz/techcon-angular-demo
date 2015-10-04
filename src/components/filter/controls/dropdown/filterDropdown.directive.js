(function (window, angular, undefined) {
  'use strict';

  angular.module('demoApp')
    .directive('filterDropdown', filterDropdown);

  function filterDropdown() {
    return {
      restrict: 'E',
      scope: {
        controlObj: '='
      },
      templateUrl: 'components/filter/controls/dropdown/filter-dropdown.tpl.html',
      controller: ctrlFn,
      controllerAs: 'vm',
      bindToController: true
    };
  }

  function ctrlFn() {
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
  }

})(window, window.angular);