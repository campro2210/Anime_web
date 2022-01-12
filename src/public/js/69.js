
$(function () {
    var itemsCheck = $('input[name="bookIds"]');
    var checkAll = $('#check-all');
    var btncheck = $('.c-btn');
    // Header Master Checkbox Event
    checkAll.change(function () {
        var itemsCheck = $('input[name="bookIds"]');
        var isCheckAll = $(this).prop('checked');
        isCheckAll ? itemsCheck.prop('checked', true) : itemsCheck.prop('checked', false);
        listenbutton()
    });
    //Items checks
    itemsCheck.change(function () {
        var isCheckAll = itemsCheck.length === $('input[name="bookIds"]:checked').length;
        isCheckAll ? checkAll.prop('checked', true) : checkAll.prop('checked', false);
        listenbutton()
    });
    //listen button
    function listenbutton() {
        var checkCount = $('input[name="bookIds"]:checked').length;
        (checkCount > 0) ? btncheck.attr('disabled', false) : btncheck.attr('disabled', true);
    }
});
function selectRow(row) {
    var checkAll = $('#check-all');
    var itemsCheck = $('input[name="bookIds"]');
    var btncheck = $('.c-btn');
    var firstInput = row.getElementsByTagName('input')[0];
    firstInput.checked = !firstInput.checked;
    //listen button
    var checkCount = $('input[name="bookIds"]:checked').length;
    (checkCount > 0) ? btncheck.attr('disabled', false) : btncheck.attr('disabled', true);
    //Items checks
    var isCheckAll = itemsCheck.length === $('input[name="bookIds"]:checked').length;
    isCheckAll ? checkAll.prop('checked', true) : checkAll.prop('checked', false);
}

function offCheck(ip) {
    ip.checked = !ip.checked
}

$('#name-s').click(function(){
    $('#name-s').val('');
})