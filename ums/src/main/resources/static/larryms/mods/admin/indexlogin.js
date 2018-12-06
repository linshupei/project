layui.define(["larry", "form", "larryms"], function(i) {
	var a = layui.$,
		e = layui.larry,
		r = layui.larryms,
		l = layui.form;
	a(document).ready(function(e) { 
        var counter = 0;
        if (window.history && window.history.pushState) {
                         a(window).on('popstate', function () {
                                        window.history.pushState('forward', null, '#');
                                        window.history.forward(1);
                            });
          }

          window.history.pushState('forward', null, '#'); //在IE中必须得有这两行
          window.history.forward(1);
	});
	
	function t() {
		a.supersized({
			slide_interval: 3e3,
			transition: 1,
			transition_speed: 1e3,
			performance: 1,
			min_width: 0,
			min_height: 0,
			vertical_center: 1,
			horizontal_center: 1,
			fit_always: 0,
			fit_portrait: 1,
			fit_landscape: 0,
			slide_links: "blank",
			slides: [{
				image: layui.cache.imgPath + "1.jpg"
			}, {
				image: layui.cache.imgPath + "2.jpg"
			}, {
				image: layui.cache.imgPath + "3.jpg"
			}]
		})
	}
	r.plugin("jquery.supersized.min.js", t);
	/**a("#captchaImg").on("click", function() {
		a(this).attr("src", layui.cache.captcha + "?time=" + Math.random())
	});**/
	
	l.on("submit(dologin)", function(i) {
		a.ajax({ 
	        type: "post", 
	        url: "/api/login", 
	        async:false, 
	        data:{"userName":i.field.uname,"password":i.field.password},
	        dataType: "json",
	        success: function(jsonData){ 
	           	 loginResultProcess(jsonData);
	        } 
		});
		return false;
	});
	
	function loginResultProcess(resultData){
	   if (resultData.code=="0") {
			layer.msg("登录成功", {
				icon: 1,
				time: 1e3
			});
			layui.sessionData("ticket",resultData.ticket);
			setTimeout(function() {
				 location.replace("index.html"); 
				//window.location.href = "index.html";
			}, 1e3)
		} else {
			layer.tips("用户名或密码错误！", a("#password"), {
				tips: [3, "#FF5722"]
			})
		}
	}
	
	i("indexlogin", {});
});