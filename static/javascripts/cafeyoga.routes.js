(function () {
  'use strict';

  angular
    .module('cafeyoga.routes')
    .config(config);

  config.$inject = ['$routeProvider'];

  /**
  * @name config
  * @desc Define valid application routes
  */
  function config($routeProvider) {
    $routeProvider.when('/register', {
      controller: 'RegisterController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/authentication/register.html'
    }).when('/login', {
      controller: 'LoginController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/authentication/login.html'
    }).when('/monespace', {
      controller: 'RegisterController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/authentication/monespace.html'
    }).when('/settings', {
      controller: 'SettingsController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/authentication/settings.html'
    }).when('/yoga/', {
      controller: 'YogaAnimatorsController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/yoga/animateurs.html'
    }).when('/restaurant/', {
      controller: 'NosProduitsController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/restaurant/nosproduits.html'
    }).when('/boutique/', {
      controller: 'BoutiqueController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/boutique/boutique.html'
    }).when('/evenements',{
      controller: 'EvenementsController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/evenements/evenements.html'
    }).when('/',{
      controller: 'LandingPageController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/general/landingpage.html'
    }).when('/contact',{
      controller: 'ContactController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/general/contact.html'
    }).when('/presentation',{
      controller: 'LandingPageController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/general/presentation.html'
    }).otherwise({
       redirectTo:"/"
    });
  }
})();