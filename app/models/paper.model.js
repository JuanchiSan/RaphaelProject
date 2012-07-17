/*
 * Model of the main canvas...
 */

define(
  [
  'backbone',
  'raphael'
  ],
  function(Backbone, Raphael) {
    "use strict";
    var PaperModel = Backbone.Model.extend( {

      defaults: {
        sizeX: 300,
        sizeY: 600,
        elementId: '#figure_container',
        canvas: ""
        //canvas: new Raphael('figure_container', this.sizeX, this.sizeY)
      },

      initialize : function(){
        this.canvas = new Raphael(this.elementId, this.sizeX, this.sizeY);
      }

    });

    return PaperModel;
  }
);
