$(function() {
	//appFn.list(i18n.mvtStock.selectBC);
	var dataBc = appFn.execute (i18n.mvtStock.selectBC).data;

    $.each (dataBc, function (i, item) {
        if(item.nature != 1) {
            $('<li></li>').attr({value: item.id}).data('data', item)
                .html('<span>'+item.nom+'</span>').appendTo('ol.list div:nth-child(2)')
                .click(function (e){
                    appFn.click ($(this), {});
                });
        } else {
            $('<li></li>').attr({value: item.id}).data('data', item)
                .html('<span>'+item.nom+'</span>').appendTo('ol.list div:first-child')
                .click(function (e){
                    appFn.click ($(this), {});
                });
        }
    });
	$('ol.list li'). click(function (e){
		//appFn.buildStock ($(this).data('data'));
		var data = appFn.execute (i18n.mvtStock.selectMatByBc, {numMarche: $(this).data('data').id}).data;

		$('div.stock').empty().append('<ul class="title"><li>Stock de Bon Commande N° : <span>'+$(this).data('data').nom+'</span></li><li>'+$(this).data('data').intitule+'</li></ul>')
			.append('<div class="tcontainer"><table><thead><tr><th>Désignation</th><th>Descreption</th><th>Entrée</th><th>Sortie</th><th>Stock Final</th></tr></thead><tbody></tbody></table></div>');
		
		$.each(data, function (i, item) {
			$('<tr></tr>').append('<td title="'+item.desc+'">'+item.nom+'</td>')
				.append('<td>'+item.desc+'</td>').append('<td>'+item.qteInitial+'</td>').append('<td>'+ (item.qteInitial - item.qteFinal) +'</td>').append('<td>'+item.qteFinal+'</td>')
				.appendTo("div.stock table tbody");
		});
	});
});