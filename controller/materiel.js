$(function() {
	var cfg = [
		{id:'dvs',name:'numMarche',fill:{qry: i18n.boncommande.selectbc, params:{id:'numMarche'}}}
	];
	var qteInput = $("input[name='qteFinal']");
	
	$("input[name='qteInitial']").focusout(function(e) {
		var qteFinal = $("input[name='qteFinal']").data('qteFinal');
		var qteInitial = $("input[name='qteFinal']").data('qteInitial');
		var dif = 0;
		
		if (qteInitial && qteInitial != null) {
			dif = parseInt($(this).val()) - parseInt(qteInitial);
		} 
		if (qteFinal && qteFinal != null) {
			qteFinal = parseInt(qteFinal) + dif;

		} else {
			qteFinal = $(this).val();
		}
		$("input[name='qteFinal']").val(qteFinal);
	});
	appFn.initFrm();
	//appFn.list(i18n.materiel.select, cfg);
	var data = null;
	appFn.fillSelect (i18n.boncommande.select, 'select#dvs');
	$('select#dvs').chosen ({no_results_text: i18n.labels.noResult}).change (function () {
		
		var val = '';
		$("select#dvs option:selected").each (function () {
			val = $(this).attr('value');
		});
		data = appFn.execute (i18n.boncommande.selectbc,{id: val}).data;
		if (data.length>0 && data[0].nature == 1) {
			$("input[name='invt']").attr('disabled', 'disabled');
			$('div.inp-div').has("input[name='invt']").hide();
		} else {
			$("input[name='invt']").removeAttr('disabled');
			$('div.inp-div').has("input[name='invt']").show();
		}
		appFn.list(i18n.mvtStock.selectMatByBc, {numMarche: val}, cfg, false, function (li) {
			$("input[name='qteFinal']").data({qteFinal: $("input[name='qteFinal']").val(), qteInitial: $("input[name='qteInitial']").val()});
			$('ol.list li span div').remove();
			$('ol.list li.selected span').append("<div>Qté:"+li.data('data').qteFinal+"</div>");
			if (li.data('data').qteFinal <= 1) {
				li.addClass('empty');
			}
		});
		$("input, textarea").val('');
	});

	$('a#reset').click (function() {
    	appFn.reset('form#form');
    });

    $('a#save').click (function() {
    	if (appFn.requiredFiled('form#form')) {
    		var dataForm = $('form#form').serializeJSON();

	        if (!dataForm.numMarche || dataForm.numMarche == "") {
	    		dataForm.numMarche = null;
	    	}
    	
	    	 if (data[0].nature != 1) {
	    		var diff = 1, count = 0;
	    		var invts = dataForm.invt;
		    	var invt_arr = invts.split(',');

		    	for (var i = 0; i <= invt_arr.length - 1; i++) {
		    		var invtItem = invt_arr[i];
		    		if (invtItem.indexOf('-') != -1) {
			    		diff = invtItem.substring (invtItem.indexOf('-')+1, invtItem.length) - invtItem.substring (0, invtItem.indexOf('-'));
			    		count += diff + 1;
			    	} else {
			    		count++;
			    	}
		    	}
		    	if (count == dataForm.qteFinal) {
					appFn.save (dataForm, i18n.materiel.update, i18n.materiel.insert, cfg);
				} else {
					appFn.apprise ("Le nombre de N° Inventaire n'est pas égale au quantité de Matériel !!!");
					return;
				}
	    	} else {
	    		dataForm.invt = null;
	    		appFn.save (dataForm, i18n.materiel.update, i18n.materiel.insert, cfg);
	    	}
    	}
    	
    });

    $('a#delete').click (function() {
        appFn.deleteBtn(i18n.materiel.delete);
    });

});