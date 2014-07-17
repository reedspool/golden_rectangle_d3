/* Driver.js: Run our web app! */
define(['d3', 'jquery', 'lodash', 'jquery.eventAggregator', 'knockout', 'utility', 'recursive-golden-rectangle.d3'],
  function(d3, $, _, eventAggregator, ko, utility, goldenRectangleChart) {
    // d3 components
	var chart = goldenRectangleChart()
		.maxDepth(10);

	// Assumption: svg.goldenRectangle exists in HTML
  	d3.select('.goldenRectangle').call(chart);
  	d3.select('.goldenRectangle2').call(chart);
  }
);
