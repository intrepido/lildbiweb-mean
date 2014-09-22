'use strict';

angular.module('mean.dictionaries').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('dictionaries example page', {
      url: '/dictionaries/example',
      templateUrl: 'dictionaries/views/index.html'
    });
  }
]);
