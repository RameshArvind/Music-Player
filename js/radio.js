var xhr,source,audio,button_play,playlist,index,n_index,currSong;
var random,repeat,playing,started,r_index;
var button_play,button_shuffle,button_prev,button_next,list;

	function init(){
		// console.log("init called");
		xhr = new XMLHttpRequest();
		webURL = "http://localhost/project/"
		source = document.getElementById("mp3Source");
		audio = document.getElementById("myAudio");
		button_play= document.getElementById("button_play");
		list = document.createElement("div");
		playing = false;
		started = false;
		index = -1;
		setTimeout(fetch_playlist,0);
		random=false;
		repeat=false;
		deleteAllCookies();
	}


	function play()
	{
		console.log("Music Played");
		if(!playing){
			if(!started){
				fetch_song("next");
			}
			else
			{
				//resume playing
				audio.play();
				playing = true;
				button_play.innerHTML = "PAUSE";
			}
		}
		else
		{
			playing = false;
			button_play.innerHTML = "PLAY";
			audio.pause();
		}
	}

	function fetch_playlist()
	{
		xhr_p = new XMLHttpRequest();
		xhr_p.onload=function(e)
		{
			if (this.status == 200) {
				playlist = JSON.parse(xhr_p.response);
				playlist_length = playlist.songs.length;
				console.log("Playlist Length: "+playlist_length);
				list.innerHTML = "";
				if(currSong)
				{
					for(var i=0;i<playlist_length;i++)
					{
						if(playlist.songs[i].title == currSong.title)
						{
							playlist.songs.splice(i,1);
							break;
						}
					}
					playlist.songs.unshift(currSong);
					index = 0;
				}

				for(var i=0;i<playlist_length;i++)
				{
					var item = document.createElement("div");
					if(currSong && i==0)
						item.className = "current_song";
					else
						item.className = "playlist_song";
					item.innerHTML = ""+(i+1)+".\t"+playlist.songs[i].title;
					// console.log(playlist.songs[i].title);
					list.appendChild(item);
				}
				currSong = null;
				//make buttons visible
			}
		}
		xhr_p.open("GET",webURL+"radio.php?playlist=true",true);
		xhr_p.send();
	}

	function next_song()
	{
		if(repeat && r_index==1)
		{
			audio.currentTime=0;
			audio.play();
			r_index++;
		}
		else if(index==playlist_length-1)
		{
			alert("Playlist has ended");
		}
		else
			fetch_song("next");
	}

	function prev_song()
	{
		fetch_song("prev");
	}

	function shuffle()
	{
		fetch_song("shuffle");
	}

	function set_random()
	{
		if(random){
			document.cookie="random=false;"
			random = false;
		}
		else{
			document.cookie="random=true;"
			random= true;
			currSong = playlist.songs[index];
			setTimeout(fetch_playlist,0);
		}
		console.log("Random : "+random);
	}

	function set_repeat()
	{
		if(repeat)
			repeat = false;
		else{
			repeat = true;
			r_index = 1;
		}
		console.log("Repeat : "+repeat);
	}

	function fetch_song(s)
	{
		var song;
		switch(s)
		{
			case "next": song = playlist.songs[index+1].title;
						 n_index = index+1;
						break;
			case "prev": song = playlist.songs[index-1].title;
						n_index = index-1;
						break;
			case "shuffle" : var r=0;
							 while(r==index)
								 r = Math.floor(Math.random()*playlist_length);
							 song = playlist.songs[r].title;
							 n_index = r;
							 break;
		}
		xhr.open("GET",webURL+"radio.php?song="+song,true);
		console.log("Request : GET,"+webURL+"radio.php?song="+song);
		xhr.responseType = "blob";
		xhr.onload = function(e)
		{
			if (this.status == 200) {
				var blob = this.response;
				url = URL.createObjectURL(blob);	
				source.src = url;
				audio.load();
				audio.play();
				// if(repeat)
				// 	r_index=1;
				// list.childNodes[n_index].className = "current_song";
				// if(index>-1)
				// 	list.childNodes[index].className = "playlist_song";
				index = n_index;
				button_play.innerHTML = "PAUSE";
				playing = true;
				started = true;
				// console.log(audio.playing);
				// console.log(list.childNodes.length);
				
			}
		}
		xhr.send();
		// console.log("request made");
	}
	
	function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
    	var cookie = cookies[i];
    	var eqPos = cookie.indexOf("=");
    	var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    	document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}