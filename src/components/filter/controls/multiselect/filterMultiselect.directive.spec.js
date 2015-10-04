describe('filterMultiselect', function () {
  var compile, scope, rootScope, element, elementScope, ctrl;

  beforeEach(function () {
    module('demoApp');

    inject(function ($compile, $rootScope, $controller) {
      compile = $compile;
      rootScope = $rootScope;
      scope = rootScope.$new();
      ctrl = $controller;
    });
  });

  beforeEach(function () {
    scope.myControlObject = {
      options: {
        title: 'foo',
        placeholderText: 'bar'
      },
      data: ['baz']
    };

    var template = '<filter-multiselect control-obj="myControlObject"></filter-multiselect>';
    element = compile(template)(scope);
    scope.$digest();

    elementScope = element.isolateScope();
  });

  describe('directive scope', function () {
    it('should accept a control-obj attrbiute', function () {
      expect(elementScope.vm.controlObj).toBe(scope.myControlObject);
    });
  });

  describe('directive template', function () {
    it('should display the title from the control-obj options', function () {
      var title = element.find('label').text().trim();

      expect(title).toBe('foo');
    });
  });

  describe('directive controller', function () {
    var ctrl;

    beforeEach(function () {
      ctrl = element.controller('filterMultiselect');
    });

    it('should set scope options', function () {
      expect(ctrl.options).toBeDefined();
      expect(ctrl.options.placeholder).toBe('bar');
      expect(ctrl.options.dataTextField).toBe('title');
      expect(ctrl.options.dataValueField).toBe('id');
    });

    it('should set a kendo datasource', function () {
      expect(ctrl.dataSource).toBeDefined();
      expect(ctrl.dataSource).toEqual(jasmine.any(kendo.data.DataSource));
    });

    it('should have a single datasource item called foo', function () {
      ctrl.dataSource.read();
      expect(ctrl.dataSource._pristineData).toEqual(scope.myControlObject.data);
    });
  });
});