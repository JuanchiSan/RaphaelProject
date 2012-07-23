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
    'rectangleView',
    'arcModel',
    'arcView'
  ],
  function( MainView, PaperView, PaperModel, CircleModel, CircleView, RectangleModel, RectangleView, ArcModel, ArcView ) {
    'use strict';
    return {
      init : function() {
        var mv = new MainView();

        var paperModel = new PaperModel();
        var paper = paperModel.getCanvas("figure-container");

        var a_circle = new CircleModel({x: '300', y: '180', radious: '50'});
        var a_circle_view = new CircleView( {'model': a_circle}, paper );

        var a_circle2 = new CircleModel({x: '500', y: '50', radious: '40'});
        var a_circle_view2 = new CircleView( {'model': a_circle2}, paper );

        var a_circle3 = new CircleModel({x: '500', y: '300', radious: '60'});
        var a_circle_view3 = new CircleView( {'model': a_circle3}, paper );

        var a_rect = new RectangleModel({x: '100', y: '50', width: '50', height: '50'});
        var a_rect_view = new RectangleView( {'model': a_rect}, paper );

        // arc between nodes:
        var myArc = new ArcModel( {'from': a_rect, 'to': a_circle} );
        var myArc_view = new ArcView({'model': myArc}, paper);

        var myArc2 = new ArcModel( {'from': a_circle, 'to': a_circle2} );
        var myArc_view2 = new ArcView({'model': myArc2}, paper);

        var myArc3 = new ArcModel( {'from': a_circle, 'to': a_circle3} );
        var myArc_view3 = new ArcView({'model': myArc3}, paper);

        var myArc4 = new ArcModel( {'from': a_circle3, 'to': a_circle2} );
        var myArc_view4 = new ArcView({'model': myArc4}, paper);

        //a_rect.set({x: 300, y: 250});
      }
    };
  }
);
