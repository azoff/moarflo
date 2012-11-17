// ==UserScript==
// @name bar
// @include http*
// @require lib/jquery.js
// @require lib/moar.js
// ==/UserScript==

(function(moar, $) {

	var progress;

	function injectProgress(markup) {
		progress = moar.injectMarkup(markup);
		progress.addClass('active');
	}

	function init() {
		moar.readFile('css/progress.css').then(moar.injectStyles);
		moar.readFile('html/progress.html').then(injectProgress);
	}

	$(init);

})(moar, jQuery);