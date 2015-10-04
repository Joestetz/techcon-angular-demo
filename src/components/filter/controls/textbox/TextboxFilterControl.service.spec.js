describe('TextboxFilterControl', function () {
  var TextboxFilterControl, BaseFilterControl;

  beforeEach(function () {
    module('demoApp');

    inject(function (_TextboxFilterControl_, _BaseFilterControl_) {
      TextboxFilterControl = _TextboxFilterControl_;
      BaseFilterControl = _BaseFilterControl_;
    });
  });

  it('should inherit from BaseFilterControl', function () {
    var control = new TextboxFilterControl();
    expect(control).toEqual(jasmine.any(BaseFilterControl));
  });

  describe('Method: appendSelected', function () {
    it('should not alter the array if there is no provided text', function () {
      var arr = [];
      var control = new TextboxFilterControl();
      control.appendSelected(arr);

      expect(arr).toEqual([]);
    });

    it('should not alter the array if text is equal to placeholder text', function () {
      var arr = [];
      var control = new TextboxFilterControl({ value: "placeholder text", placeholderText: "placeholder text" });
      control.appendSelected(arr);

      expect(arr).toEqual([]);
    });

    it('should alter the array if there is provided text', function () {
      var arr = [];
      var control = new TextboxFilterControl({ value: 'foo' });
      control.appendSelected(arr);

      expect(arr.length).toBe(1);
      expect(arr[0].item).toEqual('foo');
    });
  });

  describe('Method: displayLabel', function () {
    it('should display dropdown content correctly', function () {
      var control = new TextboxFilterControl({ title: 'Foo' });
      var result = control.displayLabel({ item: 'bar' });

      expect(result).toBe('Foo: bar');
    });
  });

  describe('Method: clear', function () {
    it('should clear the selectedItem from control', function () {
      var control = new TextboxFilterControl({ title: 'foo', value: 'bar' });
      control.clear();
      expect(control.options.value).toEqual('');
    });
  });

  describe('Method: remove', function () {
    it('should not alter value if the filter to remove does not match', function () {
      var control = new TextboxFilterControl({ title: 'foo', value: 'bar' });
      control.remove({ item: 'baz' });

      expect(control.options.value).toEqual('bar');
    });

    it('should remove the selectedItem if the filter matches', function () {
      var control = new TextboxFilterControl({ title: 'foo', value: 'bar' });
      control.remove({ item: 'bar' });

      expect(control.options.value).toEqual('');
    });
  });
});