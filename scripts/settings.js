let $ = require('jquery')

$('#btnAPI').on('click', () => {
    $('#preferences').children().prop('disabled', true)
})