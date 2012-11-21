// ==UserScript==
// @name bar
// @include http*
// @require lib/jquery.js
// @require lib/moar.js
// ==/UserScript==

(function(moar, $) {

	var progress, tooltip;

	function injectProgress(markup) {
		progress = moar.injectMarkup(markup);
	}

	function injectTooltip(markup) {
		tooltip = moar.injectMarkup(markup);
	}

	function progressToWidth(progress) {
		if (progress > 0 && progress <= 1) {
			return Math.floor(progress * 100) + '%';
		} else {
			return '0%';
		}
	}

	function update(data) {
		tooltip.toggleClass('active', data.hasOwnProperty('message'));
		tooltip.find('.moarflow-tooltip-content')
			.html(data.message || '');
		progress.toggleClass('active', data.hasOwnProperty('progress'));
		progress.find('.moarflo-progress-value')
			.css('width', progressToWidth(data.progress || 0));
	}

	function init() {
		moar.readFile('css/progress.css').then(moar.injectStyles);
		moar.readFile('css/tooltip.css').then(moar.injectStyles);
		moar.readFile('html/progress.html').then(injectProgress);
		moar.readFile('html/tooltip.html').then(injectTooltip);
	}

	$(init);

	moar.on('progress', update);

})(moar, jQuery);