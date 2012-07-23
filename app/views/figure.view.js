define(
  [
    'underscore',
    'backbone',
    'jquery'
  ],
  function(_, Backbone, $) {
    "use strict";
    var FigureView = Backbone.View.extend({


      /*
       * Drag operations on start, move and up a figure
       */
      dragOps: {
        start: function () {
          this.ox = this.type === "rect" ? window.parseInt(this.attr("x")) : window.parseInt(this.attr("cx"));
          this.oy = this.type === "rect" ? window.parseInt(this.attr("y")) : window.parseInt(this.attr("cy"));
          this.animate({"fill-opacity": '.5'}, 300);
        },

        move: function (dx, dy) {
          var att = (this.type === "rect") ?
                      {x: this.ox + dx, y: this.oy + dy}
                      : {cx: this.ox + dx, cy: this.oy + dy};
          //var att = {'x': parseInt(this.attr("x")) + 2, 'y': parseInt(this.attr("y")) - 2 };
          this.attr(att);

          // to keep track of the place where the figure is
          //  so in this way if figure move (by drag) backbone model of the figure update its position...
          var mx = (this.type === "rect")? att.x: att.cx;
          var my = (this.type === "rect")? att.y: att.cy;
          this.mapModel.set({ x: mx, y: my});
        },

        up: function () {
          this.animate({"fill-opacity": '1'}, 300);
          this.toFront();
        }
      },

      initialize : function() {
        _.bindAll(this, 'render', 'select', 'shake');
      },

      render : function() {
        if (!this.graphicElem) {
          // generateGraphicElem() <template method> deberia ser creado en cada una
          //  de las vistas de una figura particular.
          // Lo que debe hacer es crear el elemento grafico particular de la vista.
          this.graphicElem = this.generateGraphicElem();

          // adding drag functionality:
          this.graphicElem.drag( this.dragOps.move, this.dragOps.start, this.dragOps.up);
          this.graphicElem.attr({cursor: "move"});

          //this.model.setGraphicElem(this.graphicElem);
          // I set the backbone model to the raphael model, so then it is easy to get it to use...
          this.graphicElem.mapModel = this.model;

          // El "el" de la vista se obtiene de la biblioteca raphael...
          this.el = this.graphicElem.node;
          this.$el = $(this.graphicElem.node);
        }
        else {
          // some of its propieties are changed... so redraw it...
          this.graphicElem.attr({x: this.model.get('x'),
                                 y: this.model.get('y'),
                                 cx: this.model.get('x'),
                                 cy: this.model.get('y')
                               });
        }
      },

      /*
       * when the figure is clicked
       */
      select: function() {
        if ( !this.model.get('selected') ) {
          this.graphicElem.attr({stroke: 'white', 'stroke-width': '6'});
          this.model.set({selected: true});
        }
        else {
          this.graphicElem.attr({stroke: this.model.get('stroke'), 'stroke-width': this.model.get('stroke-width')});
          this.model.set({selected: false});
        }
      },

      shake: function() {
        var mult = 1.4;//Math.random() * 3;
        var oldHeight = this.model.get('width');
        var oldWidht = this.model.get('height');
        var newHeight = oldHeight * mult;

        this.graphicElem.animate( { opacity: 0.5, width: newHeight, height: newHeight}, 80, "<",
          function() {
            this.animate( { opacity: 1, width: oldWidht, height: oldHeight}, 80, "elastic" );
          }
        );
        //this.model.set({'width': newHeight});
      }

// var r = Math.floor(Math.random()*100),
//     g = Math.floor(Math.random()*100),
//     b = Math.floor(Math.random()*100);
// this.graphicElem.attr({fill: 'rgb(' + r + '%,' + g + '%,' + b + '%)'});


    });

    return FigureView;
  }
);
