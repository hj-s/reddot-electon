const { 
	app,
	BrowserWindow,
	Menu,
	MenuItem,
	ipcMain } = require('electron')
const setupEvents = require('./installers/setupEvents')
const path = require('path')


const menu = new Menu()


if (setupEvents.handleSquirrelEvent()) {
	// squirrel event handled and app will exit in 1000ms, so don't do anything else
	return;
}


function createWindow () {
	let win = new BrowserWindow({ 
		width: 800, 
		height: 600+24, 
		frame: false, 
		resizable: false,
		icon: path.join(__dirname, 'icon/Reddot.ico')
	})

	win.loadFile('index.html')

	menu.append(new MenuItem({ 
		label: 'Restart',
		click: () => {
			win.webContents.executeJavaScript('startMaze()')
		}
	}))
	menu.append(new MenuItem({ type: 'separator' }))
	menu.append(new MenuItem({ 
		label: 'Fov',
		type: 'checkbox',
		checked: true,
		click: (menuItem, browserWindow, event) => {
			win.webContents.executeJavaScript('Global.handleFovCb(event)')
		}
	}))
	menu.append(new MenuItem({ 
		label: 'Path',
		type: 'checkbox',
		checked: true,
		click: () => {
			win.webContents.executeJavaScript('Global.handlePathCb()')
		}
	}))
	menu.append(new MenuItem({ type: 'separator' }))
	menu.append(new MenuItem({ 
		label: 'Exit',
		click: () =>{
			app.quit()
		}
	}))
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
	app.quit();
});
app.on('before-quit', () => {
	mainWindow.removeAllListeners('close');
	mainWindow.close();
});

ipcMain.on('show-context-menu', (event) => {
	const win = BrowserWindow.fromWebContents(event.sender)
	menu.popup(win)
})