function mapPreview() {

		// adjust height of web part according to page size
		//var y = $("td.ms-bodyareaframe").height() - 420;
		var y = $(window).height() - 380;
		$("tr.ms-viewheadertr").parent().attr('id', 'divWebPartScroll');
		$("div#WebPartWPQ2").css('overflow', 'scroll').height(y).children().find("td.ms-vb-title").height("22px");
		
		// locate vacant cubicle data rows and mark on image map
		var $tr_data_rows = $("table tbody tr td.ms-vb-title:contains('Vacant')");
		var $tr_data = $tr_data_rows.next().next();
		var tr_data_len = $tr_data.length;
		var i;
		for (var i=0; i < tr_data_len; i++) {
		    var $image_filter = $('#'+ $tr_data[i].innerHTML,'#imageMap');
		    var data = $image_filter.data('maphilight') || {fillColor:'00FF66', alwaysOn:true};
		    $image_filter.data('maphilight', data).trigger('alwaysOn.maphilight');
		  };
		
		// locate user cubicle and highlight red
		var username = $().SPServices.SPGetCurrentUser({
			fieldName: "Title",
			debug: false
		});
		username = username.split(" ");
		var $td_user_cube = $("td.ms-vb-title:contains('" + username[1] + "')").filter(function() { return $(this).next().text() === username[0] }).next().next();
		var $image_filter = $('#'+ $td_user_cube.text(),'#imageMap');
		var data = $image_filter.data('maphilight') || {fillColor:'FF0000', alwaysOn:true};
		$image_filter.data('maphilight', data).trigger('alwaysOn.maphilight');

}

// init maphilight
var initA = $('.mapA').maphilight();

// event handler for cubicle map click
$('map').click(function(e) {
	//alert("clicked: " + e.target.nodeName + " and target id:" + e.target.id);
	if (e.target.nodeName == 'AREA') {
		var $clicked = e.target.id;
		//var $tr_clicked = $("table#{7D05C9A9-F242-4DCE-94DC-BA7EF3306A0E}-{f5d0706d-b01b-414e-aab5-43ed5985696c} tbody tr td.ms-vb2:contains('" + $clicked + "')").parent();
		//var $tr_clicked = $("td.cubicletd:contains('" + $clicked + "')").parent();
		var $tr_clicked = $('td.cubicletd').filter(function() { return $(this).text() === $clicked; }).parent();
		var $div_clicked = $tr_clicked.parent().parent().parent().parent().parent().parent().parent();
		($div_clicked).stop().scrollTo($tr_clicked,800);
		//$tr_clicked.highlightFade({speed:4000,color:'#9AFEFF'});
		$tr_clicked.effect("highlight", {}, 2500);
	}
});

// locate cubicle data cells and link cubicle areas in image map
$("td.ms-vb2:contains('N0')").addClass('cubicletd');
$("td.ms-vb2:contains('N1')").addClass('cubicletd');
$("td.ms-vb2:contains('E0')").addClass('cubicletd');
$("td.ms-vb2:contains('E1')").addClass('cubicletd');

$('table.ms-listviewtable td.cubicletd').mouseover(function(e) {
	var $hovered = e.target.innerHTML;
	$('#'+$hovered).mouseover();
}).mouseout(function(e) {
	var $hovered = e.target.innerHTML;
	$('#'+$hovered).mouseout();
});