define(['d3', 'utility'], 
function (d3, utility) {


	var φ = utility.PHI;

	function chartFactory() {
		var maxDepth = 40
		var depth = 0;
		// svg is <svg></svg> or <svg:g></svg:g>

		// Expecting a g prepared as above, not an svg
		function chart(svg) {
			// Don't wanna get too deep...
			if (depth++ > maxDepth) return;

			// Save me... so we can track depth here
			var calleeChart = arguments.callee;

			var height = svg.style('height'),
				base = height == 'auto' ? svg.attr('height') : parseInt(height)
			
			// d3 component(s)
			// WARNING: FILLED WITH MATH!
			var arc = d3.svg.arc()
			    // Use the squares side length for radius
			    // Same room for jesus and the stroke width;
			    .outerRadius(function (base, i) { return base - 0.25 })
			    .startAngle(utility.degToRad(270))
			    .endAngle(utility.degToRad(360))

			// Give it data to work with
			svg.datum(base)

			// A square, 
			svg.append('svg:rect')
				.classed('square', true)
		  		.attr('width', utility.px)
		  		.attr('height', utility.px)

			// And an arc
			svg.append("svg:path")
				.classed('arc', true)
			    .attr("d", arc)
			    .attr("transform", function (base) { 
			    	return utility.translate(base, base)
			    })

			svg.append('svg:g')
				.classed('sub-rectangle', true)
				.attr('width', utility.px)
				// Apply the scale
				.attr('height', function (base, i) { return base * φ - base })
				.attr("transform", function (base) { 
			    	return utility.rotateDeg(90, base/2, base/2) + ' ' + utility.translate(0, -base / φ )
			    })
			    // Finally, the recursive magic!
			    .call(calleeChart)
		}



		return chart;
	}

	return chartFactory;
})