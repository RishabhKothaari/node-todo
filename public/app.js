//app.js

var app = angular.module('app',['ngMaterial']);

app.config(function($mdThemingProvider){
  $mdThemingProvider.theme('default')
  .primaryPalette('indigo')
  .accentPalette('pink')
  .warnPalette('red')
  .backgroundPalette('blue')
  .dark()
});
