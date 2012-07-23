define([
  'backbone',
  'config'
  ],
  function(Backbone, Config){
    'use strict';
    var BoardModel = Backbone.Model.extend({
      defaults : {
        height: Config.boardHeight,
        width: Config.boardWidth
      }

    });
    return BoardModel;
   }
);