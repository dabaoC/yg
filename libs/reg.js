// 正则验证
$(function(){

	var necessaryItemObject = {
		userId:{
			el:$("#userId"),
			reg: /^[\u4e00-\u9fa5a-z0-9\-_]{4,20}$/i,
			hasVaild: false
		},
		pwd:{
			el:$("#pwd"),
			reg: /^[a-z0-9\u0021-\u002f]{6,20}$/,
			hasVaild: false
		},
		// 手机快捷登录页面
		// 手机号
		reg_mobile:{
			el:$("#reg_mobile"),
			reg:/^(\+86\-)?[1]\d{10}$/,
			hasVaild:false
		},
		// 短信验证码
		reg_mobile_code:{
			el:$("#reg_mobile_code"),
			reg:/^[0-9]{4,6}$/,
			hasVaild:false
		},
		// 注册页验证码
		code2:{
			el:$("#look_code"),
			reg:/^[0-9a-z]{4,6}$/
		},
		// 确认密码
		confirpwd:{
			reg:/^[0-9a-z]{4,6}$/
		}

	}
	// 事件委托，将 onchange 事件绑定在 form 元素上
	$(".nreg_form").on("blur",".nreg_item",function(){
		// console.log(1);
		// 获取输入框对象
		var input = $(this).find("input");
		// 获取id对象
		var id = input.attr("id");
		console.log(id);
		// 获取对应正则
		var userReg = necessaryItemObject[id].reg;
		// 获取输入框内容
		var inputVal = input.val();
		// 获取错误提示对象
		var errTip = $(this).find(".errortips");
		// 验证输入内容
		if(!userReg.test(inputVal)){
			errTip.css({visibility:"visible"});
		}else{
			errTip.css({visibility:"hidden"});
		}

		// 二次密码验证
		$("#confirpwd").on("blur","nreg_item",function(){
			var string = this.val();
			if(string !== pwd.val()){
				errTip.css({visibility:"visible"});
			}else{
				errTip.css({visibility:"hidden"});
			}
		})

	})
})