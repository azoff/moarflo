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

	global.moar = {
		readFile: readFile,
		injectStyles: injectStyles,
		injectMarkup: injectMarkup
	};

})(window, document, kango, jQuery);