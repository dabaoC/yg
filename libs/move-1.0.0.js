function move(ele,json){

	//目标是开启多个定时器;
		// => 关闭定时器; 

	//储存 定时器的返回值!;  并且可以在定时器内部访问到这个变量;


	// 利用异步程序访问某个变量的数值;

	// for(var i = 0 ; i < aBtn.length ; i++){
	// 	+function(index){
	// 		aBtn[i].onclick = function(){
	// 			console.log(index);
	// 		}
	// 	}(i)
	// }

	// 随机数;

	// 我的大脑特别简单 =>
	//  只能记住一个数字; 
	//  我会产生一个数字;

	// 我告知给你一个数字; => 放在心里;
	// 找一个大兄弟 => 是我的直接提问对象;
	// 我找到大兄弟 => 数字是多少?

	// 我得到数字;

	ele.timer = {
	};
	for(var attr in json){
		(function(myAttr){
			ele.timer[myAttr] = setInterval(function(){
				// console.log(myAttr);
				// console.log(ele.timer[myAttr]);
			},1000)
		})(attr)// left width height
	// (function (){})() === +function(){};
	}
	console.log(ele.timer)
}

function getStyle(ele,attr){
	if(getComputedStyle){
		return getComputedStyle(ele)[attr]
	}else{
		return ele.currentStyle[attr]
	}
}
