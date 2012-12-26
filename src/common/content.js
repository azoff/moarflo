// ==UserScript==
// @name bar
// @include http*
// @require lib/jquery.js
// @require moar.shared.js
// ==/UserScript==

(function(moar, $) {

	var container;

	function parseMarkup(markup) {
		container = moar.injectMarkup(markup);
		container.data('progress', container.find('.moarflo-progress'));
		container.data('tooltip',  container.find('.moarflo-tooltip'));
		container.data('progress').data('value',
			container.data('progress').find('.moarflo-progress-bar-value'));
		container.data('tooltip').data('content',
			container.data('tooltip').children('.moarflo-tooltip-content'));
	}

	function inject() {
		return $.when(
			moar.readFile('css/content.css').then(moar.injectStyles),
			moar.readFile('content.html').then(parseMarkup)
		);
	}

	function listen() {
		moar.on('moar:progress', update);
	}

	function width(progress) {
		if (progress > 0 && progress <= 1)
			return Math.floor(progress * 100.0) + '%';
		else if (progress <= 0)
			return '0%';
		else
			return '100%';
	}

	function update(data) {
		var style = $.trim(data.style);
		var elements = container.data();
		var message = $.trim(data.message);
		var progress = parseFloat(data.progress || -1);

		elements.progress.data('value').css('width', width(progress));
		elements.progress.toggleClass('moarflo-active', progress >= 0);
		elements.tooltip.toggleClass('moarflo-active', message.length > 0);

		if (message.length > 0) {
			elements.tooltip.data('content').html(message);
			elements.tooltip.css({ marginLeft: -elements.tooltip.width()/2 });
		}

		container.removeClass('moarflo-error moarflo-prompt');
		if (style === 'prompt' || style === 'error')
			container.addClass('moarflo-' + style);
	}

	function init() {
		inject().then(listen);
	}

	$(init);

})(moar, jQuery);