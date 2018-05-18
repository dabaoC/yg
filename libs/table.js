function Table() {
	this.init();
}
Table.prototype.init = function () {
	this.sp_a = $(".sp_li>a");
	this.sp_li = $(".sp_li");
	this.mdlist = $(".mdlist");

	// this.sp_li.parent().on("mouseenter", "li", $.proxy(this.changeIndex, this));
	var _this = this;
	this.sp_li.mouseenter(function () {
		$(this).siblings().removeClass("sp_on");
		$(this).parent().find("a").removeClass("sp_aon");
		$(this).addClass("sp_on");
		$(this).find("a").addClass("sp_aon");
		_this.index = $(this).index();
		_this.changeItem();
	});

	this.sp_li.on("mouseleave", function () {
		$(this).siblings().removeClass("sp_on");
		$(this).siblings().find("a").removeClass("sp_aon");
		console.log(this);
	});

	




}
// Table.prototype.changeIndex = function () {
// 	// $(target).siblings().removeClass("sp_on");
// 	// $(target).parent().find("a").removeClass("sp_aon");
// 	// $(target).addClass("sp_on");
// 	// $(target).find("a").addClass("sp_aon");

// 	this.changeItem();
// }
Table.prototype.changeItem = function () {
	for (var i = 0; i < this.mdlist.length; i++) {
		this.mdlist[i].style.zIndex = 0;

	}
	this.mdlist[this.index].style.zIndex = 1;
}
new Table();
