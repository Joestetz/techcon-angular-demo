(function (window, angular, undefined) {
  'use strict';

  angular.module('demoApp.filter-final')
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
      templateUrl: 'components/filter-final/core/filter-container.html'
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

    fc.deleteFilter = function () {
      fc.filterManager.deleteSavedFilter();
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