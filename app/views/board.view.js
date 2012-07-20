define(
  [
    'jquery',
    'backbone',
    'raphael',
    'figureModel'
  ],
  function($ ,Backbone, Raphael, FigureModel) {
    'use strict';
    var BoardView = Backbone.View.extend({

      el : '#figure_container',
      

      events: {

      },

      initialize : function() {
        this.paper = Raphael(this.el, Config.boardWidth, Config.boardHeight);
        this.el = this.paper.canvas;

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
