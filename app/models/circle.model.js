define([
  'backbone',
  'figureModel',
  'config'
  ],
  function(Backbone, FigureModel, Config){
    var CircleModel = FigureModel.extend({

      defaults: {
        radious: Config.radious
      }

    });
    return CircleModel;
   }
);