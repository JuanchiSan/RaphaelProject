define([
  'backbone'
  ],
  function(Backbone){
    var FigureModel = Backbone.Model.extend({

      defaults: {
        title: 'myClass',
        x: 0,
        y: 0
      }

    });
    return FigureModel;
   }
);