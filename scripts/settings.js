const { clipboard } = require('electron')
const keyCodes = {
    V: 86,
}


document.onkeydown = function (event) {
    let toReturn = true
    if (event.ctrlKey || event.metaKey) {  // detect ctrl or cmd
        if (event.which == keyCodes.V) {
            document.activeElement.value += clipboard.readText()
            document.activeElement.dispatchEvent(new Event('input'))
            toReturn = false
        }
    }

    return toReturn
}

let $ = require('jquery');

$('#btnAPI').on('click', function (event) {
    const jsonKey = { 'apikey': document.getElementById("txtApiKey").value }
    const keyStr = JSON.stringify(jsonKey)
    console.log('request-json=' + keyStr)
    // $('#preferences').children().prop('disabled', true);
    $.ajax({
        type: "POST",
        url: "http://nova.astrometry.net/api/login",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        data: 'request-json=' + keyStr,
        // success: function (data) {
        //     console.log(data)
        // },
        complete: function (xhr, status) {
            console.log(status + ': ' + xhr)
        }
    })
})