function countDown(time,callback){
		return setInterval(function(){
			var f = new Date(time);
			var n = new Date();
			var nF = f.getTime();
			var nN = n.getTime();
			var cha = nF - nN;
			// if(cha < 0) return false;
			if(cha < 0){
				// alert(1);
				// $("#Sk_main").html("");
				$(".skill").css({backgroundPosition:"-186px -225px"});
				$(".sgp").css({background:"none"});
				return false;
			}
			var hour = Math.floor(cha / 1000 / 3600);
			cha = cha - hour * 1000 *3600;
			var minute = Math.floor(cha / 1000 / 60);
			cha = cha - minute * 1000 *60; 
			console.log(hour);
			if(hour / 24 > 1){
				var day = parseInt(hour / 24);
				$(".day").html(day);
				console.log(day);
				hour = Math.floor(hour % 24);
				
			}
			var second = Math.floor(cha / 1000);

			// console.log(n);

			var timeRes = {
				hour:hour,
				minute:minute,
				second:second,

			};
			callback(timeRes);

			console.log(timeRes);
		},1000)
	}
	countDown("2018/5/31 22:0:0",render);
	function render(obj){
		$(".hour").html(obj.hour);
		$(".minute").html(obj.minute);
		$(".second").html(obj.second);
		

	}
