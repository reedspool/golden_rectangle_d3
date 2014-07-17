# Golden Rectangle in d3js

A rendering of the [Golden Spiral](http://en.wikipedia.org/wiki/Golden_spiral) using d3.js

The chart is defined with mbostocks recommended [chart template](http://bost.ocks.org/mike/chart/), with the interesting twist that it is (sometimes doubly) recursive.

### Example useage:
	// d3 components
	var chart = goldenRectangleChart();

	// Assumption: svg.goldenRectangle exists in HTML
  	d3.select('.goldenRectangle').call(chart);

	// Same thing, but with additonal options:

	// d3 components
	var chart = goldenRectangleChart()
		// How many levels down to go.
		.maxDepth(9)
		// Draw the doubley nested beautiful rectangle
		// WARNING: Setting mini to 'true' incurs SERIOUS performance lag
		// Suggest you don't go above maxDepth 10 when this is turned on.
		.mini(true);

	// Assumption: svg.goldenRectangle exists in HTML
  	d3.select('.goldenRectangle').call(chart);