(function (window, angular, undefined) {
  'use strict';

  angular.module('demoApp.filter-final')
    .factory('FilterNotifier', FilterNotifier);

  FilterNotifier.$inject = ['$rootScope'];

  function FilterNotifier($rootScope) {
    var _FILTER_CHANGED_ = 'filter.changed';
    var _FILTER_INITIALIZED_ = 'filter.initialized';
    var filterData;

    // publish filter change notification
    var filterChanged = function (filters) {
      filterData = filters;
      $rootScope.$broadcast(_FILTER_CHANGED_, { filters: filters });
    };

    // subscribe to filter change notification
    var onFilterChanged = function ($scope, handler) {
      return $scope.$on(_FILTER_CHANGED_, function (event, args) {
        handler(args.filters);
      });
    };

    var filterInitialized = function (filters) {
      filterData = filters;
      $rootScope.$broadcast(_FILTER_INITIALIZED_, { filters: filters });
    };

    var onFilterInitialized = function ($scope, handler) {
      if (filterData !== undefined && filterData !== null) {
        handler(filterData);
        return false;
      }

      return $scope.$on(_FILTER_INITIALIZED_, function (event, args) {
        handler(args.filters);
      });
    };

    return {
      filterChanged: filterChanged,
      onFilterChanged: onFilterChanged,
      filterInitialized: filterInitialized,
      onFilterInitialized: onFilterInitialized
    };
  }

})(window, window.angular);