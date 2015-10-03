(function (window, angular, undefined) {
  'use strict';

  angular.module('demoApp')
    .factory('DropdownFilterControl', DropdownFilterControlFn);

  DropdownFilterControlFn.$inject = ['BaseFilterControl'];

  function DropdownFilterControlFn(BaseFilterControl) {
    var DropdownFilterControl = function (options) {
      this.options = angular.extend({
        valueType: 0,
        title: '',
        data: [],
        placeholderText: '-- All --',
        selectedItem: null
      }, options);

      this.data = this.options.data || [];
    };

    DropdownFilterControl.prototype = new BaseFilterControl(this.options);

    DropdownFilterControl.prototype.appendSelected = function (filterArray) {
      if (!this.options.selectedItem || this.options.selectedItem.id === '' || this.options.selectedItem.id < 0) return;

      filterArray.push({
        control: this,
        item: this.options.selectedItem
      });
    };

    DropdownFilterControl.prototype.clear = function () {
      this.options.selectedItem = null;
    };

    return DropdownFilterControl;
  }

})(window, window.angular);