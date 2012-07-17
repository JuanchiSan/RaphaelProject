/**
 * RequireJS bootstrap
 */
require.config({
  paths: {
    'backbone' : '../libs/backbone/backbone',
    'jquery' : '../libs/jquery/jquery-1.7.1.min',
    'underscore' : '../libs/underscore/underscore',
    'raphael' : '../libs/raphael/raphael',
    'text' : '../libs/require/text',
    'hbs' : '../libs/hbs/handlebars-wrapper',
    'mainView': 'views/main.view',
    'paperView': 'views/paper.view',
    'paperModel': 'models/paper.model'
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
