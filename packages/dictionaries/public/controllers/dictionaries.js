'use strict';

angular.module('mean.dictionaries').controller('DictionariesController', ['$scope', 'Global', 'Dictionaries',
  function($scope, Global, Dictionaries) {
    $scope.global = Global;
    $scope.package = {
      name: 'dictionaries'
    };
  }
]);
