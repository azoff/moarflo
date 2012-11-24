(function(api) {

	function testUserInterface() {
		var button = api.ui.browserButton;
		var random = function(start, end) {
			start = Number(start); end = Number(end);
			return Math.round(start + Math.random() * (end - start));
		};
		button.addEventListener(button.event.COMMAND, function() {
			api.browser.tabs.getCurrent(function(tab) {
				var data = {};
				if (random(0,2)%2) data.progress = Math.random();
				if (random(0,2)%2) data.style = (random(0,2)%2) ? 'error' : 'prompt';
				if (random(0,2)%2 && data.hasOwnProperty('progress'))
					data.message = 'Current ' + (data.style||'step') + ' is at ' + Math.floor(data.progress*100.0) + '%';
				tab.dispatchMessage('moar:progress', data);
			});
		});
	}

	testUserInterface();

})(kango);