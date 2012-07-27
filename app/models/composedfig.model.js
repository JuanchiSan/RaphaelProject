define([
  'backbone',
  'figureModel'
  ],
  function(Backbone, FigureModel){
    var ComposedFigModel = FigureModel.extend( {

      moredefaults: {
        figures: []
      },

      initialize: function() {
        this.figures = [];
      },

      addElement: function(fig) {
        this.figures.push(fig);
      }

    });
    return ComposedFigModel;
  }
);