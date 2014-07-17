define(['d3', 'utility'], 
function (d3, utility) {

	function chartFactory() {
		var maxDepth = 5
		var depth = 0;
		// svg is <svg></svg> or <svg:g></svg:g>
		function chart(svgEl) {
			// Don't wanna get too deep...
			if (depth++ > maxDepth) return;

			// Save me... so we can track depth here
			var calleeChart = arguments.callee;

			// Draw a square inside this box, then make a g
			svg = d3.select(svgEl)

			var φ = 1.618;

			var base = svg.height(),
				width = svg.width()
			
			// d3 component(s)
			// WARNING: FILLED WITH MATH!
			var arc = d3.svg.arc()
			    .innerRadius(function (d, i) {
			    	// Arbitrary: for style
			    	return d / 3;
			    })
			    // Use the squares side length for radius
			    .outerRadius(utility.identity)
			    .startAngle(utility.degToRad(270))
			    .endAngle(utility.degToRad(360))

			// Give it data to work with
			svg.datum(base)

			// A square, 
			svg.append('svg:rect')
		  		.attr('width', utility.px)
		  		.attr('height', utility.px)
		  		.attr("transform", function (base) { 
			    	return utility.translate(base, base)
			    })

			// And an arc
			svg.append("svg:path")
				.classed('arc', true)
			    .attr("d", arc)
			    .attr("transform", function (base) { 
			    	return utility.translate(base, base)
			    })

			svg.append('svg:g')
				.attr('height', px)
				// Apply the scale
				.attr('width', function (base, i) { return base + base * φ; })
				.attr("transform", function (base) { 
			    	return utility.translate(0, base)
			    })

		}



		return chart;
	}

	return chartFactory;
})