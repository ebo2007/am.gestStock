$(function() {
	appFn.list(i18n.fichFrnt.selectBC);
	
	

	var tdHeight =  666 - $("div#impression:first-child table tbody").height();
	var nbrTd = Math.floor(tdHeight / 21);
	for (var i = 0; i < nbrTd-1; i++) {
	 	$('<tr></tr>').append('<td height="20"></td><td></td><td></td><td></td><td></td>').appendTo("div#impression:first-child table tbody");
	};
	$('<tr></tr>').append('<td height="20"></td><td></td><td rowspan="'+nbrTd+'"></td><td></td><td rowspan="'+nbrTd+'"></td>').prependTo("div#impression:first-child table tbody");
	$('<tr></tr>').append('<td height="20"></td><td></td><td></td><td></td><td></td>').appendTo("div#impression:first-child table tfoot");
	$('ol.list li'). click(function (e) {
		var dataBc = $(this).data('data');
		$('ol.person').empty();
		var dataFrnt = appFn.execute (i18n.mvtStock.selectMatByBc, {numMarche: dataBc.id}).data;
		$('ol.person').empty();
		$.each (dataFrnt, function (idx, item) {
			$('<li></li>').attr({value: item.id}).data('data', item)
				.html('<span>'+item.nom+'</span>').appendTo('ol.person')
				.click(function (e) {
					var dataMvt = appFn.execute (i18n.fichFrnt.selectMvt, {idFrnt: $(this).data('data').id}).data;
					var pos = 1;
				    var appToBody ="div#impression:nth-child("+pos+") table tbody";
				    var appTofoot ="div#impression:nth-child("+pos+") table tfoot";

				    $(appTofoot+", "+appToBody).empty();
					$('div.blt section:nth-child(2)').children( 'div#impression:not(:first)' ).remove();
					
					$('li span.fourniture').text(item.nom);
					$('li span.numBc').text(dataBc.nom);
					
					$('<tr></tr>').append('<td align="center" valign="middle"><strong>'+appFn.dateTodmy(dataBc.datebc)+'</strong></td>').append('<td></td>')
					.append('<td align="center" valign="middle" rowspan="'+(dataMvt.length+1)+'">'+item.qteInitial+'</td>').append('<td></td>')
					.append('<td rowspan="'+(dataMvt.length+1)+'"></td>').prependTo(appToBody);
					
					$.each(dataMvt, function (i, itm) {
						if($(appToBody).height() > 639 && !($('div#impression:nth-child('+(pos+1)+')').length>0)) {
							$('div#impression:nth-child('+(pos)+')').clone().appendTo('div.blt section:nth-child(2)');
							pos++;
							appToBody = "div#impression:nth-child("+pos+") table tbody";
							appTofoot = "div#impression:nth-child("+pos+") table tfoot";
							$(appTofoot+", "+appToBody).empty();

							$('<tr></tr>').append('<td align="center" valign="middle"><strong>'+appFn.dateTodmy(dataBc.datebc)+'</strong></td>').append('<td></td>')
							.append('<td align="center" valign="middle" rowspan="'+(dataMvt.length+1)+'">'+item.qteInitial+'</td>').append('<td></td>')
							.append('<td rowspan="'+(dataMvt.length+1)+'"></td>').prependTo(appToBody);
						}
						$('<tr></tr>').append('<td align="right" valign="middle">'+appFn.dateTodmy(itm.dateLivraison)+'</td>')
						.append('<td align="left" valign="middle">'+itm.person+'</td>')
						.append('<td align="center" valign="middle">'+itm.qteLivree+'</td>').appendTo(appToBody);
					});

					$('<tr></tr>').append('<td></td>').append('<td></td>')
						.append('<td align="right" valign="middle"><strong>'+item.qteInitial+'</strong></td>')
						.append('<td align="right" valign="middle"><strong>'+item.qteInitial+'</strong></td>')
						.append('<td align="right" valign="middle"><strong>'+item.qteFinal+'</strong></td>')
						.appendTo(appTofoot);
						
					tdHeight =  689 - $(appToBody).height();
					$('div#impression:nth-child('+(pos)+') div.tmp').css('height', tdHeight);
				});
		});
	});	
});