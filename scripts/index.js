const ipc = require('electron').ipcRenderer

var btnSettings = document.getElementById("btn_settings")
btnSettings.addEventListener('click', function (event) {
    ipc.send('open-settings')
})

ipc.on('settings-saved', function (event) {

})