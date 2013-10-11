$(function() {
	var cfg = [
		{id:'dvs',name:'nature',fill:{qry: i18n.materiel.selectCat, params:{id:'nature'}}},
		{id:'srv',name:'fournisseur',fill:{qry: i18n.materiel.selectFrns, params:{id:'fournisseur'}}}
	];

	appFn.initFrm();
	//appFn.list(i18n.boncommande.select, {}, cfg);

    var data = appFn.execute (i18n.boncommande.select).data;

    $.each (data, function (i, item) {
        if(item.nature != 1) {
            $('<li></li>').attr({value: item.id}).data('data', item)
                .html('<span>'+item.nom+'</span>').appendTo('ol.list div:nth-child(2)')
                .click(function (e){
                    appFn.click ($(this), cfg);
                });
        } else {
            $('<li></li>').attr({value: item.id}).data('data', item)
                .html('<span>'+item.nom+'</span>').appendTo('ol.list div:first-child')
                .click(function (e){
                    appFn.click ($(this), cfg);
                });
        }
    });

	appFn.fillSelect (i18n.materiel.selectAllCat, 'select#dvs');
	appFn.fillSelect (i18n.fournissour.select, 'select#srv');
	$('select#srv').chosen ({no_results_text: i18n.labels.noResult});
	$('select#dvs').chosen ({no_results_text: i18n.labels.noResult});

	$('a#reset').click (function() {
    	appFn.reset('form#form');
    });

    $('a#save').click (function() {
        var dataForm = $('form#form').serializeJSON();

        if (!dataForm.nature || dataForm.nature == "") {
    		dataForm.nature = null;
    	}
    	if (!dataForm.fournisseur || dataForm.fournisseur == "") {
    		dataForm.fournisseur = null;
    	}

        var li = '', msgSave = '', sql = ''; appTo = '';

        if (appFn.requiredFiled('form#form')) {
            if (dataForm.id && dataForm.id != '') {
                sql = i18n.boncommande.update;
                li = 'li[value=\''+ dataForm.id +'\']';
                msgSave = i18n.labels.verifyinsert;
            } else {
                sql = i18n.boncommande.insert;
                li = '<li></li>';
                msgSave = i18n.labels.verifyUpdate;
            }
            if (dataForm.nature != 1) {
                appTo = 'ol.list div:nth-child(2)';
            } else {
                appTo = 'ol.list div:first-child';
            }
            appFn.apprise(msgSave, {'verify':true, animate:true}, function(r) {
                if(r) { 
                    var result = appFn.execute (sql, dataForm, false);
                    if (!result) return;
                    if(dataForm.id == '') {
                        var lastID = appFn.execute(i18n.organigramme.lastIDInsert).data[0];
                        dataForm.id = lastID.id;
                       
                        $(li).html('<span>'+dataForm.nom+'</span>').appendTo(appTo)
                            .attr({value: dataForm.id, class: 'new'}).data('data', dataForm)
                            .click(function (evt) {
                                appFn.click ($(this), cfg);
                        });
                        $(appTo).animate({scrollTop: $(appTo).height()}, 1000);
                    } else {
                        $(li).attr({value: dataForm.id, class: 'update'})
                            .empty().html('<span>'+dataForm.nom+'</span>').data('data', dataForm)
                            .click(function (evt) {
                                appFn.click ($(this), cfg);
                        });
                    }
                    
                    appFn.reset('form#form');
                    $('span.success').empty().text(i18n.labels.successSave);
                    setTimeout( "$('span.success').empty();", 4000);
                } else { 
                    //
                }
            });
        }
    });

    $('a#delete').click (function() {
        appFn.deleteBtn(i18n.boncommande.delete);
    });

    $('div.add').click(function() {
        appFn.apprise ('Ajouter une Nature:', {'input': true, 'textOk':'Enregistrer', animate:true}, function (rep){
            if (rep) {
                appFn.execute(i18n.boncommande.insertNature, {nom:rep}, false);
                appFn.fillSelect (i18n.materiel.selectAllCat, 'select#dvs');
                $('select#dvs').trigger("liszt:updated");
            };
        });
    });
});