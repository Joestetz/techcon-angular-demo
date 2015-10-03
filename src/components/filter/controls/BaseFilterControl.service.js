(function (window, angular, undefined) {
  'use strict';

  angular.module('demoApp')
    .factory('BaseFilterControl', BaseFilterControlFn);

  function BaseFilterControlFn() {
    var BaseFilterControl = function (options) { };

    BaseFilterControl.prototype.appendSelected = function (filterArray) {
      throw new Error('Not Implemented');
    };

    BaseFilterControl.prototype.displayLabel = function (filterObj) {
      throw new Error('Not Implemented');
    };

    BaseFilterControl.prototype.setValue = function (filter) {
      throw new Error('Not Implemented');
    };

    BaseFilterControl.prototype.clear = function () {
      throw new Error('Not Implemented');
    };

    BaseFilterControl.prototype.remove = function (filter) {
      throw new Error('Not Implemented');
    };

    return BaseFilterControl;
  }

})(window, window.angular);