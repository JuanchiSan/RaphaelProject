/**
 * Bootstrap application
 */
define(
  [
    'mainView',
    'boardView',
    'circleView',
    'rectView'
  ],
  function( MainView, BoardView, CircleView, RectView) {
    'use strict';
    return {
      init : function() {
        var mv = new MainView();
        var board = new BoardView();



        //console.log(board.paper);
        var rectview = new RectView(board);
        var circview = new CircleView(board);

      }
    };
  }
);
