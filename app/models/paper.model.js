/*
 * Model of the main canvas...
 */

define(
  [
  'backbone',
  'raphael',
  'config',
  'jquery'
  ],
  function(Backbone, Raphael, Config, $) {
    "use strict";
    var PaperModel = Backbone.Model.extend( {

      defaults: {
        width: Config.boardWidht,
        hight: Config.boardHight
      },

      initialize : function() {
        this.width = Config.boardWidht;
        this.hight = Config.boardHight;
        //this.container = container;
      },

      getCanvas: function(container){
        if (!this.canvas) {
          //console.log("creating canvas in paper model");
          this.canvas = new Raphael(container, this.width, this.hight);
        }
        return this.canvas;
      }

    });

    return PaperModel;
  }
);
