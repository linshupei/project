var larryTab;
layui.define(["jquery", "configure", "larryTab"], function(e) {
	var l = layui.$,
		r = layui.configure,
		o = layui.layer,
		i = layui.laytpl,
		s = layui.larryms,
		a = layui.common,
		n = layui.form,
		m = l(window),
		c = l("body"),
		d = l("#larry_layout"),
		y = r.basePath + "lib/templets/style/theme.css",
		f = "lib/templets/theme";
	
	l("#resetPassword").on("click", function() {
		var dataUrl = l("#resetPassword").data("url"),
			account = l("#uname").html();
	  	  var openResetPasswordUrl = dataUrl + "?account=" + account;
	      var a = s.open({
				title: "修改密码",
				type: 2,
				maxmin:false,
				area: ["500px", "300px"],
				scrollbar:false,
				content: openResetPasswordUrl
		  });			 
	});		
	l(document).ready(function(e) { 
	        var counter = 0;
	        if (window.history && window.history.pushState) {
	                         l(window).on('popstate', function () {
	                                        window.history.pushState('forward', null, '#');
	                                        window.history.forward(1);
	                            });
	          }
	
	          window.history.pushState('forward', null, '#'); //在IE中必须得有这两行
	          window.history.forward(1);
	});
	
	(function outDateFunction(){
		l.ajax({ 
	        type: "get", 
	        url: "/api/loginOutTime", 
	        dataType: "json",
	        success: function(jsonData){ 
	        	if(jsonData.code=="1"){
	        		location.replace("/html/login.html");
	        	}
	        } 
		});		
		setInterval(function(){
			l.ajax({ 
		        type: "get", 
		        url: "/api/loginOutTime", 
		        dataType: "json",
		        success: function(jsonData){ 
		        	if(jsonData.code=="1"){
		        		location.replace("/html/login.html");
		        	}
		        } 
			});		
		},1000*60);		
	})();

	
	
	setInterval(function(){
		l.ajax({ 
	        type: "get", 
	        url: "/api/query/loanInfoMsg", 
	        dataType: "json",
	        async:false, 
	        success: function(jsonData){ 
				if(jsonData.code=="0"){
				  // l(".larryms-msg-danger").empty();
				   if(jsonData.data){
				      if(jsonData.data.outLoan){
				    	  l(".larryms-msg-error").remove();
							s.notice({
								msg: "您今天有"+jsonData.data.outLoan+"笔逾期贷款未处理",
								url: "",
								msgtype: "error"
							}, {
								action: 4,
								hide: "click"
							});				      
				      }
				      if(jsonData.data.applyLoanMsg){
				    	  l(".larryms-msg-info").remove();
							s.notice({
								msg: jsonData.data.applyLoanMsg.msgContent,
								url: "",
								msgtype: "info"
							}, {
								action: 4,
								hide: "click"
							})				      
				      }
				      if(jsonData.data.validCodeMsg){
				    	  l(".larryms-msg-danger").remove();
							s.notice({
								msg: jsonData.data.validCodeMsg.msgContent,
								url: "",
								msgtype: "danger"
							}, {
								action: 4,
								hide: "click"
							})				      
				      }
				      if(jsonData.data.payMsg){
				    	  l(".larryms-msg-warning").remove();
							s.notice({
								msg: jsonData.data.payMsg.msgContent,
								url: "",
								msgtype: "warning"
							}, {
								action: 4,
								hide: "click"
							})				      
				      }				      
				   
				   }

				}
	        } 
		});		
	},1000*10);	

	l.ajax({ 
	       type: "post", 
	       url: "/api/currentAccount", 
	       dataType: "json",
	       success: function(jsonData){ 
		       if(jsonData.code=="0"){
		      	 l("#uname").html(jsonData.account);
		      	 l("#user_photo").attr("src",jsonData.headImage+"?data="+Math.random());
		       }
	       } 
	});
				
	larryTab = layui.larryTab({
		tab_elem: "#larry_tab",
		tabMax: 30,
		spreadOne: true
	});
	var u = function() {
			if (layui.data("larryms").topMenuSet === undefined) {
				layui.data("larryms", {
					key: "topMenuSet",
					value: true
				})
			}
			larryTab.menuSet({
				type: "GET",
				url: layui.cache.menusUrl,
				data: layui.cache.menuData,
				left_menu: "#larryms_left_menu",
				leftFilter: "LarrySide",
				top_menu: layui.data("larryms").topMenuSet !== false ? "#larryms_top_menu" : false
			});
			larryTab.menu();
			var e = layui.data("larryms").systemSet === undefined ? false : layui.data("larryms").systemSet.tabCache;
			if (e) {
				larryTab.session(function(e) {
					if (e.getItem("tabMenu")) {
						l("#larry_tab_title li.layui-this").trigger("click")
					}
				})
			}
		};
	if (window.top == window.self) {
		u()
	}
	var p = layui.data("larryms").lockscreen,
		h = layui.data("larryms").systemSet;
	if (p === "locked") {
		E()
	}
	if (h) {
		if (h.fullScreen == true) {
			var v = o.alert("按ESC退出全屏", {
				title: "进入全屏提示信息",
				skin: "layui-layer-lan",
				closeBtn: 0,
				anim: 4,
				offset: "100px"
			}, function() {
				s.fullScreen.entry();
				o.close(v)
			})
		}
	}
	l("#larryms_version").text(s.version);
	l("#menufold").on("click", function() {
		if (l("#larry_layout").hasClass("larryms-fold")) {
			l("#larry_layout").addClass("larryms-unfold").removeClass("larryms-fold");
			l(this).children("i").addClass("larry-fold7").removeClass("larry-unfold")
		} else {
			l("#larry_layout").addClass("larryms-fold").removeClass("larryms-unfold");
			l(this).children("i").addClass("larry-unfold").removeClass("larry-fold7")
		}
	});
	l("#larryTheme").on("click", function() {
		if (l("#larrymsThemes").length > 0) {
			return false
		}
		var e = o.open({
			type: 1,
			id: "larry_theme_R",
			title: false,
			anim: Math.ceil(Math.random() * 6),
			offset: "r",
			closeBtn: false,
			shade: .2,
			shadeClose: true,
			skin: "layui-anim layui-anim-rl larryms-layer-right",
			area: "320px",
			success: function(e, a) {
				layui.link(y);
				s.htmlRender(f, e)
			}
		})
	});
	var b = function() {
			this.themeColor = {
			default:
				{
					topColor: "#1b8fe6",
					topThis: "#1958A6",
					topBottom: "#01AAED",
					leftColor: "#2f3a4f",
					leftRight: "#258ED8",
					navThis: "#1492DD",
					titBottom: "#1E9FFF",
					footColor: "#245c87",
					name: "default"
				}, deepBlue: {
					topColor: "#1b8fe6",
					topThis: "#1958A6",
					topBottom: "#01AAED",
					leftColor: "#2f3a4f",
					leftRight: "#258ED8",
					navThis: "#1492DD",
					titBottom: "#1E9FFF",
					footColor: "#245c87",
					name: "deepBlue"
				},
				green: {
					topColor: "#2a877b",
					topThis: "#5FB878",
					topBottom: "#50A66F",
					leftColor: "#343742",
					leftRight: "#50A66F",
					navThis: "#56a66c",
					titBottom: "#50A66F",
					footColor: "#3e4e63",
					name: "green"
				},
				navy: {
					topColor: "#2f4056",
					topThis: "#0d51a9",
					topBottom: "#01AAED",
					leftColor: "#393d49",
					leftRight: "#1E9FFF",
					navThis: "#1E9FFF",
					titBottom: "#01AAED",
					footColor: "#343742",
					name: "navy"
				},
				orange: {
					topColor: "#F39C34",
					topThis: "#CD7013",
					topBottom: "#FF5722",
					leftColor: "#1d1f26",
					leftRight: "#FFB800",
					navThis: "#df7700",
					titBottom: "#FFB800",
					footColor: "#f2f2f2",
					footFont: "#666",
					name: "orange"
				}
			}
		};
	b.prototype.theme = function(e) {
		var a = "Larryms_theme_style",
			t = document.createElement("style"),
			o = layui.data("larryms"),
			r = i([".layui-header{background-color:{{d.topColor}} !important;border-bottom:3px solid {{d.topBottom}};}", ".larryms-extend{border-left:1px solid {{d.topThis}} }", ".larryms-nav-bar{background-color:{{d.topBottom}} !important;}", ".larryms-extend .larryms-nav li.larryms-this{background:{{d.topThis}} !important; }", ".larryms-extend .larryms-nav li.larryms-nav-item:hover{background:{{d.topThis}} !important; }", ".larryms-extend .larryms-nav li.larryms-this:hover{background:{{d.topThis}} }", ".larryms-fold .larryms-header .larryms-topbar-left .larryms-switch{border-left:1px solid {{d.topThis}} !important;}", ".larryms-extend  ul.layui-nav li.layui-nav-item:hover{background:{{d.topThis}} !important;}", ".larryms-topbar-right .layui-nav-bar{background-color: {{d.navThis}} !important;}", ".larryms-nav-tree .larryms-this,", ".larryms-nav-tree .larryms-this>a{background-color:{{d.navThis}} !important;}", ".larryms-body .larryms-left{border-right:2px solid {{d.leftRight}} !important;}", ".layui-bg-black{background-color:{{d.leftColor}} !important;}", ".larryms-body .larryms-left{background:{{d.leftColor}} !important;}", "ul.larryms-tab-title .layui-this{background:{{d.navThis}} !important;}", ".larryms-right .larryms-tab .larryms-title-box{border-bottom:1px solid  {{d.titBottom}};}", ".larryms-right .larryms-tab .larryms-title-box .larryms-tab-title{border-bottom:1px solid  {{d.titBottom}};}", ".larryms-layout .larryms-footer{background:{{d.footColor}} !important;color:{{d.footFont}} !important;}"].join("")).render(e),
			l = document.getElementById(a);
		if ("styleSheet" in t) {
			t.setAttribute("type", "text/css");
			t.styleSheet.cssText = r
		} else {
			t.innerHTML = r
		}
		t.id = a;
		l && c[0].removeChild(l);
		c[0].appendChild(t);
		o.theme = o.theme || {};
		layui.each(e, function(e, a) {
			o.theme[e] = a
		});
		layui.data("larryms", {
			key: "theme",
			value: o.theme
		})
	};
	var g = l(".site-tree-mobile"),
		C = l(".site-mobile-shade"),
		k = l("#larrymsMobileMenu"),
		_ = l("#larrymsMobileShade"),
		T = l("#rightMenuButton"),
		w = l("#larrymsMobileShadeRmenu");
	g.on("click", function() {
		c.addClass("mobile-side-show");
		l("#larry_left").removeClass("pt-page-moveToLeftFade");
		l("#larry_left").addClass("pt-page-moveFromLeft")
	});
	C.on("click", function() {
		c.removeClass("mobile-side-show");
		l("#larry_left").removeClass("pt-page-moveFromLeft");
		l("#larry_left").addClass("pt-page-moveToLeftFade")
	});
	var F = false;
	k.on("click", function() {
		if (!F) {
			l("#larryms_top_menu").show();
			l("#larryms_top_menu").addClass("pt-page-moveFromTop");
			l("#larryms_top_menu").removeClass("pt-page-moveToLeftFade");
			_.show();
			F = true;
			console.log(F)
		} else {
			l("#larryms_top_menu").removeClass("pt-page-moveFromTop");
			l("#larryms_top_menu").addClass("pt-page-moveToLeftFade");
			_.hide();
			F = false;
			console.log(F)
		}
		if (l("#larryms_top_menu").hasClass("pt-page-moveFromTop")) {
			if (l("#larry_left").hasClass("pt-page-moveFromLeft")) {
				l("#larry_left").removeClass("pt-page-moveFromLeft");
				l("#larry_left").addClass("pt-page-moveToLeftFade");
				l(".site-mobile-shade").click()
			}
		}
	});
	l("#larryms_top_menu").on("click", function() {
		if (F) {
			k.click();
			g.click()
		}
	});
	_.on("click", function() {
		l(this).hide();
		k.click()
	});
	var S = false;
	T.on("click", function() {
		var e = l("#topbarRMenu").height();
		if (!S) {
			l("#topbarR").animate({
				height: e
			});
			S = true;
			w.show()
		} else {
			l("#topbarR").animate({
				height: "50px"
			});
			S = false;
			w.hide()
		}
	});
	w.on("click", function() {
		l(this).hide();
		T.click()
	});
	l("#topbarRMenu li").on("click", function() {
		if (S) {
			T.click()
		}
	});
	b.prototype.responeDevice = function() {
		var e = this,
			a = s.deviceType();
		if (a.devices == "mobile") {
			c.addClass("larryms-mobile");
			c.removeClass("larryms-pad");
			l("#larry_layout").removeClass("larryms-fold");
			l("#larry_layout").removeClass("larryms-unfold")
		} else if (a.devices == "pad") {
			c.addClass("larryms-pad");
			c.removeClass("larryms-mobile");
			l("#larryms_top_menu").removeClass("pt-page-moveToLeftFade");
			l("#larry_left").addClass("pt-page-moveFromLeft");
			l("#larry_left").removeClass("pt-page-moveToLeftFade");
			l("#larry_layout").removeClass("larryms-mobile-layout");
			l("#larry_layout").addClass("larryms-fold").removeClass("larryms-unfold");
			l("#menufold").children("i.larry-icon").addClass("larry-unfold").removeClass("larry-fold7")
		} else if (a.devices == "pc") {
			c.removeClass("larryms-mobile");
			c.removeClass("larryms-pad");
			l("#larryms_top_menu").removeClass("pt-page-moveToLeftFade");
			l("#larry_left").removeClass("pt-page-moveToLeftFade");
			l("#larry_layout").removeClass("larryms-mobile-layout");
			l("#larry_layout").addClass("larryms-unfold").removeClass("larryms-fold");
			l("#menufold").children("i.larry-icon").addClass("larry-fold7").removeClass("larry-unfold")
		}
	};
	b.prototype.init = function() {
		var e = this,
			a = layui.data("larryms").theme,
			t = layui.data("larryms").systemSet,
			o = layui.data("larryms").mobileTabSwitch;
		e.responeDevice();
		if (a !== undefined) {
			e.theme(a);
			if (a.name == "default") {
				l("#Larryms_theme_style").empty()
			}
		}
		if (s.deviceType().devices == "mobile") {
			if (o == false) {
				e.mobileTab()
			} else if (o == undefined) {
				e.mobileTab()
			} else {
				l("#mTabswitch").attr("checked", "checked");
				l("#larryms_body").addClass("tab-box-show");
				n.render()
			}
		}
		if (t !== undefined) {
			larryTab.tabSet({
				tabSession: t.tabCache,
				autoRefresh: t.tabRefresh,
				isPageEffect: t.pageAnim
			});
			l("#larry_footer").data("show", t.footSet)
		} else {
			layui.data("larryms", {
				key: "systemSet",
				value: {
					tabCache: r.tabSession,
					tabRefresh: r.tabRefresh,
					topMenuSet: r.topMenuSet,
					fullScreen: false,
					pageAnim: r.animations,
					footSet: l("#larry_footer").data("show")
				}
			})
		}
		x()
	};
	b.prototype.footInit = function(e) {
		l("#larry_footer").data("show", e);
		x()
	};
	b.prototype.fScreen = function(e) {
		if (e) {
			s.fullScreen.entry()
		} else {
			s.fullScreen.exit()
		}
	};
	b.prototype.pageAnimInit = function(e) {
		var a = this;
		a.init()
	};
	b.prototype.menuInit = function() {
		if (layui.data("larryms").topMenuSet !== undefined) {
			top.location.reload(true)
		}
	};
	b.prototype.mobileTab = function() {
		var e = layui.data("larryms").mobileTabSwitch;
		if (e) {
			l("#mTabswitch").click();
			l("#larryms_body").addClass("tab-box-show");
			n.render()
		} else {
			l("#mTabswitch").removeAttr("checked");
			n.render();
			l("#larryms_body").removeClass("tab-box-show")
		}
	};
	n.on("switch(mTabswitch)", function(e) {
		if (e.elem.checked) {
			layui.data("larryms", {
				key: "mobileTabSwitch",
				value: true
			});
			l("#larryms_body").addClass("tab-box-show")
		} else {
			layui.data("larryms", {
				key: "mobileTabSwitch",
				value: false
			});
			l("#larryms_body").removeClass("tab-box-show")
		}
	});

	function x() {
		if (l("#larry_footer").data("show") !== "on") {
			l("#larry_footer").hide();
			l("#larry_right").css({
				bottom: "0px"
			});
			l(".site-tree-mobile").css({
				bottom: "16px"
			})
		} else {
			l("#larry_footer").show();
			l("#larry_right").css({
				bottom: "40px"
			});
			l(".site-tree-mobile").css({
				bottom: "51px"
			})
		}
	}
	var B = new b;
	B.init();
	l("#clearCached").off("click").on("click", function() {
		s.cleanCached.clearAll();
		o.alert("缓存清除完成!本地存储数据也清理成功！", {
			icon: 1,
			title: "系统提示",
			end: function() {
				top.location.href = location.href
			}
		})
	});
	l("#logout").off("click").on("click", function() {
		var a = l(this).data("url");
		s.confirm("确定退出系统吗?", {}, function(e) {
			top.location.href = a
		}, function() {
			o.msg("成功返回系统", {
				time: 1e3,
				btnAlign: "c"
			})
		})
	});
	l("#lock").mouseover(function() {
		o.tips("请按Alt+L快速锁屏！", l(this), {
			tips: [4, "#FF5722"],
			time: 1e3
		})
	});
	l("#lock").off("click").on("click", function() {
		E()
	});

	function E() {
		var e = l("#user_photo").attr("src"),
			a = l("#uname").text();
		D({
			Display: "block",
			UserPhoto: e,
			UserName: a
		});
		layui.data("larryms", {
			key: "lockscreen",
			value: "locked"
		});
		M()
	}
	function L() {
		var e = l("#user_photo").attr("src"),
			a = l("#uname").text();
		l.ajax({ 
	        type: "post", 
	        url: "/api/login", 
	        async:false, 
	        data:{"userName":a,"password":l("#unlock_pass").val()},
	        dataType: "json",
	        success: function(jsonData){ 
				if (jsonData.code=="0") {
					D({
						Display: "none",
						UserPhoto: e,
						UserName: a
					})
				} else {
					o.tips("锁屏，输入登录密码解锁", l("#unlock"), {
						tips: [2, "#FF5722"],
						time: 1e3
					});
					return
				}	           	 
	        } 
		});
					

	}
	l(document).keydown(function() {
		return A(arguments[0])
	});

	function A(e) {
		var a;
		if (window.event) {
			a = e.keyCode
		} else if (e.which) {
			a = e.which
		}
		if (e.altKey && a == 76) {
			E()
		}
	}
	function D(e) {
		var a = "larry_lock_screen",
			t = document.createElement("div"),
			o = i(['<div class="lock-screen" style="display: {{d.Display}};">', '<div class="lock-wrapper" id="lock-screen">', '<div id="time"></div>', '<div class="lock-box">', '<img src="{{d.UserPhoto}}" alt="">', "<h1>{{d.UserName}}</h1>", '<form action="" class="layui-form lock-form">', '<div class="layui-form-item">', '<input type="password" value="" id="unlock_pass" name="lock_password" lay-verify="pass" placeholder="锁屏状态，请输入密码解锁" autocomplete="off" class="layui-input"  autofocus="">', "</div>", '<div class="layui-form-item">', '<span class="layui-btn larry-btn" id="unlock">立即解锁</span>', "</div>", "</form>", "</div>", "</div>", "</div>"].join("")).render(e),
			r = document.getElementById(a);
		t.id = a;
		t.innerHTML = o;
		r && c[0].removeChild(r);
		if (e.Display !== "none") {
			c[0].appendChild(t)
		} else {
			l("#larry_lock_screen").empty()
		}
		l("#unlock").off("click").on("click", function() {
			L();
			layui.data("larryms", {
				key: "lockscreen",
				value: "unlock"
			})
		});
		l("#unlock_pass").keypress(function(e) {
			if (window.event && window.event.keyCode == 13) {
				l("#unlock").click();
				return false
			}
		})
	}
	function M() {
		var e = new Date;
		var a = e.getHours();
		var o = e.getMinutes();
		var r = e.getSeconds();
		o = o < 10 ? "0" + o : o;
		r = r < 10 ? "0" + r : r;
		l("#time").html(a + ":" + o + ":" + r);
		t = setTimeout(function() {
			M()
		}, 500)
	}



	
	function U() {
		var e = '<iframe src="' + layui.cache.homeUrl + '" id="ifr-0" data-group="0" data-id="1701" lay-id="" name="ifr_0" class="larryms-iframe"></iframe>';
		l("#homePage").append(e)
	}
	if (window.addEventListener) {
		window.addEventListener("load", U())
	} else if (window.attachEvent) {
		window.attachEvent("onload", U())
	} else {
		window.onload = U()
	}
	window.onresize = function() {
		B.responeDevice()
	};
	e("index", B)
});