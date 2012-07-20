/**
 * Bootstrap application
 */
define(
  [
    'mainView',
    'paperView',
    'paperModel',
    'circleModel',
    'circleView',
    'rectangleModel',
    'rectangleView'
  ],
  function( MainView, PaperView, PaperModel, CircleModel, CircleView, RectangleModel, RectangleView ) {
    'use strict';
    return {
      init : function() {
        //var mv = new MainView(); // WTFFFFFFFFFFFFFFFFF

        var a_cirlce = new CircleModel({x: '100', y: '300', radious: '50'});
        var a_circle_view = new CircleView( {model: a_cirlce} );

        var a_rect = new RectangleModel({x: '200', y: '300', width: '50', height: '50'});
        var a_rect_view = new RectangleView( {model: a_rect} );
      }
    };
  }
);
