const ipc = require('electron').ipcRenderer
const esettings = require('electron-settings')
const $ = require('jquery')

var notification = {
    title: require('electron').remote.app.getName(),
    body: '',
    icon: (process.platform === 'darwin') ? 'images/PPALogo.icns' : 'images/PPA.ico'
    // image: 'images/PPALogo.bmp'
}

$(window).on('load', function () {
    if (esettings.has('novaAPIKey') === false)
        ipc.send('open-settings')
    else {
        new window.Notification('Found API key: ' + esettings.get('novaAPIKey'), notification)
    }
})

$(window).on('unload', function () {
    if (esettings.has('novaSession') === true)
        esettings.delete('novaSession')
})

var btnSettings = document.getElementById("btn_settings")
btnSettings.addEventListener('click', function (event) {
    ipc.send('open-settings')
})

ipc.on('settings-saved', function (event) {

})