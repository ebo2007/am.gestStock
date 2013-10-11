$(function () {
	appFn = {
		apprise: function (string, args, callback) {
			var default_args = {
				'confirm' : false, // Ok and Cancel buttons
				'verify' : false, // Yes and No buttons
				'input' : false, // Text input (can be true or string for default text)
				'animate' : false, // Groovy animation (can true or number, default is 400)
				'textOk' : 'Ok', // Ok button default text
				'textCancel' : 'Annuler', // Cancel button default text
				'textYes' : 'Oui', // Yes button default text
				'textNo' : 'Non' // No button default text
			}
			
			if (args) {
				for (var index in default_args) {
					if (typeof args[index] == "undefined")
						args[index] = default_args[index];
				}
			}
			
			var aHeight = $(document).height();
			var aWidth = $(document).width();
			$('body').append('<div class="appriseOverlay" id="aOverlay"></div>');
			$('.appriseOverlay').css('height', aHeight).css('width', aWidth).fadeIn(100);
			$('body').append('<div class="appriseOuter"></div>');
			$('.appriseOuter').append('<div class="appriseInner"></div>');
			$('.appriseInner').append(string);

			var aLeft = ($(window).width() - $('.appriseOuter').width()) / 2 + $(window).scrollLeft() + "px";
			var aTop = ($(window).height() - $('.appriseOuter').height()) / 2 + $(window).scrollTop() + "px";

			$('.appriseOuter').css({left: aLeft});
			
			if (args) {
				if (args['animate']) {
					var aniSpeed = args['animate'];
					if (isNaN(aniSpeed)) {
						aniSpeed = 400;
					}
					$('.appriseOuter').css('top', '-200px').show().animate({
						top : aTop
					}, aniSpeed);
				} else {
					$('.appriseOuter').css('top', aTop).fadeIn(200);
				}
			} else {
				$('.appriseOuter').css('top', aTop).fadeIn(200);
			}
			
			if (args) {
				if (args['input']) {
					if (typeof(args['input']) == 'string') {
						$('.appriseInner').append('<div class="aInput"><input type="text" class="aTextbox" t="aTextbox" value="' + args['input'] + '" /></div>');
					} else {
						$('.appriseInner').append('<div class="aInput"><input type="text" class="aTextbox" t="aTextbox" /></div>');
					}
					$('.aTextbox').focus();
				}
			}
			
			$('.appriseInner').append('<div class="aButtons"></div>');
			if (args) {
				if (args['confirm'] || args['input']) {
					$('.aButtons').append('<button value="ok">' + args['textOk'] + '</button>');
					$('.aButtons').append('<button value="cancel">' + args['textCancel'] + '</button>');
				} else if (args['verify']) {
					$('.aButtons').append('<button value="ok">' + args['textYes'] + '</button>');
					$('.aButtons').append('<button value="cancel">' + args['textNo'] + '</button>');
				} else {
					$('.aButtons').append('<button value="ok">' + args['textOk'] + '</button>');
				}
			} else {
				$('.aButtons').append('<button value="ok">Ok</button>');
			}
			
			$(document).keydown(function (e) {
				if ($('.appriseOverlay').is(':visible')) {
					if (e.keyCode == 13) {
						$('.aButtons > button[value="ok"]').click();
					}
					if (e.keyCode == 27) {
						$('.aButtons > button[value="cancel"]').click();
					}
				}
			});
			
			var aText = $('.aTextbox').val();
			if (!aText) {
				aText = false;
			}
			$('.aTextbox').keyup(function () {
				aText = $(this).val();
			});
			
			$('.aButtons > button').click(function () {
				$('.appriseOverlay').remove();
				$('.appriseOuter').remove();
				if (callback) {
					var wButton = $(this).attr("value");
					if (wButton == 'ok') {
						if (args) {
							if (args['input']) {
								callback(aText);
							} else {
								callback(true);
							}
						} else {
							callback(true);
						}
					} else if (wButton == 'cancel') {
						callback(false);
					}
				}
			});
		},
		execute: function (qry, params, opt) {
			if (opt == undefined) {
				opt = true;
			};
			if (params) {
				$.each(params, function (key, val) {
					var exp = new RegExp('{'+key+'}', 'g');
					var value = '';
					if (val == null) {
						value = val;
					} else{
						value = appFn.addslashes(val.toString())
					}
					qry = qry.replace (exp, value);
				});
			}
			try {
				con.Open(connect);
				cmd.ActiveConnection = con;
				cmd.CommandText = qry;
				cmd.Execute();

				if (opt) {
					var  obj = {
						data: []
					};
					db.Open (cmd);
					while(!db.BOF && !db.EOF){
						var rec = {};
						for (var i=0; i!= db.fields.count; ++i) {
							rec[db.fields(i).name] = (db.fields(i).value);
						}
						obj.data.push (rec);
						db.MoveNext();
					}
					return obj;
				} else {
					return true;
				}
				
			} catch(e) {
				appFn.apprise (i18n.labels.exception + " </br> >>>>>>> Query: " +qry+ "</br>"+ e);
				return false;
			} finally {
				if (cmd.state == 1) cmd.Close();
				if (con.state == 1) con.Close();
				if (opt && db.state == 1) db.Close();
			}
		},
		placeholder: function () {
			jQuery(function() {
				jQuery.support.placeholder = false;
				webkit_type = document.createElement('input');
				if('placeholder' in webkit_type) jQuery.support.placeholder = true;
			});
			if(!$.support.placeholder) {
			 
				var active = document.activeElement;
				 
				$(':text, textarea, :password').focus(function () {
					if (($(this).attr('placeholder')) && ($(this).attr('placeholder').length > 0) && ($(this).attr('placeholder') != '') && $(this).val() == $(this).attr('placeholder')) {
						$(this).val('').removeClass('hasPlaceholder');
					}
					$('div.error').hide();
				}).blur(function () {
					if (($(this).attr('placeholder')) && ($(this).attr('placeholder').length > 0) && ($(this).attr('placeholder') != '') && ($(this).val() == '' || $(this).val() == $(this).attr('placeholder'))) {
						$(this).val($(this).attr('placeholder')).addClass('hasPlaceholder');
					}
				});
				 
				$(':text, textarea, :password').blur();
				$(active).focus();
				$('form').submit(function () {
					$(this).find('.hasPlaceholder').each(function() { $(this).val(''); });
				});
			}
		},		
		submit: function () {
			var frm = 'form.loginForm';
			$(frm).submit(function() {
				var dtForm = $(this).serializeJSON();

				var login = dtForm.login;
				var psw = dtForm.password;
				var msg = $("div.error");
				var data;
				try {
					data = appFn.execute (i18n.login.connect, dtForm).data;
					var profil = data[0];
				} catch (e) {
					msg.show();
					$(frm).unbind().submit();
					return false;
				}
				
				if (data && data.length > 0) {
					if (!profil.status){
						appFn.apprise(i18n.labels.logState);
						$(frm).unbind().submit();
						return false;
					}
					$(frm).hide ();
					$('section.container').load ('view/main.html', function () {
						$(".accordion section a").click (function(e) {
							e.preventDefault();
							$(".accordion section").removeClass("expand");
							$(this).parent().addClass("expand");
						});
						if (profil.idProfil != 1) {
							$('li#profil').remove();
						}
						$('a.logout').click(appFn.logout);
						$('a.dash').click(appFn.dashboard);
						appFn.dashboard();
						
						$(".accordion section li").click (function(e) {
							var page = 'view/' + $(this).attr('id') + '.html';
							$('section#wrap').empty().load (page, function () {
								
								switch (page) {
									case 'view/dvs.html':
										appFn.organigramme();
										break;
									case 'view/pers.html':
										$.getScript ('controller/personnel.js');
										break;
									case 'view/frns.html':
										$.getScript ('controller/fournisseur.js');
										break;
									case 'view/bc.html':
										$.getScript ('controller/bonCommande.js');
										break;
									case 'view/mat.html':
										$.getScript ('controller/materiel.js');
										break;
									case 'view/livr.html':
										$.getScript ('controller/livraison.js');
									case 'view/livr__.html':
										//$.getScript ('controller/livraison.js');
										break;
									case 'view/mvtPers.html':
										$.getScript ('controller/mvtpPers.js');
										break;
									case 'view/mvtStock.html':
										$.getScript ('controller/mvtStock.js');
										break;
									case 'view/bltMvt.html':
										$.getScript ('controller/bulletinMouvement.js');
										break;
									case 'view/fichFrnt.html':
										$.getScript ('controller/ficheFourniture.js');
										break;
									case 'view/fichMat.html':
										$.getScript ('controller/ficheMateriel.js');
										break;
									case 'view/profil.html':
										$.getScript ('controller/profil.js');
										break;
								}
							});
						});
					});
				} else {					
					msg.show ();
					$(frm).unbind().submit();
					for (var i = 0; i <= 3; i++) {
						$(frm).animate( {"left": "+=70px"}, 100, "linear" );
						$(frm).animate( {"left": "-=70px"}, 100, "linear" );
					};
					
				}
				return false;
			});
		},
		fillSelect: function (qry, select, params) {
			if (!params) {
				params = {};
			};
			var data = appFn.execute(qry,params).data;  
			$(select).empty().append('<option></option>');
			$.each (data, function (i, item) {
				$('<option></option>').text(item.nom).attr('value', item.id).data('item', item).appendTo($(select));
			});
		},
		reset: function (form) {
			$(":input", $(form)).val('');
			$('select').trigger("liszt:updated");
		},
		filter: function() {
		    $("#filter").keyup(function() {
		        var filter = $(this).val(), count = 0;
		        $(".list li").each(function(){
		            if ($(this).text().search(new RegExp(filter, "i")) < 0) {
		                $(this).fadeOut();
		            } else {
		                $(this).show();
		                count++;
		            }
		        });
		        // var numberItems = count;
		        // $("#filter-count").text("Number of Comments = "+count);
		    });
	    },
	    bindFields: function (form, fdata) {
			var fieldArray = $("[name]:input", $(form));
			$.each(fieldArray, function (index) {
					var field = $(fieldArray[index]);
					if( field.attr('name').length ) {
						var item = field.attr('name');
						if (field.attr('type') == 'text' || field.attr('type') == 'password' || field.attr('type') == 'hidden' || field.is('textarea')) {
							field.val (fdata[item]);
							// field.keyup(function(){
							// 	fdata[item] = $(this).val();
							// });
						} else if (field.attr('type')=='date') {
							field.val (appFn.dateTodmy(fdata[item]));
							field.keyup(function(){
								fdata[item] = $(this).val();
							});
						} else if (field.attr('type') == 'checkbox') {
							if( fdata[item] == 1)
								field.attr("checked", "checked");
							field.click(function() {
								fdata[item] = $(this).is(':checked') ? 1 : 0;
							});
						} else if (field.is("select")) {
							field.val(fdata[item] );
							field.attr("value", fdata[item]).change (
								function() {
									fdata[item] = $(this).attr('value');
									fdata[item] = $(this).val();
								}
							);
						}
					}
				}
			);
		},
		requiredFiled: function (form) {
			var fieldArray = $("[required]:input", $(form));
			var fields = '';
			var prefixe = suffixe = '';
			var req = true;
			var count = 0;

			$.each(fieldArray, function (index) {
				var field = $(fieldArray[index]);
				if (field.attr('disabled')) {
					return;
				}
				if (field.val() == '' || field.val() == null) {
					if (count > 0) {
						prefixe = i18n.labels.prefexLot;
						suffixe = i18n.labels.suffexLot;
					} else {
						prefixe = i18n.labels.prefexSingle;
						suffixe = i18n.labels.suffexSingle;
					}
					fields += field.attr('label') + ', ';
					count++;
					req = false;
				}
			});
			fields = fields.substring(0, fields.length-2);
			prefixe += fields + suffixe;
			$('span.error').empty().append(prefixe);
			setTimeout( "$('span.error').empty();", 4000);
			return req;
		},
		addslashes: function (string) {
		    return string.replace(/\\/g, '\\\\').
		        replace(/\u0008/g, '\\b').
		        replace(/\t/g, '\\t').
		        replace(/\n/g, '\\n').
		        replace(/\f/g, '\\f').
		        replace(/\r/g, '\\r').
		        replace(/'/g, '\\\'').
		        replace(/"/g, '\\"');
		},
		initFrm: function (){
			appFn.filter();
			$("input, select").focus(function () {
		    	$('span.error').empty();
		    	$('span.success').empty();
			});
		},
		deleteBtn: function (qry) {
			var dataForm = $('form#form').serializeJSON();
	        if (dataForm.id && dataForm.id != '') {
	        	appFn.apprise(i18n.labels.verifyDelete, {'verify':true, animate:true}, function(r) {
	        		if (r) {
        				appFn.execute (qry, dataForm, false);
	        			appFn.reset('form#form');
						$('ol.list li').remove('[value=\''+ dataForm.id +'\']');
						$('span.success').empty().text(i18n.labels.successDelete);
	        		}
        		});
	        } else {
	        	$('span.error').empty().append(i18n.labels.choiceDelete);
	        	setTimeout("$('span.error').empty();", 4000);
	        }
		},
		click:function (li, cfg) {
			$('li').removeClass("selected");
			$('li').removeClass("empty");
			li.addClass("selected");

			var data = $(li).data('data');
			if (!cfg) {
				cfg = {};
			}
			var opt = $.extend(true, {}, cfg);

			appFn.reset('form#form');
			$.each(opt, function(i, item){
				if(data[item.name] != null) {
					$.each(item.fill.params, function(key, val){
						item.fill.params[key] = data[val];
					});
					
					var result = appFn.execute (item.fill.qry, item.fill.params).data[0];

					if (item.bind && item.bind != {}) {
						$.each(item.bind.params, function(key, val){
							item.bind.params[key] = data[val];
						});

						appFn.fillSelect(item.bind.qry, 'select#'+ item.id +':not(:has(option))', item.bind.params);
						$('select#'+item.id).trigger("liszt:updated");
						$('#'+item.id+' option[value=\''+ data[item.name] +'\']').attr('selected', 'selected');
					}
					$('#'+item.id+'_chzn a span').empty().text(result.nom);
				}
			});
			appFn.bindFields('form#form', data);
		},
		list: function (qry, params, cfg, check, fn, el) {
			var data = appFn.execute (qry, params).data;
			if (!el) {
				el = 'ol.list';
			};
			$(el).empty();
			$.each (data, function (i, item) {
				$('<li class="ui-widget-content ui-corner-tr"></li>').attr({value: item.id}).data('data', item)
					.html('<span>'+item.nom+'</span>').appendTo(el)
					.click(function (e){
						appFn.click ($(this), cfg);
						if (fn && fn != null) {
							fn($(this));
						}
					});

				if (check && check != null) {
					//$('<div><input type="checkbox" disabled="disabled"/></div>').data('data', item)
					$('<div><div class="icon"><a href="link/to/trash/script/when/we/have/js/off" title="Delete this image" class="ui-icon ui-icon-trash">Delete image</a><div/></div>').data('data', item)
						.appendTo($('li[value=\''+ item.id +'\'] span'));
					$(el+' li').unbind('click');
				}
			});
			
		},
		save: function (dataForm, qryUpdate, qryInsert, cfg, check) {
			var li = '', msgSave = '', sql = '';

	        if (appFn.requiredFiled('form#form')) {
	        	if (dataForm.id && dataForm.id != '') {
		        	sql = qryUpdate;
					li = 'li[value=\''+ dataForm.id +'\']';
					msgSave = i18n.labels.verifyinsert;
		        } else {
		        	sql = qryInsert;
					li = '<li></li>';
					msgSave = i18n.labels.verifyUpdate;
		        }

		        appFn.apprise(msgSave, {'verify':true, animate:true}, function(r) {
					if(r) { 
        				var result = appFn.execute (sql, dataForm, false);
        				if (!result) return;
						if(dataForm.id == '') {
							var lastID = appFn.execute(i18n.organigramme.lastIDInsert).data[0];
							dataForm.id = lastID.id;
							
							$(li).html('<span>'+dataForm.nom+'</span>').appendTo('ol.list')
							.attr({value: dataForm.id, class: 'new'}).data('data', dataForm)
							.click(function (evt) {
								appFn.click ($(this), cfg);
							});
							$("ol.list").animate({scrollTop: $('ol.list').height()}, 1000);
						} else {
							$(li).attr({value: dataForm.id, class: 'update'})
								.empty().html('<span>'+dataForm.nom+'</span>').data('data', dataForm)
								.click(function (evt) {
									appFn.click ($(this), cfg);
							});
						}
						if (check) {
							$('<input type="checkbox"/>').data('data', dataForm).appendTo($('li[value=\''+ dataForm.id +'\'] span'));
						}
						appFn.reset('form#form');
						$('span.success').empty().text(i18n.labels.successSave);
						setTimeout( "$('span.success').empty();", 4000);
					} else { 
						//
					}
				});
	        }
		},
		dateTodmy:function (strDate, opt) {
			var date = new Date (strDate);
		    var d = date.getDate();
		    var m = date.getMonth() + 1;
		    var y = date.getFullYear();
		    var hh = date.getHours();
		    var mm = date.getMinutes();
		    var ss = date.getSeconds();
		    var time = '';
		    if (opt) {
		    	time = ' ' + (hh <= 9 ? '0' + hh : hh) + ':' + (mm <= 9 ? '0' + mm : mm) + ':' + (ss <= 9 ? '0' + ss : ss);
		    };
		    return '' + (d <= 9 ? '0' + d : d) + '/' + (m<=9 ? '0' + m : m) + '/' + y + time;
		},
		killWhiteSpace:function (myString) {
			var exp = new RegExp(' ', 'g');
			return myString.replace(exp,'');
		},
		print: function() {
            $('section#printCnt').printElement();
		},
		logout: function () {
			appFn.apprise(i18n.labels.logout, {'verify':true, animate:true}, function(r) {
				if(r) {
					$('section.container').load ('view/logfrm.html', function () {
						$('div.error').hide ();
						appFn.placeholder();
					});
				}
			});
			
		},
		dashboard:function(){
			$('section#wrap').empty().load ('view/dashboard.html', function () {
				$.getScript ('controller/dashboard.js', function () {
					$('.blink').blink();
				});
			});
		}
	};
});