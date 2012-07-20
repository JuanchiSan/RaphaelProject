define(
  [
    'underscore',
    'backbone',
    'jquery'
  ],
  function(_, Backbone, $) {
    "use strict";
    var FigureView = Backbone.View.extend({

      dragOps: {
        start: function () {
          this.ox = this.type === "rect" ? this.attr("x") : this.attr("cx");
          this.oy = this.type === "rect" ? this.attr("y") : this.attr("cy");
          this.attr({opacity: 1});
        },

        move: function (dx, dy) {
          var att = this.type === "rect" ? {x: this.ox + dx, y: this.oy + dy} : {cx: this.ox + dx, cy: this.oy + dy};
          this.attr(att);
        },

        up: function () {
          this.attr({ opacity: '.5'});
          this.toFront();
        }
      },

      initialize : function() {
      }


    });

    return FigureView;
  }
);
