define(['d3'], 
function (d3) {
	var utility = {
		// Constants
		PHI: 1.61803398875,
		
		identity: function (a) { return a },
		degToRad: function (deg) { return deg * Math.PI / 180  },
		getOriginPoint: function (svgElement) {
		  // Adapted from http://www.petercollingridge.co.uk/blog/svg-animation-rotating-elements

		  var bb = svgElement.getBBox(),
		  	xCenter = bb.x + bb.width/2,
		  	yCenter = bb.y + bb.height/2;

		  return { x: xCenter, y: yCenter };
		},
		px: function (d) { return d + 'px' },
		translate: function (x, y) { return 'translate(' + x + ',' + y + ')' },
		rotateDeg: function (deg, x, y) { 
			var origin = typeof x != 'undefined' ? ' ' + x + ' ' + y : '';
			return 'rotate(' + deg + origin + ')' }
	}

	return utility;
})