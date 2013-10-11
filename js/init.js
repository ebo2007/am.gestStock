$(function () {
	// Connection Config
    con = new ActiveXObject("ADODB.Connection");
	cmd = new ActiveXObject("ADODB.Command");
    db 	= new ActiveXObject("ADODB.Recordset");
	connect = "DRIVER={MySQL ODBC 5.2a Driver};SERVER=LocalHost;Port=3306;USER=root;PASSWORD=;DATABASE=geststock;";

	var Device = navigator ? navigator.userAgent.toLowerCase () : 'Unknown Navigator';
	var isOpera = /opera/.test (Device);
	isIE = !isOpera && /msie/.test (Device);

	$.getScript ('js/crypt.js');
	$.getScript ('js/jquery.printElement.js');
	$.getScript ('js/labels.js');
	$.getScript ('js/jquery.tooltip.js');
	$.getScript ('js/jquery.blink.js');

	// Window Form Config 
	window.resizeTo(screen.availWidth,screen.availHeight);
	window.moveTo (0, 0);
	window.history.forward(1); 

	// To disable f5
	$(document).bind("keydown", function (e) {
		//if (e.which == 116) e.preventDefault();
	});

	$.fn.serializeJSON = function() {
		var o = {};
		var a = this.serializeArray();
		$.each(a, function() {
		    if (o[this.name]) {
		        if (!o[this.name].push) {
		           o[this.name] = [o[this.name]];
		        }
		        o[this.name].push(this.value || '');
		    } else {
		        o[this.name] = this.value || '';
		   }
		});
		return o;
	};
	//Load Login Form
	$('section.container').load ('view/logfrm.html', function (){
		$('div.error').hide ();
		appFn.placeholder();
	});
});