$(function(){

	var curVolume = 90;
	$("#eqOptions").fadeOut(1);

$("#volControl").bind("mousewheel",function(e){
		console.log(event.wheelDelta);
		val = event.wheelDelta + 0;
		curVolume += (val/120)*5;
		curVolume = Math.floor(curVolume);
		if(curVolume > 100)
			curVolume =100;
		if(curVolume < 0)
			curVolume =0;
		console.log(curVolume);
		$(this).children("p").text(curVolume+"%");
	});

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



var animated = false;
// $("#equalizer").mouseenter(function(){
// 	if(!animated){
// 		animated = true;
// 	$(this).children("p").fadeOut(250,function(){
// 		$("#eqOptions").fadeIn(250,function(){animated = false;});
// 	});
// 	}
// });
// $("#equalizer").mouseleave(function(){
// 	if(!animated){
// 		animated = true;
// 	$("#eqOptions").fadeOut(250,function(){
// 		$(this).siblings("p").fadeIn(250,function(){
// 			animated = false;
// 		});
// 	});
// 	}
// });

$("#button_play").click(play);

$(".paddingExtra").click(function(){
	console.log("clicked")
	$(this).children("p").css("opacity","0.4");
	$(this).children("p").animate({"opacity":"1.0"},400);
});
});