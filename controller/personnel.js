$(function() {
	var cfg = [
		{id:'dvs',name:'division',fill:{qry: i18n.personnel.selectOrg, params:{id:'division'}}},
		{id:'srv',name:'service',fill:{qry: i18n.personnel.selectOrg, params:{id:'service'}}, bind:{qry: i18n.personnel.fillService, params:{parent:'division'}}}
	];

	appFn.initFrm();

	var division = appFn.execute(i18n.personnel.fillDivision).data;
	$.each(division, function (i, item){
		var expand = i == 0 ? 'expand' : '';
		$('<div id="dvs_'+item.id+'" class="'+expand+'"></div>').append('<div class="bg dvs"><span>'+item.nom+'</span></div>')
		.append('<ol class="list"></ol>').appendTo('div.filter-cnt');
		appFn.list(i18n.personnel.selectDiv, {division: item.id}, cfg, null, null, 'div#dvs_'+item.id+' ol.list');
	});
	
	$('.filter-cnt div div.dvs').click(function (e) {
		e.preventDefault();
		$('.filter-cnt div').removeClass('expand');
		$(this).parent().addClass('expand');
	});

	appFn.fillSelect (i18n.personnel.fillDivision, 'select#dvs');
	$('select#srv').chosen ({no_results_text: i18n.labels.noResult});
	$('select#dvs').chosen ({no_results_text: i18n.labels.noResult}).change (function () {
		var val = '';
		$("select#dvs option:selected").each (function () {
			val = $(this).attr('value');
		});

		appFn.fillSelect(i18n.personnel.fillService, 'select#srv', {parent: val});
		$('select#srv').trigger("liszt:updated");
	});
    
    $('a#reset').click (function() {
    	appFn.reset('form#form');
    });

    $('a#save').click (function() {
        var dataForm = $('form#form').serializeJSON();

        if (!dataForm.division || dataForm.division == "") {
    		dataForm.division = null;
    	}
    	if (!dataForm.service || dataForm.service == "") {
    		dataForm.service = null;
    	}
    	appFn.save (dataForm, i18n.personnel.update, i18n.personnel.insert, cfg);
    });

    $('a#delete').click (function() {
        appFn.deleteBtn(i18n.personnel.delete);
    });
});