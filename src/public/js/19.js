var txts = "/book";
var type ="";
var a = true;

function LoadData() {
    $.ajax({
        method: 'get',
        dataType: 'json',
        url: txts,
        success: function (db) {
            var data = db.result;
            var list = $('.list');
            var list_block;
            if(a==true){
                $('#name-show h1').text('Type / '+type);
            }else{
                $('#name-show h1').text('Search Result :');
            }
            $('.list div').remove();
            if(data.length<1){
                list.append('<div class="text-center"><a>Empty</a></div>');
            }else{
                for (var row in data) {
                    list_block = $('<div class="col-xs-4 col-sm-3 col-md-2" title="'+data[row].name+'"></div>');
                    list.append(list_block);
                    list_block.append('<a href="/book/'+data[row].slug+'" id="name"><img src="'+data[row].linkImg+'" class="card-img-top" alt="..."><div class="caption"><h3>'+data[row].name+'</h3></div></a>');
                    }
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
        type = $(this).find('a').text();
        txts = "/book/searchType?q=" + $(this).find('a').text();
        a=true;
        LoadData();
    });
    $('#submit-search').click(function (e) {
        e.preventDefault();
        txts = "/book/searchName?q=" + $('#name-s').val();
        a=false;
        LoadData();
    });
});