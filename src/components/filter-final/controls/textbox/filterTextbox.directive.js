(function (window, angular, undefined) {
  'use strict';

  angular.module('demoApp.filter-final')
    .directive('filterTextbox', filterTextbox);

  function filterTextbox() {
    return {
      restrict: 'E',
      scope: {
        controlObj: '='
      },
      templateUrl: 'components/filter-final/controls/textbox/filter-textbox.html',
      controller: ctrlFn,
      controllerAs: 'vm',
      bindToController: true
    };
  }

  function ctrlFn() {
    /*jshint validthis: true */
    var vm = this;

    vm.options = {
      placeholder: vm.controlObj.options.placeholderText
    };
  }

})(window, window.angular);