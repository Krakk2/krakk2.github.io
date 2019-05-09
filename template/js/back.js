var iarray = new Object();

function go_donate(){
if($("#name").val() && $("#sid").val() && $("#sum").val()){
$.post(
  "/includes/back.php?func=donate",
  {
    name: $("#name").val(),
	sid: $("#sid").val(),
	sum: $("#sum").val()
  },
function(data){
var info = JSON.parse(data);
if(info.payment_url){
window.location = info.payment_url;
}else{
alert(info.error);
}
}
);
}else{
alert('Заполните все поля!');
}
}