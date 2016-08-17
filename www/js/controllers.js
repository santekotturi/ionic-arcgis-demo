angular.module('starter.controllers', [])

  .controller('DashCtrl', ['$scope', '$ionicPlatform', 'esriLoader', function ($scope, $ionicPlatform, esriLoader) {

    var self = this;
    // self.options = { scale: 100000000, center: [-180.17, 21.78] }
    self.options = {
      extent: {
        xmin: -9177811,
        ymin: 4247000,
        xmax: -9176791,
        ymax: 4247784,
        spatialReference: 102100
      }
    }
    console.log('loading controller');
    $ionicPlatform.ready(function () {
      console.log('platform ready');
      esriLoader.require([
        'esri/Map',
        'esri/layers/FeatureLayer'
      ], function (Map, FeatureLayer) {
        // create the map
        self.map = new Map({
          basemap: 'hybrid'
        });
        // and add a feature layer
        var featureLayer = new FeatureLayer({
          url: '//services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Landscape_Trees/FeatureServer/0'
        });

        self.map.add(featureLayer);
      });
    });


  }])












  .controller('ChatsCtrl', function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    };
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
