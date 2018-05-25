define(["pagination"],function(pagination){
	var url = "http://localhost/yougou/libs/seckill.json";
	new pagination(url,".container ul",".pagination");
})