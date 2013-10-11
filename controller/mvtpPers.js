$(function() {
	appFn.initFrm();
	appFn.list(i18n.personnel.select);
	$('ol.list li'). click(function (e){
		//appFn.buildBulletin ($(this).data('data').id);

		var data = appFn.execute (i18n.mvtPers.buildBlt, {idPers: $(this).data('data').id}).data;

		$('div.toggle').empty();

		$.each(data, function (i, item) {
			var dateLivree = appFn.dateTodmy(item.dateLivraison);
			if (!$('section#'+item.nature).length) {
				$('<section class="expand"></section>').attr('id', item.nature).html('<a href="#" class="bg">'+item.nomNature+'</a>')
				.append ('<div class="tcnt"><table><thead><tr><th>N° Inventaire</th><th>Désignation</th><th>Fournisseur</th><th>Qté Demandée</th><th>Qté Livrée</th><th>Date Livraison</th><th>Observation</th></tr></thead><tbody></tbody></table></div>')
				.appendTo ($('div.toggle'));
			}
			if (item.invt == null) {
				item.invt = '-';
			}
			$('<tr></tr>').append('<td>'+item.invt+'</td>').append('<td title="'+item.desc+'">'+item.nom+'</td>')
				.append('<td title="Adresse: '+item.adresse+'\nTél: '+item.tel+'\nFax: '+item.fax+'\nEmail: '+item.email+'">'+item.nomFrs+'</td>')
				.append('<td>'+item.qteDemandee+'</td>').append('<td>'+item.qteLivree+'</td>').append('<td>'+dateLivree+'</td>').append('<td>'+item.observation+'</td>')
				.appendTo("div.toggle section[id='"+item.nature+"'] table tbody ");
		});
		$(".toggle section a").click (function(e) {
			//e.preventDefault();
			if ($(this).parent().hasClass ("expand")) {
				$(this).parent().removeClass("expand");
			} else {
				// $(".toggle section").removeClass("expand");
				$(this).parent().addClass("expand");
			}
		});
	});
});