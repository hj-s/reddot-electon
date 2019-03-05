(function () {
			
	const remote = require('electron').remote; 
	const {ipcRenderer } = require('electron')
	
	function init() { 

		document.getElementById("menu-btn").addEventListener("click", function (e) {
			ipcRenderer.send('show-context-menu')
			this.blur()
		});

		document.getElementById("min-btn").addEventListener("click", function (e) {
			const window = remote.getCurrentWindow()
			window.minimize();
			this.blur()
		});
		
		document.getElementById("max-btn").addEventListener("click", function (e) {
			const window = remote.getCurrentWindow();file:///C:/Users/Maksim.Morozov/Documents/Electron/test/icon/close-square-button.svg
			if (!window.isMaximized()) {
				window.maximize();
				this.blur()
			} else {
				window.unmaximize();
				this.blur()
			}	 
		});
		
		document.getElementById("close-btn").addEventListener("click", function (e) {
			const window = remote.getCurrentWindow();
			window.close();
		}); 
	}; 
	
	document.onreadystatechange = function () {
		if (document.readyState == "complete") {
			init(); 
			document.getElementById("sfield").focus();
		}
	};
})();