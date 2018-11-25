!
function(r) {
	"use strict";
	var p = document,
		d = {
			modules: {},
			status: {},
			timeout: 10,
			event: {}
		},
		n = function() {
			this.v = "2.4.3"
		},
		f = function() {
			var e = p.currentScript ? p.currentScript.src : function() {
					for (var e, t = p.scripts, o = t.length - 1, n = o; n > 0; n--) if ("interactive" === t[n].readyState) {
						e = t[n].src;
						break
					}
					return e || t[o].src
				}();
			return e.substring(0, e.lastIndexOf("/") + 1)
		}(),
		m = function(e) {
			r.console && console.error && console.error("Layui hint: " + e)
		},
		v = "undefined" != typeof opera && "[object Opera]" === opera.toString(),
		h = {
			layer: "modules/layer",
			laydate: "modules/laydate",
			laypage: "modules/laypage",
			laytpl: "modules/laytpl",
			layim: "modules/layim",
			layedit: "modules/layedit",
			form: "modules/form",
			upload: "modules/upload",
			tree: "modules/tree",
			table: "modules/table",
			element: "modules/element",
			rate: "modules/rate",
			colorpicker: "modules/colorpicker",
			slider: "modules/slider",
			carousel: "modules/carousel",
			flow: "modules/flow",
			util: "modules/util",
			code: "modules/code",
			jquery: "modules/jquery",
			mobile: "modules/mobile",
			"layui.all": "../layui.all"
		};
	n.prototype.cache = d, n.prototype.define = function(e, n) {
		var t = this,
			o = "function" == typeof e,
			r = function() {
				var o = function(e, t) {
						layui[e] = t, d.status[e] = !0
					};
				return "function" == typeof n && n(function(e, t) {
					o(e, t), d.callback[e] = function() {
						n(o)
					}
				}), this
			};
		return o && (n = e, e = []), layui["layui.all"] || !layui["layui.all"] && layui["layui.mobile"] ? r.call(t) : (t.use(e, r), t)
	}, n.prototype.use = function(o, e, t) {
		function n(e, t) {
			var o = "PLaySTATION 3" === navigator.platform ? /^complete$/ : /^(complete|loaded)$/;
			("load" === e.type || o.test((e.currentTarget || e.srcElement).readyState)) && (d.modules[l] = t, u.removeChild(c), function e() {
				return ++s > 1e3 * d.timeout / 4 ? m(l + " is not a valid module") : void(d.status[l] ? r() : setTimeout(e, 4))
			}())
		}
		function r() {
			t.push(layui[l]), o.length > 1 ? i.use(o.slice(1), e, t) : "function" == typeof e && e.apply(layui, t)
		}
		var i = this,
			a = d.dir = d.dir ? d.dir : f,
			u = p.getElementsByTagName("head")[0];
		o = "string" == typeof o ? [o] : o, window.jQuery && jQuery.fn.on && (i.each(o, function(e, t) {
			"jquery" === t && o.splice(e, 1)
		}), layui.jquery = layui.$ = jQuery);
		var l = o[0],
			s = 0;
		if (t = t || [], d.host = d.host || (a.match(/\/\/([\s\S]+?)\//) || ["//" + location.host + "/"])[0], 0 === o.length || layui["layui.all"] && h[l] || !layui["layui.all"] && layui["layui.mobile"] && h[l]) return r(), i;
		if (d.modules[l])!
		function e() {
			return ++s > 1e3 * d.timeout / 4 ? m(l + " is not a valid module") : void("string" == typeof d.modules[l] && d.status[l] ? r() : setTimeout(e, 4))
		}();
		else {
			var c = p.createElement("script"),
				y = (h[l] ? a + "lay/" : /^\{\/\}/.test(i.modules[l]) ? "" : d.base || "") + (i.modules[l] || l) + ".js";
			y = y.replace(/^\{\/\}/, ""), c.async = !0, c.charset = "utf-8", c.src = y +
			function() {
				var e = d.version === !0 ? d.v || (new Date).getTime() : d.version || "";
				return e ? "?v=" + e : ""
			}(), u.appendChild(c), !c.attachEvent || c.attachEvent.toString && c.attachEvent.toString().indexOf("[native code") < 0 || v ? c.addEventListener("load", function(e) {
				n(e, y)
			}, !1) : c.attachEvent("onreadystatechange", function(e) {
				n(e, y)
			}), d.modules[l] = y
		}
		return i
	}, n.prototype.getStyle = function(e, t) {
		var o = e.currentStyle ? e.currentStyle : r.getComputedStyle(e, null);
		return o[o.getPropertyValue ? "getPropertyValue" : "getAttribute"](t)
	}, n.prototype.link = function(t, o, e) {
		var n = this,
			r = p.createElement("link"),
			i = p.getElementsByTagName("head")[0];
		"string" == typeof o && (e = o);
		var a = (e || t).replace(/\.|\//g, ""),
			u = r.id = "layuicss-" + a,
			l = 0;
		return r.rel = "stylesheet", r.href = t + (d.debug ? "?v=" + (new Date).getTime() : ""), r.media = "all", p.getElementById(u) || i.appendChild(r), "function" != typeof o ? n : (function e() {
			return ++l > 1e3 * d.timeout / 100 ? m(t + " timeout") : void(1989 === parseInt(n.getStyle(p.getElementById(u), "width")) ?
			function() {
				o()
			}() : setTimeout(e, 100))
		}(), n)
	}, d.callback = {}, n.prototype.factory = function(e) {
		if (layui[e]) return "function" == typeof d.callback[e] ? d.callback[e] : null
	}, n.prototype.addcss = function(e, t, o) {
		return layui.link(d.dir + "css/" + e, t, o)
	}, n.prototype.img = function(e, t, o) {
		var n = new Image;
		return n.src = e, n.complete ? t(n) : (n.onload = function() {
			n.onload = null, "function" == typeof t && t(n)
		}, void(n.onerror = function(e) {
			n.onerror = null, "function" == typeof o && o(e)
		}))
	}, n.prototype.config = function(e) {
		e = e || {};
		for (var t in e) d[t] = e[t];
		return this
	}, n.prototype.modules = function() {
		var e = {};
		for (var t in h) e[t] = h[t];
		return e
	}(), n.prototype.extend = function(e) {
		var t = this;
		e = e || {};
		for (var o in e) t[o] || t.modules[o] ? m("模块名 " + o + " 已被占用") : t.modules[o] = e[o];
		return t
	}, n.prototype.router = function(e) {
		var t = this,
			e = e || location.hash,
			o = {
				path: [],
				search: {},
				hash: (e.match(/[^#](#.*$)/) || [])[1] || ""
			};
		return /^#\//.test(e) ? (e = e.replace(/^#\//, ""), o.href = "/" + e, e = e.replace(/([^#])(#.*$)/, "$1").split("/") || [], t.each(e, function(e, t) {
			/^\w+=/.test(t) ?
			function() {
				t = t.split("="), o.search[t[0]] = t[1]
			}() : o.path.push(t)
		}), o) : o
	}, n.prototype.data = function(e, t, o) {
		if (e = e || "layui", o = o || localStorage, r.JSON && r.JSON.parse) {
			if (null === t) return delete o[e];
			t = "object" == typeof t ? t : {
				key: t
			};
			try {
				var n = JSON.parse(o[e])
			} catch (e) {
				var n = {}
			}
			return "value" in t && (n[t.key] = t.value), t.remove && delete n[t.key], o[e] = JSON.stringify(n), t.key ? n[t.key] : n
		}
	}, n.prototype.sessionData = function(e, t) {
		return this.data(e, t, sessionStorage)
	}, n.prototype.device = function(e) {
		var o = navigator.userAgent.toLowerCase(),
			t = function(e) {
				var t = new RegExp(e + "/([^\\s\\_\\-]+)");
				return e = (o.match(t) || [])[1], e || !1
			},
			n = {
				os: function() {
					return /windows/.test(o) ? "windows" : /linux/.test(o) ? "linux" : /iphone|ipod|ipad|ios/.test(o) ? "ios" : /mac/.test(o) ? "mac" : void 0
				}(),
				ie: function() {
					return !!(r.ActiveXObject || "ActiveXObject" in r) && ((o.match(/msie\s(\d+)/) || [])[1] || "11")
				}(),
				weixin: t("micromessenger")
			};
		return e && !n[e] && (n[e] = t(e)), n.android = /android/.test(o), n.ios = "ios" === n.os, n
	}, n.prototype.hint = function() {
		return {
			error: m
		}
	}, n.prototype.each = function(e, t) {
		var o, n = this;
		if ("function" != typeof t) return n;
		if (e = e || [], e.constructor === Object) {
			for (o in e) if (t.call(e[o], o, e[o])) break
		} else for (o = 0; o < e.length && !t.call(e[o], o, e[o]); o++);
		return n
	}, n.prototype.sort = function(e, i, t) {
		var o = JSON.parse(JSON.stringify(e || []));
		return i ? (o.sort(function(e, t) {
			var o = /^-?\d+$/,
				n = e[i],
				r = t[i];
			return o.test(n) && (n = parseFloat(n)), o.test(r) && (r = parseFloat(r)), n && !r ? 1 : !n && r ? -1 : n > r ? 1 : n < r ? -1 : 0
		}), t && o.reverse(), o) : o
	}, n.prototype.stope = function(t) {
		t = t || r.event;
		try {
			t.stopPropagation()
		} catch (e) {
			t.cancelBubble = !0
		}
	}, n.prototype.onevent = function(e, t, o) {
		return "string" != typeof e || "function" != typeof o ? this : n.event(e, t, null, o)
	}, n.prototype.event = n.event = function(e, t, n, o) {
		var r = this,
			i = null,
			a = t.match(/\((.*)\)$/) || [],
			u = (e + "." + t).replace(a[0], ""),
			l = a[1] || "",
			s = function(e, t) {
				var o = t && t.call(r, n);
				o === !1 && null === i && (i = !1)
			};
		return o ? (d.event[u] = d.event[u] || {}, d.event[u][l] = [o], this) : (layui.each(d.event[u], function(e, t) {
			return "{*}" === l ? void layui.each(t, s) : ("" === e && layui.each(t, s), void(e === l && layui.each(t, s)))
		}), i)
	}, r.layui = new n
}(window);