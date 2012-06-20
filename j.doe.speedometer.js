( function($) {
	
	$.fn["doespeedometer"] = function(options){
		return this.each( function(){
			// Standard init option stuff
			var opts	= $(this).data("options");
			if(!opts){
				  opts = $.extend({}, $.fn.doespeedometer.defaults, options);
			}else{
				$.extend(opts, options);
				$(this).data('options', opts);
			}
			
			// Lets render the speedometer
			
			var p	= Raphael($(this).get(0),opts.width,opts.height);
			var cX	= opts.width/2;
			var cY	= opts.height/2;
			var r	= opts.width/2-1;
			var angle	= Math.PI*0.66;

			// Draw background
			p.path(
				"M"+(cX-r*Math.sin(angle))+
				","+(cY-r*Math.cos(angle))+
				"A"+r+
				","+r+
				" 0 1 1"+
				" "+(cX-r*Math.sin(-angle))+
				" "+(cY-r*Math.cos(-angle))+
				"A"+1.4*r+
				","+r+
				" 0 0 0"+
				" "+(cX-r*Math.sin(angle))+
				" "+(cY-r*Math.cos(angle))+
				"z"
				).attr({
					fill:"#fff",
					stroke:"#d7d7d7",
					'stroke-width':1
				});

			angle	= Math.PI*0.65;
			
			var currentAngle	= angle;
			var valPath	= false;
			
			valText	= p.text(cX,cY-r*0.4, opts.value+opts.unit ).attr({
				"font-family":"Arial",
				"font-size":"12px",
				"font-weight":"bold",
				fill:opts.barColor
				});
			
			var pathInterval=setInterval( function(){
				// Draw value
				r	= opts.width/2-opts.margin-opts.thickness*0.5;
				var val		= (opts.value-opts.min)/(opts.max-opts.min);
				if(val>2){ val=2.0; }
				var valAngle	= angle*2*(1-val*0.5)-angle;
				
				if(currentAngle!=valAngle){
					currentAngle	= currentAngle+(valAngle-currentAngle)*0.1;
					if(Math.round(currentAngle*100)==Math.round(valAngle*100)){
						currentAngle=valAngle;
						clearInterval(pathInterval);
					}
					var largeCircle	= ((currentAngle-angle)*0.5 < (-Math.PI/2))?1:0;
					if(valPath){ valPath.remove();}
					valPath	= p.path(
						"M"+(cX-r*Math.sin(angle))+
						","+(cY-r*Math.cos(angle))+
						"A"+r+
						","+r+
						" 0 "+largeCircle+" 1"+
						" "+(cX-r*Math.sin(currentAngle))+
						" "+(cY-r*Math.cos(currentAngle))
						).attr({
							fill:"none",
							stroke:opts.barColor,
							'stroke-width':opts.thickness
						});
				}
			},30);				
		});
		
	};

	$.fn.doespeedometer.defaults = {
		title: 'Speedometer',
		min: 0,
		max: 100,
		value: 0,
		unit: '%',
		width: 135,
		height: 135,
		thickness: 6,
		margin:4,
		barColor: "#79bfa8"
	};
	
})(jQuery);