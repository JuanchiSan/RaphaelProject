define([
  'backbone',
  'figureModel',
  'config'
  ],
  function(Backbone, FigureModel, Config){
    var CircleModel = FigureModel.extend({

      moredefaults: {
        radious: Config.radius
      },

      initialize: function() {
        //this.set(this.moredefaults);
      }

    });
    return CircleModel;
  }
);