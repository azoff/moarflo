// ==UserScript==
// @name bar
// @include http*
// @require lib/jquery.js
// ==/UserScript==

(function(global, api, $) {

	var progress;

	function readFile(file, callback) {
		api.xhr.send({
			async: true,
			method: 'GET',
			url: file,
			contentType: 'text'
		}, function(data) {
			callback(data.response);
		});
	}

	function injectStyles(css) {
		$('<style type="text/css" />')
			.html(css)
			.appendTo('head');
	}

	function injectMarkup(html) {
		progress = $(html).prependTo('body');
	}

	function init() {
		readFile('css/progress.css', injectStyles);
		readFile('html/progress.html', injectMarkup);
	}

	$(init);

})(window, kango, jQuery.noConflict(true));