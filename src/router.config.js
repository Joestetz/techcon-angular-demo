(function (window, angular, undefined) {
  'use strict';

  angular.module('demoApp')
    .config(routerConfig);

  routerConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$urlMatcherFactoryProvider'];

  function routerConfig($stateProvider, $urlRouterProvider, $urlMatcherFactory) {
    $urlMatcherFactory.caseInsensitive(true);
    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'home/home.tpl.html',
        controller: 'HomeController',
        controllerAs: 'vm'
      });
  }

})(window, window.angular);