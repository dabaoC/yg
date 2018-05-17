function move(ele,json,cb){
	if(move.moving){
		move.stop();
	}
	ele.timer = {
		
	};
	for(var attr in json){
		(function(myAttr){
			ele.timer[myAttr] = setInterval(function(){
				console.log(1);
				//myAttr == width;
				//计算速度;
				var iNow = parseInt(getStyle(ele,myAttr))
				var speed = (json[myAttr] - iNow) / 6;
				speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
				if(json[myAttr] == iNow){
					clearInterval(ele.timer[myAttr]);
					delete ele.timer[myAttr];
					// console.log(Object.keys(ele.timer));
					if(!Object.keys(ele.timer).length){
						// 所有动画执行结束;
						// console.log("所有动画执行结束");
						if(cb){
							cb();
						}
						move.moving = false;
					}
				}else{
					ele.style[myAttr] = iNow + speed + "px";
				}
			},50)
		})(attr)
	}
	move.stop = function(bool){
		for(var attr in ele.timer){
			clearInterval(ele.timer[attr]);
			delete ele.timer[attr];
		}
		if(bool){
			for(var attr in json){
				if(attr == "opacity"){
					ele.style.opacity = json[opacity] / 100;
				}else{
					ele.style[attr] = json[attr] + "px";
				}
			}
		}
	}
	move.moving = true;
}


function getStyle(ele,attr){
	if(getComputedStyle){
		return getComputedStyle(ele)[attr];
	}else{
		return ele.currentStyle[attr];
	}
}
