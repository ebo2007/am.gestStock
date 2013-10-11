$(function() {
	appFn.fillSelect (i18n.login.profils, 'select#dvs');
	$('select#dvs').chosen ({no_results_text: i18n.labels.noResult});

	var profils = appFn.execute (i18n.login.select).data;
	
	$('div.dbody table').empty();
	$.each(profils, function (i, item) {
		var status = item.status ? "#4ead09" : "#e12525";
		var title = item.status ? "Verrouillé" : "Déverrouiller";
		$('<tr align="center" valign="middle" mid="t_'+item.id+'"></tr>').data('data', item).append('<td height="24px">'+item.nom+'</td>')
		.append('<td>'+item.profil+'</td>').append('<td>'+item.login+'</td>').append('<td>'+item.dateDebut+'</td>').append('<td mid="td_'+item.id+'">'+item.dateModification+'</td>')
		.append('<td width="90px" mid="t_'+item.id+'"><span class="status" style="background:'+status+'" title="'+title+'"></span></td>')
		.append('<td width="80px" mid="t_'+item.id+'"><span class="edit" title="Modifier"></span><span class="trash" title="Supprimer"></span></td>')
		.appendTo("div.dbody table");
	});
	var count = 17 - profils.length;
	for (var i = 1; i <= count; i++) {
		$('<tr align="center" valign="middle"></tr>').append('<td height="24px"></td>').append('<td></td>').append('<td></td>')
		.append('<td></td>').append('<td></td>').append('<td width="90px"></td>').append('<td width="80px"></td>').appendTo("div.dbody table");
	};
	var edit = function () {
		var mid = $(this).parent().attr('mid');
		var data = $('div.dbody tr[mid="'+mid+'"]').data('data');
		appFn.bindFields('#form', data);
		$('#dvs_chzn a span').empty().text(data.profil);
		$('select#dvs').val(data.idProfil);
    };
    var trash = function () {
		var mid = $(this).parent().attr('mid');
		var data = $('tr[mid="'+mid+'"]').data('data');
		appFn.apprise(i18n.labels.verifyDelete, {'verify':true, animate:true}, function(rep){
			if (rep) {
				$('div.dbody tr[mid="'+mid+'"]').remove();

				$('<tr align="center" valign="middle"></tr>').append('<td height="24px"></td>').append('<td></td>').append('<td></td>')
				.append('<td></td>').append('<td></td>').append('<td width="90px"></td>').append('<td width="80px"></td>').appendTo("div.dbody table");

				appFn.execute(i18n.login.delete, {id:data.id}, false);
			};
		});
	};
    var state = function () {
		var mid = $(this).parent().attr('mid');
		var data = $('div.dbody tr[mid="'+mid+'"]').data('data');
		appFn.apprise(i18n.labels.status, {'verify':true, animate:true}, function(rep){
			if (rep) {
				data.status = !data.status;
				appFn.execute(i18n.login.status, {status: data.status, id:data.id}, false);
				var status = data.status ? "#4ead09" : "#e12525";
				var title = data.status ? "Verrouillé" : "Déverrouiller";
				$('td[mid="t_'+data.id+'"] span.status').css("background-color", status);
				$('td[mid="t_'+data.id+'"] span.status').attr('title', title);
				$('td[mid="td_'+data.id+'"]').text(appFn.dateTodmy(new Date(), true));
			};
		});
	};
    $('div.dbody span.edit').click(edit);
	$('div.dbody span.trash').click(trash);
	$('div.dbody span.status').click(state);

	$('a#reset').click (function() {
		appFn.reset('form#form', [i18n.labels.choiceProfill]);
	});
	$('a#save').click (function() {
		var data = $('#form').serializeJSON();
		if (appFn.requiredFiled('#form')) {
			var msg = '', qry = '';
			if (data.id != '' && data.id != null) {
				qry = i18n.login.update;
				msg = i18n.labels.verifyUpdate;
			} else {
				qry = i18n.login.insert;
				msg = i18n.labels.verifyinsert;
			}
			appFn.apprise(msg, {'verify':true, animate:true}, function(rep){
				if (rep) {
					appFn.execute(qry, data, false);
					if (profils[0].password != data.password && data.id != '' && data.id != null) {
						appFn.execute(i18n.login.updatePass, {password:data.password, id:data.id}, false);
					}
					appFn.reset('form#form', [i18n.labels.choiceProfill]);

					var tmp = appFn.execute (i18n.login.select).data;
					$('div.dbody table').empty();
					$.each(tmp, function (i, item) {
						var status = item.status ? "#4ead09" : "#e12525";
						var title = item.status ? "Verrouillé" : "Déverrouiller";
						$('<tr align="center" valign="middle" mid="t_'+item.id+'"></tr>').data('data', item).append('<td height="24px">'+item.nom+'</td>')
						.append('<td>'+item.profil+'</td>').append('<td>'+item.login+'</td>').append('<td>'+item.dateDebut+'</td>').append('<td mid="td_'+item.id+'">'+item.dateModification+'</td>')
						.append('<td width="90px" mid="t_'+item.id+'"><span class="status" style="background:'+status+'" title="'+title+'"></span></td>')
						.append('<td width="80px" mid="t_'+item.id+'"><span class="edit" title="Modifier"></span><span class="trash" title="Supprimer"></span></td>')
						.appendTo("div.dbody table");
					});

					var count = 17 - tmp.length;
					for (var i = 1; i <= count; i++) {
						$('<tr align="center" valign="middle"></tr>').append('<td height="24px"></td>').append('<td></td>').append('<td></td>')
						.append('<td></td>').append('<td></td>').append('<td width="90px"></td>').append('<td width="80px"></td>').appendTo("div.dbody table");
					};
					$('div.dbody span.edit').click(edit);
					$('div.dbody span.trash').click(trash);
					$('div.dbody span.status').click(state);
				};
			});

			
		};
		
	});
	$('a#delete').click (function() {
		if (appFn.requiredFiled('#form')) {
			var data = $('#form').serializeJSON();
			appFn.apprise(i18n.labels.verifyDelete, {'verify':true, animate:true}, function(rep){
				if (rep) {
					$('div.dbody tr[mid="t_'+data.id+'"]').remove();
					$('<tr align="center" valign="middle"></tr>').append('<td height="24px"></td>').append('<td></td>').append('<td></td>')
					.append('<td></td>').append('<td></td>').append('<td width="90px"></td>').append('<td width="80px"></td>').appendTo("div.dbody table");

					appFn.execute(i18n.login.delete, {id:data.id}, false);
					appFn.reset('form#form', [i18n.labels.choiceProfill]);
				};
			});
		}

	});

	$('div.add').click(function() {
        appFn.apprise ('Ajouter un profil:', {'input': true, 'textOk':'Enregistrer', animate:true}, function (rep){
            if (rep) {
                appFn.execute(i18n.login.addProfil, {nom:rep}, false);
                appFn.fillSelect (i18n.login.profils, 'select#dvs');
                $('select#dvs').trigger("liszt:updated");
            };
        });
    });

});
