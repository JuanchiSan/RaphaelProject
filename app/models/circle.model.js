define([
  'backbone',
  'models/figure.model'
  ],
  function(Backbone, FigureModel){
    var CircleModel = FigureModel.extend({

      radius: function () {
        return this.get('radius');
      }

    });
    return CircleModel;
   }
);