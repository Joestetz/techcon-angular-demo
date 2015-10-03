(function (window, angular, undefined) {
  'use strict';

  angular.module('demoApp')
    .directive('filterContainer', filterContainer);

  function filterContainer() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        filterManager: '='
      },
      controller: FilterController,
      controllerAs: 'fc',
      bindToController: true,
      templateUrl: 'components/filter/core/filter-container.html'
    };
  }
  
  function FilterController() {
    /*jshint validthis: true */
    var fc = this;
  }

})(window, window.angular);