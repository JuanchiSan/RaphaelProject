define([
    'backbone',
    'figureModel'
  ],
  function(Backbone, FigureModel) {
    'use strict';
    var FigureCollection = Backbone.Collection.extend( {

      model : FigureModel,

      initialize : function(){
        //this.fetch({'dataType' : 'jsonp'});
      }

    }
  });
  return FigureCollection;
});