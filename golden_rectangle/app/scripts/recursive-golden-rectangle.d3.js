/**
 * See a working version at http://reedspool.github.io/2014/09/06/golden-rectangle-d3.html
 */

define(['d3', 'utility'], 
function (d3, utility) {
	var φ = utility.PHI;

	function chartFactory() {
		var maxDepth = 10,
			depth = 0,

			// Should we present the "mini" chart?
			mini = false,
			showRectangles = false,

			// d3 component(s),
			minusStrokeWidth = function (base, i) { return base - 1 },
			arc = d3.svg.arc()
			    // Use the squares side length for radius
			    // Save room for jesus and the stroke width;
				.innerRadius(minusStrokeWidth)
			    .outerRadius(minusStrokeWidth)
			    .startAngle(utility.degToRad(270))
			    .endAngle(utility.degToRad(360));

		// svg is <svg></svg> or <svg:g class="sub-rectangle"></svg:g>
		function chart(svg) {
			// Don't wanna get too deep...
			if (depth + 1 > maxDepth) return;

			depth++;

			// If svg is the original svg, use the style height and width
			// If svg is one of our composed g's, then its height and width are only available through attributes
			// probably a better way to do this with data binding...
			var height = svg.style('height'),
				width = svg.style('width'),
				base = height == 'auto' ? svg.attr('height') : parseInt(height),
				width = width == 'auto' ? svg.attr('width') : parseInt(width)

			// Extracting the hard stuff
			var mathy = {
				nextBase: function (base, i) {
					// ALL THE MATH!!!
					return base * φ - base
				},
				nextTransform: function (base) {
					// ALL THE MATH!!!
			    	return utility.rotateDeg(90, base / 2, base / 2) +
			    			 ' ' + 
			    			 utility.translate(0, -base / φ )
			    },
			    miniHeight: function (base) { 
			    	// ALL THE MATH!!!
			    	return base / φ 
			    },
			    miniTranslate: function (base) { 
			    	// ALL THE MATH!!!
			    	var d = mathy.miniHeight;
			    	return utility.translate(0, d(d(base))) }
			};
			
			// Give it data to work with
			svg.datum(base)

			// A square, 
			svg.append('svg:rect')
				.classed('square', true)
				.classed('show', function () { return showRectangles  })
		  		.attr('width', function () { return utility.px(width) })
		  		.attr('height', utility.px)

			// And an arc
			svg.append("svg:path")
				.classed('arc', true)
			    .attr("d", arc)
			    .attr("transform", function (base) { 
			    	return utility.translate(base, base)
			    })

			if (mini) {
				// If requested, also draw a second mini-me for each chart
				svg.append('svg:g')
					.classed('sub-rectangle', true)
					.attr('width', utility.identity)
					// Apply the scale
					.attr('height', mathy.miniHeight)
					.attr("transform", mathy.miniTranslate)
				    // Finally, the recursive magic!
				    .call(chart)
			}

			svg.append('svg:g')
				.classed('sub-rectangle', true)
				.attr('width', utility.identity)
				// Apply the scale
				.attr('height', mathy.nextBase)
				.attr("transform", mathy.nextTransform)
			    // Finally, the recursive magic!
			    .call(chart)

		    // Now we are done, set depth back
		    depth--;
		}

		chart.maxDepth = function(value) {
			if (!arguments.length) return maxDepth;
			maxDepth = value;
			return chart;
		};

		chart.mini = function(value) {
			if (!arguments.length) return mini;
			mini = value;
			return chart;
		};

		chart.showRectangles = function(value) {
				if (!arguments.length) return showRectangles;
				showRectangles = value;
				return chart;
			};	

		return chart;
	}

	return chartFactory;
})