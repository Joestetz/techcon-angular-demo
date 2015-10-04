describe('FilterManager', function () {
  var FilterManager, FilterNotifier, $rootScope;
  var manager, ctrl;

  beforeEach(function () {
    module('demoApp');

    inject(function (_FilterManager_, _FilterNotifier_, _$rootScope_) {
      FilterManager = _FilterManager_;
      FilterNotifier = _FilterNotifier_;
      $rootScope = _$rootScope_;
    });

    spyOn(FilterNotifier, 'filterChanged');

    ctrl = jasmine.createSpyObj('ctrl', ['appendSelected', 'clear', 'remove']);
    manager = new FilterManager({ controls: [ctrl] });

    spyOn(manager, 'clearSelected').and.callThrough();
  });

  describe('Method: applyFilters', function () {
    it('should store a copy of the original filter array', function () {
      var arr = ['foo'];
      manager.applyFilters(arr);

      expect(manager.appliedFilters).toEqual(arr);
      expect(manager.appliedFilters).not.toBe(arr);
    });

    it('should send off a filter changed notification', function () {
      var arr = ['foo'];
      manager.applyFilters(arr);

      expect(FilterNotifier.filterChanged).toHaveBeenCalledWith(arr);
    });
  });

  describe('Method: clearSelected', function () {
    it('should call the control\'s clear method', function () {
      manager.clearSelected();

      expect(ctrl.clear).toHaveBeenCalled();
    });
  });

  describe('Method: resetFilters', function () {
    it('should call clearSelected', function () {
      manager.resetFilters();

      expect(manager.clearSelected).toHaveBeenCalled();
    });

    it('should clear the manager\'s appliedFilters array', function () {
      manager.appliedFilters = ['foo', 'bar'];
      manager.resetFilters();

      expect(manager.appliedFilters).toEqual([]);
    });

    it('should send off a filter changed notification', function () {
      manager.resetFilters();

      expect(FilterNotifier.filterChanged).toHaveBeenCalledWith([]);
    });
  });
});