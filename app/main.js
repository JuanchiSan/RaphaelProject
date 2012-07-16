/**
 * RequireJS bootstrap
 */
require.config({
  paths: {
    'backbone' : '../libs/backbone/backbone',
    'jquery' : '../libs/jquery/jquery-1.7.1.min',
    'underscore' : '../libs/underscore/underscore',
    'Handlebars' : '../libs/handlebars/handlebars-wrapper',
    'hbs' : '../libs/require/hbs'
  },
  hbs : {
    disableI18n : true,
    templateExtension : 'hbs'
  },
  //Load jquery plugins
  shim: {
    'datatable' : {
      deps : ['jquery'],
      exports : 'dataTable'
    },
    'datepicker' : {
      deps : ['jquery'],
      exports : 'datepicker'
    },
    'touch-support' : {
      deps : ['datepicker'],
      exports : 'touch'
    }
  }
});

require(
  [
    'app'
  ],
  function(app) {
    app.init();
  }
);
