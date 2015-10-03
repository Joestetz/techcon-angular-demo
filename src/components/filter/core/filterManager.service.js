(function (window, angular, undefined) {
  'use strict';

  angular.module('demoApp')
    .factory('FilterManager', FilterManagerFn);

  FilterManagerFn.$inject = ['FilterNotifier'];

  function FilterManagerFn(FilterNotifier) {

    var FilterManager = function (filterConfig) {
      this.filterConfig = filterConfig;
      this.appliedFilters = [];
    };

    FilterManager.prototype.applyFilters = function (filters) {
      this.appliedFilters = angular.copy(filters);

      FilterNotifier.filterChanged(filters);
    };

    FilterManager.prototype.clearSelected = function () {
      angular.forEach(this.filterConfig.controls, function (val, key) {
        val.clear();
      });
    };

    FilterManager.prototype.resetFilters = function () {
      this.clearSelected();
      this.appliedFilters.length = 0;
      FilterNotifier.filterChanged(this.appliedFilters);
    };

    FilterManager.prototype.removeFilter = function (filter, index) {
      var removed = this.appliedFilters.splice(index, 1)[0];
      angular.forEach(this.filterConfig.controls, function (val, key) {
        if (val.options.dtoKey === filter.control.options.dtoKey) {
          val.remove(removed);
        }
      });

      FilterNotifier.filterChanged(this.appliedFilters);
    };

    return FilterManager;
  }

})(window, window.angular);