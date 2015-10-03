(function (window, angular, undefined) {
  'use strict';

  angular.module('demoApp')
    .factory('FilterManager', FilterManagerFn);

  function FilterManagerFn() {

    var FilterManager = function (filterConfig) {
      this.filterConfig = filterConfig;
      this.appliedFilters = [];
    };

    FilterManager.prototype.applyFilters = function (filters) {
      this.appliedFilters = angular.copy(filters);

      console.info('appliedFilters', this.appliedFilters);
    };

    FilterManager.prototype.clearSelected = function () {
      angular.forEach(this.filterConfig.controls, function (val, key) {
        val.clear();
      });
    };

    FilterManager.prototype.resetFilters = function () {
      this.clearSelected();
      this.appliedFilters.length = 0;

      console.info('appliedFilters', this.appliedFilters);
    };

    return FilterManager;
  }

})(window, window.angular);