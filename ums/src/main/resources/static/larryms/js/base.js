layui.extend({
	larryms: "lib/larryms"
}).define(["jquery", "configure", "layer", "larryms"], function(e) {
	"use strict";
	var s = layui.$,
		o = layui.configure,
		c = layui.layer,
		u = layui.device(),
		a = s(window),
		y = layui.larryms;
	var r = new Function;
	var i = {
		larryms: "lib/larryms",
		larryTab: "lib/larryTab",
		larryElem: "lib/larryElem",
		larryMenu: "lib/larryMenu",
		larryajax: "lib/larryajax",
		larryEditor: "lib/larryEditor",
		larryApi: "lib/larryApi",
		larryTree: "lib/larryTree",
		larrySecret: "lib/larrySecret",
		shuttle: "lib/shuttle",
		face: "lib/face",
		xss: "lib/xss",
		wangEditor: "lib/extend/we/wangEditor",
		echarts: "lib/extend/echarts",
		echartStyle: "lib/extend/echartStyle",
		md5: "lib/extend/md5",
		base64: "lib/extend/base64",
		geetest: "lib/extend/geetest",
		classie: "lib/extend/classie",
		snapsvg: "lib/extend/svg/snapsvg",
		svgLoader: "lib/extend/svg/svgLoader",
		clipboard: "lib/extend/clipboard",
		countup: "lib/extend/countup",
		qrcode: "lib/extend/qrcode",
		ueconfig: "lib/extend/ueditor/ueconfig",
		ueditor: "lib/extend/ueditor/ueditor",
		howler: "lib/extend/howler",
		Vue: "lib/Vue"
	};
	r.prototype.modules = function() {
		for (var e in i) {
			layui.modules[e] = i[e]
		}
	}();
	if (o.thirdExtend == true) {
		var l = o.basePath + o.thirdDir + "conf.json";
		s.ajaxSettings.async = false;
		s.getJSON(l, function(e) {
			for (var a in e) {
				layui.modules[a] = o.thirdDir + e[a]
			}
		});
		s.ajaxSettings.async = true
	}
	window.larrymsExtend = true;
	layui.cache.extendStyle = o.basePath + "lib/extendStyle/";
	var d = o.modules + o.modsname;
	if (o.uploadUrl) {
		layui.cache.neUploadUrl = o.uploadUrl
	} else {
		layui.cache.neUploadUrl = ""
	}
	if (o.upvideoUrl) {
		layui.cache.neVideoUrl = o.upvideoUrl
	} else {
		layui.cache.neVideoUrl = ""
	}
	function f() {
		var e = a.width();
		if (e >= 1200) {
			return 3
		} else if (e >= 992) {
			return 2
		} else if (e >= 768) {
			return 1
		} else {
			return 0
		}
	}
	r.prototype.init = function() {
		var e = this;
		y.debug = o.debug;
		if (o.browserCheck) {
			if (u.ie && u.ie < 8) {
				c.alert("本系统最低支持ie8，您当前使用的是古老的 IE" + u.ie + " \n 建议使用IE9及以上版本的现代浏览器", {
					title: y.tit[0],
					skin: "larry-debug",
					icon: 2,
					resize: false,
					zIndex: c.zIndex,
					anim: Math.ceil(Math.random() * 6)
				})
			}
			if (u.ie) {
				s("body").addClass("larryms-ie-hack")
			}
		}
		y.screen = f();
		if (o.fontSet) {
			if (o.font !== "larry-icon") {
				layui.link(layui.cache.base + "css/fonts/larry-icon.css")
			}
			y.fontset({
				font: o.font,
				url: o.fontUrl,
				online: o.fontSet
			})
		} else {
			layui.link(layui.cache.base + "css/fonts/larry-icon.css")
		}
		if (window.top === window.self) {
			layui.use(["larrySecret", "md5"], function() {
				var e = layui.larrySecret,
					a = layui.md5;
				var r = e.userKey;
				if (o.grantUser && o.grantKey) {
					var i = y.grantCheck(o.grantUser, o.grantKey, r);
					if (!i) {
						console.log("您需要前往larryms.com官网获取产品授权,或检查授权参数是否正确配置");
						return false
					}
				} else {
					console.log("请前往larryms.com官方获取授权密钥,或检查配置文件必填参数");
					return false
				}
			})
		}
		if (layui.cache.page) {
			layui.cache.page = layui.cache.page.split(",");
			if (s.inArray("larry", layui.cache.page) === -1) {
				var a = {};
				for (var r = 0; r < layui.cache.page.length; r++) {
					a[layui.cache.page[r]] = d + layui.cache.page[r]
				}
				layui.extend(a);
				layui.use(layui.cache.page)
			}
		}
		if (o.basecore !== "undefined") {
			var i = o.basecore.split(",");
			var l = {};
			for (var r = 0; r < i.length; r++) {
				l[i[r]] = o.modules + i[r]
			}
			layui.extend(l);
			layui.use(o.basecore)
		}
		if (o.modscore) {
			if (layui.cache.modscore == false) {
				return false
			}
			var n = o.corename.split(",");
			var t = {};
			for (var r = 0; r < n.length; r++) {
				t[n[r]] = d + n[r]
			}
			layui.extend(t);
			layui.use(o.corename)
		}
		if (o.animations) {
			layui.link(o.basePath + "lib/extendStyle/animatelib/animations.css")
		}
	}();
	window.onresize = function() {
		y.screen = f()
	};
	e("larry", {})
});