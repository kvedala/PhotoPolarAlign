const { app, BrowserWindow, ipcMain } = require('electron')
const { Menu, MenuItem } = require('electron')

let mainWin

function createWindow() {
    mainWin = new BrowserWindow({
        width: 800, height: 600, resizable: false,
        maximizable: false, fullscreenable: false,
        icon: 'images/PPA.ico',
        darkTheme: true
    })

    mainWin.loadFile('index.html')
    mainWin.webContents.openDevTools()

    mainWin.on('closed', () => {
        mainWin = null
    })
}

app.on('ready', createWindow)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})