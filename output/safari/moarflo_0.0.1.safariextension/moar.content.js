// ==UserScript==
// @name bar
// @include http*
// @require lib/jquery.js
// @require moar.shared.js
// ==/UserScript==

(function(moar, $) {

	var progress, tooltip;

	function injectProgress(markup) {
		progress = moar.injectMarkup(markup);
		progress.data('value', progress.find('.moarflo-progress-value'));
	}

	function injectTooltip(markup) {
		tooltip = moar.injectMarkup(markup);
		tooltip.data('content', tooltip.find('.moarflo-tooltip-content'));
	}

	function inject() {
		return $.when(
			moar.readFile('css/progress.css').then(moar.injectStyles),
			moar.readFile('css/tooltip.css').then(moar.injectStyles),
			moar.readFile('html/progress.html').then(injectProgress),
			moar.readFile('html/tooltip.html').then(injectTooltip)
		);
	}

	function listen() {
		moar.on('moar:progress', update);
	}

	function progressToWidth(progress) {
		if (progress > 0 && progress <= 1)
			return Math.floor(progress * 100.0) + '%';
		else if (progress <= 0)
			return '0%';
		else
			return '100%';
	}

	function update(data) {

		var style = $.trim(data.style);
		var message = $.trim(data.message);
		var progressValue = parseFloat(data.progress || -1);

		progress.toggleClass('moarflo-active', progressValue >= 0);
		progress.data('value').css('width', progressToWidth(progressValue));
		progress.removeClass('moarflo-prompt moarflo-error');

		tooltip.toggleClass('moarflo-active', message.length > 0);
		tooltip.removeClass('moarflo-prompt moarflo-error');
		if (message.length > 0) {
			tooltip.data('content').html(message);
			tooltip.css({ marginLeft: -tooltip.width()/2 });
		}

		if (style === 'prompt' || style === 'error') {
			tooltip.addClass('moarflo-' + style);
			progress.addClass('moarflo-' + style);
		}

	}

	function init() {
		inject().then(listen);
	}

	$(init);

	moar.on('progress', update);

})(moar, jQuery);