(function (window, angular, undefined) {
  'use strict';

  angular.module('demoApp')
    .factory('MultiselectFilterControl', MultiselectFilterControlFn);

  MultiselectFilterControlFn.$inject = ['BaseFilterControl'];

  function MultiselectFilterControlFn(BaseFilterControl) {
    var MultiselectFilterControl = function (options) {
      this.options = angular.extend({
        valueType: 0,
        title: '',
        data: [],
        placeholderText: 'Select Options...',
        selectedItems: []
      }, options);

      this.data = this.options.data || [];
    };

    MultiselectFilterControl.prototype = new BaseFilterControl(this.options);

    MultiselectFilterControl.prototype.appendSelected = function (filterArray) {
      var self = this;
      if (!self.options.selectedItems || self.options.selectedItems.length <= 0) return;

      angular.forEach(self.options.selectedItems, function (val, key) {
        if (!val.id || val.id === '' || val.id < 0) return;

        filterArray.push({
          control: self,
          item: val
        });
      });
    };

    MultiselectFilterControl.prototype.displayLabel = function (filterObj) {
      return this.options.title + ': ' + filterObj.item.title;
    };

    MultiselectFilterControl.prototype.setValue = function (filter) {
      if (!this.options.selectedItems) {
        this.options.selectedItems = [];
      }
      this.options.selectedItems.push(filter.item);

      return { control: this, item: filter.item };
    };

    MultiselectFilterControl.prototype.clear = function () {
      this.options.selectedItems = null;
    };

    MultiselectFilterControl.prototype.remove = function (filter) {
      if (!filter.item || this.options.selectedItems.length <= 0) return;

      var self = this;
      angular.forEach(self.options.selectedItems, function (val, key) {
        if (val.id && val.id === filter.item.id) {
          var newSelected = angular.copy(self.options.selectedItems);
          newSelected.splice(key, 1);

          self.options.selectedItems = newSelected;
        }
      });
    };

    return MultiselectFilterControl;
  }

})(window, window.angular);