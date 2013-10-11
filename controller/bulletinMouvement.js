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
    
	var tdHeight =  520 - $("div#impression:first-child table tbody").height();
	var nbrTd = Math.floor(tdHeight / 21);
	for (var i = 0; i < nbrTd; i++) {
	 	$('<tr></tr>').append('<td height="20"></td><td></td><td></td><td></td>').appendTo("div#impression:first-child table tbody");
	};
	$('ol.list li'). click(function (e) {
		$('ol.person').empty();
		var obj={};
		var data = appFn.execute (i18n.bltMvt.selectAll, {bc: $(this).data('data').id}).data;
		$.each (data, function (idx, item) {
			
			if (!obj[item.idPers]) {
				obj[item.idPers] = item.person;
				var arr=[];
				arr.push(item);
				$('<li></li>').attr({id: 'pers-'+item.idPers}).data('data', arr)
					.html('<span>'+item.person+'</span>').appendTo('ol.person')
					.click(function (e){
						var pos = 1;
	    				var appTo ="div#impression:nth-child("+pos+") table tbody";
						$(appTo).empty();
						$('div.blt section:nth-child(2)').children( 'div#impression:not(:first)' ).remove();
						
						$.each($(this).data('data'), function (i, itm){
							if(i==0){
								$('li span.nature').text(itm.nature);
								$('li span.division').text(itm.division);
								$('li span.service').text(itm.service);
								$('li span.bureau').text(itm.person);
								$('div#impression td div span.date').text(appFn.dateTodmy(itm.dateLivraison));
								$('div#impression td div span.signe').text((itm.signe!="" && itm.signe!=null) ? itm.signe : itm.person);
							}
							
							if($(appTo).height() > 479 && !($('div#impression:nth-child('+(pos+1)+')').length>0)) {
								$('div#impression:nth-child('+(pos)+')').clone().appendTo('div.blt section:nth-child(2)');
								pos++;
								appTo = "div#impression:nth-child("+pos+") table tbody";
								$(appTo).empty();
							}
							var desc = itm.idNature != 1  ? '<br/>'+itm.desc : '';
							$('<tr></tr>').append('<td>'+itm.nom+desc+'</td>').append('<td align="center" valign="middle">'+itm.qteDemandee+'</td>')
							.append('<td align="center" valign="middle">'+itm.qteLivree+'</td>').append('<td>'+itm.observation+'</td>')
							.appendTo(appTo);
						});
						
						tdHeight =  500 - $(appTo).height();
						nbrTd = Math.floor(tdHeight / 20);
						for (var i = 0; i < nbrTd; i++) {
						 	$('<tr></tr>').append('<td height="20"></td><td></td><td></td><td></td>').appendTo(appTo);
						};
				});			
			} else {
				$('li#pers-'+item.idPers).data('data').push(item);
			}
		});
		
	});	
});