angular.module('starter.controllers', [])

  .controller('DashCtrl', [
    '$scope',
    '$ionicPlatform',
    'esriLoader',
    function ($scope, $ionicPlatform, esriLoader) {

      var self = this;

      self.slider = {
        zoomLevel: 16
      };
      self.options = {
        zoom: 16,
        extent: {
          xmin: -9177811,
          ymin: 4247000,
          xmax: -9176791,
          ymax: 4247784,
          spatialReference: 102100
        }
      }

      self.options2 = {
        center: [-73.950, 40.702],
        zoom: 11
      }

      $scope.$watch(function () { return self.slider.zoomLevel },
        function (nv, ov) {
          console.log('slider zoomLevel: ', nv, ov)
          self.options.zoom = angular.copy(parseInt(nv));
        }, true);

      $ionicPlatform.ready(function () {

        esriLoader.require([
          'esri/Map',
          'esri/views/MapView',
          'esri/layers/FeatureLayer',
          'esri/widgets/Zoom'
        ], function (Map, MapView, FeatureLayer, Zoom) {
          // create the map
          self.map = new Map({
            basemap: 'hybrid',
            // slider: false                // doesnt remove the slider, as it should. 
          });

          // create a feature layer
          self.featureLayer = new FeatureLayer({
            url: '//services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Landscape_Trees/FeatureServer/0'
          });

          // create MapView because according to: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Zoom.html 
          // I should only bind widgets i.e. zoom instances, to MapView instances, not Maps. 
          var view = new MapView({
            map: self.map
          });

          // create Zoom widget instance.
          self.zoom = new Zoom({
              view: view,
              visible: false
          });
          
          console.log('Map is: ', self.map);
          console.log('MapView is: ', view);
          console.log('Zoom is: ', self.zoom)

          // add feature layer
          self.map.add(self.featureLayer);

          self.hasFeatureLayer = true;
        });

        self.toggleFeatureLayer = function () {
          // a bit weird, logic is backwards here because ng-model changes value before this is called...
          console.log('toggling feature layer: ', self.hasFeatureLayer)
          if (!self.hasFeatureLayer) {
            console.log('removing layer')
            self.map.remove(self.featureLayer)
          } else {
            console.log('adding layer');
            self.map.add(self.featureLayer);
          }
        }




        // esriLoader.require([
        //   'esri/Map',
        //   'esri/PopupTemplate',
        //   'esri/layers/FeatureLayer'
        // ], function (Map, PopupTemplate, FeatureLayer) {
        //   // create the map
        //   self.map2 = new Map({
        //     basemap: 'dark-gray'
        //   });
        //   var template = new PopupTemplate({
        //     title: 'Marriage in NY, Zip Code: {ZIP}',
        //     content: '<p>As of 2015, <b>{MARRIEDRATE}%</b> of the population in this zip code is married.</p>' +
        //     '<ul><li>{MARRIED_CY} people are married</li>' +
        //     '<li>{NEVMARR_CY} have never married</li>' +
        //     '<li>{DIVORCD_CY} are divorced</li><ul>',
        //     fieldInfos: [{
        //       fieldName: 'MARRIED_CY',
        //       format: {
        //         digitSeparator: true,
        //         places: 0
        //       }
        //     }, {
        //         fieldName: 'NEVMARR_CY',
        //         format: {
        //           digitSeparator: true,
        //           places: 0
        //         }
        //       }, {
        //         fieldName: 'DIVORCD_CY',
        //         format: {
        //           digitSeparator: true,
        //           places: 0
        //         }
        //       }]
        //   });

        //   var featureLayer = new FeatureLayer({
        //     url: '//services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/NYCDemographics1/FeatureServer/0',
        //     outFields: ['*'],
        //     popupTemplate: template
        //   });

        //   self.map2.add(featureLayer);
        // });

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
