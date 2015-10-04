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
      templateUrl: 'components/filter/core/filter-container.tpl.html'
    };
  }
  
  function FilterController() {
    /*jshint validthis: true */
    var fc = this;

    fc.applyFilters = function () {
      var selectedFilters = getSelectedFilters();
      fc.filterManager.applyFilters(selectedFilters);
    };

    fc.clear = function () {
      fc.filterManager.clearSelected();
    };

    fc.reset = function () {
      fc.filterManager.resetFilters();
    };

    fc.removeFilter = function (filter, index) {
      fc.filterManager.removeFilter(filter, index);
    };

    function getSelectedFilters() {
      var filters = [];
      angular.forEach(fc.filterManager.filterConfig.controls, function (val, key) {
        val.appendSelected(filters);
      });

      return filters;
    }
  }

})(window, window.angular);