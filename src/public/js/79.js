var txts = "/book";
var a = "";

function LoadData() {
    $.ajax({
        method: 'get',
        dataType: 'json',
        url: txts,
        success: function (db) {
            var data = db.result;
            var list = $('.table tbody');
            var list_block;
            $('#submit').attr('disabled', true);
            $('#total-d').text('(' + db.totalDel + ')');
            $('#total').text('Total : '+db.total)
            $('.table tbody tr').remove();
            for (var row in data) {
                list_block = $('<tr onclick="selectRow(this)"></tr>');
                list.append(list_block);
                list_block.append('<td><input name="bookIds" class="form-check-input larger" type="checkbox" value="' + data[row]._id + '" onclick="offCheck(this)"></td>');
                list_block.append('<td><label>' + data[row].name + '</label></td>');
                list_block.append('<td class="phone-c">' + data[row].author + '</td>');
                list_block.append('<td class="phone-c date-c">' + data[row].createdAt + '</td>');
                list_block.append('<td style="text-align: inherit;"><a title="detail" onclick="detail()" class="btn btn-o" style="color: green;"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="ct-ic bi bi-eye-fill" viewBox="0 0 16 16"><path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/><path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/></svg></a><a onclick="optUpdate(this.name)" title="update" class="btn btn-o" name="' + data[row]._id + '" style="color: blue;"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="ct-ic bi bi-tools" viewBox="0 0 16 16"><path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.356 3.356a1 1 0 0 0 1.414 0l1.586-1.586a1 1 0 0 0 0-1.414l-3.356-3.356a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3c0-.269-.035-.53-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814L1 0zm9.646 10.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708zM3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026L3 11z"/></svg></a><a title="delete" onclick="delBook(this.name)" name="' + data[row]._id + '" id="Items-del" class="btn btn-o" style="color: red;"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="ct-ic bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg></a></td>');
            }
        },
        error: function () {
            alert('error when load data!!!');
        }
    });
}
$(document).ready(function () {
    $('#myMenu li').click(function (e) {
        e.preventDefault();
        $('#myMenu li').css("background-color", "rgb(44 44 44)");
        $(this).css("background-color", "grey");
        txts = "/book/searchType?q=" + $(this).find('a').text();
        LoadData();
    });
    $('#submit-search').click(function (e) {
        e.preventDefault();
        $('#myMenu li').css("background-color", "rgb(44 44 44)");
        txts = "/book/searchName?q=" + $('#name-s').val();
        LoadData();
    });
});

function detail(){
    alert('The system is upgrading');
}

function delBook(id) {
    $.ajax({
        method: 'post',
        dataType: 'json',
        url: '/admin/delete/' + id + '?_method=DELETE',
        success: function (status) {
            alert(status.mess);
        },
        error: function (xhr, status, error) {
            alert('error send server!!!');
        }
    });
    LoadData();

};

function OptionAll() {
    if ($('#method').val() == "") {
        alert("Choose Method Active")
    } else {
        var form = $('#Form-Check')
        data = form.serialize();
        $.ajax({
            method: 'post',
            data: data,
            url: '/admin/control-actionForm',
            success: function (status) {
                alert(status.mess);
            },
            error: function (xhr, status, error) {
                alert('error send server!!!');
            }
        });
        LoadData();

    }
}
function Create() {
    $('#fCreate div input[name="description"]').val($('#fCreate div textarea').val())
    var form = $('#fCreate')
    data = form.serialize();
    $.ajax({
        method: 'post',
        data: data,
        url: '/admin/create',
        success: function (status) {

            alert(status.mess);
        },
        error: function (xhr, status, error) {
            alert('error send server!!!');
        }
    });
    txts = '/book';
    LoadData();
    $('#myModal').modal('hide');
    $('#fCreate div input:text').val('');
    $('#fCreate div textarea').val('');
}

//Update
function optUpdate(c) {
    $('#myModal2').modal('show');
    $.ajax({
        method: 'get',
        dataType: 'json',
        url: '/book/search?q=' + c,
        success: function (db) {
            var data = db.result;
            $('#name').val(data[0].name);
            $('#type').val(data[0].type);
            $('#author').val(data[0].author);
            $('#linkImg').val(data[0].linkImg);
            $('#linkBook').val(data[0].linkBook);
            $('#dcription').val(data[0].description);
            a = c;
        },
        error: function () {
            alert('error when load data!!!');
        }
    });
}
function Update() {
    $('#fUpdate div input[name="description"]').val($('#fUpdate div textarea').val())
    var form = $('#fUpdate')
    data = form.serialize();
    $.ajax({
        method: 'post',
        data: data,
        url: '/admin/update/' + a + '?_method=PUT',
        success: function (status) {
            alert(status.mess);
        },
        error: function () {
            alert('error send server!!!');
        }
    });
    LoadData();
    $('#myModal2').modal('hide');
}
