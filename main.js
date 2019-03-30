'use strict';

const { app, BrowserWindow, ipcMain } = require('electron')
const { Menu, MenuItem } = require('electron')

let mainWin = null
const debug = /--debug/.test(process.argv[2])

function createWindow() {
    app.requestSingleInstanceLock()
    mainWin = new BrowserWindow({
        width: 800, height: 600, resizable: false,
        maximizable: false, fullscreenable: false,
        icon: 'images/PPA.ico',
        darkTheme: true, webPreferences: { nodeIntegration: true }
    })

    mainWin.loadFile('index.html')
    // Launch fullscreen with DevTools open, usage: npm run debug
    if (debug) {
        mainWin.webContents.openDevTools()
        mainWin.maximize()
        require('devtron').install()
    }

    const template = [
        {
            label: (process.platform === 'darwin') ? app.getName() : "Main Menu",
            submenu: [
                { role: 'about' },
                { role: 'quit' }
            ]
        }
    ]

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)

    mainWin.on('closed', () => {
        mainWin = null
    })
}

app.on('ready', createWindow)
app.on('activate', () => {
    if (mainWin === null)
        createWindow()
})
app.on('window-all-closed', () => {
    // if (process.platform !== 'darwin') {
    app.quit()
    // }
})

ipcMain.on('open-settings', function (event) {
    let childwin = new BrowserWindow({
        width: 400, height: 300, parent: mainWin,
        modal: true, show: false
    })
    childwin.on('closed', () => {
        childwin = null
    })
    childwin.loadFile('./settings.html')
    childwin.once('ready-to-show', () => { childwin.show() })
    childwin.setMenu(null)
    event.sender.send('settings-saved')
})