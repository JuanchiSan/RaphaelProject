/**
 * Bootstrap application
 */
define(
  [
    'mainView',
    'paperView',
    'paperModel'
  ],
  function( MainView, PaperView, PaperModel ) {
    'use strict';
    return {
      init : function() {
        // var mv = new MainView();
        // var pm = new PaperModel({elementId: '#figure_container'});
        // var pv = new PaperView({model: pm});
      }
    };
  }
);
