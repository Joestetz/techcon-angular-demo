(function (window, angular, undefined) {
  'use strict';

  angular.module('demoApp')
    .directive('filtersToggle', filtersToggle);

  function filtersToggle() {
    return {
      restrict: 'C',
      link: function (scope, ele) {
        ele.bind('click', function () {
          $(this).closest('#filter-control').find('#advanced-filters').slideToggle();
          $(this).closest('#filter-control').find('#filter-toggle > i').toggleClass('icon-collapse icon-expand');
          return false;
        });
      }
    };
  }

})(window, window.angular);