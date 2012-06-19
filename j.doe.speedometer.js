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
			
			p.path("M"+cX+","+cY+"A"+(cX-opts.margin)+","+(cY-opts.margin)+" 0 0 0 20 20").attr({fill:"#fc9",stroke:"#006",'stroke-width':5});
			
		});
		
	};

	$.fn.doespeedometer.defaults = {
		title: 'Speedometer',
		min: 0,
		max: 100,
		value: 0,
		unit: '%',
		width: 200,
		height: 200,
		margin:2
	};
	
})(jQuery);