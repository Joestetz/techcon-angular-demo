(function (window, angular, undefined) {
  'use strict';

  angular.module('demoApp')
    .directive('filterMultiselect', filterMultiselect);

  function filterMultiselect() {
    return {
      restrict: 'E',
      scope: {
        controlObj: '='
      },
      templateUrl: 'components/filter/controls/multiselect/filter-multiselect.tpl.html',
      controller: ctrlFn,
      controllerAs: 'vm',
      bindToController: true
    };
  }

  function ctrlFn() {
    /*jshint validthis: true */
    var vm = this;

    vm.options = {
      placeholder: vm.controlObj.options.placeholderText,
      dataTextField: 'title',
      dataValueField: 'id'
    };

    vm.dataSource = new kendo.data.DataSource({
      data: vm.controlObj.data
    });
  }

})(window, window.angular);