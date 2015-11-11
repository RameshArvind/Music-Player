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
$(".paddingExtra").click(function(){
	console.log("clicked")
	$(this).children("p").css("opacity","0.4");
	$(this).children("p").animate({"opacity":"1.0"},400);
});
});