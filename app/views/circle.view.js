define(
  [
    'jquery',
    'backbone',
    'raphael',
    'circleModel',
    'figureView',
    'config'
  ],
  function($ ,Backbone, Raphael, CircleModel, FigureView) {
    'use strict';
    var CircleView = FigureView.extend({

      //el : '#figure_container',

      model : CircleModel,

      events: {

      },

      initialize : function(board) {
        this.model = new CircleModel();
        this.model.set({'x' : 10, 'y' : 10, 'circleRadius' : 10});
        this.render(board);
      },

      render : function(board) {
        var circle = board.paper.circle(this.model.get('x'), this.model.get('y'), this.model.get('circleRadius'));
        this.el = circle.node;
        this.$el = $(circle.node);
        circle.drag(this.dragstart, this.dragmove, this.dragup);
      }
    });

    return CircleView;
  }
);
