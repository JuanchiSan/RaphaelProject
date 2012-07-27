define([
  'backbone',
  'figureModel'
  ],
  function(Backbone, FigureModel){
    var ArcModel = Backbone.Model.extend({

      defaults: {
        width: 4,
        color: 'gray'
      },

      initialize: function() {
        // this.from = ;
        // this.to = ;
      }

    });
    return ArcModel;
  }
);