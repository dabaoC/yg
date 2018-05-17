function Table(){
	this.init();
}
Table.prototype.init = function(){
	this.sp_li = $(".sp_li");
	this.mdlist = $(".mdlist");
	this.index = 0;
	for(let i = 0 ; i < this.sp_li.length ; i++){
		this.sp_li[i].onmouseenter = function(){
		// console.log(this.sp_li[i]);
		this.changeIndex(i);
		}.bind(this);
	}
}
Table.prototype.changeIndex = function(i){
	this.index = i;
	this.changeItem();
}
Table.prototype.changeItem = function(){
	for(var i = 0 ; i < this.mdlist.length ; i++){
		this.mdlist[i].style.zIndex = 0;
	}
	this.mdlist[this.index].style.zIndex = 1;
}	
new Table();
