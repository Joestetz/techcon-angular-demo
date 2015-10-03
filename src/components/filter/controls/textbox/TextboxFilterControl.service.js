(function (window, angular, undefined) {
  'use strict';

  angular.module('demoApp')
    .factory('TextboxFilterControl', TextboxFilterControlFn);

  TextboxFilterControlFn.$inject = ['BaseFilterControl'];

  function TextboxFilterControlFn(BaseFilterControl) {
    var TextboxFilterControl = function (options) {
      this.options = angular.extend({
        title: '',
        value: '',
        placeholderText: ''
      }, options);

      this.value = this.options.value || '';
    };

    TextboxFilterControl.prototype = new BaseFilterControl(this.options);

    TextboxFilterControl.prototype.appendSelected = function (filterArray) {
      if (this.options.value === '' || this.options.value === this.options.placeholderText) return;

      filterArray.push({
        control: this,
        item: this.options.value
      });
    };

    TextboxFilterControl.prototype.displayLabel = function (filterObj) {
      return this.options.title + ': ' + filterObj.item;
    };

    TextboxFilterControl.prototype.clear = function () {
      this.options.value = '';
    };

    TextboxFilterControl.prototype.remove = function (filter) {
      if (!filter.item || this.options.value != filter.item )return;
      this.options.value = '';
    };

    return TextboxFilterControl;
  }

})(window, window.angular);