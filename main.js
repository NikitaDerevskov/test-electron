const { app, BrowserWindow, Menu} = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')
  win.webContents.openDevTools()

  return win;
}

app.whenReady().then(() => {
  const win = createWindow()
  const menu = Menu.buildFromTemplate([
    {
      label: 'Menu',
      submenu: [
        {role: 'reload'},
        {role: 'undo'},
        {role: 'redo'},
        {role: 'quit'},
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
        { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
        { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
      ]
    }
  ])
  Menu.setApplicationMenu(menu)

  win.webContents.on('context-menu', (e, props) => {
    const {selectionText} = props;
    if (selectionText) {
       const mainMenu = Menu.getApplicationMenu().items.filter(function(item){
      return item.label == "Edit";
    })[0].submenu;
       mainMenu.popup(win);
    }
  })

})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    // createWindow()
  }
})
