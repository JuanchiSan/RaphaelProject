define(
  [
  'underscore',
  'backbone',
  'figureView',
  'jquery'
  ],
  function(_, Backbone, FigureView, $) {
    'use strict';
    var ComposedView = FigureView.extend({

      events: {
        // 'mouseover': 'select',
        // 'mouseout': 'select',
        // 'mouseup': 'shake'
        //'mouseover': 'alertt'
      },

      views: [],
      mySet: '',

      dragOps: {
        start: function () {
          this.figSet.forEach( function(elem) {
            elem.ox = elem.type === 'rect' ? window.parseInt(elem.attr('x')) : window.parseInt(elem.attr('cx'));
            elem.oy = elem.type === 'rect' ? window.parseInt(elem.attr('y')) : window.parseInt(elem.attr('cy'));
            elem.animate({'fill-opacity': '.5'}, 300);
          });
        },

        move: function (dx, dy) {
          this.figSet.forEach( function(elem) {
            var att = (elem.type === 'rect') ?
              {x: elem.ox + dx, y: elem.oy + dy}
              : {cx: elem.ox + dx, cy: elem.oy + dy};

            // to keep track of the place where the figure is
            elem.attr( att );

            // to keep updated the position in the backbone model asosiated with this Raphael element:
            //  so, in this way, when the figure change its place who is observing the figure (some view) knows it.
            var mx = (elem.type === 'rect')? att.x: att.cx;
            var my = (elem.type === 'rect')? att.y: att.cy;
            elem.mapModel.set({ x: mx, y: my});
          });
        },

        up: function () {
          this.figSet.animate({'fill-opacity': '1'}, 300);
          this.figSet.toFront();
        }
      },

      initialize : function(obj, paper) {
        _.bindAll(this, 'render');
        this.model.bind('change', this.render );

        this.paper = paper;

        // create the set that is container for the whole figures.
        this.mySet = this.paper.set();

        this.render();
      },

      /*
       * Add a list of views to the composed view.
       * views = []
       * views: is an array composed by Backbone views.
       */
      addElement: function(views) {
        views.forEach( function(view){
          // undrag the particular drag functionality added by the element view.
          view.graphicElem.undrag();
          view.graphicElem.figSet = this.mySet;
          this.mySet.push(view.graphicElem);
          this.views.push(view);
        }, this);

        // add a new drag functionality with this dragOps.
        this.mySet.drag( this.dragOps.move, this.dragOps.start, this.dragOps.up );
      },

      render: function() {
        if (!this.graphicElem) {

         this.graphicElem = this.mySet;
          // a cada elemento del set le agrego referencia al set completo.
          //  asi, cuando se mueve uno (por drag) éste mueve a los demas... (?)
          this.graphicElem.forEach( function(elem){elem.figSet = this.mySet;}, this );

          // adding drag functionality:
          this.graphicElem.drag( this.dragOps.move, this.dragOps.start, this.dragOps.up );
          this.graphicElem.attr({cursor: 'move'});

          // la vista compuesta no tiene elemento el (?)
        }
      }

    });

    return ComposedView;
  }
);
