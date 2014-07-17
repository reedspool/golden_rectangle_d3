require.config({
  baseUrl: "/scripts",
  paths: {
			// Vendor
      "jquery": "/bower_components/jquery/dist/jquery",
			"d3": "/bower_components/d3/d3",
			"lodash": "/bower_components/lodash/dist/lodash",
			"crossfilter": "/bower_components/crossfilter/crossfilter",
			"q": 'q.no-require',
      "jquery.eventAggregator": '/bower_components/jqueryeventaggregator/eventAggregator.jquery',
      "jquery.scrollTo": '/bower_components/jquery.scrollTo/jquery.scrollTo',

      "bootstrap.modal": '/bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/modal',
      "bootstrap": '/bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap',
      "knockout": '/bower_components/knockout/dist/knockout',
      "knockout.mapping": 'knockout.mapping-latest'
  },
  shim: {
    'crossfilter': {
      deps: [],
      exports: 'crossfilter'
    },
    'jquery.eventAggregator': ['jquery'],
    'jquery.scrollTo': ['jquery'],
  },

  waitSeconds: 15
});

require(['driver'], function (driver) {
  /*
   * Don't need to do anything here,
   * require()ing driver makes it do work
   * So check out /scripts/driver.js!
   */
})
