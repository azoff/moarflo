(function(global, dom, loader, $) {

	"use strict";

	var api;
	var whenDom = $.Deferred();
	var whenKango = $.Deferred();

	function setApi() {
		api = global.kango;
	}

	function addListeners() {
		$(dom.body).on('click keydown', '.plugin', runPlugin);
	}

	function updateProgress(data) {
		api.browser.tabs.getCurrent(function(tab) {
			tab.dispatchMessage('moar:progress', data);
		});
	}

	function newJob(step, i, total) {
		var job = $.Deferred();
		job.fail(function(message){
			updateProgress({
				style: 'error',
				message: message
			});
		});
		job.progress(function(message){
			updateProgress({
				message: message
			});
		});
		job.then(function(message){
			updateProgress({
				progress: parseFloat(i+1) / total,
				message: message
			});
		});
		return {
			start: function() {
				step(job);
			},
			next: function(callback) {
				job.then(callback);
			}
		};
	}

	function executePlugin(plugin) {
		var total = plugin.steps.length;
		var i, first, prev, next;
		updateProgress({ progress: 0 });
		if (total <= 0) {
			updateProgress({
				style: 'error',
				message: 'Error loading plugin'
			});
		} else {
			first = prev = newJob(plugin.steps[i], i, total);
			for (i=1; i<total; i++) {
				next = newJob(plugin.steps[i], i, total);
				prev.next(next.start);
			}
			first.start();
		}
	}

	function runPlugin(event) {
		var target = $(event.currentTarget);
		var name = target.attr('name');
		moar.getPlugin(name).then(executePlugin);
	}

	whenKango.then(setApi);
	whenDom.then(addListeners);
	$.when(whenKango, whenDom).then(runPlugin);
	$(dom).ready(whenDom.resolve);
	loader.onReady(whenKango.resolve);

})(window, document, KangoAPI, moar, jQuery);