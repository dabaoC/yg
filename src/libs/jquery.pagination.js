;+function(factory){
    //AMD判断;
    if(typeof define === "function" && define.amd){
       define(["jquery","cookie"],factory)
    }else{
        factory(jQuery);
    }
}(function($){
    //插件代码;
    function Pagination(url,item_main,button_main){
        this.url = url;
        this.page = 1;
        this.pageNum = 6;
        this.item_main = $(item_main);
        this.button_main = $(button_main);
        if(this.url == "" || this.item_main.length == 0 || this.button_main.length == 0) return ;
        this.init();
    }
    Pagination.prototype = {
        constructor:Pagination,
        init(){
            //console.log(1);
            // this.load_data()
            this.loading()
            .then(function (res) {
                // console.log(JSON.parse(res)[0]);
                
                this.json = JSON.parse(res)[0].resultList;
                this.render_page();

                // console.log(res);
            }.bind(this));
            this.create_btn();
            this.button_main.on("click","a",$.proxy(this.change_page,this))

        },
        loading(){
            // 加载数据
            var opt = {
                url: "/yougou",
                data: {
                    
                    brandEnName: 0,
                    attrStr: 0,
                    pageNo: this.page,
                    orderBy: 1,
                    tag: 2

                },
                type:"POST"
                
            }

            return $.ajax(opt);
        },
        render_page(){


            var html = "";
            this.json.forEach(function(item){
                html += `<li class="prolist">
                <div class="img_hd">
                        
                    <a href="details.html?id=${item.commodityNo}"><img src=${item.imgUrl} alt=""></a>
                    <em class="saleActiveRemark xsq">限时抢<strong>¥${item.salePrice}</strong></em>
                    
                </div>
                <div class="img_bd">
                    <span class="nptt">
                        <a href="#javascript" title=${item.commodityName}>${item.commodityName}</a>
                    </span>
                    <p class="price_sc">
                        <em class="ygprc">¥<i>${item.salePrice}</i></em>
                        <del>¥${item.marketPrice}</del> 
                    </p>
                    <button class="addbtn" data-id="${item.commodityNo}"><a>加入购物车</a></button>
                </div>
            </li>`;
                                
            }.bind(this));


            this.item_main.append($(html));

            this.item_main.find(".addbtn a").on("click", $.proxy(this.addCart, this));
            this.item_main.find(".addbtn a").on("click",$.proxy(this.changeNum,this));
            this.item_main.find(".addbtn a").on("click",$.proxy(this.getCar,this));

            this.item_main.find(".prolist .img_hd").on("click",$.proxy(this.goodsdetail,this));
            



        },



        // 商品详情页
        goodsdetail(){
            // 获取点击事件源对象
            var target = event.target || event.srcElement;
            // 获取商品id

            var prolist = $(target).parents(".prolist");


            var shopId = prolist.find(".img_bd .addbtn").attr("data-id");
            // var ts = $(target).siblings()

            console.log(shopId);

            var shopImg = prolist.find(".img_hd img").attr("src");
            var shopName = prolist.find(".img_bd span a").attr("title");
            var shopPrice = prolist.find(".img_bd p .ygprc i").html();
            var delPrice = prolist.find(".img_bd .price_sc del").html();
            console.log(delPrice);
            // 将商品id存入cookie
            // 首先查询cookie中是否有name为 shopdetail 的数据
            // 如果不存在，就创建一个对象存放到 cookie 中
            if(!$.cookie("shopdetail")){
                var obj = {
                    id: shopId,
                    // num: 1,
                    name:shopName,
                    img:shopImg,
                    price:shopPrice,
                    delPrice:delPrice

                }

                var jsonArr = [];
                jsonArr.push(obj);
                var jsonStr = JSON.stringify(jsonArr);
                $.cookie("shopdetail",jsonStr);
                // console.log($.cookie("shopdetail"));
                return;
            }


            var jsonStr = $.cookie("shopdetail");

            var jsonArr = JSON.parse(jsonStr);
            // console.log(jsonStr);

            // 用于判断是否找到对应id 的标志
            var hasItem = false;
            for (var i = 0; i < jsonArr.length; i++) {
                var item = jsonArr[i];
                if (item.id == shopId) {
                    // 将 hasItem 标志置为true
                    hasItem = true;
                    break;
                }
            }

            // 如果没有找到对应的id，则创建一个对象，将数据追加到json数组中
            if (!hasItem) {
                var obj = {
                    id: shopId,
                    // num: 1,
                    name:shopName,
                    img:shopImg,
                    price:shopPrice,
                    delPrice:delPrice

                }
                jsonArr.push(obj); 
                // console.log(jsonArr);
            }

            // 将json数组转换为对象并存入cookie中            
            var jsonStr = JSON.stringify(jsonArr);
            $.cookie("shopdetail", jsonStr);
            console.log($.cookie("shopdetail"));

        },












        // 添加购物车
        addCart(event) {
            // 获取点击的事件源对象
            var target = event.target || event.srcElement;
            // 获取商品id
            var prolist = $(target).parents(".prolist");
            var productId = $(target).parent().attr("data-id");
            var productImg = prolist.find(".img_hd img").attr("src");
            var productName = prolist.find(".img_bd span a").attr("title");
            var proPrice = prolist.find(".img_bd p .ygprc i").html();
            // 将商品id存入cookie
            // 首先查询cookie中是否有name为 shopCart 的数据
            // 如果不存在，就创建一个对象存放到 cookie 中
            if (!$.cookie("shopCart")) {                
                var obj = {
                    id: productId,
                    num: 1,
                    name:productName,
                    img:productImg,
                    price:proPrice

                }
                var jsonArr = [];
                jsonArr.push(obj);
                // 将json 数组对象转为字符串存入 cookie 中
                var jsonStr = JSON.stringify(jsonArr);
                $.cookie("shopCart", jsonStr);
                console.log($.cookie("shopCart"));
                return;
            }
            

            // 如果存在对应的 cookie，遍历里面的数据
            var jsonStr = $.cookie("shopCart");
            // console.log(jsonStr);
            var jsonArr = JSON.parse(jsonStr);
            // 用于判断是否找到对应id 的标志
            var hasItem = false;
            for (var i = 0; i < jsonArr.length; i++) {
                var item = jsonArr[i];
                // 如果找到id 相等的数据，将商品数量加一
                if (item.id == productId) {
                    item.num++;
                    // 将 hasItem 标志置为true
                    hasItem = true;
                    break;
                }
            }

            // 如果没有找到对应的id，则创建一个对象，将数据追加到json数组中
            if (!hasItem) {
                var obj = {
                    id: productId,
                    num: 1,
                    name:productName,
                    img:productImg,
                    price:proPrice
                }
                jsonArr.push(obj); 
            }

            // 将json数组转换为对象并存入cookie中            
            var jsonStr = JSON.stringify(jsonArr);
            $.cookie("shopCart", jsonStr);
            console.log($.cookie("shopCart"));
        },
        // 更改数字
        changeNum(){
            $("#pordcount").html(this.getSum());

        },     
        // 获取总和
        getSum(){
            var shopCarString = $.cookie("shopCart");
            if(shopCarString){
                var shopCarArray = JSON.parse(shopCarString);
                var sum = 0;
                shopCarArray.forEach(function(item){
                    sum += Number(item.num);
                })
                // console.log(sum);
                return sum;
            }
            return 0;
        },   



        // 添加页数的button

        create_btn(){
            for(var i = 0 ; i < this.pageNum; i++){
                 var $a = $("<a>")
                 $a.attr("href","#javascript");
                 $a.html(i+1);
                 this.button_main.append($a);
            }
        },
        // 换页
        change_page(event){
            var target = event.target || event.srcElement;
            var index = $(target).index();
            // console.log(index);
            this.page = index+1;
            this.loading()
            .then(function(res){
                this.json = JSON.parse(res)[0].resultList;
                this.render_page();
            }.bind(this))
            console.log(this.page);
        }
    }

    $.pageation = Pagination;
    return Pagination;
});
