describe('filterContainer', function () {
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
    scope.myFilterManager = jasmine.createSpyObj('myFilterManager', ['clearSelected', 'resetFilters', 'removeFilter']);

    var template = '<filter-container filter-manager="myFilterManager"></filter-container>';
    element = compile(template)(scope);
    scope.$digest();

    elementScope = element.isolateScope();
  });

  describe('directive scope', function () {
    it('should accept a filter-manager attrbiute', function () {
      expect(elementScope.fc.filterManager).toBe(scope.myFilterManager);
    });
  });

  describe('directive template', function () {
    
  });

  describe('directive controller', function () {
    var ctrl;

    beforeEach(function () {
      ctrl = element.controller('filterContainer');
    });

    describe('Method: applyFilters', function () {
      it('is defined', function () {
        expect(ctrl.applyFilters).toBeDefined();
      });
    });

    describe('Method: clear', function () {
      it('is defined', function () {
        expect(ctrl.clear).toBeDefined();
      });

      it('calls filterManager.clearSelected', function () {
        ctrl.clear();
        expect(ctrl.filterManager.clearSelected).toHaveBeenCalled();
      });
    });

    describe('Method: reset', function () {
      it('is defined', function () {
        expect(ctrl.reset).toBeDefined();
      });

      it('calls filterManager.resetFilters', function () {
        ctrl.reset();
        expect(ctrl.filterManager.resetFilters).toHaveBeenCalled();
      });
    });

    describe('Method: removeFilter', function () {
      it('is defined', function () {
        expect(ctrl.removeFilter).toBeDefined();
      });

      it('calls filterManager.removeFilter', function () {
        ctrl.removeFilter('foo', 0);
        expect(ctrl.filterManager.removeFilter).toHaveBeenCalledWith('foo', 0);
      });
    });
  });
});