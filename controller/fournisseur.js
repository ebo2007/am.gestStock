$(function() {
	appFn.initFrm();
	appFn.list(i18n.fournissour.select);

	$('a#reset').click (function() {
    	appFn.reset('form#form');
    });

    $('a#save').click (function() {
        var dataForm = $('form#form').serializeJSON();
    	appFn.save (dataForm, i18n.fournissour.update, i18n.fournissour.insert);
    });

    $('a#delete').click (function() {
        appFn.deleteBtn(i18n.fournissour.delete);
    });
});