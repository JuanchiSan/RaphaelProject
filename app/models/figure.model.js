define([
  'backbone'
  ],
  function(Backbone){
    var FigureModel = Backbone.Model.extend({

      defaults: {
        title: 'myFigure',
        x: 0,
        y: 0,
        color: 'orange',
        stroke: 'gray',
        'stroke-width': 3
      },

      getCenter: function() {
        // Actualy it's an Abstract Method.
        // RE-IMPLEMENT as necesary in particular models...
        return {x: this.get('x'), y: this.get('y')};
      },

      getSizeX: function() {
        // abstract! shuld return the horizontal size.
      },

      getSizeY: function() {
        // abstract! shuld return the vertical size.
      }
    });

    return FigureModel;
  }
);