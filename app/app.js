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
  'arcView',
  'composedFigModel',
  'composedView',
  'arcBuilderView'
  ],
  function( MainView, PaperView, PaperModel, CircleModel, CircleView, RectangleModel, RectangleView,
    ArcModel, ArcView, ComposedFigModel, ComposedView, ArcBuilderView ) {
    'use strict';
    return {
      init : function() {
        var mv = new MainView();

        // some nodes:
        var paperModel = new PaperModel();
        var paper = paperModel.getCanvas('figure-container');

        var a_circle = new CircleModel({x: '300', y: '180', radius: '50'});
        var a_circle_view = new CircleView({'model': a_circle}, paper);

        var a_circle2 = new CircleModel({x: '500', y: '50', radius: '40'});
        var a_circle_view2 = new CircleView({'model': a_circle2}, paper);

        var a_circle3 = new CircleModel({x: '500', y: '300', radius: '60'});
        var a_circle_view3 = new CircleView({'model': a_circle3}, paper);

        var a_rect = new RectangleModel({x: '100', y: '50', width: '50', height: '50'});
        var a_rect_view = new RectangleView({'model': a_rect}, paper);

        var a_rect2 = new RectangleModel({x: '600', y: '300', width: '50', height: '50'});
        var a_rect_view2 = new RectangleView({'model': a_rect2}, paper);

        // arc between nodes:
        var myArc = new ArcModel({'from': a_rect, 'to': a_circle});
        var myArc_view = new ArcView({'model': myArc}, paper);

        var myArc2 = new ArcModel({'from': a_circle, 'to': a_circle2});
        var myArc_view2 = new ArcView({'model': myArc2}, paper);

        var myArc3 = new ArcModel({'from': a_circle, 'to': a_circle3});
        var myArc_view3 = new ArcView({'model': myArc3}, paper);

        var myArc4 = new ArcModel({'from': a_circle3, 'to': a_circle2});
        var myArc_view4 = new ArcView({'model': myArc4}, paper);


        // *grouping figures:
        // figures to group:
        var c_circle = new CircleModel({x: '300', y: '400', radius: '20'});
        var c_circle_view = new CircleView({'model': c_circle}, paper);

        var c_circle2 = new CircleModel({x: '400', y: '400', radius: '20'});
        var c_circle_view2 = new CircleView( {'model': c_circle2}, paper);

        var c_myArc = new ArcModel({'from': c_circle, 'to': c_circle2});
        var c_myArc_view = new ArcView({'model': c_myArc}, paper);

        var c_myArc2 = new ArcModel({'from': a_circle, 'to': c_circle});
        var c_myArc_view2 = new ArcView({'model': c_myArc2}, paper);

        // group maker:
        var myComposedFig = new ComposedFigModel();
        myComposedFig.addElement(c_circle);
        myComposedFig.addElement(c_circle2);

        var myComposedFig_view = new ComposedView({model: myComposedFig}, paper);
        myComposedFig_view.addElement([c_circle_view, c_circle_view2]);
      }
    };
});
