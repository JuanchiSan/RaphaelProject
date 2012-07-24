define(
  [
    'underscore',
    'backbone',
    'figureView',
    'jquery'
  ],
  function(_, Backbone, FigureView, $) {
    "use strict";
    var ComposedView = FigureView.extend({

      events: {
        // 'mouseover': 'select',
        // 'mouseout': 'select',
        // 'mouseup': 'shake'
        'mouseover': 'alertt'
      },

      /*
       * Paper and circle atts shuld be defined on creation...
       */

      views: [],
      mySet: "",

      dragOps: {
        start: function () {
          this.mapModel.forEach( function(elem) {
            elem.ox = elem.type === "rect" ? window.parseInt(elem.attr("x")) : window.parseInt(elem.attr("cx"));
            elem.oy = elem.type === "rect" ? window.parseInt(elem.attr("y")) : window.parseInt(elem.attr("cy"));
            elem.animate({"fill-opacity": '.5'}, 300);
          });
        },

        move: function (dx, dy) {

          this.mapModel.forEach( function(elem) {
            console.log("------>");
            var att = (elem.type === "rect") ?
                         {x: elem.ox + dx, y: elem.oy + dy}
                         : {cx: elem.ox + dx, cy: elem.oy + dy};

            // to keep track of the place where the figure is
            //  so in this way if figure move (by drag) backbone model of the figure update its position...
            elem.attr( att );

            // to keep updated the position in the backbone model asosiated with this Raphael element:
            var mx = (elem.type === "rect")? att.x: att.cx;
            var my = (elem.type === "rect")? att.y: att.cy;
            this.mapModel.set({ x: mx, y: my});
          });

        },

        up: function () {
          this.mapModel.animate({"fill-opacity": '1'}, 300);
          this.mapModel.toFront();
        }
      },

      initialize : function(obj, paper) {
        _.bindAll(this, 'render');
        this.model.bind('change', this.render );

        this.paper = paper;
        this.render();

        //this.model.mySet({'graphicElem': this.graphicElem});
      },

      /*
       * elems = []
       * elems: esta compuesto por el modelo a insertar y su vista. Ambos de Backbone.
       *  elems: [{ model: <a_model>, view: <a_view> }, ...]
       */
      addElement: function(elems) {
        //console.log(elem.view);
        ///console.log(elem.view.graphicElem.mapModel);
        elems.forEach( function(elem){
          this.views.push(elem.view);
          //this.mySet.push(elem.model.mapModel);
          this.mySet.push(elem.view.graphicElem.mapModel);
        }, this);
        //this.mySet.attr({stroke: 'red'});
      },

      render: function() {
        if (!this.graphicElem) {
          // create the set that is container for the whole figures.
          //this.paper.setStart();
          this.mySet = this.paper.set();

          // var a = this.paper.circle(100, 100, 100);
          // var b = this.paper.circle(20, 3, 5);
          // a.attr({stroke: 'blue', fill:'white'});
          // b.attr({stroke: 'blue', fill:'blue'});
          // this.mySet.push(a);
          // this.mySet.push(b);

          this.graphicElem = this.mySet;
          // porqueria, a cada elemento del set le agrego referencia al set completo.
          //  asi, cuando se mueve uno (por drag) éste mueve a los demas...
          this.graphicElem.forEach( function(elem){elem.mapModel = this.mySet;}, this );

          // adding drag functionality:
          this.graphicElem.drag( this.dragOps.move, this.dragOps.start, this.dragOps.up );
          this.graphicElem.attr({cursor: "move"});

          // El "el" de la vista se obtiene de la biblioteca raphael...
          //this.el = this.graphicElem.node;
          //this.$el = $(this.graphicElem.node);
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

      alertt: function() {
        console.log("q lo pario");
      }


    });

    return ComposedView;
  }
);
