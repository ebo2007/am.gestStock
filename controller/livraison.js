$(function() {
	appFn.initFrm();
	appFn.list(i18n.personnel.select,{}, {}, true);
	$('div.invt').parent().hide();

	var dataPers = appFn.execute(i18n.personnel.select).data;  
	$('select#pers').empty().append('<option></option>');
	$.each (dataPers, function (i, item) {
		$('<option></option>').text(item.nom).data('item', item).appendTo($('select#pers'));
	});

	appFn.fillSelect (i18n.boncommande.select, 'select#dvs');
	//appFn.fillSelect (i18n.personnel.select, 'select#pers');
	$('select#pers').chosen ({no_results_text: i18n.labels.noResult});
	var numMarche, nature;
	$('select#dvs').chosen ({no_results_text: i18n.labels.noResult}).change (function () {
		$("select#dvs option:selected").each (function () {
			numMarche = $(this).attr('value');
			nature = $(this).data('item').nature;
			if (nature == 1) {
				$('div.invt').parent().hide();
			}
		});

		//***************
		var data = appFn.execute (i18n.livraison.selectMatByBc, {numMarche: numMarche}).data;
		var el = 'ol.materiel';
		$(el).empty();
		$.each (data, function (i, item) {
			$('<li class="ui-widget-content ui-corner-tr"></li>').attr({value: item.id}).data('data', item)
				.append('<span>'+item.nom+'</span>').append('<a href="link/to/trash/script/when/we/have/js/off" title="Delete this image" class="ui-icon ui-icon-trash">Delete image</a>').appendTo(el);
		});
		//***************


		appFn.fillSelect(i18n.livraison.selectMatByBc, 'select#srv', {numMarche: numMarche});
		$('select#srv').trigger("liszt:updated");
	});

	var arr = [];
	var data = null;
	$('select#srv').chosen ({no_results_text: i18n.labels.noResult}).change(function() {
		$("input[type=checkbox]").removeAttr('disabled');
		$("input[type=checkbox]").removeAttr('checked').removeData('invt').next().remove();
		
		$('div.invt').empty().parent().hide();

		var val = '';
		$("select#srv option:selected").each (function () {
			val = $(this).attr('value');
		});
		data = appFn.execute (i18n.livraison.selectMat,{id: val}).data[0];
		arr= [];
		
		if (data.invt != null && data.invt != "null") {
			var invts = appFn.killWhiteSpace(data.invt);
			var invts_arr = invts.split(',');
			for(var inv=0; inv< invts_arr.length; inv++) {
				var it = invts_arr[inv];
				if (it.indexOf('-') != -1) { 
	        		var debut = parseInt(it.substring (0, it.indexOf('-')));
					var fin = parseInt(it.substring (it.indexOf('-')+1, it.length));
					for (var i=debut; i<=fin; i++) {
						arr.push(i);
						$('div.invt').append('<div id="inv-'+i+'">'+i+'</div>');
					}
	        	} else {
	        		arr.push(it);
	        		$('div.invt').append('<div id="inv-'+it+'">'+it+'</div>');
	        	}
			}
        	
			$('div.invt').parent().show();
		}
	});
	
	
	$("input[type=checkbox]").click (function() {
		if (nature != 1) {
			if ($(this).is (':checked')) {
				if (arr.length > 0) {
					$(this).data('invt', arr[0]).after('<em>'+arr[0]+'</em>');
					$('div.invt div#inv-'+arr[0]).remove();
					arr.splice($.inArray(arr[0], arr),1);
				} else if (arr.length <= 0) {
					$(this).removeAttr('checked');
					appFn.apprise ("Le Stock est épuisé !");
				}
			} else {
				var inv = $(this).data('invt');
				$('div.invt').prepend('<div id="inv-'+inv+'">'+inv+'</div>');
				arr.splice(0, 0, $(this).data('invt'));
				$(this).removeData('invt').next().remove();
			}
		}
    });
	
	$('a#reset').click (function() {
    	appFn.reset('form#form');
    	$("#pers_chzn a span").empty().text(i18n.labels.choicePerson);
    	$('select#srv').empty();
		$('select#dvs').empty();
		appFn.fillSelect (i18n.boncommande.select, 'select#dvs');
		$('select#dvs').trigger("liszt:updated");
		$('select#srv').trigger("liszt:updated");
		$('div.invt').empty().parent().hide();
    });

    $('a#save').click (function() {
        var dataForm = $('form#form').serializeJSON();
        
        if (!dataForm.numMarche || dataForm.numMarche == "") {
    		dataForm.numMarche = null;
    	}
    	if (!dataForm.materiel || dataForm.materiel == "") {
    		dataForm.materiel = null;
    	}
    	var checkedArray = $("input[type=checkbox]:checked");
		
		if (checkedArray.length <= 0) {
			$('span.error').empty().text(i18n.labels.choicePers);
			setTimeout( "$('span.error').empty();", 4000);
			return;
		}
		if (appFn.requiredFiled('form#form')) {
			var qteFinal = data.qteFinal - (checkedArray.length * parseInt(dataForm.qteLivree));

			if(qteFinal < 0) {
				appFn.apprise ("Le stock n'est pas suffisant");
				return;
			}
        	appFn.apprise(i18n.labels.verifyinsert, {'verify':true, animate:true}, function(r) {
				if(r) {
					$.each(checkedArray ,function (index) {
		        		var field = $(checkedArray[index]);

						dataForm.personnel = field.parent().data("data").id;
						if (field.data("invt")) {
							dataForm.invt = field.data("invt");
						} else {
							dataForm.invt = null;
						}
						appFn.execute (i18n.livraison.insert, dataForm, false);
						
						field.removeAttr('checked').removeData('invt').next().remove();
					});
					
					var inventaire = null;
					if (nature != 1) {
						if (arr.length>2) {
							inventaire = arr[0]+'-'+arr[arr.length-1];
						} else {
							inventaire = arr.join();
						}
						$('div.invt').empty().parent().hide();
					}
					appFn.execute (i18n.livraison.update, {invt: inventaire, qteFinal: qteFinal, id:data.id}, false);
					appFn.reset('form#form');

					$('select#srv').empty();
					$('select#dvs').empty();
					appFn.fillSelect (i18n.boncommande.select, 'select#dvs');
					$('select#dvs').trigger("liszt:updated");
					$('select#srv').trigger("liszt:updated");
					$('div.invt').parent().hide();
		        	$('span.success').empty().text(i18n.labels.successSave);
					setTimeout( "$('span.success').empty();", 4000);
				}
			});
		}
		
    });

    $('a#delete').attr('disabled', 'disabled');
});