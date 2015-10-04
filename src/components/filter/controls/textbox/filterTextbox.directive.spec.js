describe('filterTextbox', function () {
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
      }
    };

    var template = '<filter-textbox control-obj="myControlObject"></filter-textbox>';
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
      ctrl = element.controller('filterTextbox');
    });

    it('should set scope options', function () {
      expect(ctrl.options).toBeDefined();
      expect(ctrl.options.placeholder).toBe('bar');
    });
  });
});