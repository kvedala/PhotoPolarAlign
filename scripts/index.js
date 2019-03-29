const ipc = require('electron').ipcRenderer
const esettings = require('electron-settings')
const $ = require('jquery')

$(window).on('load', function() {
    if (esettings.has('novaAPIKey') === false)
        ipc.send('open-settings')
    else 
        console.log('Found API key: ' + esettings.get('novaAPIKey'))
})

var btnSettings = document.getElementById("btn_settings")
btnSettings.addEventListener('click', function (event) {
    ipc.send('open-settings')
})

ipc.on('settings-saved', function (event) {

})