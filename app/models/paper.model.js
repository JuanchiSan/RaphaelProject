/*
 * Model of the main canvas...
 */

define(
  [
  'backbone',
  'raphael',
  'config'
  ],
  function(Backbone, Raphael, Config) {
    "use strict";
    var PaperModel = Backbone.Model.extend( {

      defaults: {
        width: Config.boardWidht,
        hight: Config.boardHight,
        elementId: 'figure_container',
        canvas: ""
      },

      initialize : function() {
        this.width = Config.boardWidht;
        this.hight = Config.boardHight;
        // this.elementId = '#figure_container';
        this.canvas = new Raphael(10,10, this.width, this.hight);
      }

    });

    return new PaperModel();
  }
);
