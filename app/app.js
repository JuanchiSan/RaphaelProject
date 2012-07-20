/**
 * Bootstrap application
 */
define(
  [
    'mainView',
    'boardView',
    'circleView',
    'circleModel'
  ],
  function( MainView, BoardView, CircleView, CircleModel) {
    'use strict';
    return {
      init : function() {
        var mv = new MainView();
        var board = new BoardView();



        //console.log(board.paper);

        var circview = new CircleView(board);
        console.log(circview.board);

      }
    };
  }
);
