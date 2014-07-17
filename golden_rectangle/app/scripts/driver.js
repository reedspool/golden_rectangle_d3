/* Driver.js: Run our web app! */
define(['d3', 'jquery', 'lodash', 'jquery.eventAggregator', 'knockout', 'utility', 'recursive-golden-rectangle.d3'],
  function(d3, $, _, eventAggregator, ko, utility, goldenRectangleChart) {
    
    // Golden ratio. Using φ cuz I just learned I can.
	var φ = 1.618;

	// Start with some auto made bases...
	var pxMaxBase = m = 80,
		numRectangles = 6,
		bases = [pxMaxBase];

	// d3 components
	// WARNING: FILLED WITH MATH!
	var arc = d3.svg.arc()
		    .innerRadius(function (d, i) {
		    	// Arbitrary: for style
		    	return d / 3;
		    })
		    // Use the squares side length for radius
		    .outerRadius(utility.identity)
		    .startAngle(function (base, i) {
		    	var deg = [270, 0, 90, 180][i % 4]

		    	return utility.degToRad(deg)
		     })
		    .endAngle(function (base, i) {
		    	var deg = [360, 90, 180, 270][i % 4]

		    	return utility.degToRad(deg)
		     }),
		chart = goldenRectangleChart(),
	    rotateArc = function (base, i) { 
  			// WARNING: MATH!
  			var deg = i * 90 % 360 - 90;
  			return 'rotate(' + deg + ')'
  		},
  		translateArc = function (d, i) { return "translate(" + (i + 500) + ',' + 250 + ")" }


	_.times(numRectangles, function (i) {
		var last = _.last(bases),
			// WARNING: MATH!
			nextBase = φ * last - last;

		bases.push(nextBase);
	});

	// Assumption: svg.goldenRectangle exists in HTML
  	var svg = d3.select('.goldenRectangle'),
  		up = svg.selectAll('.sub-rectangle')
	  		.data(bases),
  		en = up.enter(),
  		ex = up.exit();

  		svg.call(chart);

//TRYING OUT RECURSIVE D3 CHART VERSION
 //  	var rectangleWrapper = en.append('svg:g')
 //  		.classed('sub-rectangle', true)




	// // Now add a outer rectangle
	// rectangleWrapper.append('svg:rect')
 //  		.attr('width', function (d) { return d + 'px' })

 //  		// Make the height the appropriate ratio
 //  		.attr('height', function (base, i) {
 //  			// WARNING: MATH!
 //  			return (base + bases[i + 1]) + 'px'; // That wasn't that hard
 //  		 })
 //  		.attr("transform", function (base, i) { 
 //  			return translateArc(base, i) + ' ' + rotateArc(base, i)
 //  		 })


	// // And an arc
	// rectangleWrapper.append("path")
	// 	.classed('arc', true)
	//     .attr("d", arc)
	//     .attr("transform", translateArc)


  }
);
