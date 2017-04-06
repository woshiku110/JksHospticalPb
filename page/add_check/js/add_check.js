$('#select').mouseenter(function(){
	$('#hospital_list').css({
		"display":"block"		
	});
	$('#chevron').removeClass('glyphicon-chevron-down');
	$('#chevron').addClass('glyphicon-chevron-up');
	$.post(_serverHome+'manage/HospitalManage_getHospitalList',{'token':_token},function(res){
		console.log(res);
		var id=res[0];
	});
});
$('#select').mouseleave(function(){
	$('#hospital_list').css({
		"display":"none"
	});
	$('#chevron').removeClass('glyphicon-chevron-up');
	$('#chevron').addClass('glyphicon-chevron-down');
});
$('#hospital_list').on('click','a',function(){
	var hostName=$(this).context.innerHTML;
	$('#search').val(hostName);
});
$('.add_list .search_btn').click(function(){
	var hostId=$('#search').val(hostName);
});
$('#_select').mouseenter(function(){
	$('#_hospital_list').css({
		"display":"block"		
	});
	$('#_chevron').removeClass('glyphicon-chevron-down');
	$('#_chevron').addClass('glyphicon-chevron-up');
});
$('#_select').mouseleave(function(){
	$('#_hospital_list').css({
		"display":"none"
	});
	$('#_chevron').removeClass('glyphicon-chevron-up');
	$('#_chevron').addClass('glyphicon-chevron-down');
});
$('#_hospital_list').on('click','a',function(){
	console.log($(this));
	$('#_search').val(function(){

	});
});
$("#add_btn").click(function(){
	$("#form_group").show();
	$(this).hide();
});
$("#add").click(function(){
	$.post(_serverHome+'manage/CheckManage_addCheck',{'token':_token,'mc':''},function(){
		console.log(_token);
	})
});
$("#cancel").click(function(){
	$("#form_group").hide();
	$("#add_btn").show();
});
