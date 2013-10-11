$(function() {
	
	for (var i = 1; i <= 4; i++) {
		var record = appFn.execute (i18n.dashboard.select, {nature: i}).data[0];
		if (record  && record != null) {
			$('.dashboard li:nth-child('+i+') em').empty().append(': <span>'+record.nom+'</span> le ').append('<span>'+appFn.dateTodmy(record.datebc)+'</span>');
		} else {
			$('.dashboard li:nth-child('+i+') em').empty().append(': <span>--/----</span> le ').append('<span>--/--/----</span>');
		}
		
	};

	var data = appFn.execute (i18n.dashboard.alert).data;
	//$('div.dbody table').empty();
	$.each(data, function (i, item) {
		$('<tr id="t_'+item.id+'"></tr>').append('<td width="19.95%">'+item.bc+'</td>').append('<td width="42.7%"><span class="blink">'+item.nom+'</span></td>')
		.append('<td width="10%">'+item.qteInitial+'</td>').append('<td width="10%">'+ (item.qteInitial - item.qteFinal) +'</td>')
		.append('<td width="10%"><span class="blink">'+item.qteFinal+'</span></td>').append('<td align="center" width="5%" mid="'+item.id+'"><span class="trash"></span></td>')
		.appendTo("div.dashboard section:nth-child(2) div.dbody table");
	});
	
	$('div.dbody td[mid]').click(function() {
		var mid = $(this).attr('mid');
		appFn.apprise(i18n.labels.deleteList, {'verify':true, animate:true}, function (rep){
			if(rep){
				$("tr#t_"+mid).remove();
				appFn.execute(i18n.dashboard.update, {id: mid}, false);
			}
		});
		
	});

	var livraison = appFn.execute (i18n.dashboard.lastDelivery).data;
	if (livraison.length > 0) {
		$('div.dbody table.last').empty();
		$.each(livraison, function (i, item) {
			$('<tr></tr>').append('<td width="12.9%" align="center">'+item.bc+'</td>').append('<td width="25.1%">'+item.nom+'</td>')
			.append('<td width="40.5%">'+item.person+'</td>').append('<td width="10%" align="center">'+appFn.dateTodmy(item.dateLivraison) +'</td>')
			.append('<td width="10%" align="center">'+item.qteLivree+'</td>').appendTo("div.dbody table.last");
		});
		$('section.last div.head').append('<span> '+livraison[0].dateDebut+'</span>');
	}

	var now = new Date();
	// $('select.year').empty();
	for (var i = now.getFullYear(); i >= 2011; i--) {
		$('select.year').append('<option value="'+i+'">'+i+'</option>');
	};

	$('select.year').ready (function(){
		fill($("select.year option:first").val());
	});

	$('select.year').change (function(){
		var val;
		$("select.year option:selected").each (function () {
			val = $(this).attr('value');
		});
		fill(val);

	});
    
    $('select.bc').change (function(){
		var val;
		$("select.bc option:selected").each (function () {
			val = $(this).attr('value');
		});
		buildChart(val);

	});

    var fill = function (val){
    	var bcData = appFn.execute(i18n.dashboard.chartbc, {year: val}).data;
		$('select.bc').empty();
		if (bcData.length > 0){
			$.each(bcData, function (i, item){
				$('select.bc').append('<option value="'+item.id+'">'+item.nom+'</option>');
			});
			buildChart($("select.bc option:first").val());
		} else {
			$('#chart').empty();
			$('#chart').append('<span class="nodata">Pas Données</span>');
	    	return;
		}
    };

    var buildChart = function (bcid) {
    	var matData = appFn.execute(i18n.mvtStock.selectMatByBc, {numMarche: bcid}).data;
    	var s1=[], ticks=[], all=[], series=[{}];
    	$.each(matData, function (i, item){
    		s1.push(item.qteFinal);
			ticks.push(item.nom);
			all.push(new Array())
			series.push({renderer: $.jqplot.LineRenderer});
		});
		all.unshift(s1);
		all.pop();
		series.pop();

	    $('#chart').empty();
	    if(s1.length <= 0) {
	    	 $('#chart').append('<span class="nodata">Pas Données</span>');
	    	 return;
	    }
	    plot2 = $.jqplot('chart', all, {
			animate: !$.jqplot.use_excanvas,
	        seriesDefaults: {
	            renderer:$.jqplot.BarRenderer,
	            pointLabels: {show: true},
	            rendererOptions: {
	            	varyBarColor: true,
	            	highlightMouseDown: true,
	            	barMargin:5
            	},
	            showLabel: true
	        },
	        series:series,
	        axes: {
	            xaxis: {renderer: $.jqplot.CategoryAxisRenderer}
	        },
	        yaxis:  {  tickOptions:{ formatString:'%.2f%' } },
	        legend: {
	        	renderer: $.jqplot.EnhancedLegendRenderer,
	            show: true,
	            placement: 'outside', 
	            labels: ticks,
	            rendererOptions: {
                	numberColumns : 2,
                	seriesToggle: false
	            }
	        }
	    });

	    // $('#chart').bind('jqplotDataClick', 
	    //     function (ev, seriesIndex, pointIndex, data) {
	    //         $('#info').html('series: '+seriesIndex+', point: '+pointIndex+', data: '+ data);
	    //     }
	    // );
	         
	    // $('#chart').bind('jqplotDataUnhighlight', 
	    //     function (ev) {
	    //         $('#info').html('Nothing');
	    //     }
	    // );
    };
});
