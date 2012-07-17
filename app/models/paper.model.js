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
      },

      initialize : function() {
        console.log('raphaelX: ' + this.sizeX);
        console.log('raphael El: ' + this.elementId);
        // this.sizeX = 300;
        // this.sizeY = 600;
        // this.elementId = '#figure_container';
        console.log(this.sizeX);
        this.canvas = new Raphael('figure_container', 300, 600);
        var circle = this.canvas.circle(10, 10, 5);
      }

    });

    return PaperModel;
  }
);
