define([
  'backbone',
  'figureModel',
  'config'
  ],
  function(Backbone, FigureModel, Config){
    var CircleModel = FigureModel.extend({

      moredefaults: {
        radius: Config.radius
      },

      initialize: function() {
        //this.set(this.moredefaults);
      },

      getSizeX: function() {
        return this.radius * 2;
      },

      getSizeY: function() {
        return this.radius * 2;
      }

    });
    return CircleModel;
  }
);