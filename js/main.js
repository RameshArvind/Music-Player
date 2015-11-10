$(function(){
	var curVolume = 90;
$("#volControl").mouseenter(function(){
	$(this).children("p").fadeOut(function(){
		$(this).text(curVolume+"%");
		$(this).fadeIn();
	});
});
$("#volControl").mouseleave(function(){
	$(this).children("p").fadeOut(function(){
		$(this).text("Volume Controls");
		$(this).fadeIn();
	});
});
});