(function (window, angular, undefined) {
  'use strict';

  angular.module('demoApp')
    .filter('filterLabel', filterLabel);

  function filterLabel() {

    return function (filterObj) {
      var result = filterObj.control.displayLabel(filterObj);

      return result;
    };
  }

})(window, window.angular);