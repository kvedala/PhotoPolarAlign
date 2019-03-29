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