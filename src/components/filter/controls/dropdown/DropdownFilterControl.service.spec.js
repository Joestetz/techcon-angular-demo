describe('DropdownFilterControl', function () {
  var DropdownFilterControl, BaseFilterControl;

  beforeEach(function () {
    module('demoApp');

    inject(function (_DropdownFilterControl_, _BaseFilterControl_) {
      DropdownFilterControl = _DropdownFilterControl_;
      BaseFilterControl = _BaseFilterControl_;
    });
  });

  it('should inherit from BaseFilterControl', function () {
    var control = new DropdownFilterControl();
    expect(control).toEqual(jasmine.any(BaseFilterControl));
  });

  describe('Method: appendSelected', function () {
    it('should not alter the array if there is no selected item', function () {
      var arr = [];
      var control = new DropdownFilterControl();
      control.appendSelected(arr);

      expect(arr).toEqual([]);
    });

    it('should not alter the array if there is an invalid selected item', function () {
      var arr = [];
      var control1 = new DropdownFilterControl({ selectedItem: { title: 'foo', id: '' } });
      var control2 = new DropdownFilterControl({ selectedItem: { title: 'foo', id: -1 } });

      control1.appendSelected(arr);
      control2.appendSelected(arr);

      expect(arr).toEqual([]);
    });

    it('should properly append a selected item to the array', function () {
      var arr = [];
      var control = new DropdownFilterControl({ selectedItem: { title: 'foo', id: 1 } });
      control.appendSelected(arr);

      expect(arr.length).toBe(1);
      expect(arr[0].item).toEqual({ title: 'foo', id: 1 });
    });
  });

  describe('Method: displayLabel', function () {
    it('should display dropdown content correctly', function () {
      var control = new DropdownFilterControl({ title: 'Foo' });
      var result = control.displayLabel({ item: { title: 'bar' } });

      expect(result).toBe('Foo: bar');
    });
  });

  describe('Method: clear', function () {
    it('should clear the selectedItem from control', function () {
      var control = new DropdownFilterControl({ selectedItem: { title: 'foo', id: 1 } });
      control.clear();
      expect(control.options.selectedItem).toBeNull();
    });
  });

  describe('Method: remove', function () {
    it('should not alter selectedItem if the filter to remove does not match', function () {
      var control = new DropdownFilterControl({ selectedItem: { title: 'foo', id: 1 } });
      control.remove({ item: { title: 'bar', id: 2 } });

      expect(control.options.selectedItem).toEqual({ title: 'foo', id: 1 });
    });

    it('should remove the selectedItem if the filter matches', function () {
      var control = new DropdownFilterControl({ selectedItem: { title: 'foo', id: 1 } });
      control.remove({ item: { title: 'foo', id: 1 } });

      expect(control.options.selectedItem).toBeNull();
    });
  });
});