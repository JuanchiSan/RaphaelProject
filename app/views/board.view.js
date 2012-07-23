define(
  [
    'jquery',
    'backbone',
    'raphael',
    'figureModel',
    'config'
  ],
  function($ ,Backbone, Raphael, FigureModel, Config) {
    'use strict';
    var BoardView = Backbone.View.extend({

      events: {

      },
      //esto esta bien??
      paper : null,

      initialize : function() {
        this.paper = Raphael("figure_container", Config.boardWidth, Config.boardHeight);
        // this.render();
      },

      render : function() {
      },

      addfigure : function(figure){

      }

    });

    return BoardView;
  }
);
