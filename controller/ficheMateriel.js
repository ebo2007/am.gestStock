$(function() {
	appFn.list(i18n.fichMat.selectBC);

	var tdHeight =  628 - $("div#impression:first-child table tbody").height();
	var nbrTd = Math.floor(tdHeight / 21);
	for (var i = 0; i < nbrTd; i++) {
	 	$('<tr></tr>').append('<td height="20"></td><td></td><td></td><td></td><td></td>').appendTo("div#impression:first-child table tbody");
	};
	$('ol.list li'). click(function (e) {
		$('ol.person').empty();
		var dataMat = appFn.execute (i18n.fichMat.selectMat, {idBc: $(this).data('data').id}).data;
		$('ol.person').empty();
		$.each (dataMat, function (idx, item) {
			$('<li></li>').attr({value: item.id}).data('data', item)
				.html('<span>'+item.nom+'</span>').appendTo('ol.person')
				.click(function (e) {
					var dataMvt = appFn.execute (i18n.fichMat.selectMvt, {idMat: $(this).data('data').id}).data;
					var pos = 1;
    				var appTo ="div#impression:nth-child("+pos+") table tbody";
					$(appTo).empty();
					$('div.blt section:nth-child(2)').children( 'div#impression:not(:first)' ).remove();
					
					$('div.exercice span').text(new Date (item.datebc).getFullYear());
					$('li span.materiel').text(item.nom);
					item.desc!='' ? $('li span.desc').text(item.desc) : $('li span.desc').html('..............................................................................................<br/>.......................................................................................................');
					$('li span.numMarche').text(item.boncommande);
					item.numVisa!='' ? $('li span.numVisa').text(item.numVisa) : $('li span.numVisa').text('......................................................');
					item.numFacture!='' ? $('li span.numFact').text(item.numFacture) : $('li span.numFact').text('......................................................');
					$('li span.frns').text(item.fournisseur);

					// for (var i = 55; i >= 0; i--) {
					// 	if($(appTo).height() > 579 && !($('div#impression:nth-child('+(pos+1)+')').length>0)) {
					// 		$('div#impression:nth-child('+pos+')').clone().appendTo('div.blt section:nth-child(2)');
					// 		pos++;
					// 		appTo = "div#impression:nth-child("+pos+") table tbody";
					// 		$(appTo).empty();
					// 	}
					// 	$('<tr></tr>').append('<td height="20"></td><td></td><td></td><td></td><td></td>').appendTo(appTo);
					// };

					$.each(dataMvt, function (i, itm) {
						var person = itm.signe != null && itm.signe != '' ? itm.signe : itm.person;

						if($(appTo).height() > 579 && !($('div#impression:nth-child('+(pos+1)+')').length>0)) {
							$('div#impression:nth-child('+pos+')').clone().appendTo('div.blt section:nth-child(2)');
							pos++;
							appTo = "div#impression:nth-child("+pos+") table tbody";
							$(appTo).empty();
						}

						$('<tr></tr>').append('<td align="center" valign="middle">'+itm.invt+'</td>')
						.append('<td align="left" valign="middle">'+itm.service+'</td>')
						.append('<td></td>').append('<td align="left" valign="middle">'+person+'</td>')
						.append('<td></td>').appendTo(appTo);
					});

					tdHeight =  600 - $(appTo).height();
					nbrTd = Math.floor(tdHeight / 21);
					for (var i = 0; i < nbrTd; i++) {
					 	$('<tr></tr>').append('<td height="20"></td><td></td><td></td><td></td><td></td>').appendTo(appTo);
					};
				});
		});
	});
});