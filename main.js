const { app, BrowserWindow, ipcMain } = require('electron')
const { Menu, MenuItem } = require('electron')
const settings = require('electron-settings')

let mainWin

function createWindow() {
    app.requestSingleInstanceLock()
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
    // if (process.platform !== 'darwin') {
    app.quit()
    // }
})


const template = [
    {
        label: (process.platform === 'darwin') ? app.getName() : "Main Menu",
        submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'services' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideothers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' }
        ]
    }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)