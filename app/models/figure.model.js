define([
  'backbone'
  ],
  function(Backbone){
    var FigureModel = Backbone.Model.extend({

      x: function(){
        return this.get('x');
      },

      y: function(){
        return this.get('y');
      }

    });
    return FigureModel;
   }
);