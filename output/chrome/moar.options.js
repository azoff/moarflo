(function(global, dom, loader, $) {

	"use strict";

	var api;
	var whenDom = $.Deferred();
	var whenKango = $.Deferred();

	function persistChange(event) {
		var target = $(event.currentTarget);
		api.storage.setItem(target.attr('name'), target.val());
	}

	function addListeners() {
		$('form').on('submit', false)
			.on('keyup change paste', 'input', persistChange);
	}

	function fillInputs() {
		$('input').each(fillInput);
	}

	function fillInput(i, input) {
		var target = $(input);
		target.val(api.storage.getItem(target.attr('name')));
	}

	function setApi() {
		api = global.kango;
	}

	whenKango.then(setApi);
	whenDom.then(addListeners);
	$.when(whenKango, whenDom).then(fillInputs);
	$(dom).ready(whenDom.resolve);
	loader.onReady(whenKango.resolve);

})(window, document, KangoAPI, jQuery);