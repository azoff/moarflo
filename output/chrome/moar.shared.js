(function(global, dom, api, $){

	$.noConflict();

	function readFile(file) {
		var job = $.Deferred();
		api.xhr.send({
			async: true,
			method: 'GET',
			url: file,
			contentType: 'text'
		}, function(data) {
			job.resolve(data.response);
		});
		return job.promise();
	}

	function injectStyles(css) {
		return $(dom.createElement('style'))
			.attr('type', 'text/css')
			.html(css)
			.appendTo('head');
	}

	function injectMarkup(html) {
		return $(html).prependTo(dom.body);
	}

	function on(event, callback) {
		api.addMessageListener(event, function(event) {
			callback(event.data || {});
		});
	}

	function log(args) {
		args = Array.prototype.slice.call(arguments);
		api.console.log.apply(api.console, args);
		if (global.console) try {
			global.console.log.apply(global.console, args);
		} catch (e) {
			global.console.log(args.join(' '));
		}
	}

	global.moar = {
		on: on,
		log: log,
		readFile: readFile,
		injectStyles: injectStyles,
		injectMarkup: injectMarkup
	};

})(window, document, kango, jQuery);