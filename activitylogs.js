(function ($) {

/**
 * Move a block in the blocks table from one region to another via select list.
 *
 * This behavior is dependent on the tableDrag behavior, since it uses the
 * objects initialized in that behavior to update the row.
 */
Drupal.behaviors.activitylogs = {
	attach: function (context, settings) {

 	}
};


})(jQuery);



(function($){
	$.fn.loaddata = function(options) {// Settings
	  url = location.href;
	  parts = url.split("/");

	  //type
	  if(parts[3] != null) {
		activity_name = parts[3];
	  }
	  else {
		activity_name = '';
	  }

	  if(activity_name == 'node') {
		  //type
		  if(parts[6] != null) {
			activity_type = parts[6];
		  }
		  else {
			activity_type = '';
		  }

		  //nid
		  if(parts[4] != null) {
			activity_nid = parts[4];
		  }
		  else {
			activity_nid = 0;
		  }

		  //uid
		  if(parts[7] != null) {
			activity_uid = parts[7];
		  }
		  else {
			activity_uid = 0;
		  }
	  }
	  else if(activity_name == 'activitylogs') {
		  //type
		  if(parts[4] != null) {
			activity_type = parts[4];
		  }
		  else {
			activity_type = '';
		  }

		  //nid
		  if(parts[5] != null) {
			activity_nid = parts[5];
		  }
		  else {
			activity_nid = 0;
		  }

		  //uid
		  if(parts[6] != null) {
			activity_uid = parts[6];
		  }
		  else {
			activity_uid = 0;
		  }
  	  }
  	  else {
		activity_type = '';
		activity_nid = 0;
		activity_uid = 0;
	  }

		//console.log(url);
		var settings = $.extend({
			loading_gif_url	: "/loader.gif", //url to loading gif
			end_record_text	: 'No activity records found!', //no more records to load
			data_url 		: '/activitylogs/timelines/load/'+activity_type+'/'+activity_nid+'/'+activity_uid, //url
			start_page 		: 1 //initial page
		}, options);

		var el = this;
		//console.log(el);
		loading  = false;
		end_record = false;
		contents(el, settings); //initial data load

		$(window).scroll(function() { //detact scroll
			if($(window).scrollTop() + $(window).height() >= $(document).height()){ //scrolled to bottom of the page
				contents(el, settings); //load content chunk
			}
		});
	};
	//Ajax load function
	function contents(el, settings){
		var load_img = $('<img/>').attr('src',settings.loading_gif_url).addClass('loading-image'); //create load image
		//var record_end_txt = $('<div/>').text(settings.end_record_text).addClass('end-record-info'); //end record text
		var record_end_txt = '<div class="cd-timeline__block js-cd-block"><div class="cd-timeline__img cd-timeline__img--picture js-cd-img">&nbsp;</div><!-- cd-timeline__img --><div class="cd-timeline__content js-cd-content"><p>'+settings.end_record_text+'</p></div> <!-- cd-timeline__content --></div>';

		if(loading == false && end_record == false){
			loading = true; //set loading flag on
			el.append(load_img); //append loading image

			$.post( settings.data_url, {'page': settings.start_page}, function(data){ //jQuery Ajax post
				//console.log(data);
				if(data.trim().length == 0){ //no more records
					el.append(record_end_txt); //show end record text
					load_img.remove(); //remove loading img
					end_record = true; //set end record flag on
					return; //exit
				}
				loading = false;  //set loading flag off
				load_img.remove(); //remove loading img
				el.append(data);  //append content
				settings.start_page ++; //page increment
			})

		}
	}

	jQuery("#activitylogs-timelines").loaddata(); //load the results into element

})(jQuery);

