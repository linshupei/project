!
function(a) {
	"use strict";
	var f = document,
		p = {
			modules: {},
			status: {},
			timeout: 10,
			event: {}
		},
		i = function() {
			this.v = "2.4.3"
		},
		h = function() {
			var e = f.currentScript ? f.currentScript.src : function() {
					for (var e, t = f.scripts, n = t.length - 1, i = n; i > 0; i--) if ("interactive" === t[i].readyState) {
						e = t[i].src;
						break
					}
					return e || t[n].src
				}();
			return e.substring(0, e.lastIndexOf("/") + 1)
		}(),
		y = function(e) {
			a.console && console.error && console.error("Layui hint: " + e)
		},
		m = "undefined" != typeof opera && "[object Opera]" === opera.toString(),
		v = {
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
	i.prototype.cache = p, i.prototype.define = function(e, i) {
		var t = this,
			n = "function" == typeof e,
			a = function() {
				var n = function(e, t) {
						layui[e] = t, p.status[e] = !0
					};
				return "function" == typeof i && i(function(e, t) {
					n(e, t), p.callback[e] = function() {
						i(n)
					}
				}), this
			};
		return n && (i = e, e = []), layui["layui.all"] || !layui["layui.all"] && layui["layui.mobile"] ? a.call(t) : (t.use(e, a), t)
	}, i.prototype.use = function(n, e, t) {
		function i(e, t) {
			var n = "PLaySTATION 3" === navigator.platform ? /^complete$/ : /^(complete|loaded)$/;
			("load" === e.type || n.test((e.currentTarget || e.srcElement).readyState)) && (p.modules[s] = t, l.removeChild(u), function e() {
				return ++c > 1e3 * p.timeout / 4 ? y(s + " is not a valid module") : void(p.status[s] ? a() : setTimeout(e, 4))
			}())
		}
		function a() {
			t.push(layui[s]), n.length > 1 ? r.use(n.slice(1), e, t) : "function" == typeof e && e.apply(layui, t)
		}
		var r = this,
			o = p.dir = p.dir ? p.dir : h,
			l = f.getElementsByTagName("head")[0];
		n = "string" == typeof n ? [n] : n, window.jQuery && jQuery.fn.on && (r.each(n, function(e, t) {
			"jquery" === t && n.splice(e, 1)
		}), layui.jquery = layui.$ = jQuery);
		var s = n[0],
			c = 0;
		if (t = t || [], p.host = p.host || (o.match(/\/\/([\s\S]+?)\//) || ["//" + location.host + "/"])[0], 0 === n.length || layui["layui.all"] && v[s] || !layui["layui.all"] && layui["layui.mobile"] && v[s]) return a(), r;
		if (p.modules[s])!
		function e() {
			return ++c > 1e3 * p.timeout / 4 ? y(s + " is not a valid module") : void("string" == typeof p.modules[s] && p.status[s] ? a() : setTimeout(e, 4))
		}();
		else {
			var u = f.createElement("script"),
				d = (v[s] ? o + "lay/" : /^\{\/\}/.test(r.modules[s]) ? "" : p.base || "") + (r.modules[s] || s) + ".js";
			d = d.replace(/^\{\/\}/, ""), u.async = !0, u.charset = "utf-8", u.src = d +
			function() {
				var e = p.version === !0 ? p.v || (new Date).getTime() : p.version || "";
				return e ? "?v=" + e : ""
			}(), l.appendChild(u), !u.attachEvent || u.attachEvent.toString && u.attachEvent.toString().indexOf("[native code") < 0 || m ? u.addEventListener("load", function(e) {
				i(e, d)
			}, !1) : u.attachEvent("onreadystatechange", function(e) {
				i(e, d)
			}), p.modules[s] = d
		}
		return r
	}, i.prototype.getStyle = function(e, t) {
		var n = e.currentStyle ? e.currentStyle : a.getComputedStyle(e, null);
		return n[n.getPropertyValue ? "getPropertyValue" : "getAttribute"](t)
	}, i.prototype.link = function(t, n, e) {
		var i = this,
			a = f.createElement("link"),
			r = f.getElementsByTagName("head")[0];
		"string" == typeof n && (e = n);
		var o = (e || t).replace(/\.|\//g, ""),
			l = a.id = "layuicss-" + o,
			s = 0;
		return a.rel = "stylesheet", a.href = t + (p.debug ? "?v=" + (new Date).getTime() : ""), a.media = "all", f.getElementById(l) || r.appendChild(a), "function" != typeof n ? i : (function e() {
			return ++s > 1e3 * p.timeout / 100 ? y(t + " timeout") : void(1989 === parseInt(i.getStyle(f.getElementById(l), "width")) ?
			function() {
				n()
			}() : setTimeout(e, 100))
		}(), i)
	}, p.callback = {}, i.prototype.factory = function(e) {
		if (layui[e]) return "function" == typeof p.callback[e] ? p.callback[e] : null
	}, i.prototype.addcss = function(e, t, n) {
		return layui.link(p.dir + "css/" + e, t, n)
	}, i.prototype.img = function(e, t, n) {
		var i = new Image;
		return i.src = e, i.complete ? t(i) : (i.onload = function() {
			i.onload = null, "function" == typeof t && t(i)
		}, void(i.onerror = function(e) {
			i.onerror = null, "function" == typeof n && n(e)
		}))
	}, i.prototype.config = function(e) {
		e = e || {};
		for (var t in e) p[t] = e[t];
		return this
	}, i.prototype.modules = function() {
		var e = {};
		for (var t in v) e[t] = v[t];
		return e
	}(), i.prototype.extend = function(e) {
		var t = this;
		e = e || {};
		for (var n in e) t[n] || t.modules[n] ? y("模块名 " + n + " 已被占用") : t.modules[n] = e[n];
		return t
	}, i.prototype.router = function(e) {
		var t = this,
			e = e || location.hash,
			n = {
				path: [],
				search: {},
				hash: (e.match(/[^#](#.*$)/) || [])[1] || ""
			};
		return /^#\//.test(e) ? (e = e.replace(/^#\//, ""), n.href = "/" + e, e = e.replace(/([^#])(#.*$)/, "$1").split("/") || [], t.each(e, function(e, t) {
			/^\w+=/.test(t) ?
			function() {
				t = t.split("="), n.search[t[0]] = t[1]
			}() : n.path.push(t)
		}), n) : n
	}, i.prototype.data = function(e, t, n) {
		if (e = e || "layui", n = n || localStorage, a.JSON && a.JSON.parse) {
			if (null === t) return delete n[e];
			t = "object" == typeof t ? t : {
				key: t
			};
			try {
				var i = JSON.parse(n[e])
			} catch (e) {
				var i = {}
			}
			return "value" in t && (i[t.key] = t.value), t.remove && delete i[t.key], n[e] = JSON.stringify(i), t.key ? i[t.key] : i
		}
	}, i.prototype.sessionData = function(e, t) {
		return this.data(e, t, sessionStorage)
	}, i.prototype.device = function(e) {
		var n = navigator.userAgent.toLowerCase(),
			t = function(e) {
				var t = new RegExp(e + "/([^\\s\\_\\-]+)");
				return e = (n.match(t) || [])[1], e || !1
			},
			i = {
				os: function() {
					return /windows/.test(n) ? "windows" : /linux/.test(n) ? "linux" : /iphone|ipod|ipad|ios/.test(n) ? "ios" : /mac/.test(n) ? "mac" : void 0
				}(),
				ie: function() {
					return !!(a.ActiveXObject || "ActiveXObject" in a) && ((n.match(/msie\s(\d+)/) || [])[1] || "11")
				}(),
				weixin: t("micromessenger")
			};
		return e && !i[e] && (i[e] = t(e)), i.android = /android/.test(n), i.ios = "ios" === i.os, i
	}, i.prototype.hint = function() {
		return {
			error: y
		}
	}, i.prototype.each = function(e, t) {
		var n, i = this;
		if ("function" != typeof t) return i;
		if (e = e || [], e.constructor === Object) {
			for (n in e) if (t.call(e[n], n, e[n])) break
		} else for (n = 0; n < e.length && !t.call(e[n], n, e[n]); n++);
		return i
	}, i.prototype.sort = function(e, r, t) {
		var n = JSON.parse(JSON.stringify(e || []));
		return r ? (n.sort(function(e, t) {
			var n = /^-?\d+$/,
				i = e[r],
				a = t[r];
			return n.test(i) && (i = parseFloat(i)), n.test(a) && (a = parseFloat(a)), i && !a ? 1 : !i && a ? -1 : i > a ? 1 : i < a ? -1 : 0
		}), t && n.reverse(), n) : n
	}, i.prototype.stope = function(t) {
		t = t || a.event;
		try {
			t.stopPropagation()
		} catch (e) {
			t.cancelBubble = !0
		}
	}, i.prototype.onevent = function(e, t, n) {
		return "string" != typeof e || "function" != typeof n ? this : i.event(e, t, null, n)
	}, i.prototype.event = i.event = function(e, t, i, n) {
		var a = this,
			r = null,
			o = t.match(/\((.*)\)$/) || [],
			l = (e + "." + t).replace(o[0], ""),
			s = o[1] || "",
			c = function(e, t) {
				var n = t && t.call(a, i);
				n === !1 && null === r && (r = !1)
			};
		return n ? (p.event[l] = p.event[l] || {}, p.event[l][s] = [n], this) : (layui.each(p.event[l], function(e, t) {
			return "{*}" === s ? void layui.each(t, c) : ("" === e && layui.each(t, c), void(e === s && layui.each(t, c)))
		}), r)
	}, a.layui = new i
}(window);
layui.define(function(e) {
	var t = layui.cache;
	
({
		dir: t.dir.replace(/lay\/dest\/$/, "")
	}), e("layui.all", layui.v)
});
layui.define(function(e) {
	"use strict";
	var o = {
		open: "{{",
		close: "}}"
	},
		l = {
			exp: function(e) {
				return new RegExp(e, "g")
			},
			query: function(e, t, n) {
				var i = ["#([\\s\\S])+?", "([^{#}])*?"][e || 0];
				return s((t || "") + o.open + i + o.close + (n || ""))
			},
			escape: function(e) {
				return String(e || "").replace(/&(?!#?[a-zA-Z0-9]+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;")
			},
			error: function(e, t) {
				var n = "Laytpl Error：";
				return "object" == typeof console && console.error(n + e + "\n" + (t || "")), n + e
			}
		},
		s = l.exp,
		t = function(e) {
			this.tpl = e
		};
	t.pt = t.prototype, window.errors = 0, t.pt.parse = function(e, t) {
		var n = this,
			i = e,
			a = s("^" + o.open + "#", ""),
			r = s(o.close + "$", "");
		e = e.replace(/\s+|\r|\t|\n/g, " ").replace(s(o.open + "#"), o.open + "# ").replace(s(o.close + "}"), "} " + o.close).replace(/\\/g, "\\\\").replace(s(o.open + "!(.+?)!" + o.close), function(e) {
			return e = e.replace(s("^" + o.open + "!"), "").replace(s("!" + o.close), "").replace(s(o.open + "|" + o.close), function(e) {
				return e.replace(/(.)/g, "\\$1")
			})
		}).replace(/(?="|')/g, "\\").replace(l.query(), function(e) {
			return e = e.replace(a, "").replace(r, ""), '";' + e.replace(/\\/g, "") + ';view+="'
		}).replace(l.query(1), function(e) {
			var t = '"+(';
			return e.replace(/\s/g, "") === o.open + o.close ? "" : (e = e.replace(s(o.open + "|" + o.close), ""), /^=/.test(e) && (e = e.replace(/^=/, ""), t = '"+_escape_('), t + e.replace(/\\/g, "") + ')+"')
		}), e = '"use strict";var view = "' + e + '";return view;';
		try {
			return n.cache = e = new Function("d, _escape_", e), e(t, l.escape)
		} catch (e) {
			return delete n.cache, l.error(e, i)
		}
	}, t.pt.render = function(e, t) {
		var n, i = this;
		return e ? (n = i.cache ? i.cache(e, l.escape) : i.parse(i.tpl, e), t ? void t(n) : n) : l.error("no data")
	};
	var n = function(e) {
			return "string" != typeof e ? l.error("Template not found") : new t(e)
		};
	n.config = function(e) {
		e = e || {};
		for (var t in e) o[t] = e[t]
	}, n.v = "1.2.0", e("laytpl", n)
});
layui.define(function(e) {
	"use strict";
	var o = document,
		l = "getElementById",
		d = "getElementsByTagName",
		t = "laypage",
		n = "layui-disabled",
		i = function(e) {
			var t = this;
			t.config = e || {}, t.config.index = ++f.index, t.render(!0)
		};
	i.prototype.type = function() {
		var e = this.config;
		if ("object" == typeof e.elem) return void 0 === e.elem.length ? 2 : 3
	}, i.prototype.view = function() {
		var e = this,
			a = e.config,
			r = a.groups = "groups" in a ? 0 | a.groups : 5;
		a.layout = "object" == typeof a.layout ? a.layout : ["prev", "page", "next"], a.count = 0 | a.count, a.curr = 0 | a.curr || 1, a.limits = "object" == typeof a.limits ? a.limits : [10, 20, 30, 40, 50], a.limit = 0 | a.limit || 10, a.pages = Math.ceil(a.count / a.limit) || 1, a.curr > a.pages && (a.curr = a.pages), r < 0 ? r = 1 : r > a.pages && (r = a.pages), a.prev = "prev" in a ? a.prev : "&#x4E0A;&#x4E00;&#x9875;", a.next = "next" in a ? a.next : "&#x4E0B;&#x4E00;&#x9875;";
		var o = a.pages > r ? Math.ceil((a.curr + (r > 1 ? 1 : 0)) / (r > 0 ? r : 1)) : 1,
			i = {
				prev: function() {
					return a.prev ? '<a href="javascript:;" class="layui-laypage-prev' + (1 == a.curr ? " " + n : "") + '" data-page="' + (a.curr - 1) + '">' + a.prev + "</a>" : ""
				}(),
				page: function() {
					var e = [];
					if (a.count < 1) return "";
					o > 1 && a.first !== !1 && 0 !== r && e.push('<a href="javascript:;" class="layui-laypage-first" data-page="1"  title="&#x9996;&#x9875;">' + (a.first || 1) + "</a>");
					var t = Math.floor((r - 1) / 2),
						n = o > 1 ? a.curr - t : 1,
						i = o > 1 ?
					function() {
						var e = a.curr + (r - t - 1);
						return e > a.pages ? a.pages : e
					}() : r;
					for (i - n < r - 1 && (n = i - r + 1), a.first !== !1 && n > 2 && e.push('<span class="layui-laypage-spr">&#x2026;</span>'); n <= i; n++) n === a.curr ? e.push('<span class="layui-laypage-curr"><em class="layui-laypage-em" ' + (/^#/.test(a.theme) ? 'style="background-color:' + a.theme + ';"' : "") + "></em><em>" + n + "</em></span>") : e.push('<a href="javascript:;" data-page="' + n + '">' + n + "</a>");
					return a.pages > r && a.pages > i && a.last !== !1 && (i + 1 < a.pages && e.push('<span class="layui-laypage-spr">&#x2026;</span>'), 0 !== r && e.push('<a href="javascript:;" class="layui-laypage-last" title="&#x5C3E;&#x9875;"  data-page="' + a.pages + '">' + (a.last || a.pages) + "</a>")), e.join("")
				}(),
				next: function() {
					return a.next ? '<a href="javascript:;" class="layui-laypage-next' + (a.curr == a.pages ? " " + n : "") + '" data-page="' + (a.curr + 1) + '">' + a.next + "</a>" : ""
				}(),
				count: '<span class="layui-laypage-count">共 ' + a.count + " 条</span>",
				limit: function() {
					var n = ['<span class="layui-laypage-limits"><select lay-ignore>'];
					return layui.each(a.limits, function(e, t) {
						n.push('<option value="' + t + '"' + (t === a.limit ? "selected" : "") + ">" + t + " 条/页</option>")
					}), n.join("") + "</select></span>"
				}(),
				refresh: ['<a href="javascript:;" data-page="' + a.curr + '" class="layui-laypage-refresh">', '<i class="layui-icon layui-icon-refresh"></i>', "</a>"].join(""),
				skip: function() {
					return ['<span class="layui-laypage-skip">&#x5230;&#x7B2C;', '<input type="text" min="1" value="' + a.curr + '" class="layui-input">', '&#x9875;<button type="button" class="layui-laypage-btn">&#x786e;&#x5b9a;</button>', "</span>"].join("")
				}()
			};
		return ['<div class="layui-box layui-laypage layui-laypage-' + (a.theme ? /^#/.test(a.theme) ? "molv" : a.theme : "default") + '" id="layui-laypage-' + a.index + '">', function() {
			var n = [];
			return layui.each(a.layout, function(e, t) {
				i[t] && n.push(i[t])
			}), n.join("")
		}(), "</div>"].join("")
	}, i.prototype.jump = function(e, t) {
		if (e) {
			var n = this,
				i = n.config,
				a = e.children,
				r = e[d]("button")[0],
				o = e[d]("input")[0],
				l = e[d]("select")[0],
				s = function() {
					var e = 0 | o.value.replace(/\s|\D/g, "");
					e && (i.curr = e, n.render())
				};
			if (t) return s();
			for (var c = 0, u = a.length; c < u; c++)"a" === a[c].nodeName.toLowerCase() && f.on(a[c], "click", function() {
				var e = 0 | this.getAttribute("data-page");
				e < 1 || e > i.pages || (i.curr = e, n.render())
			});
			l && f.on(l, "change", function() {
				var e = this.value;
				i.curr * e > i.count && (i.curr = Math.ceil(i.count / e)), i.limit = e, n.render()
			}), r && f.on(r, "click", function() {
				s()
			})
		}
	}, i.prototype.skip = function(i) {
		if (i) {
			var a = this,
				e = i[d]("input")[0];
			e && f.on(e, "keyup", function(e) {
				var t = this.value,
					n = e.keyCode;
				/^(37|38|39|40)$/.test(n) || (/\D/.test(t) && (this.value = t.replace(/\D/, "")), 13 === n && a.jump(i, !0))
			})
		}
	}, i.prototype.render = function(e) {
		var t = this,
			n = t.config,
			i = t.type(),
			a = t.view();
		2 === i ? n.elem && (n.elem.innerHTML = a) : 3 === i ? n.elem.html(a) : o[l](n.elem) && (o[l](n.elem).innerHTML = a), n.jump && n.jump(n, e);
		var r = o[l]("layui-laypage-" + n.index);
		t.jump(r), n.hash && !e && (location.hash = "!" + n.hash + "=" + n.curr), t.skip(r)
	};
	var f = {
		render: function(e) {
			var t = new i(e);
			return t.index
		},
		index: layui.laypage ? layui.laypage.index + 1e4 : 0,
		on: function(t, e, n) {
			return t.attachEvent ? t.attachEvent("on" + e, function(e) {
				e.target = e.srcElement, n.call(t, e)
			}) : t.addEventListener(e, n, !1), this
		}
	};
	e(t, f)
});
!
function() {
	"use strict";
	var a = window.layui && layui.define,
		s = {
			getPath: function() {
				var e = document.currentScript ? document.currentScript.src : function() {
						for (var e, t = document.scripts, n = t.length - 1, i = n; i > 0; i--) if ("interactive" === t[i].readyState) {
							e = t[i].src;
							break
						}
						return e || t[n].src
					}();
				return e.substring(0, e.lastIndexOf("/") + 1)
			}(),
			getStyle: function(e, t) {
				var n = e.currentStyle ? e.currentStyle : window.getComputedStyle(e, null);
				return n[n.getPropertyValue ? "getPropertyValue" : "getAttribute"](t)
			},
			link: function(e, t, n) {
				if (h.path) {
					var i = document.getElementsByTagName("head")[0],
						a = document.createElement("link");
					"string" == typeof t && (n = t);
					var r = (n || e).replace(/\.|\//g, ""),
						o = "layuicss-" + r,
						l = 0;
					a.rel = "stylesheet", a.href = h.path + e, a.id = o, document.getElementById(o) || i.appendChild(a), "function" == typeof t && !
					function e() {
						return ++l > 80 ? window.console && console.error("laydate.css: Invalid") : void(1989 === parseInt(s.getStyle(document.getElementById(o), "width")) ? t() : setTimeout(e, 100))
					}()
				}
			}
		},
		h = {
			v: "5.0.9",
			config: {},
			index: window.laydate && window.laydate.v ? 1e5 : 0,
			path: s.getPath,
			set: function(e) {
				var t = this;
				return t.config = A.extend({}, t.config, e), t
			},
			ready: function(e) {
				var t = "laydate",
					n = "",
					i = (a ? "modules/laydate/" : "theme/") + "default/laydate.css?v=" + h.v + n;
				return a ? layui.addcss(i, e, t) : s.link(i, e, t), this
			}
		},
		n = function() {
			var t = this;
			return {
				hint: function(e) {
					t.hint.call(t, e)
				},
				config: t.config
			}
		},
		t = "laydate",
		r = ".layui-laydate",
		C = "layui-this",
		T = "laydate-disabled",
		c = "开始日期超出了结束日期<br>建议重新选择",
		y = [100, 2e5],
		o = "layui-laydate-static",
		E = "layui-laydate-list",
		u = "laydate-selected",
		i = "layui-laydate-hint",
		l = "laydate-day-prev",
		d = "laydate-day-next",
		p = "layui-laydate-footer",
		D = ".laydate-btns-confirm",
		S = "laydate-time-text",
		L = ".laydate-btns-time",
		m = function(e) {
			var t = this;
			t.index = ++h.index, t.config = A.extend({}, t.config, h.config, e), h.ready(function() {
				t.init()
			})
		},
		A = function(e) {
			return new f(e)
		},
		f = function(e) {
			for (var t = 0, n = "object" == typeof e ? [e] : (this.selector = e, document.querySelectorAll(e || null)); t < n.length; t++) this.push(n[t])
		};
	f.prototype = [], f.prototype.constructor = f, A.extend = function() {
		var e = 1,
			t = arguments,
			i = function(e, t) {
				e = e || (t.constructor === Array ? [] : {});
				for (var n in t) e[n] = t[n] && t[n].constructor === Object ? i(e[n], t[n]) : t[n];
				return e
			};
		for (t[0] = "object" == typeof t[0] ? t[0] : {}; e < t.length; e++)"object" == typeof t[e] && i(t[0], t[e]);
		return t[0]
	}, A.ie = function() {
		var e = navigator.userAgent.toLowerCase();
		return !!(window.ActiveXObject || "ActiveXObject" in window) && ((e.match(/msie\s(\d+)/) || [])[1] || "11")
	}(), A.stope = function(e) {
		e = e || window.event, e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
	}, A.each = function(e, t) {
		var n, i = this;
		if ("function" != typeof t) return i;
		if (e = e || [], e.constructor === Object) {
			for (n in e) if (t.call(e[n], n, e[n])) break
		} else for (n = 0; n < e.length && !t.call(e[n], n, e[n]); n++);
		return i
	}, A.digit = function(e, t, n) {
		var i = "";
		e = String(e), t = t || 2;
		for (var a = e.length; a < t; a++) i += "0";
		return e < Math.pow(10, t) ? i + (0 | e) : e
	}, A.elem = function(e, t) {
		var n = document.createElement(e);
		return A.each(t || {}, function(e, t) {
			n.setAttribute(e, t)
		}), n
	}, f.addStr = function(n, e) {
		return n = n.replace(/\s+/, " "), e = e.replace(/\s+/, " ").split(" "), A.each(e, function(e, t) {
			new RegExp("\\b" + t + "\\b").test(n) || (n = n + " " + t)
		}), n.replace(/^\s|\s$/, "")
	}, f.removeStr = function(i, e) {
		return i = i.replace(/\s+/, " "), e = e.replace(/\s+/, " ").split(" "), A.each(e, function(e, t) {
			var n = new RegExp("\\b" + t + "\\b");
			n.test(i) && (i = i.replace(n, ""))
		}), i.replace(/\s+/, " ").replace(/^\s|\s$/, "")
	}, f.prototype.find = function(i) {
		var a = this,
			r = 0,
			o = [],
			l = "object" == typeof i;
		return this.each(function(e, t) {
			for (var n = l ? [i] : t.querySelectorAll(i || null); r < n.length; r++) o.push(n[r]);
			a.shift()
		}), l || (a.selector = (a.selector ? a.selector + " " : "") + i), A.each(o, function(e, t) {
			a.push(t)
		}), a
	}, f.prototype.each = function(e) {
		return A.each.call(this, this, e)
	}, f.prototype.addClass = function(n, i) {
		return this.each(function(e, t) {
			t.className = f[i ? "removeStr" : "addStr"](t.className, n)
		})
	}, f.prototype.removeClass = function(e) {
		return this.addClass(e, !0)
	}, f.prototype.hasClass = function(n) {
		var i = !1;
		return this.each(function(e, t) {
			new RegExp("\\b" + n + "\\b").test(t.className) && (i = !0)
		}), i
	}, f.prototype.attr = function(n, i) {
		var e = this;
		return void 0 === i ?
		function() {
			if (e.length > 0) return e[0].getAttribute(n)
		}() : e.each(function(e, t) {
			t.setAttribute(n, i)
		})
	}, f.prototype.removeAttr = function(n) {
		return this.each(function(e, t) {
			t.removeAttribute(n)
		})
	}, f.prototype.html = function(n) {
		return this.each(function(e, t) {
			t.innerHTML = n
		})
	}, f.prototype.val = function(n) {
		return this.each(function(e, t) {
			t.value = n
		})
	}, f.prototype.append = function(n) {
		return this.each(function(e, t) {
			"object" == typeof n ? t.appendChild(n) : t.innerHTML = t.innerHTML + n
		})
	}, f.prototype.remove = function(n) {
		return this.each(function(e, t) {
			n ? t.removeChild(n) : t.parentNode.removeChild(t)
		})
	}, f.prototype.on = function(n, i) {
		return this.each(function(e, t) {
			t.attachEvent ? t.attachEvent("on" + n, function(e) {
				e.target = e.srcElement, i.call(t, e)
			}) : t.addEventListener(n, i, !1)
		})
	}, f.prototype.off = function(n, i) {
		return this.each(function(e, t) {
			t.detachEvent ? t.detachEvent("on" + n, i) : t.removeEventListener(n, i, !1)
		})
	}, m.isLeapYear = function(e) {
		return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0
	}, m.prototype.config = {
		type: "date",
		range: !1,
		format: "yyyy-MM-dd",
		value: null,
		isInitValue: !0,
		min: "1900-1-1",
		max: "2099-12-31",
		trigger: "focus",
		show: !1,
		showBottom: !0,
		btns: ["clear", "now", "confirm"],
		lang: "cn",
		theme: "default",
		position: null,
		calendar: !1,
		mark: {},
		zIndex: null,
		done: null,
		change: null
	}, m.prototype.lang = function() {
		var e = this,
			t = e.config,
			n = {
				cn: {
					weeks: ["日", "一", "二", "三", "四", "五", "六"],
					time: ["时", "分", "秒"],
					timeTips: "选择时间",
					startTime: "开始时间",
					endTime: "结束时间",
					dateTips: "返回日期",
					month: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
					tools: {
						confirm: "确定",
						clear: "清空",
						now: "现在"
					}
				},
				en: {
					weeks: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
					time: ["Hours", "Minutes", "Seconds"],
					timeTips: "Select Time",
					startTime: "Start Time",
					endTime: "End Time",
					dateTips: "Select Date",
					month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
					tools: {
						confirm: "Confirm",
						clear: "Clear",
						now: "Now"
					}
				}
			};
		return n[t.lang] || n.cn
	}, m.prototype.init = function() {
		var i = this,
			s = i.config,
			a = "yyyy|y|MM|M|dd|d|HH|H|mm|m|ss|s",
			e = "static" === s.position,
			t = {
				year: "yyyy",
				month: "yyyy-MM",
				date: "yyyy-MM-dd",
				time: "HH:mm:ss",
				datetime: "yyyy-MM-dd HH:mm:ss"
			};
		s.elem = A(s.elem), s.eventElem = A(s.eventElem), s.elem[0] && (s.range === !0 && (s.range = "-"), s.format === t.date && (s.format = t[s.type]), i.format = s.format.match(new RegExp(a + "|.", "g")) || [], i.EXP_IF = "", i.EXP_SPLIT = "", A.each(i.format, function(e, t) {
			var n = new RegExp(a).test(t) ? "\\d{" +
			function() {
				return new RegExp(a).test(i.format[0 === e ? e + 1 : e - 1] || "") ? /^yyyy|y$/.test(t) ? 4 : t.length : /^yyyy$/.test(t) ? "1,4" : /^y$/.test(t) ? "1,308" : "1,2"
			}() + "}" : "\\" + t;
			i.EXP_IF = i.EXP_IF + n, i.EXP_SPLIT = i.EXP_SPLIT + "(" + n + ")"
		}), i.EXP_IF = new RegExp("^" + (s.range ? i.EXP_IF + "\\s\\" + s.range + "\\s" + i.EXP_IF : i.EXP_IF) + "$"), i.EXP_SPLIT = new RegExp("^" + i.EXP_SPLIT + "$", ""), i.isInput(s.elem[0]) || "focus" === s.trigger && (s.trigger = "click"), s.elem.attr("lay-key") || (s.elem.attr("lay-key", i.index), s.eventElem.attr("lay-key", i.index)), s.mark = A.extend({}, s.calendar && "cn" === s.lang ? {
			"0-1-1": "元旦",
			"0-2-14": "情人",
			"0-3-8": "妇女",
			"0-3-12": "植树",
			"0-4-1": "愚人",
			"0-5-1": "劳动",
			"0-5-4": "青年",
			"0-6-1": "儿童",
			"0-9-10": "教师",
			"0-9-18": "国耻",
			"0-10-1": "国庆",
			"0-12-25": "圣诞"
		} : {}, s.mark), A.each(["min", "max"], function(e, t) {
			var n = [],
				i = [];
			if ("number" == typeof s[t]) {
				var a = s[t],
					r = (new Date).getTime(),
					o = 864e5,
					l = new Date(a ? a < o ? r + a * o : a : r);
				n = [l.getFullYear(), l.getMonth() + 1, l.getDate()], a < o || (i = [l.getHours(), l.getMinutes(), l.getSeconds()])
			} else n = (s[t].match(/\d+-\d+-\d+/) || [""])[0].split("-"), i = (s[t].match(/\d+:\d+:\d+/) || [""])[0].split(":");
			s[t] = {
				year: 0 | n[0] || (new Date).getFullYear(),
				month: n[1] ? (0 | n[1]) - 1 : (new Date).getMonth(),
				date: 0 | n[2] || (new Date).getDate(),
				hours: 0 | i[0],
				minutes: 0 | i[1],
				seconds: 0 | i[2]
			}
		}), i.elemID = "layui-laydate" + s.elem.attr("lay-key"), (s.show || e) && i.render(), e || i.events(), s.value && s.isInitValue && (s.value.constructor === Date ? i.setValue(i.parse(0, i.systemDate(s.value))) : i.setValue(s.value)))
	}, m.prototype.render = function() {
		var e = this,
			l = e.config,
			s = e.lang(),
			a = "static" === l.position,
			n = e.elem = A.elem("div", {
				id: e.elemID,
				class: ["layui-laydate", l.range ? " layui-laydate-range" : "", a ? " " + o : "", l.theme && "default" !== l.theme && !/^#/.test(l.theme) ? " laydate-theme-" + l.theme : ""].join("")
			}),
			c = e.elemMain = [],
			u = e.elemHeader = [],
			d = e.elemCont = [],
			f = e.table = [],
			t = e.footer = A.elem("div", {
				class: p
			});
		if (l.zIndex && (n.style.zIndex = l.zIndex), A.each(new Array(2), function(e) {
			if (!l.range && e > 0) return !0;
			var n = A.elem("div", {
				class: "layui-laydate-header"
			}),
				t = [function() {
					var e = A.elem("i", {
						class: "layui-icon laydate-icon laydate-prev-y"
					});
					return e.innerHTML = "&#xe65a;", e
				}(), function() {
					var e = A.elem("i", {
						class: "layui-icon laydate-icon laydate-prev-m"
					});
					return e.innerHTML = "&#xe603;", e
				}(), function() {
					var e = A.elem("div", {
						class: "laydate-set-ym"
					}),
						t = A.elem("span"),
						n = A.elem("span");
					return e.appendChild(t), e.appendChild(n), e
				}(), function() {
					var e = A.elem("i", {
						class: "layui-icon laydate-icon laydate-next-m"
					});
					return e.innerHTML = "&#xe602;", e
				}(), function() {
					var e = A.elem("i", {
						class: "layui-icon laydate-icon laydate-next-y"
					});
					return e.innerHTML = "&#xe65b;", e
				}()],
				i = A.elem("div", {
					class: "layui-laydate-content"
				}),
				a = A.elem("table"),
				r = A.elem("thead"),
				o = A.elem("tr");
			A.each(t, function(e, t) {
				n.appendChild(t)
			}), r.appendChild(o), A.each(new Array(6), function(n) {
				var i = a.insertRow(0);
				A.each(new Array(7), function(e) {
					if (0 === n) {
						var t = A.elem("th");
						t.innerHTML = s.weeks[e], o.appendChild(t)
					}
					i.insertCell(e)
				})
			}), a.insertBefore(r, a.children[0]), i.appendChild(a), c[e] = A.elem("div", {
				class: "layui-laydate-main laydate-main-list-" + e
			}), c[e].appendChild(n), c[e].appendChild(i), u.push(t), d.push(i), f.push(a)
		}), A(t).html(function() {
			var e = [],
				i = [];
			return "datetime" === l.type && e.push('<span lay-type="datetime" class="laydate-btns-time">' + s.timeTips + "</span>"), A.each(l.btns, function(e, t) {
				var n = s.tools[t] || "btn";
				l.range && "now" === t || (a && "clear" === t && (n = "cn" === l.lang ? "重置" : "Reset"), i.push('<span lay-type="' + t + '" class="laydate-btns-' + t + '">' + n + "</span>"))
			}), e.push('<div class="laydate-footer-btns">' + i.join("") + "</div>"), e.join("")
		}()), A.each(c, function(e, t) {
			n.appendChild(t)
		}), l.showBottom && n.appendChild(t), /^#/.test(l.theme)) {
			var i = A.elem("style"),
				r = ["#{{id}} .layui-laydate-header{background-color:{{theme}};}", "#{{id}} .layui-this{background-color:{{theme}} !important;}"].join("").replace(/{{id}}/g, e.elemID).replace(/{{theme}}/g, l.theme);
			"styleSheet" in i ? (i.setAttribute("type", "text/css"), i.styleSheet.cssText = r) : i.innerHTML = r, A(n).addClass("laydate-theme-molv"), n.appendChild(i)
		}
		e.remove(m.thisElemDate), a ? l.elem.append(n) : (document.body.appendChild(n), e.position()), e.checkDate().calendar(), e.changeEvent(), m.thisElemDate = e.elemID, "function" == typeof l.ready && l.ready(A.extend({}, l.dateTime, {
			month: l.dateTime.month + 1
		}))
	}, m.prototype.remove = function(e) {
		var t = this,
			n = (t.config, A("#" + (e || t.elemID)));
		return n.hasClass(o) || t.checkDate(function() {
			n.remove()
		}), t
	}, m.prototype.position = function() {
		var e = this,
			t = e.config,
			n = e.bindElem || t.elem[0],
			i = n.getBoundingClientRect(),
			a = e.elem.offsetWidth,
			r = e.elem.offsetHeight,
			o = function(e) {
				return e = e ? "scrollLeft" : "scrollTop", document.body[e] | document.documentElement[e]
			},
			l = function(e) {
				return document.documentElement[e ? "clientWidth" : "clientHeight"]
			},
			s = 5,
			c = i.left,
			u = i.bottom;
		c + a + s > l("width") && (c = l("width") - a - s), u + r + s > l() && (u = i.top > r ? i.top - r : l() - r, u -= 2 * s), t.position && (e.elem.style.position = t.position), e.elem.style.left = c + ("fixed" === t.position ? 0 : o(1)) + "px", e.elem.style.top = u + ("fixed" === t.position ? 0 : o()) + "px"
	}, m.prototype.hint = function(e) {
		var t = this,
			n = (t.config, A.elem("div", {
				class: i
			}));
		t.elem && (n.innerHTML = e || "", A(t.elem).find("." + i).remove(), t.elem.appendChild(n), clearTimeout(t.hinTimer), t.hinTimer = setTimeout(function() {
			A(t.elem).find("." + i).remove()
		}, 3e3))
	}, m.prototype.getAsYM = function(e, t, n) {
		return n ? t-- : t++, t < 0 && (t = 11, e--), t > 11 && (t = 0, e++), [e, t]
	}, m.prototype.systemDate = function(e) {
		var t = e || new Date;
		return {
			year: t.getFullYear(),
			month: t.getMonth(),
			date: t.getDate(),
			hours: e ? e.getHours() : 0,
			minutes: e ? e.getMinutes() : 0,
			seconds: e ? e.getSeconds() : 0
		}
	}, m.prototype.checkDate = function(e) {
		var t, l, s = this,
			c = (new Date, s.config),
			n = c.dateTime = c.dateTime || s.systemDate(),
			i = s.bindElem || c.elem[0],
			a = (s.isInput(i) ? "val" : "html", s.isInput(i) ? i.value : "static" === c.position ? "" : i.innerHTML),
			u = function(e) {
				e.year > y[1] && (e.year = y[1], l = !0), e.month > 11 && (e.month = 11, l = !0), e.hours > 23 && (e.hours = 0, l = !0), e.minutes > 59 && (e.minutes = 0, e.hours++, l = !0), e.seconds > 59 && (e.seconds = 0, e.minutes++, l = !0), t = h.getEndDate(e.month + 1, e.year), e.date > t && (e.date = t, l = !0)
			},
			r = function(i, a, r) {
				var o = ["startTime", "endTime"];
				a = (a.match(s.EXP_SPLIT) || []).slice(1), r = r || 0, c.range && (s[o[r]] = s[o[r]] || {}), A.each(s.format, function(e, t) {
					var n = parseFloat(a[e]);
					a[e].length < t.length && (l = !0), /yyyy|y/.test(t) ? (n < y[0] && (n = y[0], l = !0), i.year = n) : /MM|M/.test(t) ? (n < 1 && (n = 1, l = !0), i.month = n - 1) : /dd|d/.test(t) ? (n < 1 && (n = 1, l = !0), i.date = n) : /HH|H/.test(t) ? (n < 1 && (n = 0, l = !0), i.hours = n, c.range && (s[o[r]].hours = n)) : /mm|m/.test(t) ? (n < 1 && (n = 0, l = !0), i.minutes = n, c.range && (s[o[r]].minutes = n)) : /ss|s/.test(t) && (n < 1 && (n = 0, l = !0), i.seconds = n, c.range && (s[o[r]].seconds = n))
				}), u(i)
			};
		return "limit" === e ? (u(n), s) : (a = a || c.value, "string" == typeof a && (a = a.replace(/\s+/g, " ").replace(/^\s|\s$/g, "")), s.startState && !s.endState && (delete s.startState, s.endState = !0), "string" == typeof a && a ? s.EXP_IF.test(a) ? c.range ? (a = a.split(" " + c.range + " "), s.startDate = s.startDate || s.systemDate(), s.endDate = s.endDate || s.systemDate(), c.dateTime = A.extend({}, s.startDate), A.each([s.startDate, s.endDate], function(e, t) {
			r(t, a[e], e)
		})) : r(n, a) : (s.hint("日期格式不合法<br>必须遵循下述格式：<br>" + (c.range ? c.format + " " + c.range + " " + c.format : c.format) + "<br>已为你重置"), l = !0) : a && a.constructor === Date ? c.dateTime = s.systemDate(a) : (c.dateTime = s.systemDate(), delete s.startState, delete s.endState, delete s.startDate, delete s.endDate, delete s.startTime, delete s.endTime), u(n), l && a && s.setValue(c.range ? s.endDate ? s.parse() : "" : s.parse()), e && e(), s)
	}, m.prototype.mark = function(e, i) {
		var a, t = this,
			n = t.config;
		return A.each(n.mark, function(e, t) {
			var n = e.split("-");
			n[0] != i[0] && 0 != n[0] || n[1] != i[1] && 0 != n[1] || n[2] != i[2] || (a = t || i[2])
		}), a && e.html('<span class="laydate-day-mark">' + a + "</span>"), t
	}, m.prototype.limit = function(e, t, n, a) {
		var i, r = this,
			o = r.config,
			l = {},
			s = o[n > 41 ? "endDate" : "dateTime"],
			c = A.extend({}, s, t || {});
		return A.each({
			now: c,
			min: o.min,
			max: o.max
		}, function(e, i) {
			l[e] = r.newDate(A.extend({
				year: i.year,
				month: i.month,
				date: i.date
			}, function() {
				var n = {};
				return A.each(a, function(e, t) {
					n[t] = i[t]
				}), n
			}())).getTime()
		}), i = l.now < l.min || l.now > l.max, e && e[i ? "addClass" : "removeClass"](T), i
	}, m.prototype.calendar = function(e) {
		var a, r, o, l = this,
			s = l.config,
			c = e || s.dateTime,
			t = new Date,
			n = l.lang(),
			i = "date" !== s.type && "datetime" !== s.type,
			u = e ? 1 : 0,
			d = A(l.table[u]).find("td"),
			f = A(l.elemHeader[u][2]).find("span");
		if (c.year < y[0] && (c.year = y[0], l.hint("最低只能支持到公元" + y[0] + "年")), c.year > y[1] && (c.year = y[1], l.hint("最高只能支持到公元" + y[1] + "年")), l.firstDate || (l.firstDate = A.extend({}, c)), t.setFullYear(c.year, c.month, 1), a = t.getDay(), r = h.getEndDate(c.month || 12, c.year), o = h.getEndDate(c.month + 1, c.year), A.each(d, function(e, t) {
			var n = [c.year, c.month],
				i = 0;
			t = A(t), t.removeAttr("class"), e < a ? (i = r - a + e, t.addClass("laydate-day-prev"), n = l.getAsYM(c.year, c.month, "sub")) : e >= a && e < o + a ? (i = e - a, s.range || i + 1 === c.date && t.addClass(C)) : (i = e - o - a, t.addClass("laydate-day-next"), n = l.getAsYM(c.year, c.month)), n[1]++, n[2] = i + 1, t.attr("lay-ymd", n.join("-")).html(n[2]), l.mark(t, n).limit(t, {
				year: n[0],
				month: n[1] - 1,
				date: n[2]
			}, e)
		}), A(f[0]).attr("lay-ym", c.year + "-" + (c.month + 1)), A(f[1]).attr("lay-ym", c.year + "-" + (c.month + 1)), "cn" === s.lang ? (A(f[0]).attr("lay-type", "year").html(c.year + "年"), A(f[1]).attr("lay-type", "month").html(c.month + 1 + "月")) : (A(f[0]).attr("lay-type", "month").html(n.month[c.month]), A(f[1]).attr("lay-type", "year").html(c.year)), i && (s.range && (e ? l.endDate = l.endDate || {
			year: c.year + ("year" === s.type ? 1 : 0),
			month: c.month + ("month" === s.type ? 0 : -1)
		} : l.startDate = l.startDate || {
			year: c.year,
			month: c.month
		}, e && (l.listYM = [
			[l.startDate.year, l.startDate.month + 1],
			[l.endDate.year, l.endDate.month + 1]
		], l.list(s.type, 0).list(s.type, 1), "time" === s.type ? l.setBtnStatus("时间", A.extend({}, l.systemDate(), l.startTime), A.extend({}, l.systemDate(), l.endTime)) : l.setBtnStatus(!0))), s.range || (l.listYM = [
			[c.year, c.month + 1]
		], l.list(s.type, 0))), s.range && !e) {
			var p = l.getAsYM(c.year, c.month);
			l.calendar(A.extend({}, c, {
				year: p[0],
				month: p[1]
			}))
		}
		return s.range || l.limit(A(l.footer).find(D), null, 0, ["hours", "minutes", "seconds"]), s.range && e && !i && l.stampRange(), l
	}, m.prototype.list = function(n, i) {
		var a = this,
			r = a.config,
			o = r.dateTime,
			l = a.lang(),
			s = r.range && "date" !== r.type && "datetime" !== r.type,
			c = A.elem("ul", {
				class: E + " " + {
					year: "laydate-year-list",
					month: "laydate-month-list",
					time: "laydate-time-list"
				}[n]
			}),
			e = a.elemHeader[i],
			t = A(e[2]).find("span"),
			u = a.elemCont[i || 0],
			d = A(u).find("." + E)[0],
			f = "cn" === r.lang,
			p = f ? "年" : "",
			h = a.listYM[i] || {},
			y = ["hours", "minutes", "seconds"],
			m = ["startTime", "endTime"][i];
		if (h[0] < 1 && (h[0] = 1), "year" === n) {
			var v, g = v = h[0] - 7;
			g < 1 && (g = v = 1), A.each(new Array(15), function(e) {
				var t = A.elem("li", {
					"lay-ym": v
				}),
					n = {
						year: v
					};
				v == h[0] && A(t).addClass(C), t.innerHTML = v + p, c.appendChild(t), v < a.firstDate.year ? (n.month = r.min.month, n.date = r.min.date) : v >= a.firstDate.year && (n.month = r.max.month, n.date = r.max.date), a.limit(A(t), n, i), v++
			}), A(t[f ? 0 : 1]).attr("lay-ym", v - 8 + "-" + h[1]).html(g + p + " - " + (v - 1 + p))
		} else if ("month" === n) A.each(new Array(12), function(e) {
			var t = A.elem("li", {
				"lay-ym": e
			}),
				n = {
					year: h[0],
					month: e
				};
			e + 1 == h[1] && A(t).addClass(C), t.innerHTML = l.month[e] + (f ? "月" : ""), c.appendChild(t), h[0] < a.firstDate.year ? n.date = r.min.date : h[0] >= a.firstDate.year && (n.date = r.max.date), a.limit(A(t), n, i)
		}), A(t[f ? 0 : 1]).attr("lay-ym", h[0] + "-" + h[1]).html(h[0] + p);
		else if ("time" === n) {
			var b = function() {
					A(c).find("ol").each(function(n, e) {
						A(e).find("li").each(function(e, t) {
							a.limit(A(t), [{
								hours: e
							}, {
								hours: a[m].hours,
								minutes: e
							}, {
								hours: a[m].hours,
								minutes: a[m].minutes,
								seconds: e
							}][n], i, [
								["hours"],
								["hours", "minutes"],
								["hours", "minutes", "seconds"]
							][n])
						})
					}), r.range || a.limit(A(a.footer).find(D), a[m], 0, ["hours", "minutes", "seconds"])
				};
			r.range ? a[m] || (a[m] = {
				hours: 0,
				minutes: 0,
				seconds: 0
			}) : a[m] = o, A.each([24, 60, 60], function(t, e) {
				var n = A.elem("li"),
					i = ["<p>" + l.time[t] + "</p><ol>"];
				A.each(new Array(e), function(e) {
					i.push("<li" + (a[m][y[t]] === e ? ' class="' + C + '"' : "") + ">" + A.digit(e, 2) + "</li>")
				}), n.innerHTML = i.join("") + "</ol>", c.appendChild(n)
			}), b()
		}
		if (d && u.removeChild(d), u.appendChild(c), "year" === n || "month" === n) A(a.elemMain[i]).addClass("laydate-ym-show"), A(c).find("li").on("click", function() {
			var e = 0 | A(this).attr("lay-ym");
			if (!A(this).hasClass(T)) {
				if (0 === i) o[n] = e, s && (a.startDate[n] = e), a.limit(A(a.footer).find(D), null, 0);
				else if (s) a.endDate[n] = e;
				else {
					var t = "year" === n ? a.getAsYM(e, h[1] - 1, "sub") : a.getAsYM(h[0], e, "sub");
					A.extend(o, {
						year: t[0],
						month: t[1]
					})
				}
				"year" === r.type || "month" === r.type ? (A(c).find("." + C).removeClass(C), A(this).addClass(C), "month" === r.type && "year" === n && (a.listYM[i][0] = e, s && (a[["startDate", "endDate"][i]].year = e), a.list("month", i))) : (a.checkDate("limit").calendar(), a.closeList()), a.setBtnStatus(), r.range || a.done(null, "change"), A(a.footer).find(L).removeClass(T)
			}
		});
		else {
			var x = A.elem("span", {
				class: S
			}),
				w = function() {
					A(c).find("ol").each(function(e) {
						var n = this,
							t = A(n).find("li");
						n.scrollTop = 30 * (a[m][y[e]] - 2), n.scrollTop <= 0 && t.each(function(e, t) {
							if (!A(this).hasClass(T)) return n.scrollTop = 30 * (e - 2), !0
						})
					})
				},
				k = A(e[2]).find("." + S);
			w(), x.innerHTML = r.range ? [l.startTime, l.endTime][i] : l.timeTips, A(a.elemMain[i]).addClass("laydate-time-show"), k[0] && k.remove(), e[2].appendChild(x), A(c).find("ol").each(function(t) {
				var n = this;
				A(n).find("li").on("click", function() {
					var e = 0 | this.innerHTML;
					A(this).hasClass(T) || (r.range ? a[m][y[t]] = e : o[y[t]] = e, A(n).find("." + C).removeClass(C), A(this).addClass(C), b(), w(), (a.endDate || "time" === r.type) && a.done(null, "change"), a.setBtnStatus())
				})
			})
		}
		return a
	}, m.prototype.listYM = [], m.prototype.closeList = function() {
		var n = this;
		n.config;
		A.each(n.elemCont, function(e, t) {
			A(this).find("." + E).remove(), A(n.elemMain[e]).removeClass("laydate-ym-show laydate-time-show")
		}), A(n.elem).find("." + S).remove()
	}, m.prototype.setBtnStatus = function(e, t, n) {
		var i, a = this,
			r = a.config,
			o = A(a.footer).find(D),
			l = r.range && "date" !== r.type && "time" !== r.type;
		l && (t = t || a.startDate, n = n || a.endDate, i = a.newDate(t).getTime() > a.newDate(n).getTime(), a.limit(null, t) || a.limit(null, n) ? o.addClass(T) : o[i ? "addClass" : "removeClass"](T), e && i && a.hint("string" == typeof e ? c.replace(/日期/g, e) : c))
	}, m.prototype.parse = function(e, t) {
		var n = this,
			i = n.config,
			a = t || (e ? A.extend({}, n.endDate, n.endTime) : i.range ? A.extend({}, n.startDate, n.startTime) : i.dateTime),
			r = n.format.concat();
		return A.each(r, function(e, t) {
			/yyyy|y/.test(t) ? r[e] = A.digit(a.year, t.length) : /MM|M/.test(t) ? r[e] = A.digit(a.month + 1, t.length) : /dd|d/.test(t) ? r[e] = A.digit(a.date, t.length) : /HH|H/.test(t) ? r[e] = A.digit(a.hours, t.length) : /mm|m/.test(t) ? r[e] = A.digit(a.minutes, t.length) : /ss|s/.test(t) && (r[e] = A.digit(a.seconds, t.length))
		}), i.range && !e ? r.join("") + " " + i.range + " " + n.parse(1) : r.join("")
	}, m.prototype.newDate = function(e) {
		return e = e || {}, new Date(e.year || 1, e.month || 0, e.date || 1, e.hours || 0, e.minutes || 0, e.seconds || 0)
	}, m.prototype.setValue = function(e) {
		var t = this,
			n = t.config,
			i = t.bindElem || n.elem[0],
			a = t.isInput(i) ? "val" : "html";
		return "static" === n.position || A(i)[a](e || ""), this
	}, m.prototype.stampRange = function() {
		var a, r, o = this,
			e = o.config,
			t = A(o.elem).find("td");
		if (e.range && !o.endDate && A(o.footer).find(D).addClass(T), o.endDate) return a = o.newDate({
			year: o.startDate.year,
			month: o.startDate.month,
			date: o.startDate.date
		}).getTime(), r = o.newDate({
			year: o.endDate.year,
			month: o.endDate.month,
			date: o.endDate.date
		}).getTime(), a > r ? o.hint(c) : void A.each(t, function(e, t) {
			var n = A(t).attr("lay-ymd").split("-"),
				i = o.newDate({
					year: n[0],
					month: n[1] - 1,
					date: n[2]
				}).getTime();
			A(t).removeClass(u + " " + C), i !== a && i !== r || A(t).addClass(A(t).hasClass(l) || A(t).hasClass(d) ? u : C), i > a && i < r && A(t).addClass(u)
		})
	}, m.prototype.done = function(e, t) {
		var n = this,
			i = n.config,
			a = A.extend({}, n.startDate ? A.extend(n.startDate, n.startTime) : i.dateTime),
			r = A.extend({}, A.extend(n.endDate, n.endTime));
		return A.each([a, r], function(e, t) {
			"month" in t && A.extend(t, {
				month: t.month + 1
			})
		}), e = e || [n.parse(), a, r], "function" == typeof i[t || "done"] && i[t || "done"].apply(i, e), n
	}, m.prototype.choose = function(e) {
		var n = this,
			t = n.config,
			i = t.dateTime,
			a = A(n.elem).find("td"),
			r = e.attr("lay-ymd").split("-"),
			o = function(e) {
				new Date;
				e && A.extend(i, r), t.range && (n.startDate ? A.extend(n.startDate, r) : n.startDate = A.extend({}, r, n.startTime), n.startYMD = r)
			};
		if (r = {
			year: 0 | r[0],
			month: (0 | r[1]) - 1,
			date: 0 | r[2]
		}, !e.hasClass(T)) if (t.range) {
			if (A.each(["startTime", "endTime"], function(e, t) {
				n[t] = n[t] || {
					hours: 0,
					minutes: 0,
					seconds: 0
				}
			}), n.endState) o(), delete n.endState, delete n.endDate, n.startState = !0, a.removeClass(C + " " + u), e.addClass(C);
			else if (n.startState) {
				if (e.addClass(C), n.endDate ? A.extend(n.endDate, r) : n.endDate = A.extend({}, r, n.endTime), n.newDate(r).getTime() < n.newDate(n.startYMD).getTime()) {
					var l = A.extend({}, n.endDate, {
						hours: n.startDate.hours,
						minutes: n.startDate.minutes,
						seconds: n.startDate.seconds
					});
					A.extend(n.endDate, n.startDate, {
						hours: n.endDate.hours,
						minutes: n.endDate.minutes,
						seconds: n.endDate.seconds
					}), n.startDate = l
				}
				t.showBottom || n.done(), n.stampRange(), n.endState = !0, n.done(null, "change")
			} else e.addClass(C), o(), n.startState = !0;
			A(n.footer).find(D)[n.endDate ? "removeClass" : "addClass"](T)
		} else "static" === t.position ? (o(!0), n.calendar().done().done(null, "change")) : "date" === t.type ? (o(!0), n.setValue(n.parse()).remove().done()) : "datetime" === t.type && (o(!0), n.calendar().done(null, "change"))
	}, m.prototype.tool = function(e, t) {
		var n = this,
			i = n.config,
			a = i.dateTime,
			r = "static" === i.position,
			o = {
				datetime: function() {
					A(e).hasClass(T) || (n.list("time", 0), i.range && n.list("time", 1), A(e).attr("lay-type", "date").html(n.lang().dateTips))
				},
				date: function() {
					n.closeList(), A(e).attr("lay-type", "datetime").html(n.lang().timeTips)
				},
				clear: function() {
					n.setValue("").remove(), r && (A.extend(a, n.firstDate), n.calendar()), i.range && (delete n.startState, delete n.endState, delete n.endDate, delete n.startTime, delete n.endTime), n.done(["",
					{}, {}])
				},
				now: function() {
					var e = new Date;
					A.extend(a, n.systemDate(), {
						hours: e.getHours(),
						minutes: e.getMinutes(),
						seconds: e.getSeconds()
					}), n.setValue(n.parse()).remove(), r && n.calendar(), n.done()
				},
				confirm: function() {
					if (i.range) {
						if (!n.endDate) return n.hint("请先选择日期范围");
						if (A(e).hasClass(T)) return n.hint("time" === i.type ? c.replace(/日期/g, "时间") : c)
					} else if (A(e).hasClass(T)) return n.hint("不在有效日期或时间范围内");
					n.done(), n.setValue(n.parse()).remove()
				}
			};
		o[t] && o[t]()
	}, m.prototype.change = function(a) {
		var r = this,
			o = r.config,
			l = o.dateTime,
			s = o.range && ("year" === o.type || "month" === o.type),
			c = r.elemCont[a || 0],
			u = r.listYM[a],
			e = function(e) {
				var t = ["startDate", "endDate"][a],
					n = A(c).find(".laydate-year-list")[0],
					i = A(c).find(".laydate-month-list")[0];
				return n && (u[0] = e ? u[0] - 15 : u[0] + 15, r.list("year", a)), i && (e ? u[0]-- : u[0]++, r.list("month", a)), (n || i) && (A.extend(l, {
					year: u[0]
				}), s && (r[t].year = u[0]), o.range || r.done(null, "change"), r.setBtnStatus(), o.range || r.limit(A(r.footer).find(D), {
					year: u[0]
				})), n || i
			};
		return {
			prevYear: function() {
				e("sub") || (l.year--, r.checkDate("limit").calendar(), o.range || r.done(null, "change"))
			},
			prevMonth: function() {
				var e = r.getAsYM(l.year, l.month, "sub");
				A.extend(l, {
					year: e[0],
					month: e[1]
				}), r.checkDate("limit").calendar(), o.range || r.done(null, "change")
			},
			nextMonth: function() {
				var e = r.getAsYM(l.year, l.month);
				A.extend(l, {
					year: e[0],
					month: e[1]
				}), r.checkDate("limit").calendar(), o.range || r.done(null, "change")
			},
			nextYear: function() {
				e() || (l.year++, r.checkDate("limit").calendar(), o.range || r.done(null, "change"))
			}
		}
	}, m.prototype.changeEvent = function() {
		var r = this;
		r.config;
		A(r.elem).on("click", function(e) {
			A.stope(e)
		}), A.each(r.elemHeader, function(a, e) {
			A(e[0]).on("click", function(e) {
				r.change(a).prevYear()
			}), A(e[1]).on("click", function(e) {
				r.change(a).prevMonth()
			}), A(e[2]).find("span").on("click", function(e) {
				var t = A(this),
					n = t.attr("lay-ym"),
					i = t.attr("lay-type");
				n && (n = n.split("-"), r.listYM[a] = [0 | n[0], 0 | n[1]], r.list(i, a), A(r.footer).find(L).addClass(T))
			}), A(e[3]).on("click", function(e) {
				r.change(a).nextMonth()
			}), A(e[4]).on("click", function(e) {
				r.change(a).nextYear()
			})
		}), A.each(r.table, function(e, t) {
			var n = A(t).find("td");
			n.on("click", function() {
				r.choose(A(this))
			})
		}), A(r.footer).find("span").on("click", function() {
			var e = A(this).attr("lay-type");
			r.tool(this, e)
		})
	}, m.prototype.isInput = function(e) {
		return /input|textarea/.test(e.tagName.toLocaleLowerCase())
	}, m.prototype.events = function() {
		var n = this,
			i = n.config,
			e = function(e, t) {
				e.on(i.trigger, function() {
					t && (n.bindElem = this), n.render()
				})
			};
		i.elem[0] && !i.elem[0].eventHandler && (e(i.elem, "bind"), e(i.eventElem), A(document).on("click", function(e) {
			e.target !== i.elem[0] && e.target !== i.eventElem[0] && e.target !== A(i.closeStop)[0] && n.remove()
		}).on("keydown", function(e) {
			13 === e.keyCode && A("#" + n.elemID)[0] && n.elemID === m.thisElem && (e.preventDefault(), A(n.footer).find(D)[0].click())
		}), A(window).on("resize", function() {
			return !(!n.elem || !A(r)[0]) && void n.position()
		}), i.elem[0].eventHandler = !0)
	}, h.render = function(e) {
		var t = new m(e);
		return n.call(t)
	}, h.getEndDate = function(e, t) {
		var n = new Date;
		return n.setFullYear(t || n.getFullYear(), e || n.getMonth() + 1, 1), new Date(n.getTime() - 864e5).getDate()
	}, window.lay = window.lay || A, a ? (h.ready(), layui.define(function(e) {
		h.path = layui.cache.dir, e(t, h)
	})) : "function" == typeof define && define.amd ? define(function() {
		return h
	}) : function() {
		h.ready(), window.laydate = h
	}()
}();
!
function(e, t) {
	"object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
		if (!e.document) throw new Error("jQuery requires a window with a document");
		return t(e)
	} : t(e)
}("undefined" != typeof window ? window : this, function(C, e) {
	function l(e) {
		var t = !! e && "length" in e && e.length,
			n = pe.type(e);
		return "function" !== n && !pe.isWindow(e) && ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e)
	}
	function t(e, n, i) {
		if (pe.isFunction(n)) return pe.grep(e, function(e, t) {
			return !!n.call(e, t, e) !== i
		});
		if (n.nodeType) return pe.grep(e, function(e) {
			return e === n !== i
		});
		if ("string" == typeof n) {
			if (Ce.test(n)) return pe.filter(n, e, i);
			n = pe.filter(n, e)
		}
		return pe.grep(e, function(e) {
			return pe.inArray(e, n) > -1 !== i
		})
	}
	function n(e, t) {
		do {
			e = e[t]
		} while (e && 1 !== e.nodeType);
		return e
	}
	function u(e) {
		var n = {};
		return pe.each(e.match(Ae) || [], function(e, t) {
			n[t] = !0
		}), n
	}
	function i() {
		ie.addEventListener ? (ie.removeEventListener("DOMContentLoaded", a), C.removeEventListener("load", a)) : (ie.detachEvent("onreadystatechange", a), C.detachEvent("onload", a))
	}
	function a() {
		(ie.addEventListener || "load" === C.event.type || "complete" === ie.readyState) && (i(), pe.ready())
	}
	function s(e, t, n) {
		if (void 0 === n && 1 === e.nodeType) {
			var i = "data-" + t.replace(Fe, "-$1").toLowerCase();
			if (n = e.getAttribute(i), "string" == typeof n) {
				try {
					n = "true" === n || "false" !== n && ("null" === n ? null : +n + "" === n ? +n : He.test(n) ? pe.parseJSON(n) : n)
				} catch (e) {}
				pe.data(e, t, n)
			} else n = void 0
		}
		return n
	}
	function c(e) {
		var t;
		for (t in e) if (("data" !== t || !pe.isEmptyObject(e[t])) && "toJSON" !== t) return !1;
		return !0
	}
	function r(e, t, n, i) {
		if (Me(e)) {
			var a, r, o = pe.expando,
				l = e.nodeType,
				s = l ? pe.cache : e,
				c = l ? e[o] : e[o] && o;
			if (c && s[c] && (i || s[c].data) || void 0 !== n || "string" != typeof t) return c || (c = l ? e[o] = ne.pop() || pe.guid++ : o), s[c] || (s[c] = l ? {} : {
				toJSON: pe.noop
			}), "object" != typeof t && "function" != typeof t || (i ? s[c] = pe.extend(s[c], t) : s[c].data = pe.extend(s[c].data, t)), r = s[c], i || (r.data || (r.data = {}), r = r.data), void 0 !== n && (r[pe.camelCase(t)] = n), "string" == typeof t ? (a = r[t], null == a && (a = r[pe.camelCase(t)])) : a = r, a
		}
	}
	function o(e, t, n) {
		if (Me(e)) {
			var i, a, r = e.nodeType,
				o = r ? pe.cache : e,
				l = r ? e[pe.expando] : pe.expando;
			if (o[l]) {
				if (t && (i = n ? o[l] : o[l].data)) {
					pe.isArray(t) ? t = t.concat(pe.map(t, pe.camelCase)) : t in i ? t = [t] : (t = pe.camelCase(t), t = t in i ? [t] : t.split(" ")), a = t.length;
					for (; a--;) delete i[t[a]];
					if (n ? !c(i) : !pe.isEmptyObject(i)) return
				}(n || (delete o[l].data, c(o[l]))) && (r ? pe.cleanData([e], !0) : de.deleteExpando || o != o.window ? delete o[l] : o[l] = void 0)
			}
		}
	}
	function d(e, t, n, i) {
		var a, r = 1,
			o = 20,
			l = i ?
		function() {
			return i.cur()
		} : function() {
			return pe.css(e, t, "")
		}, s = l(), c = n && n[3] || (pe.cssNumber[t] ? "" : "px"), u = (pe.cssNumber[t] || "px" !== c && +s) && qe.exec(pe.css(e, t));
		if (u && u[3] !== c) {
			c = c || u[3], n = n || [], u = +s || 1;
			do {
				r = r || ".5", u /= r, pe.style(e, t, u + c)
			} while (r !== (r = l() / s) && 1 !== r && --o)
		}
		return n && (u = +u || +s || 0, a = n[1] ? u + (n[1] + 1) * n[2] : +n[2], i && (i.unit = c, i.start = u, i.end = a)), a
	}
	function m(e) {
		var t = $e.split("|"),
			n = e.createDocumentFragment();
		if (n.createElement) for (; t.length;) n.createElement(t.pop());
		return n
	}
	function v(e, t) {
		var n, i, a = 0,
			r = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : void 0;
		if (!r) for (r = [], n = e.childNodes || e; null != (i = n[a]); a++)!t || pe.nodeName(i, t) ? r.push(i) : pe.merge(r, v(i, t));
		return void 0 === t || t && pe.nodeName(e, t) ? pe.merge([e], r) : r
	}
	function g(e, t) {
		for (var n, i = 0; null != (n = e[i]); i++) pe._data(n, "globalEval", !t || pe._data(t[i], "globalEval"))
	}
	function b(e) {
		ze.test(e.type) && (e.defaultChecked = e.checked)
	}
	function y(e, t, n, i, a) {
		for (var r, o, l, s, c, u, d, f = e.length, p = m(t), h = [], y = 0; y < f; y++) if (o = e[y], o || 0 === o) if ("object" === pe.type(o)) pe.merge(h, o.nodeType ? [o] : o);
		else if (Ye.test(o)) {
			for (s = s || p.appendChild(t.createElement("div")), c = (Oe.exec(o) || ["", ""])[1].toLowerCase(), d = Xe[c] || Xe._default, s.innerHTML = d[1] + pe.htmlPrefilter(o) + d[2], r = d[0]; r--;) s = s.lastChild;
			if (!de.leadingWhitespace && We.test(o) && h.push(t.createTextNode(We.exec(o)[0])), !de.tbody) for (o = "table" !== c || Ve.test(o) ? "<table>" !== d[1] || Ve.test(o) ? 0 : s : s.firstChild, r = o && o.childNodes.length; r--;) pe.nodeName(u = o.childNodes[r], "tbody") && !u.childNodes.length && o.removeChild(u);
			for (pe.merge(h, s.childNodes), s.textContent = ""; s.firstChild;) s.removeChild(s.firstChild);
			s = p.lastChild
		} else h.push(t.createTextNode(o));
		for (s && p.removeChild(s), de.appendChecked || pe.grep(v(h, "input"), b), y = 0; o = h[y++];) if (i && pe.inArray(o, i) > -1) a && a.push(o);
		else if (l = pe.contains(o.ownerDocument, o), s = v(p.appendChild(o), "script"), l && g(s), n) for (r = 0; o = s[r++];) Re.test(o.type || "") && n.push(o);
		return s = null, p
	}
	function f() {
		return !0
	}
	function p() {
		return !1
	}
	function h() {
		try {
			return ie.activeElement
		} catch (e) {}
	}
	function x(e, t, n, i, a, r) {
		var o, l;
		if ("object" == typeof t) {
			"string" != typeof n && (i = i || n, n = void 0);
			for (l in t) x(e, l, n, i, t[l], r);
			return e
		}
		if (null == i && null == a ? (a = n, i = n = void 0) : null == a && ("string" == typeof n ? (a = i, i = void 0) : (a = i, i = n, n = void 0)), a === !1) a = p;
		else if (!a) return e;
		return 1 === r && (o = a, a = function(e) {
			return pe().off(e), o.apply(this, arguments)
		}, a.guid = o.guid || (o.guid = pe.guid++)), e.each(function() {
			pe.event.add(this, t, a, i, n)
		})
	}
	function w(e, t) {
		return pe.nodeName(e, "table") && pe.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
	}
	function k(e) {
		return e.type = (null !== pe.find.attr(e, "type")) + "/" + e.type, e
	}
	function T(e) {
		var t = at.exec(e.type);
		return t ? e.type = t[1] : e.removeAttribute("type"), e
	}
	function E(e, t) {
		if (1 === t.nodeType && pe.hasData(e)) {
			var n, i, a, r = pe._data(e),
				o = pe._data(t, r),
				l = r.events;
			if (l) {
				delete o.handle, o.events = {};
				for (n in l) for (i = 0, a = l[n].length; i < a; i++) pe.event.add(t, n, l[n][i])
			}
			o.data && (o.data = pe.extend({}, o.data))
		}
	}
	function D(e, t) {
		var n, i, a;
		if (1 === t.nodeType) {
			if (n = t.nodeName.toLowerCase(), !de.noCloneEvent && t[pe.expando]) {
				a = pe._data(t);
				for (i in a.events) pe.removeEvent(t, i, a.handle);
				t.removeAttribute(pe.expando)
			}
			"script" === n && t.text !== e.text ? (k(t).text = e.text, T(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), de.html5Clone && e.innerHTML && !pe.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && ze.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue)
		}
	}
	function S(n, i, a, r) {
		i = re.apply([], i);
		var e, t, o, l, s, c, u = 0,
			d = n.length,
			f = d - 1,
			p = i[0],
			h = pe.isFunction(p);
		if (h || d > 1 && "string" == typeof p && !de.checkClone && it.test(p)) return n.each(function(e) {
			var t = n.eq(e);
			h && (i[0] = p.call(this, e, t.html())), S(t, i, a, r)
		});
		if (d && (c = y(i, n[0].ownerDocument, !1, n, r), e = c.firstChild, 1 === c.childNodes.length && (c = e), e || r)) {
			for (l = pe.map(v(c, "script"), k), o = l.length; u < d; u++) t = c, u !== f && (t = pe.clone(t, !0, !0), o && pe.merge(l, v(t, "script"))), a.call(n[u], t, u);
			if (o) for (s = l[l.length - 1].ownerDocument, pe.map(l, T), u = 0; u < o; u++) t = l[u], Re.test(t.type || "") && !pe._data(t, "globalEval") && pe.contains(s, t) && (t.src ? pe._evalUrl && pe._evalUrl(t.src) : pe.globalEval((t.text || t.textContent || t.innerHTML || "").replace(rt, "")));
			c = e = null
		}
		return n
	}
	function L(e, t, n) {
		for (var i, a = t ? pe.filter(t, e) : e, r = 0; null != (i = a[r]); r++) n || 1 !== i.nodeType || pe.cleanData(v(i)), i.parentNode && (n && pe.contains(i.ownerDocument, i) && g(v(i, "script")), i.parentNode.removeChild(i));
		return e
	}
	function A(e, t) {
		var n = pe(t.createElement(e)).appendTo(t.body),
			i = pe.css(n[0], "display");
		return n.detach(), i
	}
	function j(e) {
		var t = ie,
			n = ct[e];
		return n || (n = A(e, t), "none" !== n && n || (st = (st || pe("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = (st[0].contentWindow || st[0].contentDocument).document, t.write(), t.close(), n = A(e, t), st.detach()), ct[e] = n), n
	}
	function N(e, t) {
		return {
			get: function() {
				return e() ? void delete this.get : (this.get = t).apply(this, arguments)
			}
		}
	}
	function M(e) {
		if (e in Tt) return e;
		for (var t = e.charAt(0).toUpperCase() + e.slice(1), n = Ct.length; n--;) if (e = Ct[n] + t, e in Tt) return e
	}
	function H(e, t) {
		for (var n, i, a, r = [], o = 0, l = e.length; o < l; o++) i = e[o], i.style && (r[o] = pe._data(i, "olddisplay"), n = i.style.display, t ? (r[o] || "none" !== n || (i.style.display = ""), "" === i.style.display && _e(i) && (r[o] = pe._data(i, "olddisplay", j(i.nodeName)))) : (a = _e(i), (n && "none" !== n || !a) && pe._data(i, "olddisplay", a ? n : pe.css(i, "display"))));
		for (o = 0; o < l; o++) i = e[o], i.style && (t && "none" !== i.style.display && "" !== i.style.display || (i.style.display = t ? r[o] || "" : "none"));
		return e
	}
	function F(e, t, n) {
		var i = xt.exec(t);
		return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : t
	}
	function I(e, t, n, i, a) {
		for (var r = n === (i ? "border" : "content") ? 4 : "width" === t ? 1 : 0, o = 0; r < 4; r += 2)"margin" === n && (o += pe.css(e, n + Pe[r], !0, a)), i ? ("content" === n && (o -= pe.css(e, "padding" + Pe[r], !0, a)), "margin" !== n && (o -= pe.css(e, "border" + Pe[r] + "Width", !0, a))) : (o += pe.css(e, "padding" + Pe[r], !0, a), "padding" !== n && (o += pe.css(e, "border" + Pe[r] + "Width", !0, a)));
		return o
	}
	function q(e, t, n) {
		var i = !0,
			a = "width" === t ? e.offsetWidth : e.offsetHeight,
			r = ht(e),
			o = de.boxSizing && "border-box" === pe.css(e, "boxSizing", !1, r);
		if (ie.msFullscreenElement && C.top !== C && e.getClientRects().length && (a = Math.round(100 * e.getBoundingClientRect()[t])), a <= 0 || null == a) {
			if (a = yt(e, t, r), (a < 0 || null == a) && (a = e.style[t]), dt.test(a)) return a;
			i = o && (de.boxSizingReliable() || a === e.style[t]), a = parseFloat(a) || 0
		}
		return a + I(e, t, n || (o ? "border" : "content"), i, r) + "px"
	}
	function P(e, t, n, i, a) {
		return new P.prototype.init(e, t, n, i, a)
	}
	function _() {
		return C.setTimeout(function() {
			Et = void 0
		}), Et = pe.now()
	}
	function B(e, t) {
		var n, i = {
			height: e
		},
			a = 0;
		for (t = t ? 1 : 0; a < 4; a += 2 - t) n = Pe[a], i["margin" + n] = i["padding" + n] = e;
		return t && (i.opacity = i.width = e), i
	}
	function z(e, t, n) {
		for (var i, a = (W.tweeners[t] || []).concat(W.tweeners["*"]), r = 0, o = a.length; r < o; r++) if (i = a[r].call(n, t, e)) return i
	}
	function O(t, e, n) {
		var i, a, r, o, l, s, c, u, d = this,
			f = {},
			p = t.style,
			h = t.nodeType && _e(t),
			y = pe._data(t, "fxshow");
		n.queue || (l = pe._queueHooks(t, "fx"), null == l.unqueued && (l.unqueued = 0, s = l.empty.fire, l.empty.fire = function() {
			l.unqueued || s()
		}), l.unqueued++, d.always(function() {
			d.always(function() {
				l.unqueued--, pe.queue(t, "fx").length || l.empty.fire()
			})
		})), 1 === t.nodeType && ("height" in e || "width" in e) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], c = pe.css(t, "display"), u = "none" === c ? pe._data(t, "olddisplay") || j(t.nodeName) : c, "inline" === u && "none" === pe.css(t, "float") && (de.inlineBlockNeedsLayout && "inline" !== j(t.nodeName) ? p.zoom = 1 : p.display = "inline-block")), n.overflow && (p.overflow = "hidden", de.shrinkWrapBlocks() || d.always(function() {
			p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2]
		}));
		for (i in e) if (a = e[i], St.exec(a)) {
			if (delete e[i], r = r || "toggle" === a, a === (h ? "hide" : "show")) {
				if ("show" !== a || !y || void 0 === y[i]) continue;
				h = !0
			}
			f[i] = y && y[i] || pe.style(t, i)
		} else c = void 0;
		if (pe.isEmptyObject(f))"inline" === ("none" === c ? j(t.nodeName) : c) && (p.display = c);
		else {
			y ? "hidden" in y && (h = y.hidden) : y = pe._data(t, "fxshow", {}), r && (y.hidden = !h), h ? pe(t).show() : d.done(function() {
				pe(t).hide()
			}), d.done(function() {
				var e;
				pe._removeData(t, "fxshow");
				for (e in f) pe.style(t, e, f[e])
			});
			for (i in f) o = z(h ? y[i] : 0, i, d), i in y || (y[i] = o.start, h && (o.end = o.start, o.start = "width" === i || "height" === i ? 1 : 0))
		}
	}
	function R(e, t) {
		var n, i, a, r, o;
		for (n in e) if (i = pe.camelCase(n), a = t[i], r = e[n], pe.isArray(r) && (a = r[1], r = e[n] = r[0]), n !== i && (e[i] = r, delete e[n]), o = pe.cssHooks[i], o && "expand" in o) {
			r = o.expand(r), delete e[i];
			for (n in r) n in e || (e[n] = r[n], t[n] = a)
		} else t[i] = a
	}
	function W(o, e, t) {
		var n, l, i = 0,
			a = W.prefilters.length,
			s = pe.Deferred().always(function() {
				delete r.elem
			}),
			r = function() {
				if (l) return !1;
				for (var e = Et || _(), t = Math.max(0, c.startTime + c.duration - e), n = t / c.duration || 0, i = 1 - n, a = 0, r = c.tweens.length; a < r; a++) c.tweens[a].run(i);
				return s.notifyWith(o, [c, i, t]), i < 1 && r ? t : (s.resolveWith(o, [c]), !1)
			},
			c = s.promise({
				elem: o,
				props: pe.extend({}, e),
				opts: pe.extend(!0, {
					specialEasing: {},
					easing: pe.easing._default
				}, t),
				originalProperties: e,
				originalOptions: t,
				startTime: Et || _(),
				duration: t.duration,
				tweens: [],
				createTween: function(e, t) {
					var n = pe.Tween(o, c.opts, e, t, c.opts.specialEasing[e] || c.opts.easing);
					return c.tweens.push(n), n
				},
				stop: function(e) {
					var t = 0,
						n = e ? c.tweens.length : 0;
					if (l) return this;
					for (l = !0; t < n; t++) c.tweens[t].run(1);
					return e ? (s.notifyWith(o, [c, 1, 0]), s.resolveWith(o, [c, e])) : s.rejectWith(o, [c, e]), this
				}
			}),
			u = c.props;
		for (R(u, c.opts.specialEasing); i < a; i++) if (n = W.prefilters[i].call(c, o, u, c.opts)) return pe.isFunction(n.stop) && (pe._queueHooks(c.elem, c.opts.queue).stop = pe.proxy(n.stop, n)), n;
		return pe.map(u, z, c), pe.isFunction(c.opts.start) && c.opts.start.call(o, c), pe.fx.timer(pe.extend(r, {
			elem: o,
			anim: c,
			queue: c.opts.queue
		})), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always)
	}
	function $(e) {
		return pe.attr(e, "class") || ""
	}
	function X(r) {
		return function(e, t) {
			"string" != typeof e && (t = e, e = "*");
			var n, i = 0,
				a = e.toLowerCase().match(Ae) || [];
			if (pe.isFunction(t)) for (; n = a[i++];)"+" === n.charAt(0) ? (n = n.slice(1) || "*", (r[n] = r[n] || []).unshift(t)) : (r[n] = r[n] || []).push(t)
		}
	}
	function Y(t, a, r, o) {
		function l(e) {
			var i;
			return s[e] = !0, pe.each(t[e] || [], function(e, t) {
				var n = t(a, r, o);
				return "string" != typeof n || c || s[n] ? c ? !(i = n) : void 0 : (a.dataTypes.unshift(n), l(n), !1)
			}), i
		}
		var s = {},
			c = t === Qt;
		return l(a.dataTypes[0]) || !s["*"] && l("*")
	}
	function V(e, t) {
		var n, i, a = pe.ajaxSettings.flatOptions || {};
		for (i in t) void 0 !== t[i] && ((a[i] ? e : n || (n = {}))[i] = t[i]);
		return n && pe.extend(!0, e, n), e
	}
	function K(e, t, n) {
		for (var i, a, r, o, l = e.contents, s = e.dataTypes;
		"*" === s[0];) s.shift(), void 0 === a && (a = e.mimeType || t.getResponseHeader("Content-Type"));
		if (a) for (o in l) if (l[o] && l[o].test(a)) {
			s.unshift(o);
			break
		}
		if (s[0] in n) r = s[0];
		else {
			for (o in n) {
				if (!s[0] || e.converters[o + " " + s[0]]) {
					r = o;
					break
				}
				i || (i = o)
			}
			r = r || i
		}
		if (r) return r !== s[0] && s.unshift(r), n[r]
	}
	function G(e, t, n, i) {
		var a, r, o, l, s, c = {},
			u = e.dataTypes.slice();
		if (u[1]) for (o in e.converters) c[o.toLowerCase()] = e.converters[o];
		for (r = u.shift(); r;) if (e.responseFields[r] && (n[e.responseFields[r]] = t), !s && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)), s = r, r = u.shift()) if ("*" === r) r = s;
		else if ("*" !== s && s !== r) {
			if (o = c[s + " " + r] || c["* " + r], !o) for (a in c) if (l = a.split(" "), l[1] === r && (o = c[s + " " + l[0]] || c["* " + l[0]])) {
				o === !0 ? o = c[a] : c[a] !== !0 && (r = l[0], u.unshift(l[1]));
				break
			}
			if (o !== !0) if (o && e["throws"]) t = o(t);
			else try {
				t = o(t)
			} catch (e) {
				return {
					state: "parsererror",
					error: o ? e : "No conversion from " + s + " to " + r
				}
			}
		}
		return {
			state: "success",
			data: t
		}
	}
	function J(e) {
		return e.style && e.style.display || pe.css(e, "display")
	}
	function U(e) {
		for (; e && 1 === e.nodeType;) {
			if ("none" === J(e) || "hidden" === e.type) return !0;
			e = e.parentNode
		}
		return !1
	}
	function Q(n, e, i, a) {
		var t;
		if (pe.isArray(e)) pe.each(e, function(e, t) {
			i || an.test(n) ? a(n, t) : Q(n + "[" + ("object" == typeof t && null != t ? e : "") + "]", t, i, a)
		});
		else if (i || "object" !== pe.type(e)) a(n, e);
		else for (t in e) Q(n + "[" + t + "]", e[t], i, a)
	}
	function Z() {
		try {
			return new C.XMLHttpRequest
		} catch (e) {}
	}
	function ee() {
		try {
			return new C.ActiveXObject("Microsoft.XMLHTTP")
		} catch (e) {}
	}
	function te(e) {
		return pe.isWindow(e) ? e : 9 === e.nodeType && (e.defaultView || e.parentWindow)
	}
	var ne = [],
		ie = C.document,
		ae = ne.slice,
		re = ne.concat,
		oe = ne.push,
		le = ne.indexOf,
		se = {},
		ce = se.toString,
		ue = se.hasOwnProperty,
		de = {},
		fe = "1.12.3",
		pe = function(e, t) {
			return new pe.fn.init(e, t)
		},
		he = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
		ye = /^-ms-/,
		me = /-([\da-z])/gi,
		ve = function(e, t) {
			return t.toUpperCase()
		};
	pe.fn = pe.prototype = {
		jquery: fe,
		constructor: pe,
		selector: "",
		length: 0,
		toArray: function() {
			return ae.call(this)
		},
		get: function(e) {
			return null != e ? e < 0 ? this[e + this.length] : this[e] : ae.call(this)
		},
		pushStack: function(e) {
			var t = pe.merge(this.constructor(), e);
			return t.prevObject = this, t.context = this.context, t
		},
		each: function(e) {
			return pe.each(this, e)
		},
		map: function(n) {
			return this.pushStack(pe.map(this, function(e, t) {
				return n.call(e, t, e)
			}))
		},
		slice: function() {
			return this.pushStack(ae.apply(this, arguments))
		},
		first: function() {
			return this.eq(0)
		},
		last: function() {
			return this.eq(-1)
		},
		eq: function(e) {
			var t = this.length,
				n = +e + (e < 0 ? t : 0);
			return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
		},
		end: function() {
			return this.prevObject || this.constructor()
		},
		push: oe,
		sort: ne.sort,
		splice: ne.splice
	}, pe.extend = pe.fn.extend = function() {
		var e, t, n, i, a, r, o = arguments[0] || {},
			l = 1,
			s = arguments.length,
			c = !1;
		for ("boolean" == typeof o && (c = o, o = arguments[l] || {}, l++), "object" == typeof o || pe.isFunction(o) || (o = {}), l === s && (o = this, l--); l < s; l++) if (null != (a = arguments[l])) for (i in a) e = o[i], n = a[i], o !== n && (c && n && (pe.isPlainObject(n) || (t = pe.isArray(n))) ? (t ? (t = !1, r = e && pe.isArray(e) ? e : []) : r = e && pe.isPlainObject(e) ? e : {}, o[i] = pe.extend(c, r, n)) : void 0 !== n && (o[i] = n));
		return o
	}, pe.extend({
		expando: "jQuery" + (fe + Math.random()).replace(/\D/g, ""),
		isReady: !0,
		error: function(e) {
			throw new Error(e)
		},
		noop: function() {},
		isFunction: function(e) {
			return "function" === pe.type(e)
		},
		isArray: Array.isArray ||
		function(e) {
			return "array" === pe.type(e)
		},
		isWindow: function(e) {
			return null != e && e == e.window
		},
		isNumeric: function(e) {
			var t = e && e.toString();
			return !pe.isArray(e) && t - parseFloat(t) + 1 >= 0
		},
		isEmptyObject: function(e) {
			var t;
			for (t in e) return !1;
			return !0
		},
		isPlainObject: function(e) {
			var t;
			if (!e || "object" !== pe.type(e) || e.nodeType || pe.isWindow(e)) return !1;
			try {
				if (e.constructor && !ue.call(e, "constructor") && !ue.call(e.constructor.prototype, "isPrototypeOf")) return !1
			} catch (e) {
				return !1
			}
			if (!de.ownFirst) for (t in e) return ue.call(e, t);
			for (t in e);
			return void 0 === t || ue.call(e, t)
		},
		type: function(e) {
			return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? se[ce.call(e)] || "object" : typeof e
		},
		globalEval: function(e) {
			e && pe.trim(e) && (C.execScript ||
			function(e) {
				C.eval.call(C, e)
			})(e)
		},
		camelCase: function(e) {
			return e.replace(ye, "ms-").replace(me, ve)
		},
		nodeName: function(e, t) {
			return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
		},
		each: function(e, t) {
			var n, i = 0;
			if (l(e)) for (n = e.length; i < n && t.call(e[i], i, e[i]) !== !1; i++);
			else for (i in e) if (t.call(e[i], i, e[i]) === !1) break;
			return e
		},
		trim: function(e) {
			return null == e ? "" : (e + "").replace(he, "")
		},
		makeArray: function(e, t) {
			var n = t || [];
			return null != e && (l(Object(e)) ? pe.merge(n, "string" == typeof e ? [e] : e) : oe.call(n, e)), n
		},
		inArray: function(e, t, n) {
			var i;
			if (t) {
				if (le) return le.call(t, e, n);
				for (i = t.length, n = n ? n < 0 ? Math.max(0, i + n) : n : 0; n < i; n++) if (n in t && t[n] === e) return n
			}
			return -1
		},
		merge: function(e, t) {
			for (var n = +t.length, i = 0, a = e.length; i < n;) e[a++] = t[i++];
			if (n !== n) for (; void 0 !== t[i];) e[a++] = t[i++];
			return e.length = a, e
		},
		grep: function(e, t, n) {
			for (var i, a = [], r = 0, o = e.length, l = !n; r < o; r++) i = !t(e[r], r), i !== l && a.push(e[r]);
			return a
		},
		map: function(e, t, n) {
			var i, a, r = 0,
				o = [];
			if (l(e)) for (i = e.length; r < i; r++) a = t(e[r], r, n), null != a && o.push(a);
			else for (r in e) a = t(e[r], r, n), null != a && o.push(a);
			return re.apply([], o)
		},
		guid: 1,
		proxy: function(e, t) {
			var n, i, a;
			if ("string" == typeof t && (a = e[t], t = e, e = a), pe.isFunction(e)) return n = ae.call(arguments, 2), i = function() {
				return e.apply(t || this, n.concat(ae.call(arguments)))
			}, i.guid = e.guid = e.guid || pe.guid++, i
		},
		now: function() {
			return +new Date
		},
		support: de
	}), "function" == typeof Symbol && (pe.fn[Symbol.iterator] = ne[Symbol.iterator]), pe.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
		se["[object " + t + "]"] = t.toLowerCase()
	});
	var ge = function(n) {
			function x(e, t, n, i) {
				var a, r, o, l, s, c, u, d, f = t && t.ownerDocument,
					p = t ? t.nodeType : 9;
				if (n = n || [], "string" != typeof e || !e || 1 !== p && 9 !== p && 11 !== p) return n;
				if (!i && ((t ? t.ownerDocument || t : z) !== M && N(t), t = t || M, F)) {
					if (11 !== p && (c = ve.exec(e))) if (a = c[1]) {
						if (9 === p) {
							if (!(o = t.getElementById(a))) return n;
							if (o.id === a) return n.push(o), n
						} else if (f && (o = f.getElementById(a)) && _(t, o) && o.id === a) return n.push(o), n
					} else {
						if (c[2]) return Q.apply(n, t.getElementsByTagName(e)), n;
						if ((a = c[3]) && v.getElementsByClassName && t.getElementsByClassName) return Q.apply(n, t.getElementsByClassName(a)), n
					}
					if (v.qsa && !X[e + " "] && (!I || !I.test(e))) {
						if (1 !== p) f = t, d = e;
						else if ("object" !== t.nodeName.toLowerCase()) {
							for ((l = t.getAttribute("id")) ? l = l.replace(be, "\\$&") : t.setAttribute("id", l = B), u = E(e), r = u.length, s = fe.test(l) ? "#" + l : "[id='" + l + "']"; r--;) u[r] = s + " " + y(u[r]);
							d = u.join(","), f = ge.test(e) && h(t.parentNode) || t
						}
						if (d) try {
							return Q.apply(n, f.querySelectorAll(d)), n
						} catch (e) {} finally {
							l === B && t.removeAttribute("id")
						}
					}
				}
				return S(e.replace(le, "$1"), t, n, i)
			}
			function e() {
				function n(e, t) {
					return i.push(e + " ") > k.cacheLength && delete n[i.shift()], n[e + " "] = t
				}
				var i = [];
				return n
			}
			function s(e) {
				return e[B] = !0, e
			}
			function a(e) {
				var t = M.createElement("div");
				try {
					return !!e(t)
				} catch (e) {
					return !1
				} finally {
					t.parentNode && t.parentNode.removeChild(t), t = null
				}
			}
			function t(e, t) {
				for (var n = e.split("|"), i = n.length; i--;) k.attrHandle[n[i]] = t
			}
			function c(e, t) {
				var n = t && e,
					i = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || V) - (~e.sourceIndex || V);
				if (i) return i;
				if (n) for (; n = n.nextSibling;) if (n === t) return -1;
				return e ? 1 : -1
			}
			function i(n) {
				return function(e) {
					var t = e.nodeName.toLowerCase();
					return "input" === t && e.type === n
				}
			}
			function r(n) {
				return function(e) {
					var t = e.nodeName.toLowerCase();
					return ("input" === t || "button" === t) && e.type === n
				}
			}
			function o(o) {
				return s(function(r) {
					return r = +r, s(function(e, t) {
						for (var n, i = o([], e.length, r), a = i.length; a--;) e[n = i[a]] && (e[n] = !(t[n] = e[n]))
					})
				})
			}
			function h(e) {
				return e && "undefined" != typeof e.getElementsByTagName && e
			}
			function l() {}
			function y(e) {
				for (var t = 0, n = e.length, i = ""; t < n; t++) i += e[t].value;
				return i
			}
			function d(l, e, t) {
				var s = e.dir,
					c = t && "parentNode" === s,
					u = R++;
				return e.first ?
				function(e, t, n) {
					for (; e = e[s];) if (1 === e.nodeType || c) return l(e, t, n)
				} : function(e, t, n) {
					var i, a, r, o = [O, u];
					if (n) {
						for (; e = e[s];) if ((1 === e.nodeType || c) && l(e, t, n)) return !0
					} else for (; e = e[s];) if (1 === e.nodeType || c) {
						if (r = e[B] || (e[B] = {}), a = r[e.uniqueID] || (r[e.uniqueID] = {}), (i = a[s]) && i[0] === O && i[1] === u) return o[2] = i[2];
						if (a[s] = o, o[2] = l(e, t, n)) return !0
					}
				}
			}
			function f(a) {
				return a.length > 1 ?
				function(e, t, n) {
					for (var i = a.length; i--;) if (!a[i](e, t, n)) return !1;
					return !0
				} : a[0]
			}
			function g(e, t, n) {
				for (var i = 0, a = t.length; i < a; i++) x(e, t[i], n);
				return n
			}
			function w(e, t, n, i, a) {
				for (var r, o = [], l = 0, s = e.length, c = null != t; l < s; l++)(r = e[l]) && (n && !n(r, i, a) || (o.push(r), c && t.push(l)));
				return o
			}
			function b(p, h, y, m, v, e) {
				return m && !m[B] && (m = b(m)), v && !v[B] && (v = b(v, e)), s(function(e, t, n, i) {
					var a, r, o, l = [],
						s = [],
						c = t.length,
						u = e || g(h || "*", n.nodeType ? [n] : n, []),
						d = !p || !e && h ? u : w(u, l, p, n, i),
						f = y ? v || (e ? p : c || m) ? [] : t : d;
					if (y && y(d, f, n, i), m) for (a = w(f, s), m(a, [], n, i), r = a.length; r--;)(o = a[r]) && (f[s[r]] = !(d[s[r]] = o));
					if (e) {
						if (v || p) {
							if (v) {
								for (a = [], r = f.length; r--;)(o = f[r]) && a.push(d[r] = o);
								v(null, f = [], a, i)
							}
							for (r = f.length; r--;)(o = f[r]) && (a = v ? ee(e, o) : l[r]) > -1 && (e[a] = !(t[a] = o))
						}
					} else f = w(f === t ? f.splice(c, f.length) : f), v ? v(null, t, f, i) : Q.apply(t, f)
				})
			}
			function p(e) {
				for (var a, t, n, i = e.length, r = k.relative[e[0].type], o = r || k.relative[" "], l = r ? 1 : 0, s = d(function(e) {
					return e === a
				}, o, !0), c = d(function(e) {
					return ee(a, e) > -1
				}, o, !0), u = [function(e, t, n) {
					var i = !r && (n || t !== L) || ((a = t).nodeType ? s(e, t, n) : c(e, t, n));
					return a = null, i
				}]; l < i; l++) if (t = k.relative[e[l].type]) u = [d(f(u), t)];
				else {
					if (t = k.filter[e[l].type].apply(null, e[l].matches), t[B]) {
						for (n = ++l; n < i && !k.relative[e[n].type]; n++);
						return b(l > 1 && f(u), l > 1 && y(e.slice(0, l - 1).concat({
							value: " " === e[l - 2].type ? "*" : ""
						})).replace(le, "$1"), t, l < n && p(e.slice(l, n)), n < i && p(e = e.slice(n)), n < i && y(e))
					}
					u.push(t)
				}
				return f(u)
			}
			function u(m, v) {
				var g = v.length > 0,
					b = m.length > 0,
					e = function(e, t, n, i, a) {
						var r, o, l, s = 0,
							c = "0",
							u = e && [],
							d = [],
							f = L,
							p = e || b && k.find.TAG("*", a),
							h = O += null == f ? 1 : Math.random() || .1,
							y = p.length;
						for (a && (L = t === M || t || a); c !== y && null != (r = p[c]); c++) {
							if (b && r) {
								for (o = 0, t || r.ownerDocument === M || (N(r), n = !F); l = m[o++];) if (l(r, t || M, n)) {
									i.push(r);
									break
								}
								a && (O = h)
							}
							g && ((r = !l && r) && s--, e && u.push(r))
						}
						if (s += c, g && c !== s) {
							for (o = 0; l = v[o++];) l(u, d, t, n);
							if (e) {
								if (s > 0) for (; c--;) u[c] || d[c] || (d[c] = J.call(i));
								d = w(d)
							}
							Q.apply(i, d), a && !e && d.length > 0 && s + v.length > 1 && x.uniqueSort(i)
						}
						return a && (O = h, L = f), u
					};
				return g ? s(e) : e
			}
			var m, v, k, C, T, E, D, S, L, A, j, N, M, H, F, I, q, P, _, B = "sizzle" + 1 * new Date,
				z = n.document,
				O = 0,
				R = 0,
				W = e(),
				$ = e(),
				X = e(),
				Y = function(e, t) {
					return e === t && (j = !0), 0
				},
				V = 1 << 31,
				K = {}.hasOwnProperty,
				G = [],
				J = G.pop,
				U = G.push,
				Q = G.push,
				Z = G.slice,
				ee = function(e, t) {
					for (var n = 0, i = e.length; n < i; n++) if (e[n] === t) return n;
					return -1
				},
				te = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
				ne = "[\\x20\\t\\r\\n\\f]",
				ie = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
				ae = "\\[" + ne + "*(" + ie + ")(?:" + ne + "*([*^$|!~]?=)" + ne + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ie + "))|)" + ne + "*\\]",
				re = ":(" + ie + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ae + ")*)|.*)\\)|)",
				oe = new RegExp(ne + "+", "g"),
				le = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$", "g"),
				se = new RegExp("^" + ne + "*," + ne + "*"),
				ce = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"),
				ue = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]", "g"),
				de = new RegExp(re),
				fe = new RegExp("^" + ie + "$"),
				pe = {
					ID: new RegExp("^#(" + ie + ")"),
					CLASS: new RegExp("^\\.(" + ie + ")"),
					TAG: new RegExp("^(" + ie + "|[*])"),
					ATTR: new RegExp("^" + ae),
					PSEUDO: new RegExp("^" + re),
					CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne + "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne + "*\\)|)", "i"),
					bool: new RegExp("^(?:" + te + ")$", "i"),
					needsContext: new RegExp("^" + ne + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ne + "*((?:-\\d)?\\d*)" + ne + "*\\)|)(?=[^-]|$)", "i")
				},
				he = /^(?:input|select|textarea|button)$/i,
				ye = /^h\d$/i,
				me = /^[^{]+\{\s*\[native \w/,
				ve = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
				ge = /[+~]/,
				be = /'|\\/g,
				xe = new RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)", "ig"),
				we = function(e, t, n) {
					var i = "0x" + t - 65536;
					return i !== i || n ? t : i < 0 ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320)
				},
				ke = function() {
					N()
				};
			try {
				Q.apply(G = Z.call(z.childNodes), z.childNodes), G[z.childNodes.length].nodeType
			} catch (e) {
				Q = {
					apply: G.length ?
					function(e, t) {
						U.apply(e, Z.call(t))
					} : function(e, t) {
						for (var n = e.length, i = 0; e[n++] = t[i++];);
						e.length = n - 1
					}
				}
			}
			v = x.support = {}, T = x.isXML = function(e) {
				var t = e && (e.ownerDocument || e).documentElement;
				return !!t && "HTML" !== t.nodeName
			}, N = x.setDocument = function(e) {
				var t, n, i = e ? e.ownerDocument || e : z;
				return i !== M && 9 === i.nodeType && i.documentElement ? (M = i, H = M.documentElement, F = !T(M), (n = M.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", ke, !1) : n.attachEvent && n.attachEvent("onunload", ke)), v.attributes = a(function(e) {
					return e.className = "i", !e.getAttribute("className")
				}), v.getElementsByTagName = a(function(e) {
					return e.appendChild(M.createComment("")), !e.getElementsByTagName("*").length
				}), v.getElementsByClassName = me.test(M.getElementsByClassName), v.getById = a(function(e) {
					return H.appendChild(e).id = B, !M.getElementsByName || !M.getElementsByName(B).length
				}), v.getById ? (k.find.ID = function(e, t) {
					if ("undefined" != typeof t.getElementById && F) {
						var n = t.getElementById(e);
						return n ? [n] : []
					}
				}, k.filter.ID = function(e) {
					var t = e.replace(xe, we);
					return function(e) {
						return e.getAttribute("id") === t
					}
				}) : (delete k.find.ID, k.filter.ID = function(e) {
					var n = e.replace(xe, we);
					return function(e) {
						var t = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
						return t && t.value === n
					}
				}), k.find.TAG = v.getElementsByTagName ?
				function(e, t) {
					return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : v.qsa ? t.querySelectorAll(e) : void 0
				} : function(e, t) {
					var n, i = [],
						a = 0,
						r = t.getElementsByTagName(e);
					if ("*" === e) {
						for (; n = r[a++];) 1 === n.nodeType && i.push(n);
						return i
					}
					return r
				}, k.find.CLASS = v.getElementsByClassName &&
				function(e, t) {
					if ("undefined" != typeof t.getElementsByClassName && F) return t.getElementsByClassName(e)
				}, q = [], I = [], (v.qsa = me.test(M.querySelectorAll)) && (a(function(e) {
					H.appendChild(e).innerHTML = "<a id='" + B + "'></a><select id='" + B + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && I.push("[*^$]=" + ne + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || I.push("\\[" + ne + "*(?:value|" + te + ")"), e.querySelectorAll("[id~=" + B + "-]").length || I.push("~="), e.querySelectorAll(":checked").length || I.push(":checked"), e.querySelectorAll("a#" + B + "+*").length || I.push(".#.+[+~]")
				}), a(function(e) {
					var t = M.createElement("input");
					t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && I.push("name" + ne + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || I.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), I.push(",.*:")
				})), (v.matchesSelector = me.test(P = H.matches || H.webkitMatchesSelector || H.mozMatchesSelector || H.oMatchesSelector || H.msMatchesSelector)) && a(function(e) {
					v.disconnectedMatch = P.call(e, "div"), P.call(e, "[s!='']:x"), q.push("!=", re)
				}), I = I.length && new RegExp(I.join("|")), q = q.length && new RegExp(q.join("|")), t = me.test(H.compareDocumentPosition), _ = t || me.test(H.contains) ?
				function(e, t) {
					var n = 9 === e.nodeType ? e.documentElement : e,
						i = t && t.parentNode;
					return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)))
				} : function(e, t) {
					if (t) for (; t = t.parentNode;) if (t === e) return !0;
					return !1
				}, Y = t ?
				function(e, t) {
					if (e === t) return j = !0, 0;
					var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
					return n ? n : (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & n || !v.sortDetached && t.compareDocumentPosition(e) === n ? e === M || e.ownerDocument === z && _(z, e) ? -1 : t === M || t.ownerDocument === z && _(z, t) ? 1 : A ? ee(A, e) - ee(A, t) : 0 : 4 & n ? -1 : 1)
				} : function(e, t) {
					if (e === t) return j = !0, 0;
					var n, i = 0,
						a = e.parentNode,
						r = t.parentNode,
						o = [e],
						l = [t];
					if (!a || !r) return e === M ? -1 : t === M ? 1 : a ? -1 : r ? 1 : A ? ee(A, e) - ee(A, t) : 0;
					if (a === r) return c(e, t);
					for (n = e; n = n.parentNode;) o.unshift(n);
					for (n = t; n = n.parentNode;) l.unshift(n);
					for (; o[i] === l[i];) i++;
					return i ? c(o[i], l[i]) : o[i] === z ? -1 : l[i] === z ? 1 : 0
				}, M) : M
			}, x.matches = function(e, t) {
				return x(e, null, null, t)
			}, x.matchesSelector = function(e, t) {
				if ((e.ownerDocument || e) !== M && N(e), t = t.replace(ue, "='$1']"), v.matchesSelector && F && !X[t + " "] && (!q || !q.test(t)) && (!I || !I.test(t))) try {
					var n = P.call(e, t);
					if (n || v.disconnectedMatch || e.document && 11 !== e.document.nodeType) return n
				} catch (e) {}
				return x(t, M, null, [e]).length > 0
			}, x.contains = function(e, t) {
				return (e.ownerDocument || e) !== M && N(e), _(e, t)
			}, x.attr = function(e, t) {
				(e.ownerDocument || e) !== M && N(e);
				var n = k.attrHandle[t.toLowerCase()],
					i = n && K.call(k.attrHandle, t.toLowerCase()) ? n(e, t, !F) : void 0;
				return void 0 !== i ? i : v.attributes || !F ? e.getAttribute(t) : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
			}, x.error = function(e) {
				throw new Error("Syntax error, unrecognized expression: " + e)
			}, x.uniqueSort = function(e) {
				var t, n = [],
					i = 0,
					a = 0;
				if (j = !v.detectDuplicates, A = !v.sortStable && e.slice(0), e.sort(Y), j) {
					for (; t = e[a++];) t === e[a] && (i = n.push(a));
					for (; i--;) e.splice(n[i], 1)
				}
				return A = null, e
			}, C = x.getText = function(e) {
				var t, n = "",
					i = 0,
					a = e.nodeType;
				if (a) {
					if (1 === a || 9 === a || 11 === a) {
						if ("string" == typeof e.textContent) return e.textContent;
						for (e = e.firstChild; e; e = e.nextSibling) n += C(e)
					} else if (3 === a || 4 === a) return e.nodeValue
				} else for (; t = e[i++];) n += C(t);
				return n
			}, k = x.selectors = {
				cacheLength: 50,
				createPseudo: s,
				match: pe,
				attrHandle: {},
				find: {},
				relative: {
					">": {
						dir: "parentNode",
						first: !0
					},
					" ": {
						dir: "parentNode"
					},
					"+": {
						dir: "previousSibling",
						first: !0
					},
					"~": {
						dir: "previousSibling"
					}
				},
				preFilter: {
					ATTR: function(e) {
						return e[1] = e[1].replace(xe, we), e[3] = (e[3] || e[4] || e[5] || "").replace(xe, we), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
					},
					CHILD: function(e) {
						return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || x.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && x.error(e[0]), e
					},
					PSEUDO: function(e) {
						var t, n = !e[6] && e[2];
						return pe.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && de.test(n) && (t = E(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
					}
				},
				filter: {
					TAG: function(e) {
						var t = e.replace(xe, we).toLowerCase();
						return "*" === e ?
						function() {
							return !0
						} : function(e) {
							return e.nodeName && e.nodeName.toLowerCase() === t
						}
					},
					CLASS: function(e) {
						var t = W[e + " "];
						return t || (t = new RegExp("(^|" + ne + ")" + e + "(" + ne + "|$)")) && W(e, function(e) {
							return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
						})
					},
					ATTR: function(n, i, a) {
						return function(e) {
							var t = x.attr(e, n);
							return null == t ? "!=" === i : !i || (t += "", "=" === i ? t === a : "!=" === i ? t !== a : "^=" === i ? a && 0 === t.indexOf(a) : "*=" === i ? a && t.indexOf(a) > -1 : "$=" === i ? a && t.slice(-a.length) === a : "~=" === i ? (" " + t.replace(oe, " ") + " ").indexOf(a) > -1 : "|=" === i && (t === a || t.slice(0, a.length + 1) === a + "-"))
						}
					},
					CHILD: function(h, e, t, y, m) {
						var v = "nth" !== h.slice(0, 3),
							g = "last" !== h.slice(-4),
							b = "of-type" === e;
						return 1 === y && 0 === m ?
						function(e) {
							return !!e.parentNode
						} : function(e, t, n) {
							var i, a, r, o, l, s, c = v !== g ? "nextSibling" : "previousSibling",
								u = e.parentNode,
								d = b && e.nodeName.toLowerCase(),
								f = !n && !b,
								p = !1;
							if (u) {
								if (v) {
									for (; c;) {
										for (o = e; o = o[c];) if (b ? o.nodeName.toLowerCase() === d : 1 === o.nodeType) return !1;
										s = c = "only" === h && !s && "nextSibling"
									}
									return !0
								}
								if (s = [g ? u.firstChild : u.lastChild], g && f) {
									for (o = u, r = o[B] || (o[B] = {}), a = r[o.uniqueID] || (r[o.uniqueID] = {}), i = a[h] || [], l = i[0] === O && i[1], p = l && i[2], o = l && u.childNodes[l]; o = ++l && o && o[c] || (p = l = 0) || s.pop();) if (1 === o.nodeType && ++p && o === e) {
										a[h] = [O, l, p];
										break
									}
								} else if (f && (o = e, r = o[B] || (o[B] = {}), a = r[o.uniqueID] || (r[o.uniqueID] = {}), i = a[h] || [], l = i[0] === O && i[1], p = l), p === !1) for (;
								(o = ++l && o && o[c] || (p = l = 0) || s.pop()) && ((b ? o.nodeName.toLowerCase() !== d : 1 !== o.nodeType) || !++p || (f && (r = o[B] || (o[B] = {}), a = r[o.uniqueID] || (r[o.uniqueID] = {}), a[h] = [O, p]), o !== e)););
								return p -= m, p === y || p % y === 0 && p / y >= 0
							}
						}
					},
					PSEUDO: function(e, r) {
						var t, o = k.pseudos[e] || k.setFilters[e.toLowerCase()] || x.error("unsupported pseudo: " + e);
						return o[B] ? o(r) : o.length > 1 ? (t = [e, e, "", r], k.setFilters.hasOwnProperty(e.toLowerCase()) ? s(function(e, t) {
							for (var n, i = o(e, r), a = i.length; a--;) n = ee(e, i[a]), e[n] = !(t[n] = i[a])
						}) : function(e) {
							return o(e, 0, t)
						}) : o
					}
				},
				pseudos: {
					not: s(function(e) {
						var i = [],
							a = [],
							l = D(e.replace(le, "$1"));
						return l[B] ? s(function(e, t, n, i) {
							for (var a, r = l(e, null, i, []), o = e.length; o--;)(a = r[o]) && (e[o] = !(t[o] = a))
						}) : function(e, t, n) {
							return i[0] = e, l(i, null, n, a), i[0] = null, !a.pop()
						}
					}),
					has: s(function(t) {
						return function(e) {
							return x(t, e).length > 0
						}
					}),
					contains: s(function(t) {
						return t = t.replace(xe, we), function(e) {
							return (e.textContent || e.innerText || C(e)).indexOf(t) > -1
						}
					}),
					lang: s(function(n) {
						return fe.test(n || "") || x.error("unsupported lang: " + n), n = n.replace(xe, we).toLowerCase(), function(e) {
							var t;
							do {
								if (t = F ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return t = t.toLowerCase(), t === n || 0 === t.indexOf(n + "-")
							} while ((e = e.parentNode) && 1 === e.nodeType);
							return !1
						}
					}),
					target: function(e) {
						var t = n.location && n.location.hash;
						return t && t.slice(1) === e.id
					},
					root: function(e) {
						return e === H
					},
					focus: function(e) {
						return e === M.activeElement && (!M.hasFocus || M.hasFocus()) && !! (e.type || e.href || ~e.tabIndex)
					},
					enabled: function(e) {
						return e.disabled === !1
					},
					disabled: function(e) {
						return e.disabled === !0
					},
					checked: function(e) {
						var t = e.nodeName.toLowerCase();
						return "input" === t && !! e.checked || "option" === t && !! e.selected
					},
					selected: function(e) {
						return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
					},
					empty: function(e) {
						for (e = e.firstChild; e; e = e.nextSibling) if (e.nodeType < 6) return !1;
						return !0
					},
					parent: function(e) {
						return !k.pseudos.empty(e)
					},
					header: function(e) {
						return ye.test(e.nodeName)
					},
					input: function(e) {
						return he.test(e.nodeName)
					},
					button: function(e) {
						var t = e.nodeName.toLowerCase();
						return "input" === t && "button" === e.type || "button" === t
					},
					text: function(e) {
						var t;
						return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
					},
					first: o(function() {
						return [0]
					}),
					last: o(function(e, t) {
						return [t - 1]
					}),
					eq: o(function(e, t, n) {
						return [n < 0 ? n + t : n]
					}),
					even: o(function(e, t) {
						for (var n = 0; n < t; n += 2) e.push(n);
						return e
					}),
					odd: o(function(e, t) {
						for (var n = 1; n < t; n += 2) e.push(n);
						return e
					}),
					lt: o(function(e, t, n) {
						for (var i = n < 0 ? n + t : n; --i >= 0;) e.push(i);
						return e
					}),
					gt: o(function(e, t, n) {
						for (var i = n < 0 ? n + t : n; ++i < t;) e.push(i);
						return e
					})
				}
			}, k.pseudos.nth = k.pseudos.eq;
			for (m in {
				radio: !0,
				checkbox: !0,
				file: !0,
				password: !0,
				image: !0
			}) k.pseudos[m] = i(m);
			for (m in {
				submit: !0,
				reset: !0
			}) k.pseudos[m] = r(m);
			return l.prototype = k.filters = k.pseudos, k.setFilters = new l, E = x.tokenize = function(e, t) {
				var n, i, a, r, o, l, s, c = $[e + " "];
				if (c) return t ? 0 : c.slice(0);
				for (o = e, l = [], s = k.preFilter; o;) {
					n && !(i = se.exec(o)) || (i && (o = o.slice(i[0].length) || o), l.push(a = [])), n = !1, (i = ce.exec(o)) && (n = i.shift(), a.push({
						value: n,
						type: i[0].replace(le, " ")
					}), o = o.slice(n.length));
					for (r in k.filter)!(i = pe[r].exec(o)) || s[r] && !(i = s[r](i)) || (n = i.shift(), a.push({
						value: n,
						type: r,
						matches: i
					}), o = o.slice(n.length));
					if (!n) break
				}
				return t ? o.length : o ? x.error(e) : $(e, l).slice(0)
			}, D = x.compile = function(e, t) {
				var n, i = [],
					a = [],
					r = X[e + " "];
				if (!r) {
					for (t || (t = E(e)), n = t.length; n--;) r = p(t[n]), r[B] ? i.push(r) : a.push(r);
					r = X(e, u(a, i)), r.selector = e
				}
				return r
			}, S = x.select = function(e, t, n, i) {
				var a, r, o, l, s, c = "function" == typeof e && e,
					u = !i && E(e = c.selector || e);
				if (n = n || [], 1 === u.length) {
					if (r = u[0] = u[0].slice(0), r.length > 2 && "ID" === (o = r[0]).type && v.getById && 9 === t.nodeType && F && k.relative[r[1].type]) {
						if (t = (k.find.ID(o.matches[0].replace(xe, we), t) || [])[0], !t) return n;
						c && (t = t.parentNode), e = e.slice(r.shift().value.length)
					}
					for (a = pe.needsContext.test(e) ? 0 : r.length; a-- && (o = r[a], !k.relative[l = o.type]);) if ((s = k.find[l]) && (i = s(o.matches[0].replace(xe, we), ge.test(r[0].type) && h(t.parentNode) || t))) {
						if (r.splice(a, 1), e = i.length && y(r), !e) return Q.apply(n, i), n;
						break
					}
				}
				return (c || D(e, u))(i, t, !F, n, !t || ge.test(e) && h(t.parentNode) || t), n
			}, v.sortStable = B.split("").sort(Y).join("") === B, v.detectDuplicates = !! j, N(), v.sortDetached = a(function(e) {
				return 1 & e.compareDocumentPosition(M.createElement("div"))
			}), a(function(e) {
				return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
			}) || t("type|href|height|width", function(e, t, n) {
				if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
			}), v.attributes && a(function(e) {
				return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
			}) || t("value", function(e, t, n) {
				if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue
			}), a(function(e) {
				return null == e.getAttribute("disabled")
			}) || t(te, function(e, t, n) {
				var i;
				if (!n) return e[t] === !0 ? t.toLowerCase() : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
			}), x
		}(C);
	pe.find = ge, pe.expr = ge.selectors, pe.expr[":"] = pe.expr.pseudos, pe.uniqueSort = pe.unique = ge.uniqueSort, pe.text = ge.getText, pe.isXMLDoc = ge.isXML, pe.contains = ge.contains;
	var be = function(e, t, n) {
			for (var i = [], a = void 0 !== n;
			(e = e[t]) && 9 !== e.nodeType;) if (1 === e.nodeType) {
				if (a && pe(e).is(n)) break;
				i.push(e)
			}
			return i
		},
		xe = function(e, t) {
			for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
			return n
		},
		we = pe.expr.match.needsContext,
		ke = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
		Ce = /^.[^:#\[\.,]*$/;
	pe.filter = function(e, t, n) {
		var i = t[0];
		return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === i.nodeType ? pe.find.matchesSelector(i, e) ? [i] : [] : pe.find.matches(e, pe.grep(t, function(e) {
			return 1 === e.nodeType
		}))
	}, pe.fn.extend({
		find: function(e) {
			var t, n = [],
				i = this,
				a = i.length;
			if ("string" != typeof e) return this.pushStack(pe(e).filter(function() {
				for (t = 0; t < a; t++) if (pe.contains(i[t], this)) return !0
			}));
			for (t = 0; t < a; t++) pe.find(e, i[t], n);
			return n = this.pushStack(a > 1 ? pe.unique(n) : n), n.selector = this.selector ? this.selector + " " + e : e, n
		},
		filter: function(e) {
			return this.pushStack(t(this, e || [], !1))
		},
		not: function(e) {
			return this.pushStack(t(this, e || [], !0))
		},
		is: function(e) {
			return !!t(this, "string" == typeof e && we.test(e) ? pe(e) : e || [], !1).length
		}
	});
	var Te, Ee = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
		De = pe.fn.init = function(e, t, n) {
			var i, a;
			if (!e) return this;
			if (n = n || Te, "string" == typeof e) {
				if (i = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : Ee.exec(e), !i || !i[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
				if (i[1]) {
					if (t = t instanceof pe ? t[0] : t, pe.merge(this, pe.parseHTML(i[1], t && t.nodeType ? t.ownerDocument || t : ie, !0)), ke.test(i[1]) && pe.isPlainObject(t)) for (i in t) pe.isFunction(this[i]) ? this[i](t[i]) : this.attr(i, t[i]);
					return this
				}
				if (a = ie.getElementById(i[2]), a && a.parentNode) {
					if (a.id !== i[2]) return Te.find(e);
					this.length = 1, this[0] = a
				}
				return this.context = ie, this.selector = e, this
			}
			return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : pe.isFunction(e) ? "undefined" != typeof n.ready ? n.ready(e) : e(pe) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), pe.makeArray(e, this))
		};
	De.prototype = pe.fn, Te = pe(ie);
	var Se = /^(?:parents|prev(?:Until|All))/,
		Le = {
			children: !0,
			contents: !0,
			next: !0,
			prev: !0
		};
	pe.fn.extend({
		has: function(e) {
			var t, n = pe(e, this),
				i = n.length;
			return this.filter(function() {
				for (t = 0; t < i; t++) if (pe.contains(this, n[t])) return !0
			})
		},
		closest: function(e, t) {
			for (var n, i = 0, a = this.length, r = [], o = we.test(e) || "string" != typeof e ? pe(e, t || this.context) : 0; i < a; i++) for (n = this[i]; n && n !== t; n = n.parentNode) if (n.nodeType < 11 && (o ? o.index(n) > -1 : 1 === n.nodeType && pe.find.matchesSelector(n, e))) {
				r.push(n);
				break
			}
			return this.pushStack(r.length > 1 ? pe.uniqueSort(r) : r)
		},
		index: function(e) {
			return e ? "string" == typeof e ? pe.inArray(this[0], pe(e)) : pe.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
		},
		add: function(e, t) {
			return this.pushStack(pe.uniqueSort(pe.merge(this.get(), pe(e, t))))
		},
		addBack: function(e) {
			return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
		}
	}), pe.each({
		parent: function(e) {
			var t = e.parentNode;
			return t && 11 !== t.nodeType ? t : null
		},
		parents: function(e) {
			return be(e, "parentNode")
		},
		parentsUntil: function(e, t, n) {
			return be(e, "parentNode", n)
		},
		next: function(e) {
			return n(e, "nextSibling")
		},
		prev: function(e) {
			return n(e, "previousSibling")
		},
		nextAll: function(e) {
			return be(e, "nextSibling")
		},
		prevAll: function(e) {
			return be(e, "previousSibling")
		},
		nextUntil: function(e, t, n) {
			return be(e, "nextSibling", n)
		},
		prevUntil: function(e, t, n) {
			return be(e, "previousSibling", n)
		},
		siblings: function(e) {
			return xe((e.parentNode || {}).firstChild, e)
		},
		children: function(e) {
			return xe(e.firstChild)
		},
		contents: function(e) {
			return pe.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : pe.merge([], e.childNodes)
		}
	}, function(i, a) {
		pe.fn[i] = function(e, t) {
			var n = pe.map(this, a, e);
			return "Until" !== i.slice(-5) && (t = e), t && "string" == typeof t && (n = pe.filter(t, n)), this.length > 1 && (Le[i] || (n = pe.uniqueSort(n)), Se.test(i) && (n = n.reverse())), this.pushStack(n)
		}
	});
	var Ae = /\S+/g;
	pe.Callbacks = function(i) {
		i = "string" == typeof i ? u(i) : pe.extend({}, i);
		var n, e, t, a, r = [],
			o = [],
			l = -1,
			s = function() {
				for (a = i.once, t = n = !0; o.length; l = -1) for (e = o.shift(); ++l < r.length;) r[l].apply(e[0], e[1]) === !1 && i.stopOnFalse && (l = r.length, e = !1);
				i.memory || (e = !1), n = !1, a && (r = e ? [] : "")
			},
			c = {
				add: function() {
					return r && (e && !n && (l = r.length - 1, o.push(e)), function n(e) {
						pe.each(e, function(e, t) {
							pe.isFunction(t) ? i.unique && c.has(t) || r.push(t) : t && t.length && "string" !== pe.type(t) && n(t)
						})
					}(arguments), e && !n && s()), this
				},
				remove: function() {
					return pe.each(arguments, function(e, t) {
						for (var n;
						(n = pe.inArray(t, r, n)) > -1;) r.splice(n, 1), n <= l && l--
					}), this
				},
				has: function(e) {
					return e ? pe.inArray(e, r) > -1 : r.length > 0
				},
				empty: function() {
					return r && (r = []), this
				},
				disable: function() {
					return a = o = [], r = e = "", this
				},
				disabled: function() {
					return !r
				},
				lock: function() {
					return a = !0, e || c.disable(), this
				},
				locked: function() {
					return !!a
				},
				fireWith: function(e, t) {
					return a || (t = t || [], t = [e, t.slice ? t.slice() : t], o.push(t), n || s()), this
				},
				fire: function() {
					return c.fireWith(this, arguments), this
				},
				fired: function() {
					return !!t
				}
			};
		return c
	}, pe.extend({
		Deferred: function(e) {
			var r = [
				["resolve", "done", pe.Callbacks("once memory"), "resolved"],
				["reject", "fail", pe.Callbacks("once memory"), "rejected"],
				["notify", "progress", pe.Callbacks("memory")]
			],
				a = "pending",
				o = {
					state: function() {
						return a
					},
					always: function() {
						return l.done(arguments).fail(arguments), this
					},
					then: function() {
						var a = arguments;
						return pe.Deferred(function(i) {
							pe.each(r, function(e, t) {
								var n = pe.isFunction(a[e]) && a[e];
								l[t[1]](function() {
									var e = n && n.apply(this, arguments);
									e && pe.isFunction(e.promise) ? e.promise().progress(i.notify).done(i.resolve).fail(i.reject) : i[t[0] + "With"](this === o ? i.promise() : this, n ? [e] : arguments)
								})
							}), a = null
						}).promise()
					},
					promise: function(e) {
						return null != e ? pe.extend(e, o) : o
					}
				},
				l = {};
			return o.pipe = o.then, pe.each(r, function(e, t) {
				var n = t[2],
					i = t[3];
				o[t[1]] = n.add, i && n.add(function() {
					a = i
				}, r[1 ^ e][2].disable, r[2][2].lock), l[t[0]] = function() {
					return l[t[0] + "With"](this === l ? o : this, arguments), this
				}, l[t[0] + "With"] = n.fireWith
			}), o.promise(l), e && e.call(l, l), l
		},
		when: function(e) {
			var a, t, n, i = 0,
				r = ae.call(arguments),
				o = r.length,
				l = 1 !== o || e && pe.isFunction(e.promise) ? o : 0,
				s = 1 === l ? e : pe.Deferred(),
				c = function(t, n, i) {
					return function(e) {
						n[t] = this, i[t] = arguments.length > 1 ? ae.call(arguments) : e, i === a ? s.notifyWith(n, i) : --l || s.resolveWith(n, i)
					}
				};
			if (o > 1) for (a = new Array(o), t = new Array(o), n = new Array(o); i < o; i++) r[i] && pe.isFunction(r[i].promise) ? r[i].promise().progress(c(i, t, a)).done(c(i, n, r)).fail(s.reject) : --l;
			return l || s.resolveWith(n, r), s.promise()
		}
	});
	var je;
	pe.fn.ready = function(e) {
		return pe.ready.promise().done(e), this
	}, pe.extend({
		isReady: !1,
		readyWait: 1,
		holdReady: function(e) {
			e ? pe.readyWait++ : pe.ready(!0)
		},
		ready: function(e) {
			(e === !0 ? --pe.readyWait : pe.isReady) || (pe.isReady = !0, e !== !0 && --pe.readyWait > 0 || (je.resolveWith(ie, [pe]), pe.fn.triggerHandler && (pe(ie).triggerHandler("ready"), pe(ie).off("ready"))))
		}
	}), pe.ready.promise = function(e) {
		if (!je) if (je = pe.Deferred(), "complete" === ie.readyState || "loading" !== ie.readyState && !ie.documentElement.doScroll) C.setTimeout(pe.ready);
		else if (ie.addEventListener) ie.addEventListener("DOMContentLoaded", a), C.addEventListener("load", a);
		else {
			ie.attachEvent("onreadystatechange", a), C.attachEvent("onload", a);
			var n = !1;
			try {
				n = null == C.frameElement && ie.documentElement
			} catch (e) {}
			n && n.doScroll && !
			function t() {
				if (!pe.isReady) {
					try {
						n.doScroll("left")
					} catch (e) {
						return C.setTimeout(t, 50)
					}
					i(), pe.ready()
				}
			}()
		}
		return je.promise(e)
	}, pe.ready.promise();
	var Ne;
	for (Ne in pe(de)) break;
	de.ownFirst = "0" === Ne, de.inlineBlockNeedsLayout = !1, pe(function() {
		var e, t, n, i;
		n = ie.getElementsByTagName("body")[0], n && n.style && (t = ie.createElement("div"), i = ie.createElement("div"), i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(i).appendChild(t), "undefined" != typeof t.style.zoom && (t.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", de.inlineBlockNeedsLayout = e = 3 === t.offsetWidth, e && (n.style.zoom = 1)), n.removeChild(i))
	}), function() {
		var e = ie.createElement("div");
		de.deleteExpando = !0;
		try {
			delete e.test
		} catch (e) {
			de.deleteExpando = !1
		}
		e = null
	}();
	var Me = function(e) {
			var t = pe.noData[(e.nodeName + " ").toLowerCase()],
				n = +e.nodeType || 1;
			return (1 === n || 9 === n) && (!t || t !== !0 && e.getAttribute("classid") === t)
		},
		He = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		Fe = /([A-Z])/g;
	pe.extend({
		cache: {},
		noData: {
			"applet ": !0,
			"embed ": !0,
			"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
		},
		hasData: function(e) {
			return e = e.nodeType ? pe.cache[e[pe.expando]] : e[pe.expando], !! e && !c(e)
		},
		data: function(e, t, n) {
			return r(e, t, n)
		},
		removeData: function(e, t) {
			return o(e, t)
		},
		_data: function(e, t, n) {
			return r(e, t, n, !0)
		},
		_removeData: function(e, t) {
			return o(e, t, !0)
		}
	}), pe.fn.extend({
		data: function(e, t) {
			var n, i, a, r = this[0],
				o = r && r.attributes;
			if (void 0 === e) {
				if (this.length && (a = pe.data(r), 1 === r.nodeType && !pe._data(r, "parsedAttrs"))) {
					for (n = o.length; n--;) o[n] && (i = o[n].name, 0 === i.indexOf("data-") && (i = pe.camelCase(i.slice(5)), s(r, i, a[i])));
					pe._data(r, "parsedAttrs", !0)
				}
				return a
			}
			return "object" == typeof e ? this.each(function() {
				pe.data(this, e)
			}) : arguments.length > 1 ? this.each(function() {
				pe.data(this, e, t)
			}) : r ? s(r, e, pe.data(r, e)) : void 0
		},
		removeData: function(e) {
			return this.each(function() {
				pe.removeData(this, e)
			})
		}
	}), pe.extend({
		queue: function(e, t, n) {
			var i;
			if (e) return t = (t || "fx") + "queue", i = pe._data(e, t), n && (!i || pe.isArray(n) ? i = pe._data(e, t, pe.makeArray(n)) : i.push(n)), i || []
		},
		dequeue: function(e, t) {
			t = t || "fx";
			var n = pe.queue(e, t),
				i = n.length,
				a = n.shift(),
				r = pe._queueHooks(e, t),
				o = function() {
					pe.dequeue(e, t)
				};
			"inprogress" === a && (a = n.shift(), i--), a && ("fx" === t && n.unshift("inprogress"), delete r.stop, a.call(e, o, r)), !i && r && r.empty.fire()
		},
		_queueHooks: function(e, t) {
			var n = t + "queueHooks";
			return pe._data(e, n) || pe._data(e, n, {
				empty: pe.Callbacks("once memory").add(function() {
					pe._removeData(e, t + "queue"), pe._removeData(e, n)
				})
			})
		}
	}), pe.fn.extend({
		queue: function(t, n) {
			var e = 2;
			return "string" != typeof t && (n = t, t = "fx", e--), arguments.length < e ? pe.queue(this[0], t) : void 0 === n ? this : this.each(function() {
				var e = pe.queue(this, t, n);
				pe._queueHooks(this, t), "fx" === t && "inprogress" !== e[0] && pe.dequeue(this, t)
			})
		},
		dequeue: function(e) {
			return this.each(function() {
				pe.dequeue(this, e)
			})
		},
		clearQueue: function(e) {
			return this.queue(e || "fx", [])
		},
		promise: function(e, t) {
			var n, i = 1,
				a = pe.Deferred(),
				r = this,
				o = this.length,
				l = function() {
					--i || a.resolveWith(r, [r])
				};
			for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; o--;) n = pe._data(r[o], e + "queueHooks"), n && n.empty && (i++, n.empty.add(l));
			return l(), a.promise(t)
		}
	}), function() {
		var i;
		de.shrinkWrapBlocks = function() {
			if (null != i) return i;
			i = !1;
			var e, t, n;
			return t = ie.getElementsByTagName("body")[0], t && t.style ? (e = ie.createElement("div"), n = ie.createElement("div"), n.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", t.appendChild(n).appendChild(e), "undefined" != typeof e.style.zoom && (e.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", e.appendChild(ie.createElement("div")).style.width = "5px", i = 3 !== e.offsetWidth), t.removeChild(n), i) : void 0
		}
	}();
	var Ie = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
		qe = new RegExp("^(?:([+-])=|)(" + Ie + ")([a-z%]*)$", "i"),
		Pe = ["Top", "Right", "Bottom", "Left"],
		_e = function(e, t) {
			return e = t || e, "none" === pe.css(e, "display") || !pe.contains(e.ownerDocument, e)
		},
		Be = function(e, t, n, i, a, r, o) {
			var l = 0,
				s = e.length,
				c = null == n;
			if ("object" === pe.type(n)) {
				a = !0;
				for (l in n) Be(e, t, l, n[l], !0, r, o)
			} else if (void 0 !== i && (a = !0, pe.isFunction(i) || (o = !0), c && (o ? (t.call(e, i), t = null) : (c = t, t = function(e, t, n) {
				return c.call(pe(e), n)
			})), t)) for (; l < s; l++) t(e[l], n, o ? i : i.call(e[l], l, t(e[l], n)));
			return a ? e : c ? t.call(e) : s ? t(e[0], n) : r
		},
		ze = /^(?:checkbox|radio)$/i,
		Oe = /<([\w:-]+)/,
		Re = /^$|\/(?:java|ecma)script/i,
		We = /^\s+/,
		$e = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video";
	!
	function() {
		var e = ie.createElement("div"),
			t = ie.createDocumentFragment(),
			n = ie.createElement("input");
		e.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", de.leadingWhitespace = 3 === e.firstChild.nodeType, de.tbody = !e.getElementsByTagName("tbody").length, de.htmlSerialize = !! e.getElementsByTagName("link").length, de.html5Clone = "<:nav></:nav>" !== ie.createElement("nav").cloneNode(!0).outerHTML, n.type = "checkbox", n.checked = !0, t.appendChild(n), de.appendChecked = n.checked, e.innerHTML = "<textarea>x</textarea>", de.noCloneChecked = !! e.cloneNode(!0).lastChild.defaultValue, t.appendChild(e), n = ie.createElement("input"), n.setAttribute("type", "radio"), n.setAttribute("checked", "checked"), n.setAttribute("name", "t"), e.appendChild(n), de.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked, de.noCloneEvent = !! e.addEventListener, e[pe.expando] = 1, de.attributes = !e.getAttribute(pe.expando)
	}();
	var Xe = {
		option: [1, "<select multiple='multiple'>", "</select>"],
		legend: [1, "<fieldset>", "</fieldset>"],
		area: [1, "<map>", "</map>"],
		param: [1, "<object>", "</object>"],
		thead: [1, "<table>", "</table>"],
		tr: [2, "<table><tbody>", "</tbody></table>"],
		col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
		td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
		_default: de.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
	};
	Xe.optgroup = Xe.option, Xe.tbody = Xe.tfoot = Xe.colgroup = Xe.caption = Xe.thead, Xe.th = Xe.td;
	var Ye = /<|&#?\w+;/,
		Ve = /<tbody/i;
	!
	function() {
		var e, t, n = ie.createElement("div");
		for (e in {
			submit: !0,
			change: !0,
			focusin: !0
		}) t = "on" + e, (de[e] = t in C) || (n.setAttribute(t, "t"), de[e] = n.attributes[t].expando === !1);
		n = null
	}();
	var Ke = /^(?:input|select|textarea)$/i,
		Ge = /^key/,
		Je = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
		Ue = /^(?:focusinfocus|focusoutblur)$/,
		Qe = /^([^.]*)(?:\.(.+)|)/;
	pe.event = {
		global: {},
		add: function(e, t, n, i, a) {
			var r, o, l, s, c, u, d, f, p, h, y, m = pe._data(e);
			if (m) {
				for (n.handler && (s = n, n = s.handler, a = s.selector), n.guid || (n.guid = pe.guid++), (o = m.events) || (o = m.events = {}), (u = m.handle) || (u = m.handle = function(e) {
					return "undefined" == typeof pe || e && pe.event.triggered === e.type ? void 0 : pe.event.dispatch.apply(u.elem, arguments)
				}, u.elem = e), t = (t || "").match(Ae) || [""], l = t.length; l--;) r = Qe.exec(t[l]) || [], p = y = r[1], h = (r[2] || "").split(".").sort(), p && (c = pe.event.special[p] || {}, p = (a ? c.delegateType : c.bindType) || p, c = pe.event.special[p] || {}, d = pe.extend({
					type: p,
					origType: y,
					data: i,
					handler: n,
					guid: n.guid,
					selector: a,
					needsContext: a && pe.expr.match.needsContext.test(a),
					namespace: h.join(".")
				}, s), (f = o[p]) || (f = o[p] = [], f.delegateCount = 0, c.setup && c.setup.call(e, i, h, u) !== !1 || (e.addEventListener ? e.addEventListener(p, u, !1) : e.attachEvent && e.attachEvent("on" + p, u))), c.add && (c.add.call(e, d), d.handler.guid || (d.handler.guid = n.guid)), a ? f.splice(f.delegateCount++, 0, d) : f.push(d), pe.event.global[p] = !0);
				e = null
			}
		},
		remove: function(e, t, n, i, a) {
			var r, o, l, s, c, u, d, f, p, h, y, m = pe.hasData(e) && pe._data(e);
			if (m && (u = m.events)) {
				for (t = (t || "").match(Ae) || [""], c = t.length; c--;) if (l = Qe.exec(t[c]) || [], p = y = l[1], h = (l[2] || "").split(".").sort(), p) {
					for (d = pe.event.special[p] || {}, p = (i ? d.delegateType : d.bindType) || p, f = u[p] || [], l = l[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), s = r = f.length; r--;) o = f[r], !a && y !== o.origType || n && n.guid !== o.guid || l && !l.test(o.namespace) || i && i !== o.selector && ("**" !== i || !o.selector) || (f.splice(r, 1), o.selector && f.delegateCount--, d.remove && d.remove.call(e, o));
					s && !f.length && (d.teardown && d.teardown.call(e, h, m.handle) !== !1 || pe.removeEvent(e, p, m.handle), delete u[p])
				} else for (p in u) pe.event.remove(e, p + t[c], n, i, !0);
				pe.isEmptyObject(u) && (delete m.handle, pe._removeData(e, "events"))
			}
		},
		trigger: function(e, t, n, i) {
			var a, r, o, l, s, c, u, d = [n || ie],
				f = ue.call(e, "type") ? e.type : e,
				p = ue.call(e, "namespace") ? e.namespace.split(".") : [];
			if (o = c = n = n || ie, 3 !== n.nodeType && 8 !== n.nodeType && !Ue.test(f + pe.event.triggered) && (f.indexOf(".") > -1 && (p = f.split("."), f = p.shift(), p.sort()), r = f.indexOf(":") < 0 && "on" + f, e = e[pe.expando] ? e : new pe.Event(f, "object" == typeof e && e), e.isTrigger = i ? 2 : 3, e.namespace = p.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = n), t = null == t ? [e] : pe.makeArray(t, [e]), s = pe.event.special[f] || {}, i || !s.trigger || s.trigger.apply(n, t) !== !1)) {
				if (!i && !s.noBubble && !pe.isWindow(n)) {
					for (l = s.delegateType || f, Ue.test(l + f) || (o = o.parentNode); o; o = o.parentNode) d.push(o), c = o;
					c === (n.ownerDocument || ie) && d.push(c.defaultView || c.parentWindow || C)
				}
				for (u = 0;
				(o = d[u++]) && !e.isPropagationStopped();) e.type = u > 1 ? l : s.bindType || f, a = (pe._data(o, "events") || {})[e.type] && pe._data(o, "handle"), a && a.apply(o, t), a = r && o[r], a && a.apply && Me(o) && (e.result = a.apply(o, t), e.result === !1 && e.preventDefault());
				if (e.type = f, !i && !e.isDefaultPrevented() && (!s._default || s._default.apply(d.pop(), t) === !1) && Me(n) && r && n[f] && !pe.isWindow(n)) {
					c = n[r], c && (n[r] = null), pe.event.triggered = f;
					try {
						n[f]()
					} catch (e) {}
					pe.event.triggered = void 0, c && (n[r] = c)
				}
				return e.result
			}
		},
		dispatch: function(e) {
			e = pe.event.fix(e);
			var t, n, i, a, r, o = [],
				l = ae.call(arguments),
				s = (pe._data(this, "events") || {})[e.type] || [],
				c = pe.event.special[e.type] || {};
			if (l[0] = e, e.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this, e) !== !1) {
				for (o = pe.event.handlers.call(this, e, s), t = 0;
				(a = o[t++]) && !e.isPropagationStopped();) for (e.currentTarget = a.elem, n = 0;
				(r = a.handlers[n++]) && !e.isImmediatePropagationStopped();) e.rnamespace && !e.rnamespace.test(r.namespace) || (e.handleObj = r, e.data = r.data, i = ((pe.event.special[r.origType] || {}).handle || r.handler).apply(a.elem, l), void 0 !== i && (e.result = i) === !1 && (e.preventDefault(), e.stopPropagation()));
				return c.postDispatch && c.postDispatch.call(this, e), e.result
			}
		},
		handlers: function(e, t) {
			var n, i, a, r, o = [],
				l = t.delegateCount,
				s = e.target;
			if (l && s.nodeType && ("click" !== e.type || isNaN(e.button) || e.button < 1)) for (; s != this; s = s.parentNode || this) if (1 === s.nodeType && (s.disabled !== !0 || "click" !== e.type)) {
				for (i = [], n = 0; n < l; n++) r = t[n], a = r.selector + " ", void 0 === i[a] && (i[a] = r.needsContext ? pe(a, this).index(s) > -1 : pe.find(a, this, null, [s]).length), i[a] && i.push(r);
				i.length && o.push({
					elem: s,
					handlers: i
				})
			}
			return l < t.length && o.push({
				elem: this,
				handlers: t.slice(l)
			}), o
		},
		fix: function(e) {
			if (e[pe.expando]) return e;
			var t, n, i, a = e.type,
				r = e,
				o = this.fixHooks[a];
			for (o || (this.fixHooks[a] = o = Je.test(a) ? this.mouseHooks : Ge.test(a) ? this.keyHooks : {}), i = o.props ? this.props.concat(o.props) : this.props, e = new pe.Event(r), t = i.length; t--;) n = i[t], e[n] = r[n];
			return e.target || (e.target = r.srcElement || ie), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !! e.metaKey, o.filter ? o.filter(e, r) : e
		},
		props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
		fixHooks: {},
		keyHooks: {
			props: "char charCode key keyCode".split(" "),
			filter: function(e, t) {
				return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
			}
		},
		mouseHooks: {
			props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
			filter: function(e, t) {
				var n, i, a, r = t.button,
					o = t.fromElement;
				return null == e.pageX && null != t.clientX && (i = e.target.ownerDocument || ie, a = i.documentElement, n = i.body, e.pageX = t.clientX + (a && a.scrollLeft || n && n.scrollLeft || 0) - (a && a.clientLeft || n && n.clientLeft || 0), e.pageY = t.clientY + (a && a.scrollTop || n && n.scrollTop || 0) - (a && a.clientTop || n && n.clientTop || 0)), !e.relatedTarget && o && (e.relatedTarget = o === e.target ? t.toElement : o), e.which || void 0 === r || (e.which = 1 & r ? 1 : 2 & r ? 3 : 4 & r ? 2 : 0), e
			}
		},
		special: {
			load: {
				noBubble: !0
			},
			focus: {
				trigger: function() {
					if (this !== h() && this.focus) try {
						return this.focus(), !1
					} catch (e) {}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function() {
					if (this === h() && this.blur) return this.blur(), !1
				},
				delegateType: "focusout"
			},
			click: {
				trigger: function() {
					if (pe.nodeName(this, "input") && "checkbox" === this.type && this.click) return this.click(), !1
				},
				_default: function(e) {
					return pe.nodeName(e.target, "a")
				}
			},
			beforeunload: {
				postDispatch: function(e) {
					void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
				}
			}
		},
		simulate: function(e, t, n) {
			var i = pe.extend(new pe.Event, n, {
				type: e,
				isSimulated: !0
			});
			pe.event.trigger(i, null, t), i.isDefaultPrevented() && n.preventDefault()
		}
	}, pe.removeEvent = ie.removeEventListener ?
	function(e, t, n) {
		e.removeEventListener && e.removeEventListener(t, n)
	} : function(e, t, n) {
		var i = "on" + t;
		e.detachEvent && ("undefined" == typeof e[i] && (e[i] = null), e.detachEvent(i, n))
	}, pe.Event = function(e, t) {
		return this instanceof pe.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? f : p) : this.type = e, t && pe.extend(this, t), this.timeStamp = e && e.timeStamp || pe.now(), void(this[pe.expando] = !0)) : new pe.Event(e, t)
	}, pe.Event.prototype = {
		constructor: pe.Event,
		isDefaultPrevented: p,
		isPropagationStopped: p,
		isImmediatePropagationStopped: p,
		preventDefault: function() {
			var e = this.originalEvent;
			this.isDefaultPrevented = f, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
		},
		stopPropagation: function() {
			var e = this.originalEvent;
			this.isPropagationStopped = f, e && !this.isSimulated && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
		},
		stopImmediatePropagation: function() {
			var e = this.originalEvent;
			this.isImmediatePropagationStopped = f, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), this.stopPropagation()
		}
	}, pe.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function(e, r) {
		pe.event.special[e] = {
			delegateType: r,
			bindType: r,
			handle: function(e) {
				var t, n = this,
					i = e.relatedTarget,
					a = e.handleObj;
				return i && (i === n || pe.contains(n, i)) || (e.type = a.origType, t = a.handler.apply(this, arguments), e.type = r), t
			}
		}
	}), de.submit || (pe.event.special.submit = {
		setup: function() {
			return !pe.nodeName(this, "form") && void pe.event.add(this, "click._submit keypress._submit", function(e) {
				var t = e.target,
					n = pe.nodeName(t, "input") || pe.nodeName(t, "button") ? pe.prop(t, "form") : void 0;
				n && !pe._data(n, "submit") && (pe.event.add(n, "submit._submit", function(e) {
					e._submitBubble = !0
				}), pe._data(n, "submit", !0))
			})
		},
		postDispatch: function(e) {
			e._submitBubble && (delete e._submitBubble, this.parentNode && !e.isTrigger && pe.event.simulate("submit", this.parentNode, e))
		},
		teardown: function() {
			return !pe.nodeName(this, "form") && void pe.event.remove(this, "._submit")
		}
	}), de.change || (pe.event.special.change = {
		setup: function() {
			return Ke.test(this.nodeName) ? ("checkbox" !== this.type && "radio" !== this.type || (pe.event.add(this, "propertychange._change", function(e) {
				"checked" === e.originalEvent.propertyName && (this._justChanged = !0)
			}), pe.event.add(this, "click._change", function(e) {
				this._justChanged && !e.isTrigger && (this._justChanged = !1), pe.event.simulate("change", this, e)
			})), !1) : void pe.event.add(this, "beforeactivate._change", function(e) {
				var t = e.target;
				Ke.test(t.nodeName) && !pe._data(t, "change") && (pe.event.add(t, "change._change", function(e) {
					!this.parentNode || e.isSimulated || e.isTrigger || pe.event.simulate("change", this.parentNode, e)
				}), pe._data(t, "change", !0))
			})
		},
		handle: function(e) {
			var t = e.target;
			if (this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type) return e.handleObj.handler.apply(this, arguments)
		},
		teardown: function() {
			return pe.event.remove(this, "._change"), !Ke.test(this.nodeName)
		}
	}), de.focusin || pe.each({
		focus: "focusin",
		blur: "focusout"
	}, function(n, i) {
		var a = function(e) {
				pe.event.simulate(i, e.target, pe.event.fix(e))
			};
		pe.event.special[i] = {
			setup: function() {
				var e = this.ownerDocument || this,
					t = pe._data(e, i);
				t || e.addEventListener(n, a, !0), pe._data(e, i, (t || 0) + 1)
			},
			teardown: function() {
				var e = this.ownerDocument || this,
					t = pe._data(e, i) - 1;
				t ? pe._data(e, i, t) : (e.removeEventListener(n, a, !0), pe._removeData(e, i))
			}
		}
	}), pe.fn.extend({
		on: function(e, t, n, i) {
			return x(this, e, t, n, i)
		},
		one: function(e, t, n, i) {
			return x(this, e, t, n, i, 1)
		},
		off: function(e, t, n) {
			var i, a;
			if (e && e.preventDefault && e.handleObj) return i = e.handleObj, pe(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
			if ("object" == typeof e) {
				for (a in e) this.off(a, t, e[a]);
				return this
			}
			return t !== !1 && "function" != typeof t || (n = t, t = void 0), n === !1 && (n = p), this.each(function() {
				pe.event.remove(this, e, n, t)
			})
		},
		trigger: function(e, t) {
			return this.each(function() {
				pe.event.trigger(e, t, this)
			})
		},
		triggerHandler: function(e, t) {
			var n = this[0];
			if (n) return pe.event.trigger(e, t, n, !0)
		}
	});
	var Ze = / jQuery\d+="(?:null|\d+)"/g,
		et = new RegExp("<(?:" + $e + ")[\\s/>]", "i"),
		tt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
		nt = /<script|<style|<link/i,
		it = /checked\s*(?:[^=]|=\s*.checked.)/i,
		at = /^true\/(.*)/,
		rt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
		ot = m(ie),
		lt = ot.appendChild(ie.createElement("div"));
	pe.extend({
		htmlPrefilter: function(e) {
			return e.replace(tt, "<$1></$2>")
		},
		clone: function(e, t, n) {
			var i, a, r, o, l, s = pe.contains(e.ownerDocument, e);
			if (de.html5Clone || pe.isXMLDoc(e) || !et.test("<" + e.nodeName + ">") ? r = e.cloneNode(!0) : (lt.innerHTML = e.outerHTML, lt.removeChild(r = lt.firstChild)), !(de.noCloneEvent && de.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || pe.isXMLDoc(e))) for (i = v(r), l = v(e), o = 0; null != (a = l[o]); ++o) i[o] && D(a, i[o]);
			if (t) if (n) for (l = l || v(e), i = i || v(r), o = 0; null != (a = l[o]); o++) E(a, i[o]);
			else E(e, r);
			return i = v(r, "script"), i.length > 0 && g(i, !s && v(e, "script")), i = l = a = null, r
		},
		cleanData: function(e, t) {
			for (var n, i, a, r, o = 0, l = pe.expando, s = pe.cache, c = de.attributes, u = pe.event.special; null != (n = e[o]); o++) if ((t || Me(n)) && (a = n[l], r = a && s[a])) {
				if (r.events) for (i in r.events) u[i] ? pe.event.remove(n, i) : pe.removeEvent(n, i, r.handle);
				s[a] && (delete s[a], c || "undefined" == typeof n.removeAttribute ? n[l] = void 0 : n.removeAttribute(l), ne.push(a))
			}
		}
	}), pe.fn.extend({
		domManip: S,
		detach: function(e) {
			return L(this, e, !0)
		},
		remove: function(e) {
			return L(this, e)
		},
		text: function(e) {
			return Be(this, function(e) {
				return void 0 === e ? pe.text(this) : this.empty().append((this[0] && this[0].ownerDocument || ie).createTextNode(e))
			}, null, e, arguments.length)
		},
		append: function() {
			return S(this, arguments, function(e) {
				if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
					var t = w(this, e);
					t.appendChild(e)
				}
			})
		},
		prepend: function() {
			return S(this, arguments, function(e) {
				if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
					var t = w(this, e);
					t.insertBefore(e, t.firstChild)
				}
			})
		},
		before: function() {
			return S(this, arguments, function(e) {
				this.parentNode && this.parentNode.insertBefore(e, this)
			})
		},
		after: function() {
			return S(this, arguments, function(e) {
				this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
			})
		},
		empty: function() {
			for (var e, t = 0; null != (e = this[t]); t++) {
				for (1 === e.nodeType && pe.cleanData(v(e, !1)); e.firstChild;) e.removeChild(e.firstChild);
				e.options && pe.nodeName(e, "select") && (e.options.length = 0)
			}
			return this
		},
		clone: function(e, t) {
			return e = null != e && e, t = null == t ? e : t, this.map(function() {
				return pe.clone(this, e, t)
			})
		},
		html: function(e) {
			return Be(this, function(e) {
				var t = this[0] || {},
					n = 0,
					i = this.length;
				if (void 0 === e) return 1 === t.nodeType ? t.innerHTML.replace(Ze, "") : void 0;
				if ("string" == typeof e && !nt.test(e) && (de.htmlSerialize || !et.test(e)) && (de.leadingWhitespace || !We.test(e)) && !Xe[(Oe.exec(e) || ["", ""])[1].toLowerCase()]) {
					e = pe.htmlPrefilter(e);
					try {
						for (; n < i; n++) t = this[n] || {}, 1 === t.nodeType && (pe.cleanData(v(t, !1)), t.innerHTML = e);
						t = 0
					} catch (e) {}
				}
				t && this.empty().append(e)
			}, null, e, arguments.length)
		},
		replaceWith: function() {
			var n = [];
			return S(this, arguments, function(e) {
				var t = this.parentNode;
				pe.inArray(this, n) < 0 && (pe.cleanData(v(this)), t && t.replaceChild(e, this))
			}, n)
		}
	}), pe.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function(e, o) {
		pe.fn[e] = function(e) {
			for (var t, n = 0, i = [], a = pe(e), r = a.length - 1; n <= r; n++) t = n === r ? this : this.clone(!0), pe(a[n])[o](t), oe.apply(i, t.get());
			return this.pushStack(i)
		}
	});
	var st, ct = {
		HTML: "block",
		BODY: "block"
	},
		ut = /^margin/,
		dt = new RegExp("^(" + Ie + ")(?!px)[a-z%]+$", "i"),
		ft = function(e, t, n, i) {
			var a, r, o = {};
			for (r in t) o[r] = e.style[r], e.style[r] = t[r];
			a = n.apply(e, i || []);
			for (r in t) e.style[r] = o[r];
			return a
		},
		pt = ie.documentElement;
	!
	function() {
		function e() {
			var e, t, n = ie.documentElement;
			n.appendChild(c), u.style.cssText = "-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", i = r = s = !1, a = l = !0, C.getComputedStyle && (t = C.getComputedStyle(u), i = "1%" !== (t || {}).top, s = "2px" === (t || {}).marginLeft, r = "4px" === (t || {
				width: "4px"
			}).width, u.style.marginRight = "50%", a = "4px" === (t || {
				marginRight: "4px"
			}).marginRight, e = u.appendChild(ie.createElement("div")), e.style.cssText = u.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", e.style.marginRight = e.style.width = "0", u.style.width = "1px", l = !parseFloat((C.getComputedStyle(e) || {}).marginRight), u.removeChild(e)), u.style.display = "none", o = 0 === u.getClientRects().length, o && (u.style.display = "", u.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", e = u.getElementsByTagName("td"), e[0].style.cssText = "margin:0;border:0;padding:0;display:none", o = 0 === e[0].offsetHeight, o && (e[0].style.display = "", e[1].style.display = "none", o = 0 === e[0].offsetHeight)), n.removeChild(c)
		}
		var i, a, r, o, l, s, c = ie.createElement("div"),
			u = ie.createElement("div");
		u.style && (u.style.cssText = "float:left;opacity:.5", de.opacity = "0.5" === u.style.opacity, de.cssFloat = !! u.style.cssFloat, u.style.backgroundClip = "content-box", u.cloneNode(!0).style.backgroundClip = "", de.clearCloneStyle = "content-box" === u.style.backgroundClip, c = ie.createElement("div"), c.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", u.innerHTML = "", c.appendChild(u), de.boxSizing = "" === u.style.boxSizing || "" === u.style.MozBoxSizing || "" === u.style.WebkitBoxSizing, pe.extend(de, {
			reliableHiddenOffsets: function() {
				return null == i && e(), o
			},
			boxSizingReliable: function() {
				return null == i && e(), r
			},
			pixelMarginRight: function() {
				return null == i && e(), a
			},
			pixelPosition: function() {
				return null == i && e(), i
			},
			reliableMarginRight: function() {
				return null == i && e(), l
			},
			reliableMarginLeft: function() {
				return null == i && e(), s
			}
		}))
	}();
	var ht, yt, mt = /^(top|right|bottom|left)$/;
	C.getComputedStyle ? (ht = function(e) {
		var t = e.ownerDocument.defaultView;
		return t && t.opener || (t = C), t.getComputedStyle(e)
	}, yt = function(e, t, n) {
		var i, a, r, o, l = e.style;
		return n = n || ht(e), o = n ? n.getPropertyValue(t) || n[t] : void 0, "" !== o && void 0 !== o || pe.contains(e.ownerDocument, e) || (o = pe.style(e, t)), n && !de.pixelMarginRight() && dt.test(o) && ut.test(t) && (i = l.width, a = l.minWidth, r = l.maxWidth, l.minWidth = l.maxWidth = l.width = o, o = n.width, l.width = i, l.minWidth = a, l.maxWidth = r), void 0 === o ? o : o + ""
	}) : pt.currentStyle && (ht = function(e) {
		return e.currentStyle
	}, yt = function(e, t, n) {
		var i, a, r, o, l = e.style;
		return n = n || ht(e), o = n ? n[t] : void 0, null == o && l && l[t] && (o = l[t]), dt.test(o) && !mt.test(t) && (i = l.left, a = e.runtimeStyle, r = a && a.left, r && (a.left = e.currentStyle.left), l.left = "fontSize" === t ? "1em" : o, o = l.pixelLeft + "px", l.left = i, r && (a.left = r)), void 0 === o ? o : o + "" || "auto"
	});
	var vt = /alpha\([^)]*\)/i,
		gt = /opacity\s*=\s*([^)]*)/i,
		bt = /^(none|table(?!-c[ea]).+)/,
		xt = new RegExp("^(" + Ie + ")(.*)$", "i"),
		wt = {
			position: "absolute",
			visibility: "hidden",
			display: "block"
		},
		kt = {
			letterSpacing: "0",
			fontWeight: "400"
		},
		Ct = ["Webkit", "O", "Moz", "ms"],
		Tt = ie.createElement("div").style;
	pe.extend({
		cssHooks: {
			opacity: {
				get: function(e, t) {
					if (t) {
						var n = yt(e, "opacity");
						return "" === n ? "1" : n
					}
				}
			}
		},
		cssNumber: {
			animationIterationCount: !0,
			columnCount: !0,
			fillOpacity: !0,
			flexGrow: !0,
			flexShrink: !0,
			fontWeight: !0,
			lineHeight: !0,
			opacity: !0,
			order: !0,
			orphans: !0,
			widows: !0,
			zIndex: !0,
			zoom: !0
		},
		cssProps: {
			float: de.cssFloat ? "cssFloat" : "styleFloat"
		},
		style: function(e, t, n, i) {
			if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
				var a, r, o, l = pe.camelCase(t),
					s = e.style;
				if (t = pe.cssProps[l] || (pe.cssProps[l] = M(l) || l), o = pe.cssHooks[t] || pe.cssHooks[l], void 0 === n) return o && "get" in o && void 0 !== (a = o.get(e, !1, i)) ? a : s[t];
				if (r = typeof n, "string" === r && (a = qe.exec(n)) && a[1] && (n = d(e, t, a), r = "number"), null != n && n === n && ("number" === r && (n += a && a[3] || (pe.cssNumber[l] ? "" : "px")), de.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (s[t] = "inherit"), !(o && "set" in o && void 0 === (n = o.set(e, n, i))))) try {
					s[t] = n
				} catch (e) {}
			}
		},
		css: function(e, t, n, i) {
			var a, r, o, l = pe.camelCase(t);
			return t = pe.cssProps[l] || (pe.cssProps[l] = M(l) || l), o = pe.cssHooks[t] || pe.cssHooks[l], o && "get" in o && (r = o.get(e, !0, n)), void 0 === r && (r = yt(e, t, i)), "normal" === r && t in kt && (r = kt[t]), "" === n || n ? (a = parseFloat(r), n === !0 || isFinite(a) ? a || 0 : r) : r
		}
	}), pe.each(["height", "width"], function(e, a) {
		pe.cssHooks[a] = {
			get: function(e, t, n) {
				if (t) return bt.test(pe.css(e, "display")) && 0 === e.offsetWidth ? ft(e, wt, function() {
					return q(e, a, n)
				}) : q(e, a, n)
			},
			set: function(e, t, n) {
				var i = n && ht(e);
				return F(e, t, n ? I(e, a, n, de.boxSizing && "border-box" === pe.css(e, "boxSizing", !1, i), i) : 0)
			}
		}
	}), de.opacity || (pe.cssHooks.opacity = {
		get: function(e, t) {
			return gt.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
		},
		set: function(e, t) {
			var n = e.style,
				i = e.currentStyle,
				a = pe.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
				r = i && i.filter || n.filter || "";
			n.zoom = 1, (t >= 1 || "" === t) && "" === pe.trim(r.replace(vt, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || i && !i.filter) || (n.filter = vt.test(r) ? r.replace(vt, a) : r + " " + a)
		}
	}), pe.cssHooks.marginRight = N(de.reliableMarginRight, function(e, t) {
		if (t) return ft(e, {
			display: "inline-block"
		}, yt, [e, "marginRight"])
	}), pe.cssHooks.marginLeft = N(de.reliableMarginLeft, function(e, t) {
		if (t) return (parseFloat(yt(e, "marginLeft")) || (pe.contains(e.ownerDocument, e) ? e.getBoundingClientRect().left - ft(e, {
			marginLeft: 0
		}, function() {
			return e.getBoundingClientRect().left
		}) : 0)) + "px"
	}), pe.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function(a, r) {
		pe.cssHooks[a + r] = {
			expand: function(e) {
				for (var t = 0, n = {}, i = "string" == typeof e ? e.split(" ") : [e]; t < 4; t++) n[a + Pe[t] + r] = i[t] || i[t - 2] || i[0];
				return n
			}
		}, ut.test(a) || (pe.cssHooks[a + r].set = F)
	}), pe.fn.extend({
		css: function(e, t) {
			return Be(this, function(e, t, n) {
				var i, a, r = {},
					o = 0;
				if (pe.isArray(t)) {
					for (i = ht(e), a = t.length; o < a; o++) r[t[o]] = pe.css(e, t[o], !1, i);
					return r
				}
				return void 0 !== n ? pe.style(e, t, n) : pe.css(e, t)
			}, e, t, arguments.length > 1)
		},
		show: function() {
			return H(this, !0)
		},
		hide: function() {
			return H(this)
		},
		toggle: function(e) {
			return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
				_e(this) ? pe(this).show() : pe(this).hide()
			})
		}
	}), pe.Tween = P, P.prototype = {
		constructor: P,
		init: function(e, t, n, i, a, r) {
			this.elem = e, this.prop = n, this.easing = a || pe.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = i, this.unit = r || (pe.cssNumber[n] ? "" : "px")
		},
		cur: function() {
			var e = P.propHooks[this.prop];
			return e && e.get ? e.get(this) : P.propHooks._default.get(this)
		},
		run: function(e) {
			var t, n = P.propHooks[this.prop];
			return this.options.duration ? this.pos = t = pe.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : P.propHooks._default.set(this), this
		}
	}, P.prototype.init.prototype = P.prototype, P.propHooks = {
		_default: {
			get: function(e) {
				var t;
				return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = pe.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0)
			},
			set: function(e) {
				pe.fx.step[e.prop] ? pe.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[pe.cssProps[e.prop]] && !pe.cssHooks[e.prop] ? e.elem[e.prop] = e.now : pe.style(e.elem, e.prop, e.now + e.unit)
			}
		}
	}, P.propHooks.scrollTop = P.propHooks.scrollLeft = {
		set: function(e) {
			e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
		}
	}, pe.easing = {
		linear: function(e) {
			return e
		},
		swing: function(e) {
			return .5 - Math.cos(e * Math.PI) / 2
		},
		_default: "swing"
	}, pe.fx = P.prototype.init, pe.fx.step = {};
	var Et, Dt, St = /^(?:toggle|show|hide)$/,
		Lt = /queueHooks$/;
	pe.Animation = pe.extend(W, {
		tweeners: {
			"*": [function(e, t) {
				var n = this.createTween(e, t);
				return d(n.elem, e, qe.exec(t), n), n
			}]
		},
		tweener: function(e, t) {
			pe.isFunction(e) ? (t = e, e = ["*"]) : e = e.match(Ae);
			for (var n, i = 0, a = e.length; i < a; i++) n = e[i], W.tweeners[n] = W.tweeners[n] || [], W.tweeners[n].unshift(t)
		},
		prefilters: [O],
		prefilter: function(e, t) {
			t ? W.prefilters.unshift(e) : W.prefilters.push(e)
		}
	}), pe.speed = function(e, t, n) {
		var i = e && "object" == typeof e ? pe.extend({}, e) : {
			complete: n || !n && t || pe.isFunction(e) && e,
			duration: e,
			easing: n && t || t && !pe.isFunction(t) && t
		};
		return i.duration = pe.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in pe.fx.speeds ? pe.fx.speeds[i.duration] : pe.fx.speeds._default, null != i.queue && i.queue !== !0 || (i.queue = "fx"), i.old = i.complete, i.complete = function() {
			pe.isFunction(i.old) && i.old.call(this), i.queue && pe.dequeue(this, i.queue)
		}, i
	}, pe.fn.extend({
		fadeTo: function(e, t, n, i) {
			return this.filter(_e).css("opacity", 0).show().end().animate({
				opacity: t
			}, e, n, i)
		},
		animate: function(t, e, n, i) {
			var a = pe.isEmptyObject(t),
				r = pe.speed(e, n, i),
				o = function() {
					var e = W(this, pe.extend({}, t), r);
					(a || pe._data(this, "finish")) && e.stop(!0)
				};
			return o.finish = o, a || r.queue === !1 ? this.each(o) : this.queue(r.queue, o)
		},
		stop: function(a, e, r) {
			var o = function(e) {
					var t = e.stop;
					delete e.stop, t(r)
				};
			return "string" != typeof a && (r = e, e = a, a = void 0), e && a !== !1 && this.queue(a || "fx", []), this.each(function() {
				var e = !0,
					t = null != a && a + "queueHooks",
					n = pe.timers,
					i = pe._data(this);
				if (t) i[t] && i[t].stop && o(i[t]);
				else for (t in i) i[t] && i[t].stop && Lt.test(t) && o(i[t]);
				for (t = n.length; t--;) n[t].elem !== this || null != a && n[t].queue !== a || (n[t].anim.stop(r), e = !1, n.splice(t, 1));
				!e && r || pe.dequeue(this, a)
			})
		},
		finish: function(o) {
			return o !== !1 && (o = o || "fx"), this.each(function() {
				var e, t = pe._data(this),
					n = t[o + "queue"],
					i = t[o + "queueHooks"],
					a = pe.timers,
					r = n ? n.length : 0;
				for (t.finish = !0, pe.queue(this, o, []), i && i.stop && i.stop.call(this, !0), e = a.length; e--;) a[e].elem === this && a[e].queue === o && (a[e].anim.stop(!0), a.splice(e, 1));
				for (e = 0; e < r; e++) n[e] && n[e].finish && n[e].finish.call(this);
				delete t.finish
			})
		}
	}), pe.each(["toggle", "show", "hide"], function(e, i) {
		var a = pe.fn[i];
		pe.fn[i] = function(e, t, n) {
			return null == e || "boolean" == typeof e ? a.apply(this, arguments) : this.animate(B(i, !0), e, t, n)
		}
	}), pe.each({
		slideDown: B("show"),
		slideUp: B("hide"),
		slideToggle: B("toggle"),
		fadeIn: {
			opacity: "show"
		},
		fadeOut: {
			opacity: "hide"
		},
		fadeToggle: {
			opacity: "toggle"
		}
	}, function(e, i) {
		pe.fn[e] = function(e, t, n) {
			return this.animate(i, e, t, n)
		}
	}), pe.timers = [], pe.fx.tick = function() {
		var e, t = pe.timers,
			n = 0;
		for (Et = pe.now(); n < t.length; n++) e = t[n], e() || t[n] !== e || t.splice(n--, 1);
		t.length || pe.fx.stop(), Et = void 0
	}, pe.fx.timer = function(e) {
		pe.timers.push(e), e() ? pe.fx.start() : pe.timers.pop()
	}, pe.fx.interval = 13, pe.fx.start = function() {
		Dt || (Dt = C.setInterval(pe.fx.tick, pe.fx.interval))
	}, pe.fx.stop = function() {
		C.clearInterval(Dt), Dt = null
	}, pe.fx.speeds = {
		slow: 600,
		fast: 200,
		_default: 400
	}, pe.fn.delay = function(i, e) {
		return i = pe.fx ? pe.fx.speeds[i] || i : i, e = e || "fx", this.queue(e, function(e, t) {
			var n = C.setTimeout(e, i);
			t.stop = function() {
				C.clearTimeout(n)
			}
		})
	}, function() {
		var e, t = ie.createElement("input"),
			n = ie.createElement("div"),
			i = ie.createElement("select"),
			a = i.appendChild(ie.createElement("option"));
		n = ie.createElement("div"), n.setAttribute("className", "t"), n.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", e = n.getElementsByTagName("a")[0], t.setAttribute("type", "checkbox"), n.appendChild(t), e = n.getElementsByTagName("a")[0], e.style.cssText = "top:1px", de.getSetAttribute = "t" !== n.className, de.style = /top/.test(e.getAttribute("style")), de.hrefNormalized = "/a" === e.getAttribute("href"), de.checkOn = !! t.value, de.optSelected = a.selected, de.enctype = !! ie.createElement("form").enctype, i.disabled = !0, de.optDisabled = !a.disabled, t = ie.createElement("input"), t.setAttribute("value", ""), de.input = "" === t.getAttribute("value"), t.value = "t", t.setAttribute("type", "radio"), de.radioValue = "t" === t.value
	}();
	var At = /\r/g,
		jt = /[\x20\t\r\n\f]+/g;
	pe.fn.extend({
		val: function(n) {
			var i, e, a, t = this[0]; {
				if (arguments.length) return a = pe.isFunction(n), this.each(function(e) {
					var t;
					1 === this.nodeType && (t = a ? n.call(this, e, pe(this).val()) : n, null == t ? t = "" : "number" == typeof t ? t += "" : pe.isArray(t) && (t = pe.map(t, function(e) {
						return null == e ? "" : e + ""
					})), i = pe.valHooks[this.type] || pe.valHooks[this.nodeName.toLowerCase()], i && "set" in i && void 0 !== i.set(this, t, "value") || (this.value = t))
				});
				if (t) return i = pe.valHooks[t.type] || pe.valHooks[t.nodeName.toLowerCase()], i && "get" in i && void 0 !== (e = i.get(t, "value")) ? e : (e = t.value, "string" == typeof e ? e.replace(At, "") : null == e ? "" : e)
			}
		}
	}), pe.extend({
		valHooks: {
			option: {
				get: function(e) {
					var t = pe.find.attr(e, "value");
					return null != t ? t : pe.trim(pe.text(e)).replace(jt, " ")
				}
			},
			select: {
				get: function(e) {
					for (var t, n, i = e.options, a = e.selectedIndex, r = "select-one" === e.type || a < 0, o = r ? null : [], l = r ? a + 1 : i.length, s = a < 0 ? l : r ? a : 0; s < l; s++) if (n = i[s], (n.selected || s === a) && (de.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !pe.nodeName(n.parentNode, "optgroup"))) {
						if (t = pe(n).val(), r) return t;
						o.push(t)
					}
					return o
				},
				set: function(e, t) {
					for (var n, i, a = e.options, r = pe.makeArray(t), o = a.length; o--;) if (i = a[o], pe.inArray(pe.valHooks.option.get(i), r) > -1) try {
						i.selected = n = !0
					} catch (e) {
						i.scrollHeight
					} else i.selected = !1;
					return n || (e.selectedIndex = -1), a
				}
			}
		}
	}), pe.each(["radio", "checkbox"], function() {
		pe.valHooks[this] = {
			set: function(e, t) {
				if (pe.isArray(t)) return e.checked = pe.inArray(pe(e).val(), t) > -1
			}
		}, de.checkOn || (pe.valHooks[this].get = function(e) {
			return null === e.getAttribute("value") ? "on" : e.value
		})
	});
	var Nt, Mt, Ht = pe.expr.attrHandle,
		Ft = /^(?:checked|selected)$/i,
		It = de.getSetAttribute,
		qt = de.input;
	pe.fn.extend({
		attr: function(e, t) {
			return Be(this, pe.attr, e, t, arguments.length > 1)
		},
		removeAttr: function(e) {
			return this.each(function() {
				pe.removeAttr(this, e)
			})
		}
	}), pe.extend({
		attr: function(e, t, n) {
			var i, a, r = e.nodeType;
			if (3 !== r && 8 !== r && 2 !== r) return "undefined" == typeof e.getAttribute ? pe.prop(e, t, n) : (1 === r && pe.isXMLDoc(e) || (t = t.toLowerCase(), a = pe.attrHooks[t] || (pe.expr.match.bool.test(t) ? Mt : Nt)), void 0 !== n ? null === n ? void pe.removeAttr(e, t) : a && "set" in a && void 0 !== (i = a.set(e, n, t)) ? i : (e.setAttribute(t, n + ""), n) : a && "get" in a && null !== (i = a.get(e, t)) ? i : (i = pe.find.attr(e, t), null == i ? void 0 : i))
		},
		attrHooks: {
			type: {
				set: function(e, t) {
					if (!de.radioValue && "radio" === t && pe.nodeName(e, "input")) {
						var n = e.value;
						return e.setAttribute("type", t), n && (e.value = n), t
					}
				}
			}
		},
		removeAttr: function(e, t) {
			var n, i, a = 0,
				r = t && t.match(Ae);
			if (r && 1 === e.nodeType) for (; n = r[a++];) i = pe.propFix[n] || n, pe.expr.match.bool.test(n) ? qt && It || !Ft.test(n) ? e[i] = !1 : e[pe.camelCase("default-" + n)] = e[i] = !1 : pe.attr(e, n, ""), e.removeAttribute(It ? n : i)
		}
	}), Mt = {
		set: function(e, t, n) {
			return t === !1 ? pe.removeAttr(e, n) : qt && It || !Ft.test(n) ? e.setAttribute(!It && pe.propFix[n] || n, n) : e[pe.camelCase("default-" + n)] = e[n] = !0, n
		}
	}, pe.each(pe.expr.match.bool.source.match(/\w+/g), function(e, t) {
		var r = Ht[t] || pe.find.attr;
		qt && It || !Ft.test(t) ? Ht[t] = function(e, t, n) {
			var i, a;
			return n || (a = Ht[t], Ht[t] = i, i = null != r(e, t, n) ? t.toLowerCase() : null, Ht[t] = a), i
		} : Ht[t] = function(e, t, n) {
			if (!n) return e[pe.camelCase("default-" + t)] ? t.toLowerCase() : null
		}
	}), qt && It || (pe.attrHooks.value = {
		set: function(e, t, n) {
			return pe.nodeName(e, "input") ? void(e.defaultValue = t) : Nt && Nt.set(e, t, n)
		}
	}), It || (Nt = {
		set: function(e, t, n) {
			var i = e.getAttributeNode(n);
			if (i || e.setAttributeNode(i = e.ownerDocument.createAttribute(n)), i.value = t += "", "value" === n || t === e.getAttribute(n)) return t
		}
	}, Ht.id = Ht.name = Ht.coords = function(e, t, n) {
		var i;
		if (!n) return (i = e.getAttributeNode(t)) && "" !== i.value ? i.value : null
	}, pe.valHooks.button = {
		get: function(e, t) {
			var n = e.getAttributeNode(t);
			if (n && n.specified) return n.value
		},
		set: Nt.set
	}, pe.attrHooks.contenteditable = {
		set: function(e, t, n) {
			Nt.set(e, "" !== t && t, n)
		}
	}, pe.each(["width", "height"], function(e, n) {
		pe.attrHooks[n] = {
			set: function(e, t) {
				if ("" === t) return e.setAttribute(n, "auto"), t
			}
		}
	})), de.style || (pe.attrHooks.style = {
		get: function(e) {
			return e.style.cssText || void 0
		},
		set: function(e, t) {
			return e.style.cssText = t + ""
		}
	});
	var Pt = /^(?:input|select|textarea|button|object)$/i,
		_t = /^(?:a|area)$/i;
	pe.fn.extend({
		prop: function(e, t) {
			return Be(this, pe.prop, e, t, arguments.length > 1)
		},
		removeProp: function(e) {
			return e = pe.propFix[e] || e, this.each(function() {
				try {
					this[e] = void 0, delete this[e]
				} catch (e) {}
			})
		}
	}), pe.extend({
		prop: function(e, t, n) {
			var i, a, r = e.nodeType;
			if (3 !== r && 8 !== r && 2 !== r) return 1 === r && pe.isXMLDoc(e) || (t = pe.propFix[t] || t, a = pe.propHooks[t]), void 0 !== n ? a && "set" in a && void 0 !== (i = a.set(e, n, t)) ? i : e[t] = n : a && "get" in a && null !== (i = a.get(e, t)) ? i : e[t]
		},
		propHooks: {
			tabIndex: {
				get: function(e) {
					var t = pe.find.attr(e, "tabindex");
					return t ? parseInt(t, 10) : Pt.test(e.nodeName) || _t.test(e.nodeName) && e.href ? 0 : -1
				}
			}
		},
		propFix: {
			for :"htmlFor", class: "className"
		}
	}), de.hrefNormalized || pe.each(["href", "src"], function(e, t) {
		pe.propHooks[t] = {
			get: function(e) {
				return e.getAttribute(t, 4)
			}
		}
	}), de.optSelected || (pe.propHooks.selected = {
		get: function(e) {
			var t = e.parentNode;
			return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
		},
		set: function(e) {
			var t = e.parentNode;
			t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
		}
	}), pe.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
		pe.propFix[this.toLowerCase()] = this
	}), de.enctype || (pe.propFix.enctype = "encoding");
	var Bt = /[\t\r\n\f]/g;
	pe.fn.extend({
		addClass: function(t) {
			var e, n, i, a, r, o, l, s = 0;
			if (pe.isFunction(t)) return this.each(function(e) {
				pe(this).addClass(t.call(this, e, $(this)))
			});
			if ("string" == typeof t && t) for (e = t.match(Ae) || []; n = this[s++];) if (a = $(n), i = 1 === n.nodeType && (" " + a + " ").replace(Bt, " ")) {
				for (o = 0; r = e[o++];) i.indexOf(" " + r + " ") < 0 && (i += r + " ");
				l = pe.trim(i), a !== l && pe.attr(n, "class", l)
			}
			return this
		},
		removeClass: function(t) {
			var e, n, i, a, r, o, l, s = 0;
			if (pe.isFunction(t)) return this.each(function(e) {
				pe(this).removeClass(t.call(this, e, $(this)))
			});
			if (!arguments.length) return this.attr("class", "");
			if ("string" == typeof t && t) for (e = t.match(Ae) || []; n = this[s++];) if (a = $(n), i = 1 === n.nodeType && (" " + a + " ").replace(Bt, " ")) {
				for (o = 0; r = e[o++];) for (; i.indexOf(" " + r + " ") > -1;) i = i.replace(" " + r + " ", " ");
				l = pe.trim(i), a !== l && pe.attr(n, "class", l)
			}
			return this
		},
		toggleClass: function(a, t) {
			var r = typeof a;
			return "boolean" == typeof t && "string" === r ? t ? this.addClass(a) : this.removeClass(a) : pe.isFunction(a) ? this.each(function(e) {
				pe(this).toggleClass(a.call(this, e, $(this), t), t)
			}) : this.each(function() {
				var e, t, n, i;
				if ("string" === r) for (t = 0, n = pe(this), i = a.match(Ae) || []; e = i[t++];) n.hasClass(e) ? n.removeClass(e) : n.addClass(e);
				else void 0 !== a && "boolean" !== r || (e = $(this), e && pe._data(this, "__className__", e), pe.attr(this, "class", e || a === !1 ? "" : pe._data(this, "__className__") || ""))
			})
		},
		hasClass: function(e) {
			var t, n, i = 0;
			for (t = " " + e + " "; n = this[i++];) if (1 === n.nodeType && (" " + $(n) + " ").replace(Bt, " ").indexOf(t) > -1) return !0;
			return !1
		}
	}), pe.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, n) {
		pe.fn[n] = function(e, t) {
			return arguments.length > 0 ? this.on(n, null, e, t) : this.trigger(n)
		}
	}), pe.fn.extend({
		hover: function(e, t) {
			return this.mouseenter(e).mouseleave(t || e)
		}
	});
	var zt = C.location,
		Ot = pe.now(),
		Rt = /\?/,
		Wt = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
	pe.parseJSON = function(e) {
		if (C.JSON && C.JSON.parse) return C.JSON.parse(e + "");
		var a, r = null,
			t = pe.trim(e + "");
		return t && !pe.trim(t.replace(Wt, function(e, t, n, i) {
			return a && t && (r = 0), 0 === r ? e : (a = n || t, r += !i - !n, "")
		})) ? Function("return " + t)() : pe.error("Invalid JSON: " + e)
	}, pe.parseXML = function(e) {
		var t, n;
		if (!e || "string" != typeof e) return null;
		try {
			C.DOMParser ? (n = new C.DOMParser, t = n.parseFromString(e, "text/xml")) : (t = new C.ActiveXObject("Microsoft.XMLDOM"), t.async = "false", t.loadXML(e))
		} catch (e) {
			t = void 0
		}
		return t && t.documentElement && !t.getElementsByTagName("parsererror").length || pe.error("Invalid XML: " + e), t
	};
	var $t = /#.*$/,
		Xt = /([?&])_=[^&]*/,
		Yt = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
		Vt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		Kt = /^(?:GET|HEAD)$/,
		Gt = /^\/\//,
		Jt = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
		Ut = {},
		Qt = {},
		Zt = "*/".concat("*"),
		en = zt.href,
		tn = Jt.exec(en.toLowerCase()) || [];
	pe.extend({
		active: 0,
		lastModified: {},
		etag: {},
		ajaxSettings: {
			url: en,
			type: "GET",
			isLocal: Vt.test(tn[1]),
			global: !0,
			processData: !0,
			async: !0,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			accepts: {
				"*": Zt,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},
			contents: {
				xml: /\bxml\b/,
				html: /\bhtml/,
				json: /\bjson\b/
			},
			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},
			converters: {
				"* text": String,
				"text html": !0,
				"text json": pe.parseJSON,
				"text xml": pe.parseXML
			},
			flatOptions: {
				url: !0,
				context: !0
			}
		},
		ajaxSetup: function(e, t) {
			return t ? V(V(e, pe.ajaxSettings), t) : V(pe.ajaxSettings, e)
		},
		ajaxPrefilter: X(Ut),
		ajaxTransport: X(Qt),
		ajax: function(e, t) {
			function n(e, t, n, i) {
				var a, r, o, l, s, c = t;
				2 !== w && (w = 2, f && C.clearTimeout(f), h = void 0, d = i || "", k.readyState = e > 0 ? 4 : 0, a = e >= 200 && e < 300 || 304 === e, n && (l = K(y, k, n)), l = G(y, l, k, a), a ? (y.ifModified && (s = k.getResponseHeader("Last-Modified"), s && (pe.lastModified[u] = s), s = k.getResponseHeader("etag"), s && (pe.etag[u] = s)), 204 === e || "HEAD" === y.type ? c = "nocontent" : 304 === e ? c = "notmodified" : (c = l.state, r = l.data, o = l.error, a = !o)) : (o = c, !e && c || (c = "error", e < 0 && (e = 0))), k.status = e, k.statusText = (t || c) + "", a ? g.resolveWith(m, [r, c, k]) : g.rejectWith(m, [k, c, o]), k.statusCode(x), x = void 0, p && v.trigger(a ? "ajaxSuccess" : "ajaxError", [k, y, a ? r : o]), b.fireWith(m, [k, c]), p && (v.trigger("ajaxComplete", [k, y]), --pe.active || pe.event.trigger("ajaxStop")))
			}
			"object" == typeof e && (t = e, e = void 0), t = t || {};
			var i, a, u, d, f, p, h, r, y = pe.ajaxSetup({}, t),
				m = y.context || y,
				v = y.context && (m.nodeType || m.jquery) ? pe(m) : pe.event,
				g = pe.Deferred(),
				b = pe.Callbacks("once memory"),
				x = y.statusCode || {},
				o = {},
				l = {},
				w = 0,
				s = "canceled",
				k = {
					readyState: 0,
					getResponseHeader: function(e) {
						var t;
						if (2 === w) {
							if (!r) for (r = {}; t = Yt.exec(d);) r[t[1].toLowerCase()] = t[2];
							t = r[e.toLowerCase()]
						}
						return null == t ? null : t
					},
					getAllResponseHeaders: function() {
						return 2 === w ? d : null
					},
					setRequestHeader: function(e, t) {
						var n = e.toLowerCase();
						return w || (e = l[n] = l[n] || e, o[e] = t), this
					},
					overrideMimeType: function(e) {
						return w || (y.mimeType = e), this
					},
					statusCode: function(e) {
						var t;
						if (e) if (w < 2) for (t in e) x[t] = [x[t], e[t]];
						else k.always(e[k.status]);
						return this
					},
					abort: function(e) {
						var t = e || s;
						return h && h.abort(t), n(0, t), this
					}
				};
			if (g.promise(k).complete = b.add, k.success = k.done, k.error = k.fail, y.url = ((e || y.url || en) + "").replace($t, "").replace(Gt, tn[1] + "//"), y.type = t.method || t.type || y.method || y.type, y.dataTypes = pe.trim(y.dataType || "*").toLowerCase().match(Ae) || [""], null == y.crossDomain && (i = Jt.exec(y.url.toLowerCase()), y.crossDomain = !(!i || i[1] === tn[1] && i[2] === tn[2] && (i[3] || ("http:" === i[1] ? "80" : "443")) === (tn[3] || ("http:" === tn[1] ? "80" : "443")))), y.data && y.processData && "string" != typeof y.data && (y.data = pe.param(y.data, y.traditional)), Y(Ut, y, t, k), 2 === w) return k;
			p = pe.event && y.global, p && 0 === pe.active++ && pe.event.trigger("ajaxStart"), y.type = y.type.toUpperCase(), y.hasContent = !Kt.test(y.type), u = y.url, y.hasContent || (y.data && (u = y.url += (Rt.test(u) ? "&" : "?") + y.data, delete y.data), y.cache === !1 && (y.url = Xt.test(u) ? u.replace(Xt, "$1_=" + Ot++) : u + (Rt.test(u) ? "&" : "?") + "_=" + Ot++)), y.ifModified && (pe.lastModified[u] && k.setRequestHeader("If-Modified-Since", pe.lastModified[u]), pe.etag[u] && k.setRequestHeader("If-None-Match", pe.etag[u])), (y.data && y.hasContent && y.contentType !== !1 || t.contentType) && k.setRequestHeader("Content-Type", y.contentType), k.setRequestHeader("Accept", y.dataTypes[0] && y.accepts[y.dataTypes[0]] ? y.accepts[y.dataTypes[0]] + ("*" !== y.dataTypes[0] ? ", " + Zt + "; q=0.01" : "") : y.accepts["*"]);
			for (a in y.headers) k.setRequestHeader(a, y.headers[a]);
			if (y.beforeSend && (y.beforeSend.call(m, k, y) === !1 || 2 === w)) return k.abort();
			s = "abort";
			for (a in {
				success: 1,
				error: 1,
				complete: 1
			}) k[a](y[a]);
			if (h = Y(Qt, y, t, k)) {
				if (k.readyState = 1, p && v.trigger("ajaxSend", [k, y]), 2 === w) return k;
				y.async && y.timeout > 0 && (f = C.setTimeout(function() {
					k.abort("timeout")
				}, y.timeout));
				try {
					w = 1, h.send(o, n)
				} catch (e) {
					if (!(w < 2)) throw e;
					n(-1, e)
				}
			} else n(-1, "No Transport");
			return k
		},
		getJSON: function(e, t, n) {
			return pe.get(e, t, n, "json")
		},
		getScript: function(e, t) {
			return pe.get(e, void 0, t, "script")
		}
	}), pe.each(["get", "post"], function(e, a) {
		pe[a] = function(e, t, n, i) {
			return pe.isFunction(t) && (i = i || n, n = t, t = void 0), pe.ajax(pe.extend({
				url: e,
				type: a,
				dataType: i,
				data: t,
				success: n
			}, pe.isPlainObject(e) && e))
		}
	}), pe._evalUrl = function(e) {
		return pe.ajax({
			url: e,
			type: "GET",
			dataType: "script",
			cache: !0,
			async: !1,
			global: !1,
			throws: !0
		})
	}, pe.fn.extend({
		wrapAll: function(t) {
			if (pe.isFunction(t)) return this.each(function(e) {
				pe(this).wrapAll(t.call(this, e))
			});
			if (this[0]) {
				var e = pe(t, this[0].ownerDocument).eq(0).clone(!0);
				this[0].parentNode && e.insertBefore(this[0]), e.map(function() {
					for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;) e = e.firstChild;
					return e
				}).append(this)
			}
			return this
		},
		wrapInner: function(n) {
			return pe.isFunction(n) ? this.each(function(e) {
				pe(this).wrapInner(n.call(this, e))
			}) : this.each(function() {
				var e = pe(this),
					t = e.contents();
				t.length ? t.wrapAll(n) : e.append(n)
			})
		},
		wrap: function(t) {
			var n = pe.isFunction(t);
			return this.each(function(e) {
				pe(this).wrapAll(n ? t.call(this, e) : t)
			})
		},
		unwrap: function() {
			return this.parent().each(function() {
				pe.nodeName(this, "body") || pe(this).replaceWith(this.childNodes)
			}).end()
		}
	}), pe.expr.filters.hidden = function(e) {
		return de.reliableHiddenOffsets() ? e.offsetWidth <= 0 && e.offsetHeight <= 0 && !e.getClientRects().length : U(e)
	}, pe.expr.filters.visible = function(e) {
		return !pe.expr.filters.hidden(e)
	};
	var nn = /%20/g,
		an = /\[\]$/,
		rn = /\r?\n/g,
		on = /^(?:submit|button|image|reset|file)$/i,
		ln = /^(?:input|select|textarea|keygen)/i;
	pe.param = function(e, t) {
		var n, i = [],
			a = function(e, t) {
				t = pe.isFunction(t) ? t() : null == t ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
			};
		if (void 0 === t && (t = pe.ajaxSettings && pe.ajaxSettings.traditional), pe.isArray(e) || e.jquery && !pe.isPlainObject(e)) pe.each(e, function() {
			a(this.name, this.value)
		});
		else for (n in e) Q(n, e[n], t, a);
		return i.join("&").replace(nn, "+")
	}, pe.fn.extend({
		serialize: function() {
			return pe.param(this.serializeArray())
		},
		serializeArray: function() {
			return this.map(function() {
				var e = pe.prop(this, "elements");
				return e ? pe.makeArray(e) : this
			}).filter(function() {
				var e = this.type;
				return this.name && !pe(this).is(":disabled") && ln.test(this.nodeName) && !on.test(e) && (this.checked || !ze.test(e))
			}).map(function(e, t) {
				var n = pe(this).val();
				return null == n ? null : pe.isArray(n) ? pe.map(n, function(e) {
					return {
						name: t.name,
						value: e.replace(rn, "\r\n")
					}
				}) : {
					name: t.name,
					value: n.replace(rn, "\r\n")
				}
			}).get()
		}
	}), pe.ajaxSettings.xhr = void 0 !== C.ActiveXObject ?
	function() {
		return this.isLocal ? ee() : ie.documentMode > 8 ? Z() : /^(get|post|head|put|delete|options)$/i.test(this.type) && Z() || ee()
	} : Z;
	var sn = 0,
		cn = {},
		un = pe.ajaxSettings.xhr();
	C.attachEvent && C.attachEvent("onunload", function() {
		for (var e in cn) cn[e](void 0, !0)
	}), de.cors = !! un && "withCredentials" in un, un = de.ajax = !! un, un && pe.ajaxTransport(function(s) {
		if (!s.crossDomain || de.cors) {
			var c;
			return {
				send: function(e, r) {
					var t, o = s.xhr(),
						l = ++sn;
					if (o.open(s.type, s.url, s.async, s.username, s.password), s.xhrFields) for (t in s.xhrFields) o[t] = s.xhrFields[t];
					s.mimeType && o.overrideMimeType && o.overrideMimeType(s.mimeType), s.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest");
					for (t in e) void 0 !== e[t] && o.setRequestHeader(t, e[t] + "");
					o.send(s.hasContent && s.data || null), c = function(e, t) {
						var n, i, a;
						if (c && (t || 4 === o.readyState)) if (delete cn[l], c = void 0, o.onreadystatechange = pe.noop, t) 4 !== o.readyState && o.abort();
						else {
							a = {}, n = o.status, "string" == typeof o.responseText && (a.text = o.responseText);
							try {
								i = o.statusText
							} catch (e) {
								i = ""
							}
							n || !s.isLocal || s.crossDomain ? 1223 === n && (n = 204) : n = a.text ? 200 : 404
						}
						a && r(n, i, a, o.getAllResponseHeaders())
					}, s.async ? 4 === o.readyState ? C.setTimeout(c) : o.onreadystatechange = cn[l] = c : c()
				},
				abort: function() {
					c && c(void 0, !0)
				}
			}
		}
	}), pe.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /\b(?:java|ecma)script\b/
		},
		converters: {
			"text script": function(e) {
				return pe.globalEval(e), e
			}
		}
	}), pe.ajaxPrefilter("script", function(e) {
		void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
	}), pe.ajaxTransport("script", function(t) {
		if (t.crossDomain) {
			var i, a = ie.head || pe("head")[0] || ie.documentElement;
			return {
				send: function(e, n) {
					i = ie.createElement("script"), i.async = !0, t.scriptCharset && (i.charset = t.scriptCharset), i.src = t.url, i.onload = i.onreadystatechange = function(e, t) {
						(t || !i.readyState || /loaded|complete/.test(i.readyState)) && (i.onload = i.onreadystatechange = null, i.parentNode && i.parentNode.removeChild(i), i = null, t || n(200, "success"))
					}, a.insertBefore(i, a.firstChild)
				},
				abort: function() {
					i && i.onload(void 0, !0)
				}
			}
		}
	});
	var dn = [],
		fn = /(=)\?(?=&|$)|\?\?/;
	pe.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function() {
			var e = dn.pop() || pe.expando + "_" + Ot++;
			return this[e] = !0, e
		}
	}), pe.ajaxPrefilter("json jsonp", function(e, t, n) {
		var i, a, r, o = e.jsonp !== !1 && (fn.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && fn.test(e.data) && "data");
		if (o || "jsonp" === e.dataTypes[0]) return i = e.jsonpCallback = pe.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, o ? e[o] = e[o].replace(fn, "$1" + i) : e.jsonp !== !1 && (e.url += (Rt.test(e.url) ? "&" : "?") + e.jsonp + "=" + i), e.converters["script json"] = function() {
			return r || pe.error(i + " was not called"), r[0]
		}, e.dataTypes[0] = "json", a = C[i], C[i] = function() {
			r = arguments
		}, n.always(function() {
			void 0 === a ? pe(C).removeProp(i) : C[i] = a, e[i] && (e.jsonpCallback = t.jsonpCallback, dn.push(i)), r && pe.isFunction(a) && a(r[0]), r = a = void 0
		}), "script"
	}), pe.parseHTML = function(e, t, n) {
		if (!e || "string" != typeof e) return null;
		"boolean" == typeof t && (n = t, t = !1), t = t || ie;
		var i = ke.exec(e),
			a = !n && [];
		return i ? [t.createElement(i[1])] : (i = y([e], t, a), a && a.length && pe(a).remove(), pe.merge([], i.childNodes))
	};
	var pn = pe.fn.load;
	return pe.fn.load = function(e, t, n) {
		if ("string" != typeof e && pn) return pn.apply(this, arguments);
		var i, a, r, o = this,
			l = e.indexOf(" ");
		return l > -1 && (i = pe.trim(e.slice(l, e.length)), e = e.slice(0, l)), pe.isFunction(t) ? (n = t, t = void 0) : t && "object" == typeof t && (a = "POST"), o.length > 0 && pe.ajax({
			url: e,
			type: a || "GET",
			dataType: "html",
			data: t
		}).done(function(e) {
			r = arguments, o.html(i ? pe("<div>").append(pe.parseHTML(e)).find(i) : e)
		}).always(n &&
		function(e, t) {
			o.each(function() {
				n.apply(this, r || [e.responseText, t, e])
			})
		}), this
	}, pe.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
		pe.fn[t] = function(e) {
			return this.on(t, e)
		}
	}), pe.expr.filters.animated = function(t) {
		return pe.grep(pe.timers, function(e) {
			return t === e.elem
		}).length
	}, pe.offset = {
		setOffset: function(e, t, n) {
			var i, a, r, o, l, s, c, u = pe.css(e, "position"),
				d = pe(e),
				f = {};
			"static" === u && (e.style.position = "relative"), l = d.offset(), r = pe.css(e, "top"), s = pe.css(e, "left"), c = ("absolute" === u || "fixed" === u) && pe.inArray("auto", [r, s]) > -1, c ? (i = d.position(), o = i.top, a = i.left) : (o = parseFloat(r) || 0, a = parseFloat(s) || 0), pe.isFunction(t) && (t = t.call(e, n, pe.extend({}, l))), null != t.top && (f.top = t.top - l.top + o), null != t.left && (f.left = t.left - l.left + a), "using" in t ? t.using.call(e, f) : d.css(f)
		}
	}, pe.fn.extend({
		offset: function(t) {
			if (arguments.length) return void 0 === t ? this : this.each(function(e) {
				pe.offset.setOffset(this, t, e)
			});
			var e, n, i = {
				top: 0,
				left: 0
			},
				a = this[0],
				r = a && a.ownerDocument;
			if (r) return e = r.documentElement, pe.contains(e, a) ? ("undefined" != typeof a.getBoundingClientRect && (i = a.getBoundingClientRect()), n = te(r), {
				top: i.top + (n.pageYOffset || e.scrollTop) - (e.clientTop || 0),
				left: i.left + (n.pageXOffset || e.scrollLeft) - (e.clientLeft || 0)
			}) : i
		},
		position: function() {
			if (this[0]) {
				var e, t, n = {
					top: 0,
					left: 0
				},
					i = this[0];
				return "fixed" === pe.css(i, "position") ? t = i.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), pe.nodeName(e[0], "html") || (n = e.offset()), n.top += pe.css(e[0], "borderTopWidth", !0), n.left += pe.css(e[0], "borderLeftWidth", !0)), {
					top: t.top - n.top - pe.css(i, "marginTop", !0),
					left: t.left - n.left - pe.css(i, "marginLeft", !0)
				}
			}
		},
		offsetParent: function() {
			return this.map(function() {
				for (var e = this.offsetParent; e && !pe.nodeName(e, "html") && "static" === pe.css(e, "position");) e = e.offsetParent;
				return e || pt
			})
		}
	}), pe.each({
		scrollLeft: "pageXOffset",
		scrollTop: "pageYOffset"
	}, function(t, a) {
		var r = /Y/.test(a);
		pe.fn[t] = function(e) {
			return Be(this, function(e, t, n) {
				var i = te(e);
				return void 0 === n ? i ? a in i ? i[a] : i.document.documentElement[t] : e[t] : void(i ? i.scrollTo(r ? pe(i).scrollLeft() : n, r ? n : pe(i).scrollTop()) : e[t] = n)
			}, t, e, arguments.length, null)
		}
	}), pe.each(["top", "left"], function(e, n) {
		pe.cssHooks[n] = N(de.pixelPosition, function(e, t) {
			if (t) return t = yt(e, n), dt.test(t) ? pe(e).position()[n] + "px" : t
		})
	}), pe.each({
		Height: "height",
		Width: "width"
	}, function(r, o) {
		pe.each({
			padding: "inner" + r,
			content: o,
			"": "outer" + r
		}, function(i, e) {
			pe.fn[e] = function(e, t) {
				var n = arguments.length && (i || "boolean" != typeof e),
					a = i || (e === !0 || t === !0 ? "margin" : "border");
				return Be(this, function(e, t, n) {
					var i;
					return pe.isWindow(e) ? e.document.documentElement["client" + r] : 9 === e.nodeType ? (i = e.documentElement, Math.max(e.body["scroll" + r], i["scroll" + r], e.body["offset" + r], i["offset" + r], i["client" + r])) : void 0 === n ? pe.css(e, t, a) : pe.style(e, t, n, a)
				}, o, n ? e : void 0, n, null)
			}
		})
	}), pe.fn.extend({
		bind: function(e, t, n) {
			return this.on(e, null, t, n)
		},
		unbind: function(e, t) {
			return this.off(e, null, t)
		},
		delegate: function(e, t, n, i) {
			return this.on(t, e, n, i)
		},
		undelegate: function(e, t, n) {
			return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
		}
	}), pe.fn.size = function() {
		return this.length
	}, pe.fn.andSelf = pe.fn.addBack, layui.define(function(e) {
		layui.$ = pe, e("jquery", pe)
	}), pe
});
!
function(f, l) {
	"use strict";
	var p, u, a = f.layui && layui.define,
		d = {
			getPath: function() {
				var e = document.currentScript ? document.currentScript.src : function() {
						for (var e, t = document.scripts, n = t.length - 1, i = n; i > 0; i--) if ("interactive" === t[i].readyState) {
							e = t[i].src;
							break
						}
						return e || t[n].src
					}();
				return e.substring(0, e.lastIndexOf("/") + 1)
			}(),
			config: {},
			end: {},
			minIndex: 0,
			minLeft: [],
			btn: ["&#x786E;&#x5B9A;", "&#x53D6;&#x6D88;"],
			type: ["dialog", "page", "iframe", "loading", "tips"],
			getStyle: function(e, t) {
				var n = e.currentStyle ? e.currentStyle : f.getComputedStyle(e, null);
				return n[n.getPropertyValue ? "getPropertyValue" : "getAttribute"](t)
			},
			link: function(e, t, n) {
				if (h.path) {
					var i = document.getElementsByTagName("head")[0],
						a = document.createElement("link");
					"string" == typeof t && (n = t);
					var r = (n || e).replace(/\.|\//g, ""),
						o = "layuicss-" + r,
						l = 0;
					a.rel = "stylesheet", a.href = h.path + e, a.id = o, document.getElementById(o) || i.appendChild(a), "function" == typeof t && !
					function e() {
						return ++l > 80 ? f.console && console.error("layer.css: Invalid") : void(1989 === parseInt(d.getStyle(document.getElementById(o), "width")) ? t() : setTimeout(e, 100))
					}()
				}
			}
		},
		h = {
			v: "3.1.1",
			ie: function() {
				var e = navigator.userAgent.toLowerCase();
				return !!(f.ActiveXObject || "ActiveXObject" in f) && ((e.match(/msie\s(\d+)/) || [])[1] || "11")
			}(),
			index: f.layer && f.layer.v ? 1e5 : 0,
			path: d.getPath,
			config: function(e, t) {
				return e = e || {}, h.cache = d.config = p.extend({}, d.config, e), h.path = d.config.path || h.path, "string" == typeof e.extend && (e.extend = [e.extend]), d.config.path && h.ready(), e.extend ? (a ? layui.addcss("modules/layer/" + e.extend) : d.link("theme/" + e.extend), this) : this
			},
			ready: function(e) {
				var t = "layer",
					n = "",
					i = (a ? "modules/layer/" : "theme/") + "default/layer.css?v=" + h.v + n;
				return a ? layui.addcss(i, e, t) : d.link(i, e, t), this
			},
			alert: function(e, t, n) {
				var i = "function" == typeof t;
				return i && (n = t), h.open(p.extend({
					content: e,
					yes: n
				}, i ? {} : t))
			},
			confirm: function(e, t, n, i) {
				var a = "function" == typeof t;
				return a && (i = n, n = t), h.open(p.extend({
					content: e,
					btn: d.btn,
					yes: n,
					btn2: i
				}, a ? {} : t))
			},
			msg: function(e, t, n) {
				var i = "function" == typeof t,
					a = d.config.skin,
					r = (a ? a + " " + a + "-msg" : "") || "layui-layer-msg",
					o = c.anim.length - 1;
				return i && (n = t), h.open(p.extend({
					content: e,
					time: 3e3,
					shade: !1,
					skin: r,
					title: !1,
					closeBtn: !1,
					btn: !1,
					resize: !1,
					end: n
				}, i && !d.config.skin ? {
					skin: r + " layui-layer-hui",
					anim: o
				} : function() {
					return t = t || {}, (t.icon === -1 || t.icon === l && !d.config.skin) && (t.skin = r + " " + (t.skin || "layui-layer-hui")), t
				}()))
			},
			load: function(e, t) {
				return h.open(p.extend({
					type: 3,
					icon: e || 0,
					resize: !1,
					shade: .01
				}, t))
			},
			tips: function(e, t, n) {
				return h.open(p.extend({
					type: 4,
					content: [e, t],
					closeBtn: !1,
					time: 3e3,
					shade: !1,
					resize: !1,
					fixed: !1,
					maxWidth: 210
				}, n))
			}
		},
		n = function(e) {
			var t = this;
			t.index = ++h.index, t.config = p.extend({}, t.config, d.config, e), document.body ? t.creat() : setTimeout(function() {
				t.creat()
			}, 30)
		};
	n.pt = n.prototype;
	var c = ["layui-layer", ".layui-layer-title", ".layui-layer-main", ".layui-layer-dialog", "layui-layer-iframe", "layui-layer-content", "layui-layer-btn", "layui-layer-close"];
	c.anim = ["layer-anim-00", "layer-anim-01", "layer-anim-02", "layer-anim-03", "layer-anim-04", "layer-anim-05", "layer-anim-06"], n.pt.config = {
		type: 0,
		shade: .3,
		fixed: !0,
		move: c[1],
		title: "&#x4FE1;&#x606F;",
		offset: "auto",
		area: "auto",
		closeBtn: 1,
		time: 0,
		zIndex: 19891014,
		maxWidth: 360,
		anim: 0,
		isOutAnim: !0,
		icon: -1,
		moveType: 1,
		resize: !0,
		scrollbar: !0,
		tips: 2
	}, n.pt.vessel = function(e, t) {
		var n = this,
			i = n.index,
			a = n.config,
			r = a.zIndex + i,
			o = "object" == typeof a.title,
			l = a.maxmin && (1 === a.type || 2 === a.type),
			s = a.title ? '<div class="layui-layer-title" style="' + (o ? a.title[1] : "") + '">' + (o ? a.title[0] : a.title) + "</div>" : "";
		return a.zIndex = r, t([a.shade ? '<div class="layui-layer-shade" id="layui-layer-shade' + i + '" times="' + i + '" style="' + ("z-index:" + (r - 1) + "; ") + '"></div>' : "", '<div class="' + c[0] + (" layui-layer-" + d.type[a.type]) + (0 != a.type && 2 != a.type || a.shade ? "" : " layui-layer-border") + " " + (a.skin || "") + '" id="' + c[0] + i + '" type="' + d.type[a.type] + '" times="' + i + '" showtime="' + a.time + '" conType="' + (e ? "object" : "string") + '" style="z-index: ' + r + "; width:" + a.area[0] + ";height:" + a.area[1] + (a.fixed ? "" : ";position:absolute;") + '">' + (e && 2 != a.type ? "" : s) + '<div id="' + (a.id || "") + '" class="layui-layer-content' + (0 == a.type && a.icon !== -1 ? " layui-layer-padding" : "") + (3 == a.type ? " layui-layer-loading" + a.icon : "") + '">' + (0 == a.type && a.icon !== -1 ? '<i class="layui-layer-ico layui-layer-ico' + a.icon + '"></i>' : "") + (1 == a.type && e ? "" : a.content || "") + '</div><span class="layui-layer-setwin">' +
		function() {
			var e = l ? '<a class="layui-layer-min" href="javascript:;"><cite></cite></a><a class="layui-layer-ico layui-layer-max" href="javascript:;"></a>' : "";
			return a.closeBtn && (e += '<a class="layui-layer-ico ' + c[7] + " " + c[7] + (a.title ? a.closeBtn : 4 == a.type ? "1" : "2") + '" href="javascript:;"></a>'), e
		}() + "</span>" + (a.btn ?
		function() {
			var e = "";
			"string" == typeof a.btn && (a.btn = [a.btn]);
			for (var t = 0, n = a.btn.length; t < n; t++) e += '<a class="' + c[6] + t + '">' + a.btn[t] + "</a>";
			return '<div class="' + c[6] + " layui-layer-btn-" + (a.btnAlign || "") + '">' + e + "</div>"
		}() : "") + (a.resize ? '<span class="layui-layer-resize"></span>' : "") + "</div>"], s, p('<div class="layui-layer-move"></div>')), n
	}, n.pt.creat = function() {
		var i = this,
			a = i.config,
			r = i.index,
			o = a.content,
			l = "object" == typeof o,
			s = p("body");
		if (!a.id || !p("#" + a.id)[0]) {
			switch ("string" == typeof a.area && (a.area = "auto" === a.area ? ["", ""] : [a.area, ""]), a.shift && (a.anim = a.shift), 6 == h.ie && (a.fixed = !1), a.type) {
			case 0:
				a.btn = "btn" in a ? a.btn : d.btn[0], h.closeAll("dialog");
				break;
			case 2:
				var o = a.content = l ? a.content : [a.content || "", "auto"];
				a.content = '<iframe scrolling="' + (a.content[1] || "auto") + '" allowtransparency="true" id="' + c[4] + r + '" name="' + c[4] + r + '" onload="this.className=\'\';" class="layui-layer-load" frameborder="0" src="' + a.content[0] + '"></iframe>';
				break;
			case 3:
				delete a.title, delete a.closeBtn, a.icon === -1 && 0 === a.icon, h.closeAll("loading");
				break;
			case 4:
				l || (a.content = [a.content, "body"]), a.follow = a.content[1], a.content = a.content[0] + '<i class="layui-layer-TipsG"></i>', delete a.title, a.tips = "object" == typeof a.tips ? a.tips : [a.tips, !0], a.tipsMore || h.closeAll("tips")
			}
			if (i.vessel(l, function(e, t, n) {
				s.append(e[0]), l ?
				function() {
					2 == a.type || 4 == a.type ?
					function() {
						p("body").append(e[1])
					}() : function() {
						o.parents("." + c[0])[0] || (o.data("display", o.css("display")).show().addClass("layui-layer-wrap").wrap(e[1]), p("#" + c[0] + r).find("." + c[5]).before(t))
					}()
				}() : s.append(e[1]), p(".layui-layer-move")[0] || s.append(d.moveElem = n), i.layero = p("#" + c[0] + r), a.scrollbar || c.html.css("overflow", "hidden").attr("layer-full", r)
			}).auto(r), p("#layui-layer-shade" + i.index).css({
				"background-color": a.shade[1] || "#000",
				opacity: a.shade[0] || a.shade
			}), 2 == a.type && 6 == h.ie && i.layero.find("iframe").attr("src", o[0]), 4 == a.type ? i.tips() : i.offset(), a.fixed && u.on("resize", function() {
				i.offset(), (/^\d+%$/.test(a.area[0]) || /^\d+%$/.test(a.area[1])) && i.auto(r), 4 == a.type && i.tips()
			}), a.time <= 0 || setTimeout(function() {
				h.close(i.index)
			}, a.time), i.move().callback(), c.anim[a.anim]) {
				var e = "layer-anim " + c.anim[a.anim];
				i.layero.addClass(e).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
					p(this).removeClass(e)
				})
			}
			a.isOutAnim && i.layero.data("isOutAnim", !0)
		}
	}, n.pt.auto = function(e) {
		var t = this,
			n = t.config,
			i = p("#" + c[0] + e);
		"" === n.area[0] && n.maxWidth > 0 && (h.ie && h.ie < 8 && n.btn && i.width(i.innerWidth()), i.outerWidth() > n.maxWidth && i.width(n.maxWidth));
		var a = [i.innerWidth(), i.innerHeight()],
			r = i.find(c[1]).outerHeight() || 0,
			o = i.find("." + c[6]).outerHeight() || 0,
			l = function(e) {
				e = i.find(e), e.height(a[1] - r - o - 2 * (0 | parseFloat(e.css("padding-top"))))
			};
		switch (n.type) {
		case 2:
			l("iframe");
			break;
		default:
			"" === n.area[1] ? n.maxHeight > 0 && i.outerHeight() > n.maxHeight ? (a[1] = n.maxHeight, l("." + c[5])) : n.fixed && a[1] >= u.height() && (a[1] = u.height(), l("." + c[5])) : l("." + c[5])
		}
		return t
	}, n.pt.offset = function() {
		var e = this,
			t = e.config,
			n = e.layero,
			i = [n.outerWidth(), n.outerHeight()],
			a = "object" == typeof t.offset;
		e.offsetTop = (u.height() - i[1]) / 2, e.offsetLeft = (u.width() - i[0]) / 2, a ? (e.offsetTop = t.offset[0], e.offsetLeft = t.offset[1] || e.offsetLeft) : "auto" !== t.offset && ("t" === t.offset ? e.offsetTop = 0 : "r" === t.offset ? e.offsetLeft = u.width() - i[0] : "b" === t.offset ? e.offsetTop = u.height() - i[1] : "l" === t.offset ? e.offsetLeft = 0 : "lt" === t.offset ? (e.offsetTop = 0, e.offsetLeft = 0) : "lb" === t.offset ? (e.offsetTop = u.height() - i[1], e.offsetLeft = 0) : "rt" === t.offset ? (e.offsetTop = 0, e.offsetLeft = u.width() - i[0]) : "rb" === t.offset ? (e.offsetTop = u.height() - i[1], e.offsetLeft = u.width() - i[0]) : e.offsetTop = t.offset), t.fixed || (e.offsetTop = /%$/.test(e.offsetTop) ? u.height() * parseFloat(e.offsetTop) / 100 : parseFloat(e.offsetTop), e.offsetLeft = /%$/.test(e.offsetLeft) ? u.width() * parseFloat(e.offsetLeft) / 100 : parseFloat(e.offsetLeft), e.offsetTop += u.scrollTop(), e.offsetLeft += u.scrollLeft()), n.attr("minLeft") && (e.offsetTop = u.height() - (n.find(c[1]).outerHeight() || 0), e.offsetLeft = n.css("left")), n.css({
			top: e.offsetTop,
			left: e.offsetLeft
		})
	}, n.pt.tips = function() {
		var e = this,
			t = e.config,
			n = e.layero,
			i = [n.outerWidth(), n.outerHeight()],
			a = p(t.follow);
		a[0] || (a = p("body"));
		var r = {
			width: a.outerWidth(),
			height: a.outerHeight(),
			top: a.offset().top,
			left: a.offset().left
		},
			o = n.find(".layui-layer-TipsG"),
			l = t.tips[0];
		t.tips[1] || o.remove(), r.autoLeft = function() {
			r.left + i[0] - u.width() > 0 ? (r.tipLeft = r.left + r.width - i[0], o.css({
				right: 12,
				left: "auto"
			})) : r.tipLeft = r.left
		}, r.where = [function() {
			r.autoLeft(), r.tipTop = r.top - i[1] - 10, o.removeClass("layui-layer-TipsB").addClass("layui-layer-TipsT").css("border-right-color", t.tips[1])
		}, function() {
			r.tipLeft = r.left + r.width + 10, r.tipTop = r.top, o.removeClass("layui-layer-TipsL").addClass("layui-layer-TipsR").css("border-bottom-color", t.tips[1])
		}, function() {
			r.autoLeft(), r.tipTop = r.top + r.height + 10, o.removeClass("layui-layer-TipsT").addClass("layui-layer-TipsB").css("border-right-color", t.tips[1])
		}, function() {
			r.tipLeft = r.left - i[0] - 10, r.tipTop = r.top, o.removeClass("layui-layer-TipsR").addClass("layui-layer-TipsL").css("border-bottom-color", t.tips[1])
		}], r.where[l - 1](), 1 === l ? r.top - (u.scrollTop() + i[1] + 16) < 0 && r.where[2]() : 2 === l ? u.width() - (r.left + r.width + i[0] + 16) > 0 || r.where[3]() : 3 === l ? r.top - u.scrollTop() + r.height + i[1] + 16 - u.height() > 0 && r.where[0]() : 4 === l && i[0] + 16 - r.left > 0 && r.where[1](), n.find("." + c[5]).css({
			"background-color": t.tips[1],
			"padding-right": t.closeBtn ? "30px" : ""
		}), n.css({
			left: r.tipLeft - (t.fixed ? u.scrollLeft() : 0),
			top: r.tipTop - (t.fixed ? u.scrollTop() : 0)
		})
	}, n.pt.move = function() {
		var o = this,
			l = o.config,
			e = p(document),
			s = o.layero,
			t = s.find(l.move),
			n = s.find(".layui-layer-resize"),
			c = {};
		return l.move && t.css("cursor", "move"), t.on("mousedown", function(e) {
			e.preventDefault(), l.move && (c.moveStart = !0, c.offset = [e.clientX - parseFloat(s.css("left")), e.clientY - parseFloat(s.css("top"))], d.moveElem.css("cursor", "move").show())
		}), n.on("mousedown", function(e) {
			e.preventDefault(), c.resizeStart = !0, c.offset = [e.clientX, e.clientY], c.area = [s.outerWidth(), s.outerHeight()], d.moveElem.css("cursor", "se-resize").show()
		}), e.on("mousemove", function(e) {
			if (c.moveStart) {
				var t = e.clientX - c.offset[0],
					n = e.clientY - c.offset[1],
					i = "fixed" === s.css("position");
				if (e.preventDefault(), c.stX = i ? 0 : u.scrollLeft(), c.stY = i ? 0 : u.scrollTop(), !l.moveOut) {
					var a = u.width() - s.outerWidth() + c.stX,
						r = u.height() - s.outerHeight() + c.stY;
					t < c.stX && (t = c.stX), t > a && (t = a), n < c.stY && (n = c.stY), n > r && (n = r)
				}
				s.css({
					left: t,
					top: n
				})
			}
			if (l.resize && c.resizeStart) {
				var t = e.clientX - c.offset[0],
					n = e.clientY - c.offset[1];
				e.preventDefault(), h.style(o.index, {
					width: c.area[0] + t,
					height: c.area[1] + n
				}), c.isResize = !0, l.resizing && l.resizing(s)
			}
		}).on("mouseup", function(e) {
			c.moveStart && (delete c.moveStart, d.moveElem.hide(), l.moveEnd && l.moveEnd(s)), c.resizeStart && (delete c.resizeStart, d.moveElem.hide())
		}), o
	}, n.pt.callback = function() {
		function e() {
			var e = a.cancel && a.cancel(n.index, i);
			e === !1 || h.close(n.index)
		}
		var n = this,
			i = n.layero,
			a = n.config;
		n.openLayer(), a.success && (2 == a.type ? i.find("iframe").on("load", function() {
			a.success(i, n.index)
		}) : a.success(i, n.index)), 6 == h.ie && n.IE6(i), i.find("." + c[6]).children("a").on("click", function() {
			var e = p(this).index();
			if (0 === e) a.yes ? a.yes(n.index, i) : a.btn1 ? a.btn1(n.index, i) : h.close(n.index);
			else {
				var t = a["btn" + (e + 1)] && a["btn" + (e + 1)](n.index, i);
				t === !1 || h.close(n.index)
			}
		}), i.find("." + c[7]).on("click", e), a.shadeClose && p("#layui-layer-shade" + n.index).on("click", function() {
			h.close(n.index)
		}), i.find(".layui-layer-min").on("click", function() {
			var e = a.min && a.min(i);
			e === !1 || h.min(n.index, a)
		}), i.find(".layui-layer-max").on("click", function() {
			p(this).hasClass("layui-layer-maxmin") ? (h.restore(n.index), a.restore && a.restore(i)) : (h.full(n.index, a), setTimeout(function() {
				a.full && a.full(i)
			}, 100))
		}), a.end && (d.end[n.index] = a.end)
	}, d.reselect = function() {
		p.each(p("select"), function(e, t) {
			var n = p(this);
			n.parents("." + c[0])[0] || 1 == n.attr("layer") && p("." + c[0]).length < 1 && n.removeAttr("layer").show(), n = null
		})
	}, n.pt.IE6 = function(e) {
		p("select").each(function(e, t) {
			var n = p(this);
			n.parents("." + c[0])[0] || "none" === n.css("display") || n.attr({
				layer: "1"
			}).hide(), n = null
		})
	}, n.pt.openLayer = function() {
		var e = this;
		h.zIndex = e.config.zIndex, h.setTop = function(e) {
			var t = function() {
					h.zIndex++, e.css("z-index", h.zIndex + 1)
				};
			return h.zIndex = parseInt(e[0].style.zIndex), e.on("mousedown", t), h.zIndex
		}
	}, d.record = function(e) {
		var t = [e.width(), e.height(), e.position().top, e.position().left + parseFloat(e.css("margin-left"))];
		e.find(".layui-layer-max").addClass("layui-layer-maxmin"), e.attr({
			area: t
		})
	}, d.rescollbar = function(e) {
		c.html.attr("layer-full") == e && (c.html[0].style.removeProperty ? c.html[0].style.removeProperty("overflow") : c.html[0].style.removeAttribute("overflow"), c.html.removeAttr("layer-full"))
	}, f.layer = h, h.getChildFrame = function(e, t) {
		return t = t || p("." + c[4]).attr("times"), p("#" + c[0] + t).find("iframe").contents().find(e)
	}, h.getFrameIndex = function(e) {
		return p("#" + e).parents("." + c[4]).attr("times")
	}, h.iframeAuto = function(e) {
		if (e) {
			var t = h.getChildFrame("html", e).outerHeight(),
				n = p("#" + c[0] + e),
				i = n.find(c[1]).outerHeight() || 0,
				a = n.find("." + c[6]).outerHeight() || 0;
			n.css({
				height: t + i + a
			}), n.find("iframe").css({
				height: t
			})
		}
	}, h.iframeSrc = function(e, t) {
		p("#" + c[0] + e).find("iframe").attr("src", t)
	}, h.style = function(e, t, n) {
		var i = p("#" + c[0] + e),
			a = i.find(".layui-layer-content"),
			r = i.attr("type"),
			o = i.find(c[1]).outerHeight() || 0,
			l = i.find("." + c[6]).outerHeight() || 0;
		i.attr("minLeft");
		r !== d.type[3] && r !== d.type[4] && (n || (parseFloat(t.width) <= 260 && (t.width = 260), parseFloat(t.height) - o - l <= 64 && (t.height = 64 + o + l)), i.css(t), l = i.find("." + c[6]).outerHeight(), r === d.type[2] ? i.find("iframe").css({
			height: parseFloat(t.height) - o - l
		}) : a.css({
			height: parseFloat(t.height) - o - l - parseFloat(a.css("padding-top")) - parseFloat(a.css("padding-bottom"))
		}))
	}, h.min = function(e, t) {
		var n = p("#" + c[0] + e),
			i = n.find(c[1]).outerHeight() || 0,
			a = n.attr("minLeft") || 181 * d.minIndex + "px",
			r = n.css("position");
		d.record(n), d.minLeft[0] && (a = d.minLeft[0], d.minLeft.shift()), n.attr("position", r), h.style(e, {
			width: 180,
			height: i,
			left: a,
			top: u.height() - i,
			position: "fixed",
			overflow: "hidden"
		}, !0), n.find(".layui-layer-min").hide(), "page" === n.attr("type") && n.find(c[4]).hide(), d.rescollbar(e), n.attr("minLeft") || d.minIndex++, n.attr("minLeft", a)
	}, h.restore = function(e) {
		var t = p("#" + c[0] + e),
			n = t.attr("area").split(",");
		t.attr("type");
		h.style(e, {
			width: parseFloat(n[0]),
			height: parseFloat(n[1]),
			top: parseFloat(n[2]),
			left: parseFloat(n[3]),
			position: t.attr("position"),
			overflow: "visible"
		}, !0), t.find(".layui-layer-max").removeClass("layui-layer-maxmin"), t.find(".layui-layer-min").show(), "page" === t.attr("type") && t.find(c[4]).show(), d.rescollbar(e)
	}, h.full = function(t) {
		var e, n = p("#" + c[0] + t);
		d.record(n), c.html.attr("layer-full") || c.html.css("overflow", "hidden").attr("layer-full", t), clearTimeout(e), e = setTimeout(function() {
			var e = "fixed" === n.css("position");
			h.style(t, {
				top: e ? 0 : u.scrollTop(),
				left: e ? 0 : u.scrollLeft(),
				width: u.width(),
				height: u.height()
			}, !0), n.find(".layui-layer-min").hide()
		}, 100)
	}, h.title = function(e, t) {
		var n = p("#" + c[0] + (t || h.index)).find(c[1]);
		n.html(e)
	}, h.close = function(i) {
		var a = p("#" + c[0] + i),
			r = a.attr("type"),
			e = "layer-anim-close";
		if (a[0]) {
			var o = "layui-layer-wrap",
				t = function() {
					if (r === d.type[1] && "object" === a.attr("conType")) {
						a.children(":not(." + c[5] + ")").remove();
						for (var e = a.find("." + o), t = 0; t < 2; t++) e.unwrap();
						e.css("display", e.data("display")).removeClass(o)
					} else {
						if (r === d.type[2]) try {
							var n = p("#" + c[4] + i)[0];
							n.contentWindow.document.write(""), n.contentWindow.close(), a.find("." + c[5])[0].removeChild(n)
						} catch (e) {}
						a[0].innerHTML = "", a.remove()
					}
					"function" == typeof d.end[i] && d.end[i](), delete d.end[i]
				};
			a.data("isOutAnim") && a.addClass("layer-anim " + e), p("#layui-layer-moves, #layui-layer-shade" + i).remove(), 6 == h.ie && d.reselect(), d.rescollbar(i), a.attr("minLeft") && (d.minIndex--, d.minLeft.push(a.attr("minLeft"))), h.ie && h.ie < 10 || !a.data("isOutAnim") ? t() : setTimeout(function() {
				t()
			}, 200)
		}
	}, h.closeAll = function(n) {
		p.each(p("." + c[0]), function() {
			var e = p(this),
				t = n ? e.attr("type") === n : 1;
			t && h.close(e.attr("times")), t = null
		})
	};
	var t = h.cache || {},
		y = function(e) {
			return t.skin ? " " + t.skin + " " + t.skin + "-" + e : ""
		};
	h.prompt = function(n, i) {
		var e = "";
		if (n = n || {}, "function" == typeof n && (i = n), n.area) {
			var t = n.area;
			e = 'style="width: ' + t[0] + "; height: " + t[1] + ';"', delete n.area
		}
		var a, r = 2 == n.formType ? '<textarea class="layui-layer-input"' + e + "></textarea>" : function() {
				return '<input type="' + (1 == n.formType ? "password" : "text") + '" class="layui-layer-input">'
			}(),
			o = n.success;
		return delete n.success, h.open(p.extend({
			type: 1,
			btn: ["&#x786E;&#x5B9A;", "&#x53D6;&#x6D88;"],
			content: r,
			skin: "layui-layer-prompt" + y("prompt"),
			maxWidth: u.width(),
			success: function(e) {
				a = e.find(".layui-layer-input"), a.val(n.value || "").focus(), "function" == typeof o && o(e)
			},
			resize: !1,
			yes: function(e) {
				var t = a.val();
				"" === t ? a.focus() : t.length > (n.maxlength || 500) ? h.tips("&#x6700;&#x591A;&#x8F93;&#x5165;" + (n.maxlength || 500) + "&#x4E2A;&#x5B57;&#x6570;", a, {
					tips: 1
				}) : i && i(t, e, a)
			}
		}, n))
	}, h.tab = function(a) {
		a = a || {};
		var i = a.tab || {},
			r = "layui-this",
			n = a.success;
		return delete a.success, h.open(p.extend({
			type: 1,
			skin: "layui-layer-tab" + y("tab"),
			resize: !1,
			title: function() {
				var e = i.length,
					t = 1,
					n = "";
				if (e > 0) for (n = '<span class="' + r + '">' + i[0].title + "</span>"; t < e; t++) n += "<span>" + i[t].title + "</span>";
				return n
			}(),
			content: '<ul class="layui-layer-tabmain">' +
			function() {
				var e = i.length,
					t = 1,
					n = "";
				if (e > 0) for (n = '<li class="layui-layer-tabli ' + r + '">' + (i[0].content || "no content") + "</li>"; t < e; t++) n += '<li class="layui-layer-tabli">' + (i[t].content || "no  content") + "</li>";
				return n
			}() + "</ul>",
			success: function(e) {
				var t = e.find(".layui-layer-title").children(),
					i = e.find(".layui-layer-tabmain").children();
				t.on("mousedown", function(e) {
					e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0;
					var t = p(this),
						n = t.index();
					t.addClass(r).siblings().removeClass(r), i.eq(n).show().siblings().hide(), "function" == typeof a.change && a.change(n)
				}), "function" == typeof n && n(e)
			}
		}, a))
	}, h.photos = function(a, e, t) {
		function n(e, t, n) {
			var i = new Image;
			return i.src = e, i.complete ? t(i) : (i.onload = function() {
				i.onload = null, t(i)
			}, void(i.onerror = function(e) {
				i.onerror = null, n(e)
			}))
		}
		var r = {};
		if (a = a || {}, a.photos) {
			var i = a.photos.constructor === Object,
				o = i ? a.photos : {},
				l = o.data || [],
				s = o.start || 0;
			r.imgIndex = (0 | s) + 1, a.img = a.img || "img";
			var c = a.success;
			if (delete a.success, i) {
				if (0 === l.length) return h.msg("&#x6CA1;&#x6709;&#x56FE;&#x7247;")
			} else {
				var u = p(a.photos),
					d = function() {
						l = [], u.find(a.img).each(function(e) {
							var t = p(this);
							t.attr("layer-index", e), l.push({
								alt: t.attr("alt"),
								pid: t.attr("layer-pid"),
								src: t.attr("layer-src") || t.attr("src"),
								thumb: t.attr("src")
							})
						})
					};
				if (d(), 0 === l.length) return;
				if (e || u.on("click", a.img, function() {
					var e = p(this),
						t = e.attr("layer-index");
					h.photos(p.extend(a, {
						photos: {
							start: t,
							data: l,
							tab: a.tab
						},
						full: a.full
					}), !0), d()
				}), !e) return
			}
			r.imgprev = function(e) {
				r.imgIndex--, r.imgIndex < 1 && (r.imgIndex = l.length), r.tabimg(e)
			}, r.imgnext = function(e, t) {
				r.imgIndex++, r.imgIndex > l.length && (r.imgIndex = 1, t) || r.tabimg(e)
			}, r.keyup = function(e) {
				if (!r.end) {
					var t = e.keyCode;
					e.preventDefault(), 37 === t ? r.imgprev(!0) : 39 === t ? r.imgnext(!0) : 27 === t && h.close(r.index)
				}
			}, r.tabimg = function(e) {
				if (!(l.length <= 1)) return o.start = r.imgIndex - 1, h.close(r.index), h.photos(a, !0, e)
			}, r.event = function() {
				r.bigimg.hover(function() {
					r.imgsee.show()
				}, function() {
					r.imgsee.hide()
				}), r.bigimg.find(".layui-layer-imgprev").on("click", function(e) {
					e.preventDefault(), r.imgprev()
				}), r.bigimg.find(".layui-layer-imgnext").on("click", function(e) {
					e.preventDefault(), r.imgnext()
				}), p(document).on("keyup", r.keyup)
			}, r.loadi = h.load(1, {
				shade: !("shade" in a) && .9,
				scrollbar: !1
			}), n(l[s].src, function(i) {
				h.close(r.loadi), r.index = h.open(p.extend({
					type: 1,
					id: "layui-layer-photos",
					area: function() {
						var e = [i.width, i.height],
							t = [p(f).width() - 100, p(f).height() - 100];
						if (!a.full && (e[0] > t[0] || e[1] > t[1])) {
							var n = [e[0] / t[0], e[1] / t[1]];
							n[0] > n[1] ? (e[0] = e[0] / n[0], e[1] = e[1] / n[0]) : n[0] < n[1] && (e[0] = e[0] / n[1], e[1] = e[1] / n[1])
						}
						return [e[0] + "px", e[1] + "px"]
					}(),
					title: !1,
					shade: .9,
					shadeClose: !0,
					closeBtn: !1,
					move: ".layui-layer-phimg img",
					moveType: 1,
					scrollbar: !1,
					moveOut: !0,
					isOutAnim: !1,
					skin: "layui-layer-photos" + y("photos"),
					content: '<div class="layui-layer-phimg"><img src="' + l[s].src + '" alt="' + (l[s].alt || "") + '" layer-pid="' + l[s].pid + '"><div class="layui-layer-imgsee">' + (l.length > 1 ? '<span class="layui-layer-imguide"><a href="javascript:;" class="layui-layer-iconext layui-layer-imgprev"></a><a href="javascript:;" class="layui-layer-iconext layui-layer-imgnext"></a></span>' : "") + '<div class="layui-layer-imgbar" style="display:' + (t ? "block" : "") + '"><span class="layui-layer-imgtit"><a href="javascript:;">' + (l[s].alt || "") + "</a><em>" + r.imgIndex + "/" + l.length + "</em></span></div></div></div>",
					success: function(e, t) {
						r.bigimg = e.find(".layui-layer-phimg"), r.imgsee = e.find(".layui-layer-imguide,.layui-layer-imgbar"), r.event(e), a.tab && a.tab(l[s], e), "function" == typeof c && c(e)
					},
					end: function() {
						r.end = !0, p(document).off("keyup", r.keyup)
					}
				}, a))
			}, function() {
				h.close(r.loadi), h.msg("&#x5F53;&#x524D;&#x56FE;&#x7247;&#x5730;&#x5740;&#x5F02;&#x5E38;<br>&#x662F;&#x5426;&#x7EE7;&#x7EED;&#x67E5;&#x770B;&#x4E0B;&#x4E00;&#x5F20;&#xFF1F;", {
					time: 3e4,
					btn: ["&#x4E0B;&#x4E00;&#x5F20;", "&#x4E0D;&#x770B;&#x4E86;"],
					yes: function() {
						l.length > 1 && r.imgnext(!0, !0)
					}
				})
			})
		}
	}, d.run = function(e) {
		p = e, u = p(f), c.html = p("html"), h.open = function(e) {
			var t = new n(e);
			return t.index
		}
	}, f.layui && layui.define ? (h.ready(), layui.define("jquery", function(e) {
		h.path = layui.cache.dir, d.run(layui.$), f.layer = h, e("layer", h)
	})) : "function" == typeof define && define.amd ? define(["jquery"], function() {
		return d.run(f.jQuery), h
	}) : function() {
		d.run(f.jQuery), h.ready()
	}()
}(window);
layui.define("jquery", function(e) {
	"use strict";
	var c = layui.$,
		u = (layui.hint(), layui.device()),
		d = "element",
		f = "layui-this",
		p = "layui-show",
		t = function() {
			this.config = {}
		};
	t.prototype.set = function(e) {
		var t = this;
		return c.extend(!0, t.config, e), t
	}, t.prototype.on = function(e, t) {
		return layui.onevent.call(this, d, e, t)
	}, t.prototype.tabAdd = function(e, t) {
		var n = ".layui-tab-title",
			i = c(".layui-tab[lay-filter=" + e + "]"),
			a = i.children(n),
			r = a.children(".layui-tab-bar"),
			o = i.children(".layui-tab-content"),
			l = '<li lay-id="' + (t.id || "") + '"' + (t.attr ? ' lay-attr="' + t.attr + '"' : "") + ">" + (t.title || "unnaming") + "</li>";
		return r[0] ? r.before(l) : a.append(l), o.append('<div class="layui-tab-item">' + (t.content || "") + "</div>"), w.hideTabMore(!0), w.tabAuto(), this
	}, t.prototype.tabDelete = function(e, t) {
		var n = ".layui-tab-title",
			i = c(".layui-tab[lay-filter=" + e + "]"),
			a = i.children(n),
			r = a.find('>li[lay-id="' + t + '"]');
		return w.tabDelete(null, r), this
	}, t.prototype.tabChange = function(e, t) {
		var n = ".layui-tab-title",
			i = c(".layui-tab[lay-filter=" + e + "]"),
			a = i.children(n),
			r = a.find('>li[lay-id="' + t + '"]');
		return w.tabClick.call(r[0], null, null, r), this
	}, t.prototype.tab = function(n) {
		n = n || {}, i.on("click", n.headerElem, function(e) {
			var t = c(this).index();
			w.tabClick.call(this, e, t, null, n)
		})
	}, t.prototype.progress = function(e, t) {
		var n = "layui-progress",
			i = c("." + n + "[lay-filter=" + e + "]"),
			a = i.find("." + n + "-bar"),
			r = a.find("." + n + "-text");
		return a.css("width", t), r.text(t), this
	};
	var h = ".layui-nav",
		y = "layui-nav-item",
		m = "layui-nav-bar",
		v = "layui-nav-tree",
		g = "layui-nav-child",
		b = "layui-nav-more",
		x = "layui-anim layui-anim-upbit",
		w = {
			tabClick: function(e, t, n, i) {
				i = i || {};
				var a = n || c(this),
					t = t || a.parent().children("li").index(a),
					r = i.headerElem ? a.parent() : a.parents(".layui-tab").eq(0),
					o = i.bodyElem ? c(i.bodyElem) : r.children(".layui-tab-content").children(".layui-tab-item"),
					l = a.find("a"),
					s = r.attr("lay-filter");
				"javascript:;" !== l.attr("href") && "_blank" === l.attr("target") || (a.addClass(f).siblings().removeClass(f), o.eq(t).addClass(p).siblings().removeClass(p)), layui.event.call(this, d, "tab(" + s + ")", {
					elem: r,
					index: t
				})
			},
			tabDelete: function(e, t) {
				var n = t || c(this).parent(),
					i = n.index(),
					a = n.parents(".layui-tab").eq(0),
					r = a.children(".layui-tab-content").children(".layui-tab-item"),
					o = a.attr("lay-filter");
				n.hasClass(f) && (n.next()[0] ? w.tabClick.call(n.next()[0], null, i + 1) : n.prev()[0] && w.tabClick.call(n.prev()[0], null, i - 1)), n.remove(), r.eq(i).remove(), setTimeout(function() {
					w.tabAuto()
				}, 50), layui.event.call(this, d, "tabDelete(" + o + ")", {
					elem: a,
					index: i
				})
			},
			tabAuto: function() {
				var a = "layui-tab-more",
					r = "layui-tab-bar",
					o = "layui-tab-close",
					l = this;
				c(".layui-tab").each(function() {
					var e = c(this),
						t = e.children(".layui-tab-title"),
						n = (e.children(".layui-tab-content").children(".layui-tab-item"), 'lay-stope="tabmore"'),
						i = c('<span class="layui-unselect layui-tab-bar" ' + n + "><i " + n + ' class="layui-icon">&#xe61a;</i></span>');
					if (l === window && 8 != u.ie && w.hideTabMore(!0), e.attr("lay-allowClose") && t.find("li").each(function() {
						var e = c(this);
						if (!e.find("." + o)[0]) {
							var t = c('<i class="layui-icon layui-unselect ' + o + '">&#x1006;</i>');
							t.on("click", w.tabDelete), e.append(t)
						}
					}), "string" != typeof e.attr("lay-unauto")) if (t.prop("scrollWidth") > t.outerWidth() + 1) {
						if (t.find("." + r)[0]) return;
						t.append(i), e.attr("overflow", ""), i.on("click", function(e) {
							t[this.title ? "removeClass" : "addClass"](a), this.title = this.title ? "" : "收缩"
						})
					} else t.find("." + r).remove(), e.removeAttr("overflow")
				})
			},
			hideTabMore: function(e) {
				var t = c(".layui-tab-title");
				e !== !0 && "tabmore" === c(e.target).attr("lay-stope") || (t.removeClass("layui-tab-more"), t.find(".layui-tab-bar").attr("title", ""))
			},
			clickThis: function() {
				var e = c(this),
					t = e.parents(h),
					n = t.attr("lay-filter"),
					i = e.parent(),
					a = e.siblings("." + g),
					r = "string" == typeof i.attr("lay-unselect");
				"javascript:;" !== e.attr("href") && "_blank" === e.attr("target") || r || a[0] || (t.find("." + f).removeClass(f), i.addClass(f)), t.hasClass(v) && (a.removeClass(x), a[0] && (i["none" === a.css("display") ? "addClass" : "removeClass"](y + "ed"), "all" === t.attr("lay-shrink") && i.siblings().removeClass(y + "ed"))), layui.event.call(this, d, "nav(" + n + ")", e)
			},
			collapse: function() {
				var e = c(this),
					t = e.find(".layui-colla-icon"),
					n = e.siblings(".layui-colla-content"),
					i = e.parents(".layui-collapse").eq(0),
					a = i.attr("lay-filter"),
					r = "none" === n.css("display");
				if ("string" == typeof i.attr("lay-accordion")) {
					var o = i.children(".layui-colla-item").children("." + p);
					o.siblings(".layui-colla-title").children(".layui-colla-icon").html("&#xe602;"), o.removeClass(p)
				}
				n[r ? "addClass" : "removeClass"](p), t.html(r ? "&#xe61a;" : "&#xe602;"), layui.event.call(this, d, "collapse(" + a + ")", {
					title: e,
					content: n,
					show: r
				})
			}
		};
	t.prototype.init = function(e, t) {
		var n = function() {
				return t ? '[lay-filter="' + t + '"]' : ""
			}(),
			i = {
				tab: function() {
					w.tabAuto.call({})
				},
				nav: function() {
					var r = 200,
						o = {},
						l = {},
						s = {},
						a = function(e, t, n) {
							var i = c(this),
								a = i.find("." + g);
							t.hasClass(v) ? e.css({
								top: i.position().top,
								height: i.children("a").outerHeight(),
								opacity: 1
							}) : (a.addClass(x), e.css({
								left: i.position().left + parseFloat(i.css("marginLeft")),
								top: i.position().top + i.height() - e.height()
							}), o[n] = setTimeout(function() {
								e.css({
									width: i.width(),
									opacity: 1
								})
							}, u.ie && u.ie < 10 ? 0 : r), clearTimeout(s[n]), "block" === a.css("display") && clearTimeout(l[n]), l[n] = setTimeout(function() {
								a.addClass(p), i.find("." + b).addClass(b + "d")
							}, 300))
						};
					c(h + n).each(function(e) {
						var t = c(this),
							n = c('<span class="' + m + '"></span>'),
							i = t.find("." + y);
						t.find("." + m)[0] || (t.append(n), i.on("mouseenter", function() {
							a.call(this, n, t, e)
						}).on("mouseleave", function() {
							t.hasClass(v) || (clearTimeout(l[e]), l[e] = setTimeout(function() {
								t.find("." + g).removeClass(p), t.find("." + b).removeClass(b + "d")
							}, 300))
						}), t.on("mouseleave", function() {
							clearTimeout(o[e]), s[e] = setTimeout(function() {
								t.hasClass(v) ? n.css({
									height: 0,
									top: n.position().top + n.height() / 2,
									opacity: 0
								}) : n.css({
									width: 0,
									left: n.position().left + n.width() / 2,
									opacity: 0
								})
							}, r)
						})), i.find("a").each(function() {
							var e = c(this),
								t = (e.parent(), e.siblings("." + g));
							t[0] && !e.children("." + b)[0] && e.append('<span class="' + b + '"></span>'), e.off("click", w.clickThis).on("click", w.clickThis)
						})
					})
				},
				breadcrumb: function() {
					var e = ".layui-breadcrumb";
					c(e + n).each(function() {
						var e = c(this),
							t = "lay-separator",
							n = e.attr(t) || "/",
							i = e.find("a");
						i.next("span[" + t + "]")[0] || (i.each(function(e) {
							e !== i.length - 1 && c(this).after("<span " + t + ">" + n + "</span>")
						}), e.css("visibility", "visible"))
					})
				},
				progress: function() {
					var i = "layui-progress";
					c("." + i + n).each(function() {
						var e = c(this),
							t = e.find(".layui-progress-bar"),
							n = t.attr("lay-percent");
						t.css("width", function() {
							return /^.+\/.+$/.test(n) ? 100 * new Function("return " + n)() + "%" : n
						}()), e.attr("lay-showPercent") && setTimeout(function() {
							t.html('<span class="' + i + '-text">' + n + "</span>")
						}, 350)
					})
				},
				collapse: function() {
					var e = "layui-collapse";
					c("." + e + n).each(function() {
						var e = c(this).find(".layui-colla-item");
						e.each(function() {
							var e = c(this),
								t = e.find(".layui-colla-title"),
								n = e.find(".layui-colla-content"),
								i = "none" === n.css("display");
							t.find(".layui-colla-icon").remove(), t.append('<i class="layui-icon layui-colla-icon">' + (i ? "&#xe602;" : "&#xe61a;") + "</i>"), t.off("click", w.collapse).on("click", w.collapse)
						})
					})
				}
			};
		return i[e] ? i[e]() : layui.each(i, function(e, t) {
			t()
		})
	}, t.prototype.render = t.prototype.init;
	var n = new t,
		i = c(document);
	n.render();
	var a = ".layui-tab-title li";
	i.on("click", a, w.tabClick), i.on("click", w.hideTabMore), c(window).on("resize", w.tabAuto), e(d, n)
});
layui.define("layer", function(e) {
	"use strict";
	var y = layui.$,
		t = layui.layer,
		n = layui.hint(),
		m = layui.device(),
		i = {
			config: {},
			set: function(e) {
				var t = this;
				return t.config = y.extend({}, t.config, e), t
			},
			on: function(e, t) {
				return layui.onevent.call(this, r, e, t)
			}
		},
		a = function() {
			var t = this;
			return {
				upload: function(e) {
					t.upload.call(t, e)
				},
				config: t.config
			}
		},
		r = "upload",
		o = "layui-upload-file",
		l = "layui-upload-form",
		v = "layui-upload-iframe",
		g = "layui-upload-choose",
		b = function(e) {
			var t = this;
			t.config = y.extend({}, t.config, i.config, e), t.render()
		};
	b.prototype.config = {
		accept: "images",
		exts: "",
		auto: !0,
		bindAction: "",
		url: "",
		field: "file",
		method: "post",
		data: {},
		drag: !0,
		size: 0,
		number: 0,
		multiple: !1
	}, b.prototype.render = function(e) {
		var t = this,
			e = t.config;
		e.elem = y(e.elem), e.bindAction = y(e.bindAction), t.file(), t.events()
	}, b.prototype.file = function() {
		var e = this,
			t = e.config,
			n = e.elemFile = y(['<input class="' + o + '" type="file" accept="' + t.acceptMime + '" name="' + t.field + '"', t.multiple ? " multiple" : "", ">"].join("")),
			i = t.elem.next();
		(i.hasClass(o) || i.hasClass(l)) && i.remove(), m.ie && m.ie < 10 && t.elem.wrap('<div class="layui-upload-wrap"></div>'), e.isFile() ? (e.elemFile = t.elem, t.field = t.elem[0].name) : t.elem.after(n), m.ie && m.ie < 10 && e.initIE()
	}, b.prototype.initIE = function() {
		var e = this,
			t = e.config,
			n = y('<iframe id="' + v + '" class="' + v + '" name="' + v + '" frameborder="0"></iframe>'),
			i = y(['<form target="' + v + '" class="' + l + '" method="post" key="set-mine" enctype="multipart/form-data" action="' + t.url + '">', "</form>"].join(""));
		y("#" + v)[0] || y("body").append(n), t.elem.next().hasClass(l) || (e.elemFile.wrap(i), t.elem.next("." + l).append(function() {
			var n = [];
			return layui.each(t.data, function(e, t) {
				t = "function" == typeof t ? t() : t, n.push('<input type="hidden" name="' + e + '" value="' + t + '">')
			}), n.join("")
		}()))
	}, b.prototype.msg = function(e) {
		return t.msg(e, {
			icon: 2,
			shift: 6
		})
	}, b.prototype.isFile = function() {
		var e = this.config.elem[0];
		if (e) return "input" === e.tagName.toLocaleLowerCase() && "file" === e.type
	}, b.prototype.preview = function(i) {
		var e = this;
		window.FileReader && layui.each(e.chooseFiles, function(e, t) {
			var n = new FileReader;
			n.readAsDataURL(t), n.onload = function() {
				i && i(e, t, this.result)
			}
		})
	}, b.prototype.upload = function(o, e) {
		var n, l = this,
			s = l.config,
			c = l.elemFile[0],
			t = function() {
				var i = 0,
					a = 0,
					e = o || l.files || l.chooseFiles || c.files,
					r = function() {
						s.multiple && i + a === l.fileLength && "function" == typeof s.allDone && s.allDone({
							total: l.fileLength,
							successful: i,
							aborted: a
						})
					};
				layui.each(e, function(t, e) {
					var n = new FormData;
					n.append(s.field, e), layui.each(s.data, function(e, t) {
						t = "function" == typeof t ? t() : t, n.append(e, t)
					}), y.ajax({
						url: s.url,
						type: "post",
						data: n,
						contentType: !1,
						processData: !1,
						dataType: "json",
						headers: s.headers || {},
						success: function(e) {
							i++, u(t, e), r()
						},
						error: function() {
							a++, l.msg("请求上传接口出现异常"), d(t), r()
						}
					})
				})
			},
			i = function() {
				var n = y("#" + v);
				l.elemFile.parent().submit(), clearInterval(b.timer), b.timer = setInterval(function() {
					var e, t = n.contents().find("body");
					try {
						e = t.text()
					} catch (e) {
						l.msg("获取上传后的响应信息出现异常"), clearInterval(b.timer), d()
					}
					e && (clearInterval(b.timer), t.html(""), u(0, e))
				}, 30)
			},
			u = function(e, t) {
				if (l.elemFile.next("." + g).remove(), c.value = "", "object" != typeof t) try {
					t = JSON.parse(t)
				} catch (e) {
					return t = {}, l.msg("请对上传接口返回有效JSON")
				}
				"function" == typeof s.done && s.done(t, e || 0, function(e) {
					l.upload(e)
				})
			},
			d = function(e) {
				s.auto && (c.value = ""), "function" == typeof s.error && s.error(e || 0, function(e) {
					l.upload(e)
				})
			},
			a = s.exts,
			r = function() {
				var n = [];
				return layui.each(o || l.chooseFiles, function(e, t) {
					n.push(t.name)
				}), n
			}(),
			f = {
				preview: function(e) {
					l.preview(e)
				},
				upload: function(e, t) {
					var n = {};
					n[e] = t, l.upload(n)
				},
				pushFile: function() {
					return l.files = l.files || {}, layui.each(l.chooseFiles, function(e, t) {
						l.files[e] = t
					}), l.files
				},
				resetFile: function(e, t, n) {
					var i = new File([t], n);
					l.files = l.files || {}, l.files[e] = i
				}
			},
			p = function() {
				if ("choose" !== e && !s.auto || (s.choose && s.choose(f), "choose" !== e)) return s.before && s.before(f), m.ie ? m.ie > 9 ? t() : i() : void t()
			};
		if (r = 0 === r.length ? c.value.match(/[^\/\\]+\..+/g) || [] || "" : r, 0 !== r.length) {
			switch (s.accept) {
			case "file":
				if (a && !RegExp("\\w\\.(" + a + ")$", "i").test(escape(r))) return l.msg("选择的文件中包含不支持的格式"), c.value = "";
				break;
			case "video":
				if (!RegExp("\\w\\.(" + (a || "avi|mp4|wma|rmvb|rm|flash|3gp|flv") + ")$", "i").test(escape(r))) return l.msg("选择的视频中包含不支持的格式"), c.value = "";
				break;
			case "audio":
				if (!RegExp("\\w\\.(" + (a || "mp3|wav|mid") + ")$", "i").test(escape(r))) return l.msg("选择的音频中包含不支持的格式"), c.value = "";
				break;
			default:
				if (layui.each(r, function(e, t) {
					RegExp("\\w\\.(" + (a || "jpg|png|gif|bmp|jpeg$") + ")", "i").test(escape(t)) || (n = !0)
				}), n) return l.msg("选择的图片中包含不支持的格式"), c.value = ""
			}
			if (l.fileLength = function() {
				var e = 0,
					t = o || l.files || l.chooseFiles || c.files;
				return layui.each(t, function() {
					e++
				}), e
			}(), s.number && l.fileLength > s.number) return l.msg("同时最多只能上传的数量为：" + s.number);
			if (s.size > 0 && !(m.ie && m.ie < 10)) {
				var h;
				if (layui.each(l.chooseFiles, function(e, t) {
					if (t.size > 1024 * s.size) {
						var n = s.size / 1024;
						n = n >= 1 ? n.toFixed(2) + "MB" : s.size + "KB", c.value = "", h = n
					}
				}), h) return l.msg("文件不能超过" + h)
			}
			p()
		}
	}, b.prototype.events = function() {
		var a = this,
			r = a.config,
			o = function(e) {
				a.chooseFiles = {}, layui.each(e, function(e, t) {
					var n = (new Date).getTime();
					a.chooseFiles[n + "-" + e] = t
				})
			},
			l = function(e, t) {
				var n = a.elemFile,
					i = e.length > 1 ? e.length + "个文件" : (e[0] || {}).name || n[0].value.match(/[^\/\\]+\..+/g) || [] || "";
				n.next().hasClass(g) && n.next().remove(), a.upload(null, "choose"), a.isFile() || r.choose || n.after('<span class="layui-inline ' + g + '">' + i + "</span>")
			};
		r.elem.off("upload.start").on("upload.start", function() {
			var e = y(this),
				t = e.attr("lay-data");
			if (t) try {
				t = new Function("return " + t)(), a.config = y.extend({}, r, t)
			} catch (e) {
				n.error("Upload element property lay-data configuration item has a syntax error: " + t)
			}
			a.config.item = e, a.elemFile[0].click()
		}), m.ie && m.ie < 10 || r.elem.off("upload.over").on("upload.over", function() {
			var e = y(this);
			e.attr("lay-over", "")
		}).off("upload.leave").on("upload.leave", function() {
			var e = y(this);
			e.removeAttr("lay-over")
		}).off("upload.drop").on("upload.drop", function(e, t) {
			var n = y(this),
				i = t.originalEvent.dataTransfer.files || [];
			n.removeAttr("lay-over"), o(i), r.auto ? a.upload(i) : l(i)
		}), a.elemFile.off("upload.change").on("upload.change", function() {
			var e = this.files || [];
			o(e), r.auto ? a.upload() : l(e)
		}), r.bindAction.off("upload.action").on("upload.action", function() {
			a.upload()
		}), r.elem.data("haveEvents") || (a.elemFile.on("change", function() {
			y(this).trigger("upload.change")
		}), r.elem.on("click", function() {
			a.isFile() || y(this).trigger("upload.start")
		}), r.drag && r.elem.on("dragover", function(e) {
			e.preventDefault(), y(this).trigger("upload.over")
		}).on("dragleave", function(e) {
			y(this).trigger("upload.leave")
		}).on("drop", function(e) {
			e.preventDefault(), y(this).trigger("upload.drop", e)
		}), r.bindAction.on("click", function() {
			y(this).trigger("upload.action")
		}), r.elem.data("haveEvents", !0))
	}, i.render = function(e) {
		var t = new b(e);
		return a.call(t)
	}, e(r, i)
});
layui.define("jquery", function(e) {
	"use strict";
	var v = layui.jquery,
		n = {
			config: {},
			index: layui.slider ? layui.slider.index + 1e4 : 0,
			set: function(e) {
				var t = this;
				return t.config = v.extend({}, t.config, e), t
			},
			on: function(e, t) {
				return layui.onevent.call(this, a, e, t)
			}
		},
		i = function() {
			var n = this,
				e = n.config;
			return {
				setValue: function(e, t) {
					return n.slide("set", e, t || 0)
				},
				config: e
			}
		},
		a = "slider",
		m = "layui-disabled",
		g = "layui-slider",
		b = "layui-slider-bar",
		x = "layui-slider-wrap",
		w = "layui-slider-wrap-btn",
		k = "layui-slider-tips",
		o = "layui-slider-input",
		C = "layui-slider-input-txt",
		T = "layui-slider-input-btn",
		E = "layui-slider-hover",
		r = function(e) {
			var t = this;
			t.index = ++n.index, t.config = v.extend({}, t.config, n.config, e), t.render()
		};
	r.prototype.config = {
		type: "default",
		min: 0,
		max: 100,
		value: 0,
		step: 1,
		showstep: !1,
		tips: !0,
		input: !1,
		range: !1,
		height: 200,
		disabled: !1,
		theme: "#009688"
	}, r.prototype.render = function() {
		var o = this,
			l = o.config;
		if (l.min = l.min < 0 ? 0 : l.min, l.range) {
			l.value = "object" == typeof l.value ? l.value : [l.min, l.value];
			var e = Math.min(l.value[0], l.value[1]),
				t = Math.max(l.value[0], l.value[1]);
			l.value[0] = e > l.min ? e : l.min, l.value[1] = t > l.min ? t : l.min, l.value[0] = l.value[0] > l.max ? l.max : l.value[0], l.value[1] = l.value[1] > l.max ? l.max : l.value[1];
			var n = Math.floor((l.value[0] - l.min) / (l.max - l.min) * 100),
				i = Math.floor((l.value[1] - l.min) / (l.max - l.min) * 100),
				a = i - n + "%";
			n += "%", i += "%"
		} else {
			l.value = "object" == typeof l.value ? Math.min(l.value[0], l.value[1]) : l.value, l.value = l.value > l.min ? l.value : l.min;
			var a = Math.floor((l.value - l.min) / (l.max - l.min) * 100) + "%"
		}
		var r = l.disabled ? "#c2c2c2" : l.theme,
			s = '<div class="layui-slider ' + ("vertical" === l.type ? "layui-slider-vertical" : "") + '">' + (l.tips ? '<div class="layui-slider-tips"></div>' : "") + '<div class="layui-slider-bar" style="background:' + r + "; " + ("vertical" === l.type ? "height" : "width") + ":" + a + ";" + ("vertical" === l.type ? "bottom" : "left") + ":" + (n || 0) + ';"></div><div class="layui-slider-wrap" style="' + ("vertical" === l.type ? "bottom" : "left") + ":" + (n || a) + ';"><div class="layui-slider-wrap-btn" style="border: 2px solid ' + r + ';"></div></div>' + (l.range ? '<div class="layui-slider-wrap" style="' + ("vertical" === l.type ? "bottom" : "left") + ":" + i + ';"><div class="layui-slider-wrap-btn" style="border: 2px solid ' + r + ';"></div></div>' : "") + "</div>",
			c = v(l.elem),
			u = c.next("." + g);
		if (u[0] && u.remove(), o.elemTemp = v(s), l.range ? (o.elemTemp.find("." + x).eq(0).data("value", l.value[0]), o.elemTemp.find("." + x).eq(1).data("value", l.value[1])) : o.elemTemp.find("." + x).data("value", l.value), c.html(o.elemTemp), "vertical" === l.type && o.elemTemp.height(l.height + "px"), l.showstep) {
			for (var d = (l.max - l.min) / l.step, f = "", p = 1; p < d + 1; p++) {
				var h = 100 * p / d;
				h < 100 && (f += '<div class="layui-slider-step" style="' + ("vertical" === l.type ? "bottom" : "left") + ":" + h + '%"></div>')
			}
			o.elemTemp.append(f)
		}
		if (l.input && !l.range) {
			var y = v('<div class="layui-slider-input layui-input"><div class="layui-slider-input-txt"><input type="text" class="layui-input"></div><div class="layui-slider-input-btn"><i class="layui-icon layui-icon-up"></i><i class="layui-icon layui-icon-down"></i></div></div>');
			c.css("position", "relative"), c.append(y), c.find("." + C).children("input").val(l.value), "vertical" === l.type ? y.css({
				left: 0,
				top: -48
			}) : o.elemTemp.css("margin-right", y.outerWidth() + 15)
		}
		l.disabled ? (o.elemTemp.addClass(m), o.elemTemp.find("." + w).addClass(m)) : o.slide(), o.elemTemp.find("." + w).on("mouseover", function() {
			var e = "vertical" === l.type ? l.height : o.elemTemp[0].offsetWidth,
				t = o.elemTemp.find("." + x),
				n = "vertical" === l.type ? e - v(this).parent()[0].offsetTop - t.height() : v(this).parent()[0].offsetLeft,
				i = n / e * 100,
				a = v(this).parent().data("value"),
				r = l.setTips ? l.setTips(a) : a;
			o.elemTemp.find("." + k).html(r), "vertical" === l.type ? o.elemTemp.find("." + k).css({
				bottom: i + "%",
				"margin-bottom": "20px",
				display: "inline-block"
			}) : o.elemTemp.find("." + k).css({
				left: i + "%",
				display: "inline-block"
			})
		}).on("mouseout", function() {
			o.elemTemp.find("." + k).css("display", "none")
		})
	}, r.prototype.slide = function(e, t, n) {
		var i = this,
			s = i.config,
			c = i.elemTemp,
			u = function() {
				return "vertical" === s.type ? s.height : c[0].offsetWidth
			},
			d = c.find("." + x),
			f = c.next("." + o),
			p = f.children("." + C).children("input").val(),
			h = 100 / ((s.max - s.min) / Math.ceil(s.step)),
			l = function(e, t) {
				e = Math.ceil(e) * h > 100 ? Math.ceil(e) * h : Math.round(e) * h, e = e > 100 ? 100 : e, d.eq(t).css("vertical" === s.type ? "bottom" : "left", e + "%");
				var n = y(d[0].offsetLeft),
					i = s.range ? y(d[1].offsetLeft) : 0;
				"vertical" === s.type ? (c.find("." + k).css({
					bottom: e + "%",
					"margin-bottom": "20px"
				}), n = y(u() - d[0].offsetTop - d.height()), i = s.range ? y(u() - d[1].offsetTop - d.height()) : 0) : c.find("." + k).css("left", e + "%"), n = n > 100 ? 100 : n, i = i > 100 ? 100 : i;
				var a = Math.min(n, i),
					r = Math.abs(n - i);
				"vertical" === s.type ? c.find("." + b).css({
					height: r + "%",
					bottom: a + "%"
				}) : c.find("." + b).css({
					width: r + "%",
					left: a + "%"
				});
				var o = s.min + Math.round((s.max - s.min) * e / 100);
				if (p = o, f.children("." + C).children("input").val(p), d.eq(t).data("value", o), o = s.setTips ? s.setTips(o) : o, c.find("." + k).html(o), s.range) {
					var l = [d.eq(0).data("value"), d.eq(1).data("value")];
					l[0] > l[1] && l.reverse()
				}
				s.change && s.change(s.range ? l : o)
			},
			y = function(e) {
				var t = e / u() * 100 / h,
					n = Math.round(t) * h;
				return e == u() && (n = Math.ceil(t) * h), n
			},
			a = v(['<div class="layui-auxiliar-moving" id="LAY-slider-moving"></div'].join("")),
			m = function(e, t) {
				var n = function() {
						t && t(), a.remove()
					};
				v("#LAY-slider-moving")[0] || v("body").append(a), a.on("mousemove", e), a.on("mouseup", n).on("mouseleave", n)
			};
		if ("set" === e) return l(t, n);
		c.find("." + w).each(function(r) {
			var o = v(this);
			o.on("mousedown", function(e) {
				e = e || window.event;
				var i = o.parent()[0].offsetLeft,
					a = e.clientX;
				"vertical" === s.type && (i = u() - o.parent()[0].offsetTop - d.height(), a = e.clientY);
				var t = function(e) {
						e = e || window.event;
						var t = i + ("vertical" === s.type ? a - e.clientY : e.clientX - a);
						t < 0 && (t = 0), t > u() && (t = u());
						var n = t / u() * 100 / h;
						l(n, r), o.addClass(E), c.find("." + k).show(), e.preventDefault()
					},
					n = function() {
						o.removeClass(E), c.find("." + k).hide()
					};
				m(t, n)
			})
		}), c.on("click", function(e) {
			var t = v("." + w);
			if (!t.is(event.target) && 0 === t.has(event.target).length && t.length) {
				var n, i = "vertical" === s.type ? u() - e.clientY + v(this).offset().top : e.clientX - v(this).offset().left;
				i < 0 && (i = 0), i > u() && (i = u());
				var a = i / u() * 100 / h;
				n = s.range ? "vertical" === s.type ? Math.abs(i - parseInt(v(d[0]).css("bottom"))) > Math.abs(i - parseInt(v(d[1]).css("bottom"))) ? 1 : 0 : Math.abs(i - d[0].offsetLeft) > Math.abs(i - d[1].offsetLeft) ? 1 : 0 : 0, l(a, n), e.preventDefault()
			}
		}), f.hover(function() {
			var e = v(this);
			e.children("." + T).fadeIn("fast")
		}, function() {
			var e = v(this);
			e.children("." + T).fadeOut("fast")
		}), f.children("." + T).children("i").each(function(t) {
			v(this).on("click", function() {
				p = 1 == t ? p - h < s.min ? s.min : p - h : Number(p) + h > s.max ? s.max : Number(p) + h;
				var e = (p - s.min) / (s.max - s.min) * 100 / h;
				l(e, 0)
			})
		});
		var r = function() {
				var e = this.value;
				e = isNaN(e) ? 0 : e, e = e < s.min ? s.min : e, e = e > s.max ? s.max : e, this.value = e;
				var t = (e - s.min) / (s.max - s.min) * 100 / h;
				l(t, 0)
			};
		f.children("." + C).children("input").on("keydown", function(e) {
			13 === e.keyCode && (e.preventDefault(), r.call(this))
		}).on("change", r)
	}, r.prototype.events = function() {
		var e = this;
		e.config
	}, n.render = function(e) {
		var t = new r(e);
		return i.call(t)
	}, e(a, n)
});
layui.define("jquery", function(e) {
	"use strict";
	var x = layui.jquery,
		n = {
			config: {},
			index: layui.colorpicker ? layui.colorpicker.index + 1e4 : 0,
			set: function(e) {
				var t = this;
				return t.config = x.extend({}, t.config, e), t
			},
			on: function(e, t) {
				return layui.onevent.call(this, "colorpicker", e, t)
			}
		},
		i = function() {
			var e = this,
				t = e.config;
			return {
				config: t
			}
		},
		t = "colorpicker",
		a = "layui-show",
		r = "layui-colorpicker",
		o = ".layui-colorpicker-main",
		w = "layui-icon-down",
		k = "layui-icon-close",
		C = "layui-colorpicker-trigger-span",
		T = "layui-colorpicker-trigger-i",
		E = "layui-colorpicker-side",
		D = "layui-colorpicker-side-slider",
		S = "layui-colorpicker-basis",
		L = "layui-colorpicker-alpha-bgcolor",
		A = "layui-colorpicker-alpha-slider",
		j = "layui-colorpicker-basis-cursor",
		N = "layui-colorpicker-main-input",
		M = function(e) {
			var t = {
				h: 0,
				s: 0,
				b: 0
			},
				n = Math.min(e.r, e.g, e.b),
				i = Math.max(e.r, e.g, e.b),
				a = i - n;
			return t.b = i, t.s = 0 != i ? 255 * a / i : 0, 0 != t.s ? e.r == i ? t.h = (e.g - e.b) / a : e.g == i ? t.h = 2 + (e.b - e.r) / a : t.h = 4 + (e.r - e.g) / a : t.h = -1, i == n && (t.h = 0), t.h *= 60, t.h < 0 && (t.h += 360), t.s *= 100 / 255, t.b *= 100 / 255, t
		},
		u = function(e) {
			var e = e.indexOf("#") > -1 ? e.substring(1) : e;
			if (3 == e.length) {
				var t = e.split("");
				e = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]
			}
			e = parseInt(e, 16);
			var n = {
				r: e >> 16,
				g: (65280 & e) >> 8,
				b: 255 & e
			};
			return M(n)
		},
		H = function(e) {
			var t = {},
				n = e.h,
				i = 255 * e.s / 100,
				a = 255 * e.b / 100;
			if (0 == i) t.r = t.g = t.b = a;
			else {
				var r = a,
					o = (255 - i) * a / 255,
					l = (r - o) * (n % 60) / 60;
				360 == n && (n = 0), n < 60 ? (t.r = r, t.b = o, t.g = o + l) : n < 120 ? (t.g = r, t.b = o, t.r = r - l) : n < 180 ? (t.g = r, t.r = o, t.b = o + l) : n < 240 ? (t.b = r, t.r = o, t.g = r - l) : n < 300 ? (t.b = r, t.g = o, t.r = o + l) : n < 360 ? (t.r = r, t.g = o, t.b = r - l) : (t.r = 0, t.g = 0, t.b = 0)
			}
			return {
				r: Math.round(t.r),
				g: Math.round(t.g),
				b: Math.round(t.b)
			}
		},
		d = function(e) {
			var t = H(e),
				n = [t.r.toString(16), t.g.toString(16), t.b.toString(16)];
			return x.each(n, function(e, t) {
				1 == t.length && (n[e] = "0" + t)
			}), n.join("")
		},
		F = function(e) {
			var t = /[0-9]{1,3}/g,
				n = e.match(t) || [];
			return {
				r: n[0],
				g: n[1],
				b: n[2]
			}
		},
		I = x(window),
		l = x(document),
		s = function(e) {
			var t = this;
			t.index = ++n.index, t.config = x.extend({}, t.config, n.config, e), t.render()
		};
	s.prototype.config = {
		color: "",
		size: null,
		alpha: !1,
		format: "hex",
		predefine: !1,
		colors: ["#009688", "#5FB878", "#1E9FFF", "#FF5722", "#FFB800", "#01AAED", "#999", "#c00", "#ff8c00", "#ffd700", "#90ee90", "#00ced1", "#1e90ff", "#c71585", "rgb(0, 186, 189)", "rgb(255, 120, 0)", "rgb(250, 212, 0)", "#393D49", "rgba(0,0,0,.5)", "rgba(255, 69, 0, 0.68)", "rgba(144, 240, 144, 0.5)", "rgba(31, 147, 255, 0.73)"]
	}, s.prototype.render = function() {
		var e = this,
			t = e.config,
			n = x(['<div class="layui-unselect layui-colorpicker">', "<span " + ("rgb" == t.format && t.alpha ? 'class="layui-colorpicker-trigger-bgcolor"' : "") + ">", '<span class="layui-colorpicker-trigger-span" ', 'lay-type="' + ("rgb" == t.format ? t.alpha ? "rgba" : "torgb" : "") + '" ', 'style="' +
			function() {
				var e = "";
				return t.color ? (e = t.color, (t.color.match(/[0-9]{1,3}/g) || []).length > 3 && (t.alpha && "rgb" == t.format || (e = "#" + d(M(F(t.color))))), "background: " + e) : e
			}() + '">', '<i class="layui-icon layui-colorpicker-trigger-i ' + (t.color ? w : k) + '"></i>', "</span>", "</span>", "</div>"].join("")),
			i = x(t.elem);
		t.size && n.addClass("layui-colorpicker-" + t.size), i.addClass("layui-inline").html(e.elemColorBox = n), e.color = e.elemColorBox.find("." + C)[0].style.background, e.events()
	}, s.prototype.renderPicker = function() {
		var e = this,
			t = e.config,
			n = e.elemColorBox[0],
			i = e.elemPicker = x(['<div id="layui-colorpicker' + e.index + '" data-index="' + e.index + '" class="layui-anim layui-anim-upbit layui-colorpicker-main">', '<div class="layui-colorpicker-main-wrapper">', '<div class="layui-colorpicker-basis">', '<div class="layui-colorpicker-basis-white"></div>', '<div class="layui-colorpicker-basis-black"></div>', '<div class="layui-colorpicker-basis-cursor"></div>', "</div>", '<div class="layui-colorpicker-side">', '<div class="layui-colorpicker-side-slider"></div>', "</div>", "</div>", '<div class="layui-colorpicker-main-alpha ' + (t.alpha ? a : "") + '">', '<div class="layui-colorpicker-alpha-bgcolor">', '<div class="layui-colorpicker-alpha-slider"></div>', "</div>", "</div>", function() {
				if (t.predefine) {
					var n = ['<div class="layui-colorpicker-main-pre">'];
					return layui.each(t.colors, function(e, t) {
						n.push(['<div class="layui-colorpicker-pre' + ((t.match(/[0-9]{1,3}/g) || []).length > 3 ? " layui-colorpicker-pre-isalpha" : "") + '">', '<div style="background:' + t + '"></div>', "</div>"].join(""))
					}), n.push("</div>"), n.join("")
				}
				return ""
			}(), '<div class="layui-colorpicker-main-input">', '<div class="layui-inline">', '<input type="text" class="layui-input">', "</div>", '<div class="layui-btn-container">', '<button class="layui-btn layui-btn-primary layui-btn-sm" colorpicker-events="clear">清空</button>', '<button class="layui-btn layui-btn-sm" colorpicker-events="confirm">确定</button>', "</div", "</div>", "</div>"].join(""));
		e.elemColorBox.find("." + C)[0];
		x(o)[0] && x(o).data("index") == e.index ? e.removePicker(s.thisElemInd) : (e.removePicker(s.thisElemInd), x("body").append(i)), s.thisElemInd = e.index, s.thisColor = n.style.background, e.position(), e.pickerEvents()
	}, s.prototype.removePicker = function(e) {
		var t = this;
		t.config;
		return x("#layui-colorpicker" + (e || t.index)).remove(), t
	}, s.prototype.position = function() {
		var e = this,
			t = e.config,
			n = e.bindElem || e.elemColorBox[0],
			i = e.elemPicker[0],
			a = n.getBoundingClientRect(),
			r = i.offsetWidth,
			o = i.offsetHeight,
			l = function(e) {
				return e = e ? "scrollLeft" : "scrollTop", document.body[e] | document.documentElement[e]
			},
			s = function(e) {
				return document.documentElement[e ? "clientWidth" : "clientHeight"]
			},
			c = 5,
			u = a.left,
			d = a.bottom;
		u -= (r - n.offsetWidth) / 2, d += c, u + r + c > s("width") ? u = s("width") - r - c : u < c && (u = c), d + o + c > s() && (d = a.top > o ? a.top - o : s() - o, d -= 2 * c), t.position && (i.style.position = t.position), i.style.left = u + ("fixed" === t.position ? 0 : l(1)) + "px", i.style.top = d + ("fixed" === t.position ? 0 : l()) + "px"
	}, s.prototype.val = function() {
		var e = this,
			t = (e.config, e.elemColorBox.find("." + C)),
			n = e.elemPicker.find("." + N),
			i = t[0],
			a = i.style.backgroundColor;
		if (a) {
			var r = M(F(a)),
				o = t.attr("lay-type");
			if (e.select(r.h, r.s, r.b), "torgb" === o && n.find("input").val(a), "rgba" === o) {
				var l = F(a);
				if (3 == (a.match(/[0-9]{1,3}/g) || []).length) n.find("input").val("rgba(" + l.r + ", " + l.g + ", " + l.b + ", 1)"), e.elemPicker.find("." + A).css("left", 280);
				else {
					n.find("input").val(a);
					var s = 280 * a.slice(a.lastIndexOf(",") + 1, a.length - 1);
					e.elemPicker.find("." + A).css("left", s)
				}
				e.elemPicker.find("." + L)[0].style.background = "linear-gradient(to right, rgba(" + l.r + ", " + l.g + ", " + l.b + ", 0), rgb(" + l.r + ", " + l.g + ", " + l.b + "))"
			}
		} else e.select(0, 100, 100), n.find("input").val(""), e.elemPicker.find("." + L)[0].style.background = "", e.elemPicker.find("." + A).css("left", 280)
	}, s.prototype.side = function() {
		var o = this,
			l = o.config,
			s = o.elemColorBox.find("." + C),
			c = s.attr("lay-type"),
			u = o.elemPicker.find("." + E),
			e = o.elemPicker.find("." + D),
			d = o.elemPicker.find("." + S),
			r = o.elemPicker.find("." + j),
			f = o.elemPicker.find("." + L),
			p = o.elemPicker.find("." + A),
			h = e[0].offsetTop / 180 * 360,
			y = 100 - (r[0].offsetTop + 3) / 180 * 100,
			m = (r[0].offsetLeft + 3) / 260 * 100,
			v = Math.round(p[0].offsetLeft / 280 * 100) / 100,
			g = o.elemColorBox.find("." + T),
			t = o.elemPicker.find(".layui-colorpicker-pre").children("div"),
			b = function(e, t, n, i) {
				o.select(e, t, n);
				var a = H({
					h: e,
					s: t,
					b: n
				});
				if (g.addClass(w).removeClass(k), s[0].style.background = "rgb(" + a.r + ", " + a.g + ", " + a.b + ")", "torgb" === c && o.elemPicker.find("." + N).find("input").val("rgb(" + a.r + ", " + a.g + ", " + a.b + ")"), "rgba" === c) {
					var r = 0;
					r = 280 * i, p.css("left", r), o.elemPicker.find("." + N).find("input").val("rgba(" + a.r + ", " + a.g + ", " + a.b + ", " + i + ")"), s[0].style.background = "rgba(" + a.r + ", " + a.g + ", " + a.b + ", " + i + ")", f[0].style.background = "linear-gradient(to right, rgba(" + a.r + ", " + a.g + ", " + a.b + ", 0), rgb(" + a.r + ", " + a.g + ", " + a.b + "))"
				}
				l.change && l.change(o.elemPicker.find("." + N).find("input").val())
			},
			n = x(['<div class="layui-auxiliar-moving" id="LAY-colorpicker-moving"></div'].join("")),
			i = function(e) {
				x("#LAY-colorpicker-moving")[0] || x("body").append(n), n.on("mousemove", e), n.on("mouseup", function() {
					n.remove()
				}).on("mouseleave", function() {
					n.remove()
				})
			};
		e.on("mousedown", function(e) {
			var a = this.offsetTop,
				r = e.clientY,
				t = function(e) {
					var t = a + (e.clientY - r),
						n = u[0].offsetHeight;
					t < 0 && (t = 0), t > n && (t = n);
					var i = t / 180 * 360;
					h = i, b(i, m, y, v), e.preventDefault()
				};
			i(t), e.preventDefault()
		}), u.on("click", function(e) {
			var t = e.clientY - x(this).offset().top;
			t < 0 && (t = 0), t > this.offsetHeight && (t = this.offsetHeight);
			var n = t / 180 * 360;
			h = n, b(n, m, y, v), e.preventDefault()
		}), r.on("mousedown", function(e) {
			var l = this.offsetTop,
				s = this.offsetLeft,
				c = e.clientY,
				u = e.clientX,
				t = function(e) {
					var t = l + (e.clientY - c),
						n = s + (e.clientX - u),
						i = d[0].offsetHeight - 3,
						a = d[0].offsetWidth - 3;
					t < -3 && (t = -3), t > i && (t = i), n < -3 && (n = -3), n > a && (n = a);
					var r = (n + 3) / 260 * 100,
						o = 100 - (t + 3) / 180 * 100;
					y = o, m = r, b(h, r, o, v), e.preventDefault()
				};
			layui.stope(e), i(t), e.preventDefault()
		}), d.on("mousedown", function(e) {
			var t = e.clientY - x(this).offset().top - 3 + I.scrollTop(),
				n = e.clientX - x(this).offset().left - 3 + I.scrollLeft();
			t < -3 && (t = -3), t > this.offsetHeight - 3 && (t = this.offsetHeight - 3), n < -3 && (n = -3), n > this.offsetWidth - 3 && (n = this.offsetWidth - 3);
			var i = (n + 3) / 260 * 100,
				a = 100 - (t + 3) / 180 * 100;
			y = a, m = i, b(h, i, a, v), e.preventDefault(), r.trigger(e, "mousedown")
		}), p.on("mousedown", function(e) {
			var a = this.offsetLeft,
				r = e.clientX,
				t = function(e) {
					var t = a + (e.clientX - r),
						n = f[0].offsetWidth;
					t < 0 && (t = 0), t > n && (t = n);
					var i = Math.round(t / 280 * 100) / 100;
					v = i, b(h, m, y, i), e.preventDefault()
				};
			i(t), e.preventDefault()
		}), f.on("click", function(e) {
			var t = e.clientX - x(this).offset().left;
			t < 0 && (t = 0), t > this.offsetWidth && (t = this.offsetWidth);
			var n = Math.round(t / 280 * 100) / 100;
			v = n, b(h, m, y, n), e.preventDefault()
		}), t.each(function() {
			x(this).on("click", function() {
				x(this).parent(".layui-colorpicker-pre").addClass("selected").siblings().removeClass("selected");
				var e, t = this.style.backgroundColor,
					n = M(F(t)),
					i = t.slice(t.lastIndexOf(",") + 1, t.length - 1);
				h = n.h, m = n.s, y = n.b, 3 == (t.match(/[0-9]{1,3}/g) || []).length && (i = 1), v = i, e = 280 * i, b(n.h, n.s, n.b, i)
			})
		})
	}, s.prototype.select = function(e, t, n, i) {
		var a = this,
			r = (a.config, d({
				h: e,
				s: 100,
				b: 100
			})),
			o = d({
				h: e,
				s: t,
				b: n
			}),
			l = e / 360 * 180,
			s = 180 - n / 100 * 180 - 3,
			c = t / 100 * 260 - 3;
		a.elemPicker.find("." + D).css("top", l), a.elemPicker.find("." + S)[0].style.background = "#" + r, a.elemPicker.find("." + j).css({
			top: s,
			left: c
		}), "change" !== i && a.elemPicker.find("." + N).find("input").val("#" + o)
	}, s.prototype.pickerEvents = function() {
		var o = this,
			l = o.config,
			s = o.elemColorBox.find("." + C),
			c = o.elemPicker.find("." + N + " input"),
			n = {
				clear: function(e) {
					s[0].style.background = "", o.elemColorBox.find("." + T).removeClass(w).addClass(k), o.color = "", l.done && l.done(""), o.removePicker()
				},
				confirm: function(e, t) {
					var n = c.val(),
						i = n,
						a = {};
					if (n.indexOf(",") > -1) {
						if (a = M(F(n)), o.select(a.h, a.s, a.b), s[0].style.background = i = "#" + d(a), (n.match(/[0-9]{1,3}/g) || []).length > 3 && "rgba" === s.attr("lay-type")) {
							var r = 280 * n.slice(n.lastIndexOf(",") + 1, n.length - 1);
							o.elemPicker.find("." + A).css("left", r), s[0].style.background = n, i = n
						}
					} else a = u(n), s[0].style.background = i = "#" + d(a), o.elemColorBox.find("." + T).removeClass(k).addClass(w);
					return "change" === t ? (o.select(a.h, a.s, a.b, t), void(l.change && l.change(i))) : (o.color = n, l.done && l.done(n), void o.removePicker())
				}
			};
		o.elemPicker.on("click", "*[colorpicker-events]", function() {
			var e = x(this),
				t = e.attr("colorpicker-events");
			n[t] && n[t].call(this, e)
		}), c.on("keyup", function(e) {
			var t = x(this);
			n.confirm.call(this, t, 13 === e.keyCode ? null : "change")
		})
	}, s.prototype.events = function() {
		var n = this,
			e = n.config,
			i = n.elemColorBox.find("." + C);
		n.elemColorBox.on("click", function() {
			n.renderPicker(), x(o)[0] && (n.val(), n.side())
		}), e.elem[0] && !n.elemColorBox[0].eventHandler && (l.on("click", function(e) {
			if (!x(e.target).hasClass(r) && !x(e.target).parents("." + r)[0] && !x(e.target).hasClass(o.replace(/\./g, "")) && !x(e.target).parents(o)[0] && n.elemPicker) {
				if (n.color) {
					var t = M(F(n.color));
					n.select(t.h, t.s, t.b)
				} else n.elemColorBox.find("." + T).removeClass(w).addClass(k);
				i[0].style.background = n.color || "", n.removePicker()
			}
		}), I.on("resize", function() {
			return !(!n.elemPicker || !x(o)[0]) && void n.position()
		}), n.elemColorBox[0].eventHandler = !0)
	}, n.render = function(e) {
		var t = new s(e);
		return i.call(t)
	}, e(t, n)
});
layui.define("layer", function(e) {
	"use strict";
	var w = layui.$,
		f = layui.layer,
		r = layui.hint(),
		p = layui.device(),
		k = "form",
		h = ".layui-form",
		C = "layui-this",
		T = "layui-hide",
		E = "layui-disabled",
		t = function() {
			this.config = {
				verify: {
					required: [/[\S]+/, "必填项不能为空"],
					phone: [/^1\d{10}$/, "请输入正确的手机号"],
					email: [/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/, "邮箱格式不正确"],
					url: [/(^#)|(^http(s*):\/\/[^\s]+\.[^\s]+)/, "链接格式不正确"],
					number: function(e) {
						if (!e || isNaN(e)) return "只能填写数字"
					},
					date: [/^(\d{4})[-\/](\d{1}|0\d{1}|1[0-2])([-\/](\d{1}|0\d{1}|[1-2][0-9]|3[0-1]))*$/, "日期格式不正确"],
					identity: [/(^\d{15}$)|(^\d{17}(x|X|\d)$)/, "请输入正确的身份证号"]
				}
			}
		};
	t.prototype.set = function(e) {
		var t = this;
		return w.extend(!0, t.config, e), t
	}, t.prototype.verify = function(e) {
		var t = this;
		return w.extend(!0, t.config.verify, e), t
	}, t.prototype.on = function(e, t) {
		return layui.onevent.call(this, k, e, t)
	}, t.prototype.val = function(e, n) {
		var t = w(h + '[lay-filter="' + e + '"]');
		t.each(function(e, t) {
			var a = w(this);
			layui.each(n, function(e, t) {
				var n, i = a.find('[name="' + e + '"]');
				i[0] && (n = i[0].type, "checkbox" === n ? i[0].checked = t : "radio" === n ? i.each(function() {
					this.value === t && (this.checked = !0)
				}) : i.val(t))
			})
		}), s.render(null, e)
	}, t.prototype.render = function(e, t) {
		var n = this,
			i = w(h +
			function() {
				return t ? '[lay-filter="' + t + '"]' : ""
			}()),
			a = {
				select: function() {
					var y, d = "请选择",
						m = "layui-form-select",
						v = "layui-select-title",
						g = "layui-select-none",
						b = "",
						e = i.find("select"),
						x = function(e, t) {
							w(e.target).parent().hasClass(v) && !t || (w("." + m).removeClass(m + "ed " + m + "up"), y && b && y.val(b)), y = null
						},
						f = function(i, e, t) {
							var l, a = w(this),
								n = i.find("." + v),
								r = n.find("input"),
								s = i.find("dl"),
								o = s.children("dd"),
								c = this.selectedIndex;
							if (!e) {
								var u = function() {
										var e = i.offset().top + i.outerHeight() + 5 - D.scrollTop(),
											t = s.outerHeight();
										c = a[0].selectedIndex, i.addClass(m + "ed"), o.removeClass(T), l = null, o.eq(c).addClass(C).siblings().removeClass(C), e + t > D.height() && e >= t && i.addClass(m + "up"), f()
									},
									d = function(e) {
										i.removeClass(m + "ed " + m + "up"), r.blur(), l = null, e || p(r.val(), function(e) {
											e && (b = s.find("." + C).html(), r && r.val(b))
										})
									},
									f = function() {
										var e = s.children("dd." + C);
										if (e[0]) {
											var t = e.position().top,
												n = s.height(),
												i = e.height();
											t > n && s.scrollTop(t + s.scrollTop() - n + i - 5), t < 0 && s.scrollTop(t + s.scrollTop() - 5)
										}
									};
								n.on("click", function(e) {
									i.hasClass(m + "ed") ? d() : (x(e, !0), u()), s.find("." + g).remove()
								}), n.find(".layui-edge").on("click", function() {
									r.focus()
								}), r.on("keyup", function(e) {
									var t = e.keyCode;
									9 === t && u()
								}).on("keydown", function(r) {
									var e = r.keyCode;
									9 === e && d();
									var o = function(i, a) {
											var e, t;
											r.preventDefault();
											var n = function() {
													var e = s.children("dd." + C);
													if (s.children("dd." + T)[0] && "next" === i) {
														var t = s.children("dd:not(." + T + ",." + E + ")"),
															n = t.eq(0).index();
														if (n >= 0 && n < e.index() && !t.hasClass(C)) return t.eq(0).prev()[0] ? t.eq(0).prev() : s.children(":last")
													}
													return a && a[0] ? a : l && l[0] ? l : e
												}();
											return t = n[i](), e = n[i]("dd:not(." + T + ")"), t[0] ? (l = n[i](), e[0] && !e.hasClass(E) || !l[0] ? (e.addClass(C).siblings().removeClass(C), void f()) : o(i, l)) : l = null
										};
									38 === e && o("prev"), 40 === e && o("next"), 13 === e && (r.preventDefault(), s.children("dd." + C).trigger("click"))
								});
								var p = function(i, e, a) {
										var r = 0;
										layui.each(o, function() {
											var e = w(this),
												t = e.text(),
												n = t.indexOf(i) === -1;
											("" === i || "blur" === a ? i !== t : n) && r++, "keyup" === a && e[n ? "addClass" : "removeClass"](T)
										});
										var t = r === o.length;
										return e(t), t
									},
									h = function(e) {
										var t = this.value,
											n = e.keyCode;
										return 9 !== n && 13 !== n && 37 !== n && 38 !== n && 39 !== n && 40 !== n && (p(t, function(e) {
											e ? s.find("." + g)[0] || s.append('<p class="' + g + '">无匹配项</p>') : s.find("." + g).remove()
										}, "keyup"), "" === t && s.find("." + g).remove(), void f())
									};
								t && r.on("keyup", h).on("blur", function(e) {
									var t = a[0].selectedIndex;
									y = r, b = w(a[0].options[t]).html(), setTimeout(function() {
										p(r.val(), function(e) {
											b || r.val("")
										}, "blur")
									}, 200)
								}), o.on("click", function() {
									var e = w(this),
										t = e.attr("lay-value"),
										n = a.attr("lay-filter");
									return !e.hasClass(E) && (e.hasClass("layui-select-tips") ? r.val("") : (r.val(e.text()), e.addClass(C)), e.siblings().removeClass(C), a.val(t).removeClass("layui-form-danger"), layui.event.call(this, k, "select(" + n + ")", {
										elem: a[0],
										value: t,
										othis: i
									}), d(!0), !1)
								}), i.find("dl>dt").on("click", function(e) {
									return !1
								}), w(document).off("click", x).on("click", x)
							}
						};
					e.each(function(e, t) {
						var n = w(this),
							i = n.next("." + m),
							a = this.disabled,
							r = t.value,
							o = w(t.options[t.selectedIndex]),
							l = t.options[0];
						if ("string" == typeof n.attr("lay-ignore")) return n.show();
						var s = "string" == typeof n.attr("lay-search"),
							c = l ? l.value ? d : l.innerHTML || d : d,
							u = w(['<div class="' + (s ? "" : "layui-unselect ") + m, (a ? " layui-select-disabled" : "") + '">', '<div class="' + v + '">', '<input type="text" placeholder="' + c + '" ' + ('value="' + (r ? o.html() : "") + '"') + (s ? "" : " readonly") + ' class="layui-input' + (s ? "" : " layui-unselect") + (a ? " " + E : "") + '">', '<i class="layui-edge"></i></div>', '<dl class="layui-anim layui-anim-upbit' + (n.find("optgroup")[0] ? " layui-select-group" : "") + '">', function(e) {
								var n = [];
								return layui.each(e, function(e, t) {
									0 !== e || t.value ? "optgroup" === t.tagName.toLowerCase() ? n.push("<dt>" + t.label + "</dt>") : n.push('<dd lay-value="' + t.value + '" class="' + (r === t.value ? C : "") + (t.disabled ? " " + E : "") + '">' + t.innerHTML + "</dd>") : n.push('<dd lay-value="" class="layui-select-tips">' + (t.innerHTML || d) + "</dd>")
								}), 0 === n.length && n.push('<dd lay-value="" class="' + E + '">没有选项</dd>'), n.join("")
							}(n.find("*")) + "</dl>", "</div>"].join(""));
						i[0] && i.remove(), n.after(u), f.call(this, u, a, s)
					})
				},
				checkbox: function() {
					var c = {
						checkbox: ["layui-form-checkbox", "layui-form-checked", "checkbox"],
						_switch: ["layui-form-switch", "layui-form-onswitch", "switch"]
					},
						e = i.find("input[type=checkbox]"),
						u = function(n, i) {
							var a = w(this);
							n.on("click", function() {
								var e = a.attr("lay-filter"),
									t = (a.attr("lay-text") || "").split("|");
								a[0].disabled || (a[0].checked ? (a[0].checked = !1, n.removeClass(i[1]).find("em").text(t[1])) : (a[0].checked = !0, n.addClass(i[1]).find("em").text(t[0])), layui.event.call(a[0], k, i[2] + "(" + e + ")", {
									elem: a[0],
									value: a[0].value,
									othis: n
								}))
							})
						};
					e.each(function(e, n) {
						var t = w(this),
							i = t.attr("lay-skin"),
							a = (t.attr("lay-text") || "").split("|"),
							r = this.disabled;
						"switch" === i && (i = "_" + i);
						var o = c[i] || c.checkbox;
						if ("string" == typeof t.attr("lay-ignore")) return t.show();
						var l = t.next("." + o[0]),
							s = w(['<div class="layui-unselect ' + o[0], n.checked ? " " + o[1] : "", r ? " layui-checkbox-disbaled " + E : "", '"', i ? ' lay-skin="' + i + '"' : "", ">", function() {
								var e = n.title.replace(/\s/g, ""),
									t = {
										checkbox: [e ? "<span>" + n.title + "</span>" : "", '<i class="layui-icon layui-icon-ok"></i>'].join(""),
										_switch: "<em>" + ((n.checked ? a[0] : a[1]) || "") + "</em><i></i>"
									};
								return t[i] || t.checkbox
							}(), "</div>"].join(""));
						l[0] && l.remove(), t.after(s), u.call(this, s, o)
					})
				},
				radio: function() {
					var l = "layui-form-radio",
						s = ["&#xe643;", "&#xe63f;"],
						e = i.find("input[type=radio]"),
						o = function(a) {
							var r = w(this),
								o = "layui-anim-scaleSpring";
							a.on("click", function() {
								var e = r[0].name,
									t = r.parents(h),
									n = r.attr("lay-filter"),
									i = t.find("input[name=" + e.replace(/(\.|#|\[|\])/g, "\\$1") + "]");
								r[0].disabled || (layui.each(i, function() {
									var e = w(this).next("." + l);
									this.checked = !1, e.removeClass(l + "ed"), e.find(".layui-icon").removeClass(o).html(s[1])
								}), r[0].checked = !0, a.addClass(l + "ed"), a.find(".layui-icon").addClass(o).html(s[0]), layui.event.call(r[0], k, "radio(" + n + ")", {
									elem: r[0],
									value: r[0].value,
									othis: a
								}))
							})
						};
					e.each(function(e, t) {
						var n = w(this),
							i = n.next("." + l),
							a = this.disabled;
						if ("string" == typeof n.attr("lay-ignore")) return n.show();
						i[0] && i.remove();
						var r = w(['<div class="layui-unselect ' + l, t.checked ? " " + l + "ed" : "", (a ? " layui-radio-disbaled " + E : "") + '">', '<i class="layui-anim layui-icon">' + s[t.checked ? 0 : 1] + "</i>", "<div>" +
						function() {
							var e = t.title || "";
							return "string" == typeof n.next().attr("lay-radio") && (e = n.next().html(), n.next().remove()), e
						}() + "</div>", "</div>"].join(""));
						n.after(r), o.call(this, r)
					})
				}
			};
		return e ? a[e] ? a[e]() : r.error("不支持的" + e + "表单渲染") : layui.each(a, function(e, t) {
			t()
		}), n
	};
	var n = function() {
			var e = w(this),
				c = s.config.verify,
				u = null,
				d = "layui-form-danger",
				i = {},
				t = e.parents(h),
				n = t.find("*[lay-verify]"),
				a = e.parents("form")[0],
				r = t.find("input,select,textarea"),
				o = e.attr("lay-filter");
			if (layui.each(n, function(e, r) {
				var o = w(this),
					t = o.attr("lay-verify").split("|"),
					l = o.attr("lay-verType"),
					s = o.val();
				if (o.removeClass(d), layui.each(t, function(e, t) {
					var n, i = "",
						a = "function" == typeof c[t];
					if (c[t]) {
						var n = a ? i = c[t](s, r) : !c[t][0].test(s);
						if (i = i || c[t][1], n) return "tips" === l ? f.tips(i, function() {
							return "string" == typeof o.attr("lay-ignore") || "select" !== r.tagName.toLowerCase() && !/^checkbox|radio$/.test(r.type) ? o : o.next()
						}(), {
							tips: 1
						}) : "alert" === l ? f.alert(i, {
							title: "提示",
							shadeClose: !0
						}) : f.msg(i, {
							icon: 5,
							shift: 6
						}), p.android || p.ios || r.focus(), o.addClass(d), u = !0
					}
				}), u) return u
			}), u) return !1;
			var l = {};
			return layui.each(r, function(e, t) {
				if (t.name = (t.name || "").replace(/^\s*|\s*&/, ""), t.name) {
					if (/^.*\[\]$/.test(t.name)) {
						var n = t.name.match(/^(.*)\[\]$/g)[0];
						l[n] = 0 | l[n], t.name = t.name.replace(/^(.*)\[\]$/, "$1[" + l[n]+++"]")
					}
					/^checkbox|radio$/.test(t.type) && !t.checked || (i[t.name] = t.value)
				}
			}), layui.event.call(this, k, "submit(" + o + ")", {
				elem: this,
				form: a,
				field: i
			})
		},
		s = new t,
		i = w(document),
		D = w(window);
	s.render(), i.on("reset", h, function() {
		var e = w(this).attr("lay-filter");
		setTimeout(function() {
			s.render(null, e)
		}, 50)
	}), i.on("submit", h, n).on("click", "*[lay-submit]", n), e(k, s)
});
layui.define("jquery", function(e) {
	"use strict";
	var s = layui.$,
		i = layui.hint(),
		o = "layui-tree-enter",
		a = function(e) {
			this.options = e
		},
		c = {
			arrow: ["&#xe623;", "&#xe625;"],
			checkbox: ["&#xe626;", "&#xe627;"],
			radio: ["&#xe62b;", "&#xe62a;"],
			branch: ["&#xe622;", "&#xe624;"],
			leaf: "&#xe621;"
		};
	a.prototype.init = function(e) {
		var t = this;
		e.addClass("layui-box layui-tree"), t.options.skin && e.addClass("layui-tree-skin-" + t.options.skin), t.tree(e), t.on(e)
	}, a.prototype.tree = function(r, e) {
		var o = this,
			l = o.options,
			t = e || l.nodes;
		layui.each(t, function(e, t) {
			var n = t.children && t.children.length > 0,
				i = s('<ul class="' + (t.spread ? "layui-show" : "") + '"></ul>'),
				a = s(["<li " + (t.spread ? 'data-spread="' + t.spread + '"' : "") + ">", function() {
					return n ? '<i class="layui-icon layui-tree-spread">' + (t.spread ? c.arrow[1] : c.arrow[0]) + "</i>" : ""
				}(), function() {
					return l.check ? '<i class="layui-icon layui-tree-check">' + ("checkbox" === l.check ? c.checkbox[0] : "radio" === l.check ? c.radio[0] : "") + "</i>" : ""
				}(), function() {
					return '<a href="' + (t.href || "javascript:;") + '" ' + (l.target && t.href ? 'target="' + l.target + '"' : "") + ">" + ('<i class="layui-icon layui-tree-' + (n ? "branch" : "leaf") + '">' + (n ? t.spread ? c.branch[1] : c.branch[0] : c.leaf) + "</i>") + ("<cite>" + (t.name || "未命名") + "</cite></a>")
				}(), "</li>"].join(""));
			n && (a.append(i), o.tree(i, t.children)), r.append(a), "function" == typeof l.click && o.click(a, t), o.spread(a, t), l.drag && o.drag(a, t)
		})
	}, a.prototype.click = function(e, t) {
		var n = this,
			i = n.options;
		e.children("a").on("click", function(e) {
			layui.stope(e), i.click(t)
		})
	}, a.prototype.spread = function(e, t) {
		var n = this,
			i = (n.options, e.children(".layui-tree-spread")),
			a = e.children("ul"),
			r = e.children("a"),
			o = function() {
				e.data("spread") ? (e.data("spread", null), a.removeClass("layui-show"), i.html(c.arrow[0]), r.find(".layui-icon").html(c.branch[0])) : (e.data("spread", !0), a.addClass("layui-show"), i.html(c.arrow[1]), r.find(".layui-icon").html(c.branch[1]))
			};
		a[0] && (i.on("click", o), r.on("dblclick", o))
	}, a.prototype.on = function(e) {
		var a = this,
			t = a.options,
			r = "layui-tree-drag";
		e.find("i").on("selectstart", function(e) {
			return !1
		}), t.drag && s(document).on("mousemove", function(e) {
			var t = a.move;
			if (t.from) {
				var n = (t.to, s('<div class="layui-box ' + r + '"></div>'));
				e.preventDefault(), s("." + r)[0] || s("body").append(n);
				var i = s("." + r)[0] ? s("." + r) : n;
				i.addClass("layui-show").html(t.from.elem.children("a").html()), i.css({
					left: e.pageX + 10,
					top: e.pageY + 10
				})
			}
		}).on("mouseup", function() {
			var e = a.move;
			e.from && (e.from.elem.children("a").removeClass(o), e.to && e.to.elem.children("a").removeClass(o), a.move = {}, s("." + r).remove())
		})
	}, a.prototype.move = {}, a.prototype.drag = function(n, i) {
		var a = this,
			e = (a.options, n.children("a")),
			t = function() {
				var e = s(this),
					t = a.move;
				t.from && (t.to = {
					item: i,
					elem: n
				}, e.addClass(o))
			};
		e.on("mousedown", function() {
			var e = a.move;
			e.from = {
				item: i,
				elem: n
			}
		}), e.on("mouseenter", t).on("mousemove", t).on("mouseleave", function() {
			var e = s(this),
				t = a.move;
			t.from && (delete t.to, e.removeClass(o))
		})
	}, e("tree", function(e) {
		var t = new a(e = e || {}),
			n = s(e.elem);
		return n[0] ? void t.init(n) : i.error("layui.tree 没有找到" + e.elem + "元素")
	})
});
layui.define(["laytpl", "laypage", "layer", "form", "util"], function(e) {
	"use strict";
	var v = layui.$,
		g = layui.laytpl,
		l = layui.laypage,
		b = layui.layer,
		f = layui.form,
		p = (layui.util, layui.hint()),
		h = layui.device(),
		x = {
			config: {
				checkName: "LAY_CHECKED",
				indexName: "LAY_TABLE_INDEX"
			},
			cache: {},
			index: layui.table ? layui.table.index + 1e4 : 0,
			set: function(e) {
				var t = this;
				return t.config = v.extend({}, t.config, e), t
			},
			on: function(e, t) {
				return layui.onevent.call(this, y, e, t)
			}
		},
		s = function() {
			var t = this,
				e = t.config,
				n = e.id || e.index;
			return n && (s.config[n] = e), {
				reload: function(e) {
					t.reload.call(t, e)
				},
				setColsWidth: function() {
					t.setColsWidth.call(t)
				},
				config: e
			}
		},
		y = "table",
		a = ".layui-table",
		w = "layui-hide",
		u = "layui-none",
		o = "layui-table-view",
		c = ".layui-table-tool",
		d = ".layui-table-box",
		i = ".layui-table-init",
		m = ".layui-table-header",
		k = ".layui-table-body",
		C = ".layui-table-main",
		T = ".layui-table-fixed",
		E = ".layui-table-fixed-l",
		D = ".layui-table-fixed-r",
		S = ".layui-table-total",
		L = ".layui-table-page",
		A = ".layui-table-sort",
		j = "layui-table-edit",
		N = "layui-table-hover",
		t = function(e) {
			var t = '{{#if(item2.colspan){}} colspan="{{item2.colspan}}"{{#} if(item2.rowspan){}} rowspan="{{item2.rowspan}}"{{#}}}';
			return e = e || {}, ['<table cellspacing="0" cellpadding="0" border="0" class="layui-table" ', '{{# if(d.data.skin){ }}lay-skin="{{d.data.skin}}"{{# } }} {{# if(d.data.size){ }}lay-size="{{d.data.size}}"{{# } }} {{# if(d.data.even){ }}lay-even{{# } }}>', "<thead>", "{{# layui.each(d.data.cols, function(i1, item1){ }}", "<tr>", "{{# layui.each(item1, function(i2, item2){ }}", '{{# if(item2.fixed && item2.fixed !== "right"){ left = true; } }}', '{{# if(item2.fixed === "right"){ right = true; } }}', function() {
				return e.fixed && "right" !== e.fixed ? '{{# if(item2.fixed && item2.fixed !== "right"){ }}' : "right" === e.fixed ? '{{# if(item2.fixed === "right"){ }}' : ""
			}(), "{{# var isSort = !(item2.colGroup) && item2.sort; }}", '<th data-field="{{ item2.field||i2 }}" data-key="{{d.index}}-{{i1}}-{{i2}}" {{# if( item2.parentKey){ }}data-parentkey="{{ item2.parentKey }}"{{# } }} {{# if(item2.minWidth){ }}data-minwidth="{{item2.minWidth}}"{{# } }} ' + t + ' {{# if(item2.unresize || item2.colGroup){ }}data-unresize="true"{{# } }} class="{{# if(item2.hide){ }}layui-hide{{# } }}{{# if(isSort){ }} layui-unselect{{# } }}{{# if(!item2.field){ }} layui-table-col-special{{# } }}">', '<div class="layui-table-cell laytable-cell-', "{{# if(item2.colGroup){ }}", "group", "{{# } else { }}", "{{d.index}}-{{i1}}-{{i2}}", '{{# if(item2.type !== "normal"){ }}', " laytable-cell-{{ item2.type }}", "{{# } }}", "{{# } }}", '" {{#if(item2.align){}}align="{{item2.align}}"{{#}}}>', '{{# if(item2.type === "checkbox"){ }}', '<input type="checkbox" name="layTableCheckbox" lay-skin="primary" lay-filter="layTableAllChoose" {{# if(item2[d.data.checkName]){ }}checked{{# }; }}>', "{{# } else { }}", '<span>{{item2.title||""}}</span>', "{{# if(isSort){ }}", '<span class="layui-table-sort layui-inline"><i class="layui-edge layui-table-sort-asc" title="升序"></i><i class="layui-edge layui-table-sort-desc" title="降序"></i></span>', "{{# } }}", "{{# } }}", "</div>", "</th>", e.fixed ? "{{# }; }}" : "", "{{# }); }}", "</tr>", "{{# }); }}", "</thead>", "</table>"].join("")
		},
		n = ['<table cellspacing="0" cellpadding="0" border="0" class="layui-table" ', '{{# if(d.data.skin){ }}lay-skin="{{d.data.skin}}"{{# } }} {{# if(d.data.size){ }}lay-size="{{d.data.size}}"{{# } }} {{# if(d.data.even){ }}lay-even{{# } }}>', "<tbody></tbody>", "</table>"].join(""),
		M = ['<div class="layui-form layui-border-box {{d.VIEW_CLASS}}" lay-filter="LAY-table-{{d.index}}" style="{{# if(d.data.width){ }}width:{{d.data.width}}px;{{# } }} {{# if(d.data.height){ }}height:{{d.data.height}}px;{{# } }}">', "{{# if(d.data.toolbar){ }}", '<div class="layui-table-tool">', '<div class="layui-table-tool-temp"></div>', '<div class="layui-table-tool-self"></div>', "</div>", "{{# } }}", '<div class="layui-table-box">', "{{# if(d.loading){ }}", '<div class="layui-table-init" style="background-color: #fff;">', '<i class="layui-icon layui-icon-loading layui-icon"></i>', "</div>", "{{# } }}", "{{# var left, right; }}", '<div class="layui-table-header">', t(), "</div>", '<div class="layui-table-body layui-table-main">', n, "</div>", "{{# if(left){ }}", '<div class="layui-table-fixed layui-table-fixed-l">', '<div class="layui-table-header">', t({
			fixed: !0
		}), "</div>", '<div class="layui-table-body">', n, "</div>", "</div>", "{{# }; }}", "{{# if(right){ }}", '<div class="layui-table-fixed layui-table-fixed-r">', '<div class="layui-table-header">', t({
			fixed: "right"
		}), '<div class="layui-table-mend"></div>', "</div>", '<div class="layui-table-body">', n, "</div>", "</div>", "{{# }; }}", "</div>", "{{# if(d.data.totalRow){ }}", '<div class="layui-table-total">', '<table cellspacing="0" cellpadding="0" border="0" class="layui-table" ', '{{# if(d.data.skin){ }}lay-skin="{{d.data.skin}}"{{# } }} {{# if(d.data.size){ }}lay-size="{{d.data.size}}"{{# } }} {{# if(d.data.even){ }}lay-even{{# } }}>', '<tbody><tr><td><div class="layui-table-cell" style="visibility: hidden;">Total</div></td></tr></tbody>', "</table>", "</div>", "{{# } }}", "{{# if(d.data.page){ }}", '<div class="layui-table-page">', '<div id="layui-table-page{{d.index}}"></div>', "</div>", "{{# } }}", "<style>", "{{# layui.each(d.data.cols, function(i1, item1){", "layui.each(item1, function(i2, item2){ }}", ".laytable-cell-{{d.index}}-{{i1}}-{{i2}}{ ", "{{# if(item2.width){ }}", "width: {{item2.width}}px;", "{{# } }}", " }", "{{# });", "}); }}", "</style>", "</div>"].join(""),
		H = v(window),
		F = v(document),
		r = function(e) {
			var t = this;
			t.index = ++x.index, t.config = v.extend({}, t.config, x.config, e), t.render()
		};
	r.prototype.config = {
		limit: 10,
		loading: !0,
		cellMinWidth: 60,
		defaultToolbar: ["filter", "exports", "print"],
		text: {
			none: "无数据"
		}
	}, r.prototype.render = function() {
		var e = this,
			t = e.config;
		if (t.elem = v(t.elem), t.where = t.where || {}, t.id = t.id || t.elem.attr("id") || t.index, t.request = v.extend({
			pageName: "page",
			limitName: "limit"
		}, t.request), t.response = v.extend({
			statusName: "code",
			statusCode: 0,
			msgName: "msg",
			dataName: "data",
			countName: "count"
		}, t.response), "object" == typeof t.page && (t.limit = t.page.limit || t.limit, t.limits = t.page.limits || t.limits, e.page = t.page.curr = t.page.curr || 1, delete t.page.elem, delete t.page.jump), !t.elem[0]) return e;
		t.height && /^full-\d+$/.test(t.height) && (e.fullHeightGap = t.height.split("-")[1], t.height = H.height() - e.fullHeightGap), e.setInit();
		var n = t.elem,
			i = n.next("." + o),
			a = e.elem = v(g(M).render({
				VIEW_CLASS: o,
				data: t,
				index: e.index
			}));
		if (t.index = e.index, i[0] && i.remove(), n.after(a), e.layTool = a.find(c), e.layBox = a.find(d), e.layHeader = a.find(m), e.layMain = a.find(C), e.layBody = a.find(k), e.layFixed = a.find(T), e.layFixLeft = a.find(E), e.layFixRight = a.find(D), e.layTotal = a.find(S), e.layPage = a.find(L), e.renderToolbar(), e.fullSize(), t.cols.length > 1) {
			var r = e.layFixed.find(m).find("th");
			r.height(e.layHeader.height() - 1 - parseFloat(r.css("padding-top")) - parseFloat(r.css("padding-bottom")))
		}
		e.pullData(e.page), e.events()
	}, r.prototype.initOpts = function(e) {
		var t = this,
			n = (t.config, {
				checkbox: 48,
				radio: 48,
				space: 15,
				numbers: 40
			});
		e.checkbox && (e.type = "checkbox"), e.space && (e.type = "space"), e.type || (e.type = "normal"), "normal" !== e.type && (e.unresize = !0, e.width = e.width || n[e.type])
	}, r.prototype.setInit = function(e) {
		var t = this,
			o = t.config;
		return o.clientWidth = o.width ||
		function() {
			var i = function(e) {
					var t, n;
					e = e || o.elem.parent(), t = e.width();
					try {
						n = "none" === e.css("display")
					} catch (e) {}
					return !e[0] || t && !n ? t : i(e.parent())
				};
			return i()
		}(), "width" === e ? o.clientWidth : void layui.each(o.cols, function(r, e) {
			layui.each(e, function(n, i) {
				if (!i) return void e.splice(n, 1);
				if (i.key = r + "-" + n, i.hide = i.hide || !1, i.colGroup || i.colspan > 1) {
					var a = 0;
					layui.each(o.cols[r + 1], function(e, t) {
						t.HAS_PARENT || a > 1 && a == i.colspan || (t.HAS_PARENT = !0, t.parentKey = r + "-" + n, a += parseInt(t.colspan > 1 ? t.colspan : 1))
					}), i.colGroup = !0
				}
				t.initOpts(i)
			})
		})
	}, r.prototype.renderToolbar = function() {
		var e = this,
			t = e.config,
			n = ['<div class="layui-inline" lay-event="add"><i class="layui-icon layui-icon-add-1"></i></div>', '<div class="layui-inline" lay-event="update"><i class="layui-icon layui-icon-edit"></i></div>', '<div class="layui-inline" lay-event="delete"><i class="layui-icon layui-icon-delete"></i></div>'].join(""),
			i = e.layTool.find(".layui-table-tool-temp");
		if ("default" === t.toolbar) i.html(n);
		else if (t.toolbar) {
			var a = v(t.toolbar).html() || "";
			a && i.html(g(a).render(t))
		}
		var r = {
			filter: {
				title: "筛选列",
				layEvent: "LAYTABLE_COLS",
				icon: "layui-icon-cols"
			},
			exports: {
				title: "导出",
				layEvent: "LAYTABLE_EXPORT",
				icon: "layui-icon-export"
			},
			print: {
				title: "打印",
				layEvent: "LAYTABLE_PRINT",
				icon: "layui-icon-print"
			}
		},
			o = [];
		"object" == typeof t.defaultToolbar && layui.each(t.defaultToolbar, function(e, t) {
			var n = r[t];
			n && o.push('<div class="layui-inline" title="' + n.title + '" lay-event="' + n.layEvent + '"><i class="layui-icon ' + n.icon + '"></i></div>')
		}), e.layTool.find(".layui-table-tool-self").html(o.join(""))
	}, r.prototype.setParentCol = function(e, t) {
		var n = this,
			i = n.config,
			a = n.layHeader.find('th[data-key="' + i.index + "-" + t + '"]'),
			r = parseInt(a.attr("colspan")) || 0;
		if (a[0]) {
			var o = t.split("-"),
				l = i.cols[o[0]][o[1]];
			e ? r-- : r++, a.attr("colspan", r), a[r < 1 ? "addClass" : "removeClass"](w), l.colspan = r, l.hide = r < 1;
			var s = a.data("parentkey");
			s && n.setParentCol(e, s)
		}
	}, r.prototype.setColsPatch = function() {
		var n = this,
			e = n.config;
		layui.each(e.cols, function(e, t) {
			layui.each(t, function(e, t) {
				t.hide && n.setParentCol(t.hide, t.parentKey)
			})
		})
	}, r.prototype.setColsWidth = function() {
		var i = this,
			o = i.config,
			n = 0,
			l = 0,
			s = 0,
			c = 0,
			u = i.setInit("width");
		i.eachCols(function(e, t) {
			t.hide || n++
		}), u = u -
		function() {
			return "line" === o.skin || "nob" === o.skin ? 2 : n + 1
		}() - i.getScrollWidth(i.layMain[0]) - 1;
		var e = function(r) {
				layui.each(o.cols, function(e, a) {
					layui.each(a, function(e, t) {
						var n = 0,
							i = t.minWidth || o.cellMinWidth;
						return t ? void(t.colGroup || t.hide || (r ? s && s < i && (l--, n = i) : (n = t.width || 0, /\d+%$/.test(n) ? (n = Math.floor(parseFloat(n) / 100 * u), n < i && (n = i)) : n || (t.width = n = 0, l++)), t.hide && (n = 0), c += n)) : void a.splice(e, 1)
					})
				}), u > c && l && (s = (u - c) / l)
			};
		e(), e(!0), i.autoColNums = l, i.eachCols(function(e, t) {
			var n = t.minWidth || o.cellMinWidth;
			t.colGroup || t.hide || (0 === t.width ? i.getCssRule(o.index + "-" + t.key, function(e) {
				e.style.width = Math.floor(s >= n ? s : n) + "px"
			}) : /\d+%$/.test(t.width) && i.getCssRule(o.index + "-" + t.key, function(e) {
				e.style.width = Math.floor(parseFloat(t.width) / 100 * u) + "px"
			}))
		});
		var a = i.layMain.width() - i.getScrollWidth(i.layMain[0]) - i.layMain.children("table").outerWidth();
		if (i.autoColNums && a >= -n && a <= n) {
			var r = function(e) {
					var t;
					return e = e || i.layHeader.eq(0).find("thead th:last-child"), t = e.data("field"), !t && e.prev()[0] ? r(e.prev()) : e
				},
				d = r(),
				t = d.data("key");
			i.getCssRule(t, function(e) {
				var t = e.style.width || d.outerWidth();
				e.style.width = parseFloat(t) + a + "px", i.layMain.height() - i.layMain.prop("clientHeight") > 0 && (e.style.width = parseFloat(e.style.width) - 1 + "px")
			})
		}
		i.loading(!0)
	}, r.prototype.reload = function(e) {
		var t = this;
		t.config.data && t.config.data.constructor === Array && delete t.config.data, t.config = v.extend({}, t.config, e), t.render()
	}, r.prototype.page = 1, r.prototype.pullData = function(t) {
		var n = this,
			i = n.config,
			e = i.request,
			a = i.response,
			r = function() {
				"object" == typeof i.initSort && n.sort(i.initSort.field, i.initSort.type)
			};
		if (n.startTime = (new Date).getTime(), i.url) {
			var o = {};
			o[e.pageName] = t, o[e.limitName] = i.limit;
			var l = v.extend(o, i.where);
			i.contentType && 0 == i.contentType.indexOf("application/json") && (l = JSON.stringify(l)), v.ajax({
				type: i.method || "get",
				url: i.url,
				contentType: i.contentType,
				data: l,
				dataType: "json",
				headers: i.headers || {},
				success: function(e) {
					"function" == typeof i.parseData && (e = i.parseData(e) || e), e[a.statusName] != a.statusCode ? (n.renderForm(), n.layMain.html('<div class="' + u + '">' + (e[a.msgName] || "返回的数据不符合规范，正确的成功状态码 (" + a.statusName + ") 应为：" + a.statusCode) + "</div>")) : (n.renderData(e, t, e[a.countName]), r(), i.time = (new Date).getTime() - n.startTime + " ms"), n.setColsWidth(), "function" == typeof i.done && i.done(e, t, e[a.countName])
				},
				error: function(e, t) {
					n.layMain.html('<div class="' + u + '">数据接口请求异常：' + t + "</div>"), n.renderForm(), n.setColsWidth()
				}
			})
		} else if (i.data && i.data.constructor === Array) {
			var s = {},
				c = t * i.limit - i.limit;
			s[a.dataName] = i.data.concat().splice(c, i.limit), s[a.countName] = i.data.length, n.renderData(s, t, i.data.length), r(), n.setColsWidth(), "function" == typeof i.done && i.done(s, t, s[a.countName])
		}
	}, r.prototype.eachCols = function(e) {
		var t = this;
		return x.eachCols(null, e, t.config.cols), t
	}, r.prototype.renderData = function(e, t, n, i) {
		var a = this,
			p = a.config,
			r = e[p.response.dataName] || [],
			h = [],
			y = [],
			m = [],
			o = function() {
				var f;
				return !i && a.sortKey ? a.sort(a.sortKey.field, a.sortKey.sort, !0) : (layui.each(r, function(o, l) {
					var s = [],
						c = [],
						u = [],
						d = o + p.limit * (t - 1) + 1;
					0 !== l.length && (i || (l[x.config.indexName] = o), a.eachCols(function(e, n) {
						var t = n.field || e,
							i = p.index + "-" + n.key,
							a = l[t];
						if (void 0 !== a && null !== a || (a = ""), !n.colGroup) {
							var r = ['<td data-field="' + t + '" data-key="' + i + '" ' +
							function() {
								var e = [];
								return n.edit && e.push('data-edit="' + n.edit + '"'), n.align && e.push('align="' + n.align + '"'), n.templet && e.push('data-content="' + a + '"'), n.toolbar && e.push('data-off="true"'), n.event && e.push('lay-event="' + n.event + '"'), n.style && e.push('style="' + n.style + '"'), n.minWidth && e.push('data-minwidth="' + n.minWidth + '"'), e.join(" ")
							}() + ' class="' +
							function() {
								var e = [];
								return n.hide && e.push(w), n.field || e.push("layui-table-col-special"), e.join(" ")
							}() + '">', '<div class="layui-table-cell laytable-cell-' +
							function() {
								return "normal" === n.type ? i : i + " laytable-cell-" + n.type
							}() + '">' +
							function() {
								var e = v.extend(!0, {
									LAY_INDEX: d
								}, l),
									t = x.config.checkName;
								switch (n.type) {
								case "checkbox":
									return '<input type="checkbox" name="layTableCheckbox" lay-skin="primary" ' +
									function() {
										return n[t] ? (l[t] = n[t], n[t] ? "checked" : "") : e[t] ? "checked" : ""
									}() + ">";
								case "radio":
									return e[t] && (f = o), '<input type="radio" name="layTableRadio_' + p.index + '" ' + (e[t] ? "checked" : "") + ' lay-type="layTableRadio">';
								case "numbers":
									return d
								}
								return n.toolbar ? g(v(n.toolbar).html() || "").render(e) : n.templet ?
								function() {
									return "function" == typeof n.templet ? n.templet(e) : g(v(n.templet).html() || String(a)).render(e)
								}() : a
							}(), "</div></td>"].join("");
							s.push(r), n.fixed && "right" !== n.fixed && c.push(r), "right" === n.fixed && u.push(r)
						}
					}), h.push('<tr data-index="' + o + '">' + s.join("") + "</tr>"), y.push('<tr data-index="' + o + '">' + c.join("") + "</tr>"), m.push('<tr data-index="' + o + '">' + u.join("") + "</tr>"))
				}), a.layBody.scrollTop(0), a.layMain.find("." + u).remove(), a.layMain.find("tbody").html(h.join("")), a.layFixLeft.find("tbody").html(y.join("")), a.layFixRight.find("tbody").html(m.join("")), a.renderForm(), "number" == typeof f && a.setThisRowChecked(f), a.syncCheckAll(), a.scrollPatch(), b.close(a.tipsIndex), p.HAS_SET_COLS_PATCH || a.setColsPatch(), void(p.HAS_SET_COLS_PATCH = !0))
			};
		return a.key = p.id || p.index, x.cache[a.key] = r, a.layPage[0 == n || 0 === r.length && 1 == t ? "addClass" : "removeClass"](w), i ? o() : 0 === r.length ? (a.renderForm(), a.layFixed.remove(), a.layMain.find("tbody").html(""), a.layMain.find("." + u).remove(), a.layMain.append('<div class="' + u + '">' + p.text.none + "</div>")) : (o(), a.renderTotal(r), void(p.page && (p.page = v.extend({
			elem: "layui-table-page" + p.index,
			count: n,
			limit: p.limit,
			limits: p.limits || [10, 20, 30, 40, 50, 60, 70, 80, 90],
			groups: 3,
			layout: ["prev", "page", "next", "skip", "count", "limit"],
			prev: '<i class="layui-icon">&#xe603;</i>',
			next: '<i class="layui-icon">&#xe602;</i>',
			jump: function(e, t) {
				t || (a.page = e.curr, p.limit = e.limit, a.loading(), a.pullData(e.curr))
			}
		}, p.page), p.page.count = n, l.render(p.page))))
	}, r.prototype.renderTotal = function(e) {
		var t = this,
			a = t.config,
			r = {};
		if (a.totalRow) {
			layui.each(e, function(e, a) {
				0 !== a.length && t.eachCols(function(e, t) {
					var n = t.field || e,
						i = a[n];
					t.totalRow && (r[n] = (r[n] || 0) + (parseFloat(i) || 0))
				})
			});
			var o = [];
			t.eachCols(function(e, t) {
				var n = t.field || e;
				if (!t.hide) {
					var i = ['<td data-field="' + n + '" data-key="' + t.key + '" ' +
					function() {
						var e = [];
						return t.align && e.push('align="' + t.align + '"'), t.style && e.push('style="' + t.style + '"'), t.minWidth && e.push('data-minwidth="' + t.minWidth + '"'), e.join(" ")
					}() + ">", '<div class="layui-table-cell laytable-cell-' +
					function() {
						var e = a.index + "-" + t.key;
						return "normal" === t.type ? e : e + " laytable-cell-" + t.type
					}() + '">' +
					function() {
						var e = t.totalRowText || "";
						return t.totalRow ? r[n] || e : e
					}(), "</div></td>"].join("");
					o.push(i)
				}
			}), t.layTotal.find("tbody").html("<tr>" + o.join("") + "</tr>")
		}
	}, r.prototype.getColElem = function(e, t) {
		var n = this,
			i = n.config;
		return e.eq(0).find(".laytable-cell-" + (i.index + "-" + t) + ":eq(0)")
	}, r.prototype.renderForm = function(e) {
		f.render(e, "LAY-table-" + this.index)
	}, r.prototype.setThisRowChecked = function(e) {
		var t = this,
			n = (t.config, "layui-table-click"),
			i = t.layBody.find('tr[data-index="' + e + '"]');
		i.addClass(n).siblings("tr").removeClass(n)
	}, r.prototype.sort = function(a, e, t, n) {
		var r, i, o = this,
			l = {},
			s = o.config,
			c = s.elem.attr("lay-filter"),
			u = x.cache[o.key];
		"string" == typeof a && o.layHeader.find("th").each(function(e, t) {
			var n = v(this),
				i = n.data("field");
			if (i === a) return a = n, r = i, !1
		});
		try {
			var r = r || a.data("field"),
				d = a.data("key");
			if (o.sortKey && !t && r === o.sortKey.field && e === o.sortKey.sort) return;
			var f = o.layHeader.find("th .laytable-cell-" + d).find(A);
			o.layHeader.find("th").find(A).removeAttr("lay-sort"), f.attr("lay-sort", e || null), o.layFixed.find("th")
		} catch (e) {
			return p.error("Table modules: Did not match to field")
		}
		o.sortKey = {
			field: r,
			sort: e
		}, "asc" === e ? i = layui.sort(u, r) : "desc" === e ? i = layui.sort(u, r, !0) : (i = layui.sort(u, x.config.indexName), delete o.sortKey), l[s.response.dataName] = i, o.renderData(l, o.page, o.count, !0), n && layui.event.call(a, y, "sort(" + c + ")", {
			field: r,
			type: e
		})
	}, r.prototype.loading = function(e) {
		var t = this,
			n = t.config;
		n.loading && (e ? (t.layInit && t.layInit.remove(), delete t.layInit, t.layBox.find(i).remove()) : (t.layInit = v(['<div class="layui-table-init">', '<i class="layui-icon layui-icon-loading layui-icon"></i>', "</div>"].join("")), t.layBox.append(t.layInit)))
	}, r.prototype.setCheckData = function(e, t) {
		var n = this,
			i = n.config,
			a = x.cache[n.key];
		a[e] && a[e].constructor !== Array && (a[e][i.checkName] = t)
	}, r.prototype.syncCheckAll = function() {
		var e = this,
			i = e.config,
			t = e.layHeader.find('input[name="layTableCheckbox"]'),
			n = function(n) {
				return e.eachCols(function(e, t) {
					"checkbox" === t.type && (t[i.checkName] = n)
				}), n
			};
		t[0] && (x.checkStatus(e.key).isAll ? (t[0].checked || (t.prop("checked", !0), e.renderForm("checkbox")), n(!0)) : (t[0].checked && (t.prop("checked", !1), e.renderForm("checkbox")), n(!1)))
	}, r.prototype.getCssRule = function(n, i) {
		var e = this,
			t = e.elem.find("style")[0],
			a = t.sheet || t.styleSheet || {},
			r = a.cssRules || a.rules;
		layui.each(r, function(e, t) {
			if (t.selectorText === ".laytable-cell-" + n) return i(t), !0
		})
	}, r.prototype.fullSize = function() {
		var e, t = this,
			n = t.config,
			i = n.height;
		t.fullHeightGap && (i = H.height() - t.fullHeightGap, i < 135 && (i = 135), t.elem.css("height", i)), i && (e = parseFloat(i) - (t.layHeader.outerHeight() || 38), n.toolbar && (e -= t.layTool.outerHeight() || 50), n.totalRow && (e -= t.layTotal.outerHeight() || 40), n.page && (e = e - (t.layPage.outerHeight() || 41) - 2), t.layMain.css("height", e))
	}, r.prototype.getScrollWidth = function(e) {
		var t = 0;
		return e ? t = e.offsetWidth - e.clientWidth : (e = document.createElement("div"), e.style.width = "100px", e.style.height = "100px", e.style.overflowY = "scroll", document.body.appendChild(e), t = e.offsetWidth - e.clientWidth, document.body.removeChild(e)), t
	}, r.prototype.scrollPatch = function() {
		var e = this,
			t = e.layMain.children("table"),
			n = e.layMain.width() - e.layMain.prop("clientWidth"),
			i = e.layMain.height() - e.layMain.prop("clientHeight"),
			a = (e.getScrollWidth(e.layMain[0]), t.outerWidth() - e.layMain.width()),
			r = function(e) {
				if (n && i) {
					if (e = e.eq(0), !e.find(".layui-table-patch")[0]) {
						var t = v('<th class="layui-table-patch"><div class="layui-table-cell"></div></th>');
						t.find("div").css({
							width: n
						}), e.find("tr").append(t)
					}
				} else e.find(".layui-table-patch").remove()
			};
		r(e.layHeader), r(e.layTotal);
		var o = e.layMain.height(),
			l = o - i;
		e.layFixed.find(k).css("height", t.height() > l ? l : "auto"), e.layFixRight[a > 0 ? "removeClass" : "addClass"](w), e.layFixRight.css("right", n - 1)
	}, r.prototype.events = function() {
		var r, l = this,
			s = l.config,
			a = v("body"),
			o = {},
			e = l.layHeader.find("th"),
			c = ".layui-table-cell",
			u = s.elem.attr("lay-filter");
		l.layTool.on("click", "*[lay-event]", function(e) {
			var i = v(this),
				t = i.attr("lay-event"),
				n = function(e) {
					var t = v(e.list),
						n = v('<ul class="layui-table-tool-panel"></ul>');
					n.html(t), i.find(".layui-table-tool-panel")[0] || i.append(n), l.renderForm(), n.on("click", function(e) {
						layui.stope(e)
					}), e.done && e.done(n, t)
				};
			switch (layui.stope(e), F.trigger("table.tool.panel.remove"), b.close(l.tipsIndex), t) {
			case "LAYTABLE_COLS":
				n({
					list: function() {
						var n = [];
						return l.eachCols(function(e, t) {
							t.field && "normal" == t.type && n.push('<li><input type="checkbox" name="' + t.field + '" data-key="' + t.key + '" data-parentkey="' + (t.parentKey || "") + '" lay-skin="primary" ' + (t.hide ? "" : "checked") + ' title="' + (t.title || t.field) + '" lay-filter="LAY_TABLE_TOOL_COLS"></li>')
						}), n.join("")
					}(),
					done: function() {
						f.on("checkbox(LAY_TABLE_TOOL_COLS)", function(e) {
							var t = v(e.elem),
								a = this.checked,
								r = t.data("key"),
								o = t.data("parentkey");
							layui.each(s.cols, function(i, e) {
								layui.each(e, function(e, t) {
									if (i + "-" + e === r) {
										var n = t.hide;
										t.hide = !a, l.elem.find('*[data-key="' + s.index + "-" + r + '"]')[a ? "removeClass" : "addClass"](w), n != t.hide && l.setParentCol(!a, o), l.fullSize(), l.scrollPatch(), l.setColsWidth()
									}
								})
							})
						})
					}
				});
				break;
			case "LAYTABLE_EXPORT":
				h.ie ? b.tips("导出功能不支持 IE，请用 Chrome 等高级浏览器导出", this, {
					tips: 3
				}) : n({
					list: function() {
						return ['<li data-type="csv">导出到 Csv 文件</li>', '<li data-type="xls">导出到 Excel 文件</li>'].join("")
					}(),
					done: function(e, t) {
						t.on("click", function() {
							var e = v(this).data("type");
							x.exportFile(s.id, null, e)
						})
					}
				});
				break;
			case "LAYTABLE_PRINT":
				var a = window.open("打印窗口", "_blank"),
					r = ["<style>", "body{font-size: 12px; color: #666;}", "table{width: 100%; border-collapse: collapse; border-spacing: 0;}", "th,td{line-height: 20px; padding: 9px 15px; border: 1px solid #ccc; text-align: left; font-size: 12px; color: #666;}", "a{color: #666; text-decoration:none;}", "*.layui-hide{display: none}", "</style>"].join(""),
					o = v(l.layHeader.html());
				o.append(l.layMain.find("table").html()), o.find("th.layui-table-patch").remove(), o.find(".layui-table-col-special").remove(), a.document.write(r + o.prop("outerHTML")), a.document.close(), a.print(), a.close()
			}
			layui.event.call(this, y, "toolbar(" + u + ")", v.extend({
				event: t,
				config: s
			}, {}))
		}), e.on("mousemove", function(e) {
			var t = v(this),
				n = t.offset().left,
				i = e.clientX - n;
			t.data("unresize") || o.resizeStart || (o.allowResize = t.width() - i <= 10, a.css("cursor", o.allowResize ? "col-resize" : ""))
		}).on("mouseleave", function() {
			v(this);
			o.resizeStart || a.css("cursor", "")
		}).on("mousedown", function(e) {
			var n = v(this);
			if (o.allowResize) {
				var t = n.data("key");
				e.preventDefault(), o.resizeStart = !0, o.offset = [e.clientX, e.clientY], l.getCssRule(t, function(e) {
					var t = e.style.width || n.outerWidth();
					o.rule = e, o.ruleWidth = parseFloat(t), o.minWidth = n.data("minwidth") || s.cellMinWidth
				})
			}
		}), F.on("mousemove", function(e) {
			if (o.resizeStart) {
				if (e.preventDefault(), o.rule) {
					var t = o.ruleWidth + e.clientX - o.offset[0];
					t < o.minWidth && (t = o.minWidth), o.rule.style.width = t + "px", b.close(l.tipsIndex)
				}
				r = 1
			}
		}).on("mouseup", function(e) {
			o.resizeStart && (o = {}, a.css("cursor", ""), l.scrollPatch()), 2 === r && (r = null)
		}), e.on("click", function(e) {
			var t, n = v(this),
				i = n.find(A),
				a = i.attr("lay-sort");
			return i[0] && 1 !== r ? (t = "asc" === a ? "desc" : "desc" === a ? null : "asc", void l.sort(n, t, null, !0)) : r = 2
		}).find(A + " .layui-edge ").on("click", function(e) {
			var t = v(this),
				n = t.index(),
				i = t.parents("th").eq(0).data("field");
			layui.stope(e), 0 === n ? l.sort(i, "asc", null, !0) : l.sort(i, "desc", null, !0)
		});
		var d = function(e) {
				var t = v(this),
					n = t.parents("tr").eq(0).data("index"),
					a = l.layBody.find('tr[data-index="' + n + '"]'),
					r = x.cache[l.key][n];
				return v.extend({
					tr: a,
					data: x.clearCacheKey(r),
					del: function() {
						x.cache[l.key][n] = [], a.remove(), l.scrollPatch()
					},
					update: function(e) {
						e = e || {}, layui.each(e, function(n, e) {
							if (n in r) {
								var i, t = a.children('td[data-field="' + n + '"]');
								r[n] = e, l.eachCols(function(e, t) {
									t.field == n && t.templet && (i = t.templet)
								}), t.children(c).html(function() {
									return i ?
									function() {
										return "function" == typeof i ? i(r) : g(v(i).html() || e).render(r)
									}() : e
								}()), t.data("content", e)
							}
						})
					}
				}, e)
			};
		l.elem.on("click", 'input[name="layTableCheckbox"]+', function() {
			var e = v(this).prev(),
				t = l.layBody.find('input[name="layTableCheckbox"]'),
				n = e.parents("tr").eq(0).data("index"),
				i = e[0].checked,
				a = "layTableAllChoose" === e.attr("lay-filter");
			a ? (t.each(function(e, t) {
				t.checked = i, l.setCheckData(e, i)
			}), l.syncCheckAll(), l.renderForm("checkbox")) : (l.setCheckData(n, i), l.syncCheckAll()), layui.event.call(this, y, "checkbox(" + u + ")", d.call(this, {
				checked: i,
				type: a ? "all" : "one"
			}))
		}), l.elem.on("click", 'input[lay-type="layTableRadio"]+', function() {
			var e = v(this).prev(),
				t = e[0].checked,
				n = x.cache[l.key],
				i = e.parents("tr").eq(0).data("index");
			layui.each(n, function(e, t) {
				i === e ? t.LAY_CHECKED = !0 : delete t.LAY_CHECKED
			}), l.setThisRowChecked(i), layui.event.call(this, y, "radio(" + u + ")", d.call(this, {
				checked: t
			}))
		}), l.layBody.on("mouseenter", "tr", function() {
			var e = v(this),
				t = e.index();
			l.layBody.find("tr:eq(" + t + ")").addClass(N)
		}).on("mouseleave", "tr", function() {
			var e = v(this),
				t = e.index();
			l.layBody.find("tr:eq(" + t + ")").removeClass(N)
		}).on("click", "tr", function() {
			t.call(this, "row")
		}).on("dblclick", "tr", function() {
			t.call(this, "rowDouble")
		});
		var t = function(e) {
				var t = v(this);
				layui.event.call(this, y, e + "(" + u + ")", d.call(t.children("td")[0]))
			};
		l.layBody.on("change", "." + j, function() {
			var e = v(this),
				t = this.value,
				n = e.parent().data("field"),
				i = e.parents("tr").eq(0).data("index"),
				a = x.cache[l.key][i];
			a[n] = t, layui.event.call(this, y, "edit(" + u + ")", d.call(this, {
				value: t,
				field: n
			}))
		}).on("blur", "." + j, function() {
			var n, e = v(this),
				i = e.parent().data("field"),
				t = e.parents("tr").eq(0).data("index"),
				a = x.cache[l.key][t];
			l.eachCols(function(e, t) {
				t.field == i && t.templet && (n = t.templet)
			}), e.siblings(c).html(function(e) {
				return n ?
				function() {
					return "function" == typeof n ? n(a) : g(v(n).html() || this.value).render(a)
				}() : e
			}(this.value)), e.parent().data("content", this.value), e.remove()
		}), l.layBody.on("click", "td", function() {
			var e = v(this),
				t = (e.data("field"), e.data("edit")),
				n = e.children(c);
			if (!e.data("off") && t) {
				var i = v('<input class="layui-input ' + j + '">');
				return i[0].value = e.data("content") || n.text(), e.find("." + j)[0] || e.append(i), void i.focus()
			}
		}).on("mouseenter", "td", function() {
			n.call(this)
		}).on("mouseleave", "td", function() {
			n.call(this, "hide")
		});
		var i = "layui-table-grid-down",
			n = function(e) {
				var t = v(this),
					n = t.children(c);
				if (e) t.find(".layui-table-grid-down").remove();
				else if (n.prop("scrollWidth") > n.outerWidth()) {
					if (n.find("." + i)[0]) return;
					t.append('<div class="' + i + '"><i class="layui-icon layui-icon-down"></i></div>')
				}
			};
		l.layBody.on("click", "." + i, function() {
			var e = v(this),
				t = e.parent(),
				n = t.children(c);
			l.tipsIndex = b.tips(['<div class="layui-table-tips-main" style="margin-top: -' + (n.height() + 16) + "px;" +
			function() {
				return "sm" === s.size ? "padding: 4px 15px; font-size: 12px;" : "lg" === s.size ? "padding: 14px 15px;" : ""
			}() + '">', n.html(), "</div>", '<i class="layui-icon layui-table-tips-c layui-icon-close"></i>'].join(""), n[0], {
				tips: [3, ""],
				time: -1,
				anim: -1,
				maxWidth: h.ios || h.android ? 300 : l.elem.width() / 2,
				isOutAnim: !1,
				skin: "layui-table-tips",
				success: function(e, t) {
					e.find(".layui-table-tips-c").on("click", function() {
						b.close(t)
					})
				}
			})
		}), l.layBody.on("click", "*[lay-event]", function() {
			var e = v(this),
				t = e.parents("tr").eq(0).data("index");
			layui.event.call(this, y, "tool(" + u + ")", d.call(this, {
				event: e.attr("lay-event")
			})), l.setThisRowChecked(t)
		}), l.layMain.on("scroll", function() {
			var e = v(this),
				t = e.scrollLeft(),
				n = e.scrollTop();
			l.layHeader.scrollLeft(t), l.layTotal.scrollLeft(t), l.layFixed.find(k).scrollTop(n), b.close(l.tipsIndex)
		}), F.on("click", function() {
			F.trigger("table.remove.tool.panel")
		}), F.on("table.remove.tool.panel", function() {
			v(".layui-table-tool-panel").remove()
		}), H.on("resize", function() {
			l.fullSize(), l.scrollPatch(), l.setColsWidth()
		})
	}, x.init = function(n, i) {
		i = i || {};
		var e = this,
			t = v(n ? 'table[lay-filter="' + n + '"]' : a + "[lay-data]"),
			l = "Table element property lay-data configuration item has a syntax error: ";
		return t.each(function() {
			var e = v(this),
				t = e.attr("lay-data");
			try {
				t = new Function("return " + t)()
			} catch (e) {
				p.error(l + t)
			}
			var r = [],
				o = v.extend({
					elem: this,
					cols: [],
					data: [],
					skin: e.attr("lay-skin"),
					size: e.attr("lay-size"),
					even: "string" == typeof e.attr("lay-even")
				}, x.config, i, t);
			n && e.hide(), e.find("thead>tr").each(function(a) {
				o.cols[a] = [], v(this).children().each(function(e) {
					var t = v(this),
						n = t.attr("lay-data");
					try {
						n = new Function("return " + n)()
					} catch (e) {
						return p.error(l + n)
					}
					var i = v.extend({
						title: t.text(),
						colspan: t.attr("colspan") || 0,
						rowspan: t.attr("rowspan") || 0
					}, n);
					i.colspan < 2 && r.push(i), o.cols[a].push(i)
				})
			}), e.find("tbody>tr").each(function(e) {
				var i = v(this),
					a = {};
				i.children("td").each(function(e, t) {
					var n = v(this),
						i = n.data("field");
					if (i) return a[i] = n.html()
				}), layui.each(r, function(e, t) {
					var n = i.children("td").eq(e);
					a[t.field] = n.html()
				}), o.data[e] = a
			}), x.render(o)
		}), e
	}, s.config = {}, x.eachCols = function(e, n, a) {
		var t = s.config[e] || {},
			r = [],
			o = 0;
		a = v.extend(!0, [], a || t.cols), layui.each(a, function(t, e) {
			layui.each(e, function(e, n) {
				if (n.colGroup) {
					var i = 0;
					o++, n.CHILD_COLS = [], layui.each(a[t + 1], function(e, t) {
						t.PARENT_COL_INDEX || i > 1 && i == n.colspan || (t.PARENT_COL_INDEX = o, n.CHILD_COLS.push(t), i += parseInt(t.colspan > 1 ? t.colspan : 1))
					})
				}
				n.PARENT_COL_INDEX || r.push(n)
			})
		});
		var i = function(e) {
				layui.each(e || r, function(e, t) {
					return t.CHILD_COLS ? i(t.CHILD_COLS) : void("function" == typeof n && n(e, t))
				})
			};
		i()
	}, x.checkStatus = function(e) {
		var n = 0,
			i = 0,
			a = [],
			t = x.cache[e] || [];
		return layui.each(t, function(e, t) {
			return t.constructor === Array ? void i++ : void(t[x.config.checkName] && (n++, a.push(x.clearCacheKey(t))))
		}), {
			data: a,
			isAll: !! t.length && n === t.length - i
		}
	}, x.exportFile = function(t, n, e) {
		n = n || x.clearCacheKey(x.cache[t]), e = e || "csv";
		var i = s.config[t] || {},
			a = {
				csv: "text/csv",
				xls: "application/vnd.ms-excel"
			}[e],
			r = document.createElement("a");
		return h.ie ? p.error("IE_NOT_SUPPORT_EXPORTS") : (r.href = "data:" + a + ";charset=utf-8,\ufeff" + encodeURIComponent(function() {
			var r = [],
				e = [];
			return layui.each(n, function(n, i) {
				var a = [];
				"object" == typeof t ? (layui.each(t, function(e, t) {
					0 == n && r.push(t || "")
				}), layui.each(x.clearCacheKey(i), function(e, t) {
					a.push(t)
				})) : x.eachCols(t, function(e, t) {
					t.field && "normal" == t.type && !t.hide && (0 == n && r.push(t.title || ""), a.push(i[t.field]))
				}), e.push(a.join(","))
			}), r.join(",") + "\r\n" + e.join("\r\n")
		}()), r.download = (i.title || "table_" + (i.index || "")) + "." + e, document.body.appendChild(r), r.click(), void document.body.removeChild(r))
	}, x.reload = function(e, t) {
		var n = s.config[e];
		return t = t || {}, n ? (t.data && t.data.constructor === Array && delete n.data, x.render(v.extend(!0, {}, n, t))) : p.error("The ID option was not found in the table instance")
	}, x.render = function(e) {
		var t = new r(e);
		return s.call(t)
	}, x.clearCacheKey = function(e) {
		return e = v.extend({}, e), delete e[x.config.checkName], delete e[x.config.indexName], e
	}, x.init(), e(y, x)
});
layui.define("jquery", function(e) {
	"use strict";
	var a = layui.$,
		n = (layui.hint(), layui.device(), {
			config: {},
			set: function(e) {
				var t = this;
				return t.config = a.extend({}, t.config, e), t
			},
			on: function(e, t) {
				return layui.onevent.call(this, l, e, t)
			}
		}),
		l = "carousel",
		s = "layui-this",
		i = ">*[carousel-item]>*",
		c = "layui-carousel-left",
		u = "layui-carousel-right",
		d = "layui-carousel-prev",
		f = "layui-carousel-next",
		r = "layui-carousel-arrow",
		t = "layui-carousel-ind",
		o = function(e) {
			var t = this;
			t.config = a.extend({}, t.config, n.config, e), t.render()
		};
	o.prototype.config = {
		width: "600px",
		height: "280px",
		full: !1,
		arrow: "hover",
		indicator: "inside",
		autoplay: !0,
		interval: 3e3,
		anim: "",
		trigger: "click",
		index: 0
	}, o.prototype.render = function() {
		var e = this,
			t = e.config;
		t.elem = a(t.elem), t.elem[0] && (e.elemItem = t.elem.find(i), t.index < 0 && (t.index = 0), t.index >= e.elemItem.length && (t.index = e.elemItem.length - 1), t.interval < 800 && (t.interval = 800), t.full ? t.elem.css({
			position: "fixed",
			width: "100%",
			height: "100%",
			zIndex: 9999
		}) : t.elem.css({
			width: t.width,
			height: t.height
		}), t.elem.attr("lay-anim", t.anim), e.elemItem.eq(t.index).addClass(s), e.elemItem.length <= 1 || (e.indicator(), e.arrow(), e.autoplay(), e.events()))
	}, o.prototype.reload = function(e) {
		var t = this;
		clearInterval(t.timer), t.config = a.extend({}, t.config, e), t.render()
	}, o.prototype.prevIndex = function() {
		var e = this,
			t = e.config,
			n = t.index - 1;
		return n < 0 && (n = e.elemItem.length - 1), n
	}, o.prototype.nextIndex = function() {
		var e = this,
			t = e.config,
			n = t.index + 1;
		return n >= e.elemItem.length && (n = 0), n
	}, o.prototype.addIndex = function(e) {
		var t = this,
			n = t.config;
		e = e || 1, n.index = n.index + e, n.index >= t.elemItem.length && (n.index = 0)
	}, o.prototype.subIndex = function(e) {
		var t = this,
			n = t.config;
		e = e || 1, n.index = n.index - e, n.index < 0 && (n.index = t.elemItem.length - 1)
	}, o.prototype.autoplay = function() {
		var e = this,
			t = e.config;
		t.autoplay && (e.timer = setInterval(function() {
			e.slide()
		}, t.interval))
	}, o.prototype.arrow = function() {
		var n = this,
			e = n.config,
			t = a(['<button class="layui-icon ' + r + '" lay-type="sub">' + ("updown" === e.anim ? "&#xe619;" : "&#xe603;") + "</button>", '<button class="layui-icon ' + r + '" lay-type="add">' + ("updown" === e.anim ? "&#xe61a;" : "&#xe602;") + "</button>"].join(""));
		e.elem.attr("lay-arrow", e.arrow), e.elem.find("." + r)[0] && e.elem.find("." + r).remove(), e.elem.append(t), t.on("click", function() {
			var e = a(this),
				t = e.attr("lay-type");
			n.slide(t)
		})
	}, o.prototype.indicator = function() {
		var n = this,
			i = n.config,
			e = n.elemInd = a(['<div class="' + t + '"><ul>', function() {
				var t = [];
				return layui.each(n.elemItem, function(e) {
					t.push("<li" + (i.index === e ? ' class="layui-this"' : "") + "></li>")
				}), t.join("")
			}(), "</ul></div>"].join(""));
		i.elem.attr("lay-indicator", i.indicator), i.elem.find("." + t)[0] && i.elem.find("." + t).remove(), i.elem.append(e), "updown" === i.anim && e.css("margin-top", -(e.height() / 2)), e.find("li").on("hover" === i.trigger ? "mouseover" : i.trigger, function() {
			var e = a(this),
				t = e.index();
			t > i.index ? n.slide("add", t - i.index) : t < i.index && n.slide("sub", i.index - t)
		})
	}, o.prototype.slide = function(e, t) {
		var n = this,
			i = n.elemItem,
			a = n.config,
			r = a.index,
			o = a.elem.attr("lay-filter");
		n.haveSlide || ("sub" === e ? (n.subIndex(t), i.eq(a.index).addClass(d), setTimeout(function() {
			i.eq(r).addClass(u), i.eq(a.index).addClass(u)
		}, 50)) : (n.addIndex(t), i.eq(a.index).addClass(f), setTimeout(function() {
			i.eq(r).addClass(c), i.eq(a.index).addClass(c)
		}, 50)), setTimeout(function() {
			i.removeClass(s + " " + d + " " + f + " " + c + " " + u), i.eq(a.index).addClass(s), n.haveSlide = !1
		}, 300), n.elemInd.find("li").eq(a.index).addClass(s).siblings().removeClass(s), n.haveSlide = !0, layui.event.call(this, l, "change(" + o + ")", {
			index: a.index,
			prevIndex: r,
			item: i.eq(a.index)
		}))
	}, o.prototype.events = function() {
		var e = this,
			t = e.config;
		t.elem.data("haveEvents") || (t.elem.on("mouseenter", function() {
			clearInterval(e.timer)
		}).on("mouseleave", function() {
			e.autoplay()
		}), t.elem.data("haveEvents", !0))
	}, n.render = function(e) {
		var t = new o(e);
		return t
	}, e(l, n)
});
layui.define("jquery", function(e) {
	"use strict";
	var s = layui.jquery,
		n = {
			config: {},
			index: layui.rate ? layui.rate.index + 1e4 : 0,
			set: function(e) {
				var t = this;
				return t.config = s.extend({}, t.config, e), t
			},
			on: function(e, t) {
				return layui.onevent.call(this, a, e, t)
			}
		},
		i = function() {
			var t = this,
				e = t.config;
			return {
				setvalue: function(e) {
					t.setvalue.call(t, e)
				},
				config: e
			}
		},
		a = "rate",
		c = "layui-rate",
		u = "layui-icon-rate",
		d = "layui-icon-rate-solid",
		l = "layui-icon-rate-half",
		f = "layui-icon-rate-solid layui-icon-rate-half",
		t = "layui-icon-rate-solid layui-icon-rate",
		p = "layui-icon-rate layui-icon-rate-half",
		r = function(e) {
			var t = this;
			t.index = ++n.index, t.config = s.extend({}, t.config, n.config, e), t.render()
		};
	r.prototype.config = {
		length: 5,
		text: !1,
		readonly: !1,
		half: !1,
		value: 0,
		theme: ""
	}, r.prototype.render = function() {
		var e = this,
			t = e.config,
			n = t.theme ? 'style="color: ' + t.theme + ';"' : "";
		t.elem = s(t.elem), parseInt(t.value) !== t.value && (t.half || (t.value = Math.ceil(t.value) - t.value < .5 ? Math.ceil(t.value) : Math.floor(t.value)));
		for (var i = '<ul class="layui-rate" ' + (t.readonly ? "readonly" : "") + ">", a = 1; a <= t.length; a++) {
			var r = '<li class="layui-inline"><i class="layui-icon ' + (a > Math.floor(t.value) ? u : d) + '" ' + n + "></i></li>";
			t.half && parseInt(t.value) !== t.value && a == Math.ceil(t.value) ? i = i + '<li><i class="layui-icon layui-icon-rate-half" ' + n + "></i></li>" : i += r
		}
		i += "</ul>" + (t.text ? '<span class="layui-inline">' + t.value + "星" : "") + "</span>";
		var o = t.elem,
			l = o.next("." + c);
		l[0] && l.remove(), e.elemTemp = s(i), t.span = e.elemTemp.next("span"), t.setText && t.setText(t.value), o.html(e.elemTemp), o.addClass("layui-inline"), t.readonly || e.action()
	}, r.prototype.setvalue = function(e) {
		var t = this,
			n = t.config;
		n.value = e, t.render()
	}, r.prototype.action = function() {
		var e = this,
			a = e.config,
			r = e.elemTemp,
			o = r.find("i").width();
		r.children("li").each(function(e) {
			var n = e + 1,
				i = s(this);
			i.on("click", function(e) {
				if (a.value = n, a.half) {
					var t = e.pageX - s(this).offset().left;
					t <= o / 2 && (a.value = a.value - .5)
				}
				a.text && r.next("span").text(a.value + "星"), a.choose && a.choose(a.value), a.setText && a.setText(a.value)
			}), i.on("mousemove", function(e) {
				if (r.find("i").each(function() {
					s(this).addClass(u).removeClass(f)
				}), r.find("i:lt(" + n + ")").each(function() {
					s(this).addClass(d).removeClass(p)
				}), a.half) {
					var t = e.pageX - s(this).offset().left;
					t <= o / 2 && i.children("i").addClass(l).removeClass(d)
				}
			}), i.on("mouseleave", function() {
				r.find("i").each(function() {
					s(this).addClass(u).removeClass(f)
				}), r.find("i:lt(" + Math.floor(a.value) + ")").each(function() {
					s(this).addClass(d).removeClass(p)
				}), a.half && parseInt(a.value) !== a.value && r.children("li:eq(" + Math.floor(a.value) + ")").children("i").addClass(l).removeClass(t)
			})
		})
	}, r.prototype.events = function() {
		var e = this;
		e.config
	}, n.render = function(e) {
		var t = new r(e);
		return i.call(t)
	}, e(a, n)
});
layui.define("jquery", function(e) {
	"use strict";
	var d = layui.$,
		t = {
			fixbar: function(n) {
				var t, e, i = "layui-fixbar",
					a = "layui-fixbar-top",
					r = d(document),
					o = d("body");
				n = d.extend({
					showHeight: 200
				}, n), n.bar1 = n.bar1 === !0 ? "&#xe606;" : n.bar1, n.bar2 = n.bar2 === !0 ? "&#xe607;" : n.bar2, n.bgcolor = n.bgcolor ? "background-color:" + n.bgcolor : "";
				var l = [n.bar1, n.bar2, "&#xe604;"],
					s = d(['<ul class="' + i + '">', n.bar1 ? '<li class="layui-icon" lay-type="bar1" style="' + n.bgcolor + '">' + l[0] + "</li>" : "", n.bar2 ? '<li class="layui-icon" lay-type="bar2" style="' + n.bgcolor + '">' + l[1] + "</li>" : "", '<li class="layui-icon ' + a + '" lay-type="top" style="' + n.bgcolor + '">' + l[2] + "</li>", "</ul>"].join("")),
					c = s.find("." + a),
					u = function() {
						var e = r.scrollTop();
						e >= n.showHeight ? t || (c.show(), t = 1) : t && (c.hide(), t = 0)
					};
				d("." + i)[0] || ("object" == typeof n.css && s.css(n.css), o.append(s), u(), s.find("li").on("click", function() {
					var e = d(this),
						t = e.attr("lay-type");
					"top" === t && d("html,body").animate({
						scrollTop: 0
					}, 200), n.click && n.click.call(this, t)
				}), r.on("scroll", function() {
					clearTimeout(e), e = setTimeout(function() {
						u()
					}, 100)
				}))
			},
			countdown: function(e, t, n) {
				var i = this,
					a = "function" == typeof t,
					r = new Date(e).getTime(),
					o = new Date(!t || a ? (new Date).getTime() : t).getTime(),
					l = r - o,
					s = [Math.floor(l / 864e5), Math.floor(l / 36e5) % 24, Math.floor(l / 6e4) % 60, Math.floor(l / 1e3) % 60];
				a && (n = t);
				var c = setTimeout(function() {
					i.countdown(e, o + 1e3, n)
				}, 1e3);
				return n && n(l > 0 ? s : [0, 0, 0, 0], t, c), l <= 0 && clearTimeout(c), c
			},
			timeAgo: function(e, t) {
				var n = this,
					i = [
						[],
						[]
					],
					a = (new Date).getTime() - new Date(e).getTime();
				return a > 6912e5 ? (a = new Date(e), i[0][0] = n.digit(a.getFullYear(), 4), i[0][1] = n.digit(a.getMonth() + 1), i[0][2] = n.digit(a.getDate()), t || (i[1][0] = n.digit(a.getHours()), i[1][1] = n.digit(a.getMinutes()), i[1][2] = n.digit(a.getSeconds())), i[0].join("-") + " " + i[1].join(":")) : a >= 864e5 ? (a / 1e3 / 60 / 60 / 24 | 0) + "天前" : a >= 36e5 ? (a / 1e3 / 60 / 60 | 0) + "小时前" : a >= 12e4 ? (a / 1e3 / 60 | 0) + "分钟前" : a < 0 ? "未来" : "刚刚"
			},
			digit: function(e, t) {
				var n = "";
				e = String(e), t = t || 2;
				for (var i = e.length; i < t; i++) n += "0";
				return e < Math.pow(10, t) ? n + (0 | e) : e
			},
			toDateString: function(e, t) {
				var n = this,
					i = new Date(e || new Date),
					a = [n.digit(i.getFullYear(), 4), n.digit(i.getMonth() + 1), n.digit(i.getDate())],
					r = [n.digit(i.getHours()), n.digit(i.getMinutes()), n.digit(i.getSeconds())];
				return t = t || "yyyy-MM-dd HH:mm:ss", t.replace(/yyyy/g, a[0]).replace(/MM/g, a[1]).replace(/dd/g, a[2]).replace(/HH/g, r[0]).replace(/mm/g, r[1]).replace(/ss/g, r[2])
			},
			escape: function(e) {
				return String(e || "").replace(/&(?!#?[a-zA-Z0-9]+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;")
			}
		};
	!
	function(o, e, l) {
		"$:nomunge";

		function t() {
			n = e[s](function() {
				i.each(function() {
					var e = o(this),
						t = e.width(),
						n = e.height(),
						i = o.data(this, c);
					(t !== i.w || n !== i.h) && e.trigger(r, [i.w = t, i.h = n])
				}), t()
			}, a[u])
		}
		var n, i = o([]),
			a = o.resize = o.extend(o.resize, {}),
			s = "setTimeout",
			r = "resize",
			c = r + "-special-event",
			u = "delay",
			d = "throttleWindow";
		a[u] = 250, a[d] = !0, o.event.special[r] = {
			setup: function() {
				if (!a[d] && this[s]) return !1;
				var e = o(this);
				i = i.add(e), o.data(this, c, {
					w: e.width(),
					h: e.height()
				}), 1 === i.length && t()
			},
			teardown: function() {
				if (!a[d] && this[s]) return !1;
				var e = o(this);
				i = i.not(e), e.removeData(c), i.length || clearTimeout(n)
			},
			add: function(e) {
				function t(e, t, n) {
					var i = o(this),
						a = o.data(this, c) || {};
					a.w = t !== l ? t : i.width(), a.h = n !== l ? n : i.height(), r.apply(this, arguments)
				}
				if (!a[d] && this[s]) return !1;
				var r;
				return o.isFunction(e) ? (r = e, t) : (r = e.handler, void(e.handler = t))
			}
		}
	}(d, window), e("util", t)
});
layui.define("jquery", function(e) {
	"use strict";
	var v = layui.$,
		t = function(e) {},
		g = '<i class="layui-anim layui-anim-rotate layui-anim-loop layui-icon ">&#xe63e;</i>';
	t.prototype.load = function(e) {
		var a, r, n, t, i = this,
			o = 0;
		e = e || {};
		var l = v(e.elem);
		if (l[0]) {
			var s = v(e.scrollElem || document),
				c = e.mb || 50,
				u = !("isAuto" in e) || e.isAuto,
				d = e.end || "没有更多了",
				f = e.scrollElem && e.scrollElem !== document,
				p = "<cite>加载更多</cite>",
				h = v('<div class="layui-flow-more"><a href="javascript:;">' + p + "</a></div>");
			l.find(".layui-flow-more")[0] || l.append(h);
			var y = function(e, t) {
					e = v(e), h.before(e), t = 0 == t || null, t ? h.html(d) : h.find("a").html(p), r = t, a = null, n && n()
				},
				m = function() {
					a = !0, h.find("a").html(g), "function" == typeof e.done && e.done(++o, y)
				};
			if (m(), h.find("a").on("click", function() {
				v(this);
				r || a || m()
			}), e.isLazyimg) var n = i.lazyimg({
				elem: e.elem + " img",
				scrollElem: e.scrollElem
			});
			return u ? (s.on("scroll", function() {
				var n = v(this),
					i = n.scrollTop();
				t && clearTimeout(t), r || (t = setTimeout(function() {
					var e = f ? n.height() : v(window).height(),
						t = f ? n.prop("scrollHeight") : document.documentElement.scrollHeight;
					t - i - e <= c && (a || m())
				}, 100))
			}), i) : i
		}
	}, t.prototype.lazyimg = function(e) {
		var t, s = this,
			c = 0;
		e = e || {};
		var u = v(e.scrollElem || document),
			d = e.elem || "img",
			f = e.scrollElem && e.scrollElem !== document,
			p = function(t, e) {
				var n = u.scrollTop(),
					i = n + e,
					a = f ?
				function() {
					return t.offset().top - u.offset().top + n
				}() : t.offset().top;
				if (a >= n && a <= i && !t.attr("src")) {
					var r = t.attr("lay-src");
					layui.img(r, function() {
						var e = s.lazyimg.elem.eq(c);
						t.attr("src", r).removeAttr("lay-src"), e[0] && o(e), c++
					})
				}
			},
			o = function(e, t) {
				var n = f ? (t || u).height() : v(window).height(),
					i = u.scrollTop(),
					a = i + n;
				if (s.lazyimg.elem = v(d), e) p(e, n);
				else for (var r = 0; r < s.lazyimg.elem.length; r++) {
					var o = s.lazyimg.elem.eq(r),
						l = f ?
					function() {
						return o.offset().top - u.offset().top + i
					}() : o.offset().top;
					if (p(o, n), c = r, l > a) break
				}
			};
		if (o(), !t) {
			var n;
			u.on("scroll", function() {
				var e = v(this);
				n && clearTimeout(n), n = setTimeout(function() {
					o(null, e)
				}, 50)
			}), t = !0
		}
		return o
	}, e("flow", new t)
});
layui.define(["layer", "form"], function(e) {
	"use strict";
	var d = layui.$,
		u = layui.layer,
		r = layui.form,
		f = (layui.hint(), layui.device()),
		n = "layedit",
		p = "layui-show",
		h = "layui-disabled",
		t = function() {
			var e = this;
			e.index = 0, e.config = {
				tool: ["strong", "italic", "underline", "del", "|", "left", "center", "right", "|", "link", "unlink", "face", "image"],
				hideTool: [],
				height: 280
			}
		};
	t.prototype.set = function(e) {
		var t = this;
		return d.extend(!0, t.config, e), t
	}, t.prototype.on = function(e, t) {
		return layui.onevent(n, e, t)
	}, t.prototype.build = function(e, t) {
		t = t || {};
		var n = this,
			i = n.config,
			a = "layui-layedit",
			r = d("string" == typeof e ? "#" + e : e),
			o = "LAY_layedit_" + ++n.index,
			l = r.next("." + a),
			s = d.extend({}, i, t),
			c = function() {
				var n = [],
					i = {};
				return layui.each(s.hideTool, function(e, t) {
					i[t] = !0
				}), layui.each(s.tool, function(e, t) {
					E[t] && !i[t] && n.push(E[t])
				}), n.join("")
			}(),
			u = d(['<div class="' + a + '">', '<div class="layui-unselect layui-layedit-tool">' + c + "</div>", '<div class="layui-layedit-iframe">', '<iframe id="' + o + '" name="' + o + '" textarea="' + e + '" frameborder="0"></iframe>', "</div>", "</div>"].join(""));
		return f.ie && f.ie < 8 ? r.removeClass("layui-hide").addClass(p) : (l[0] && l.remove(), y.call(n, u, r[0], s), r.addClass("layui-hide").after(u), n.index)
	}, t.prototype.getContent = function(e) {
		var t = a(e);
		if (t[0]) return i(t[0].document.body.innerHTML)
	}, t.prototype.getText = function(e) {
		var t = a(e);
		if (t[0]) return d(t[0].document.body).text()
	}, t.prototype.setContent = function(e, t, n) {
		var i = a(e);
		i[0] && (n ? d(i[0].document.body).append(t) : d(i[0].document.body).html(t), layedit.sync(e))
	}, t.prototype.sync = function(e) {
		var t = a(e);
		if (t[0]) {
			var n = d("#" + t[1].attr("textarea"));
			n.val(i(t[0].document.body.innerHTML))
		}
	}, t.prototype.getSelection = function(e) {
		var t = a(e);
		if (t[0]) {
			var n = v(t[0].document);
			return document.selection ? n.text : n.toString()
		}
	};
	var y = function(r, o, l) {
			var s = this,
				c = r.find("iframe");
			c.css({
				height: l.height
			}).on("load", function() {
				var e = c.contents(),
					t = c.prop("contentWindow"),
					n = e.find("head"),
					i = d(["<style>", "*{margin: 0; padding: 0;}", "body{padding: 10px; line-height: 20px; overflow-x: hidden; word-wrap: break-word; font: 14px Helvetica Neue,Helvetica,PingFang SC,Microsoft YaHei,Tahoma,Arial,sans-serif; -webkit-box-sizing: border-box !important; -moz-box-sizing: border-box !important; box-sizing: border-box !important;}", "a{color:#01AAED; text-decoration:none;}a:hover{color:#c00}", "p{margin-bottom: 10px;}", "img{display: inline-block; border: none; vertical-align: middle;}", "pre{margin: 10px 0; padding: 10px; line-height: 20px; border: 1px solid #ddd; border-left-width: 6px; background-color: #F2F2F2; color: #333; font-family: Courier New; font-size: 12px;}", "</style>"].join("")),
					a = e.find("body");
				n.append(i), a.attr("contenteditable", "true").css({
					"min-height": l.height
				}).html(o.value || ""), m.apply(s, [t, c, o, l]), w.call(s, t, r, l)
			})
		},
		a = function(e) {
			var t = d("#LAY_layedit_" + e),
				n = t.prop("contentWindow");
			return [n, t]
		},
		i = function(e) {
			return 8 == f.ie && (e = e.replace(/<.+>/g, function(e) {
				return e.toLowerCase()
			})), e
		},
		m = function(t, e, n, i) {
			var r = t.document,
				a = d(r.body);
			a.on("keydown", function(e) {
				var t = e.keyCode;
				if (13 === t) {
					var n = v(r),
						i = g(n),
						a = i.parentNode;
					if ("pre" === a.tagName.toLowerCase()) {
						if (e.shiftKey) return;
						return u.msg("请暂时用shift+enter"), !1
					}
					r.execCommand("formatBlock", !1, "<p>")
				}
			}), d(n).parents("form").on("submit", function() {
				var e = a.html();
				8 == f.ie && (e = e.replace(/<.+>/g, function(e) {
					return e.toLowerCase()
				})), n.value = e
			}), a.on("paste", function(e) {
				r.execCommand("formatBlock", !1, "<p>"), setTimeout(function() {
					o.call(t, a), n.value = a.html()
				}, 100)
			})
		},
		o = function(e) {
			var t = this;
			t.document;
			e.find("*[style]").each(function() {
				var e = this.style.textAlign;
				this.removeAttribute("style"), d(this).css({
					"text-align": e || ""
				})
			}), e.find("table").addClass("layui-table"), e.find("script,link").remove()
		},
		v = function(e) {
			return e.selection ? e.selection.createRange() : e.getSelection().getRangeAt(0)
		},
		g = function(e) {
			return e.endContainer || e.parentElement().childNodes[0]
		},
		b = function(e, t, n) {
			var i = this.document,
				a = document.createElement(e);
			for (var r in t) a.setAttribute(r, t[r]);
			if (a.removeAttribute("text"), i.selection) {
				var o = n.text || t.text;
				if ("a" === e && !o) return;
				o && (a.innerHTML = o), n.pasteHTML(d(a).prop("outerHTML")), n.select()
			} else {
				var o = n.toString() || t.text;
				if ("a" === e && !o) return;
				o && (a.innerHTML = o), n.deleteContents(), n.insertNode(a)
			}
		},
		x = function(t, e) {
			var n = this.document,
				i = "layedit-tool-active",
				a = g(v(n)),
				r = function(e) {
					return t.find(".layedit-tool-" + e)
				};
			e && e[e.hasClass(i) ? "removeClass" : "addClass"](i), t.find(">i").removeClass(i), r("unlink").addClass(h), d(a).parents().each(function() {
				var e = this.tagName.toLowerCase(),
					t = this.style.textAlign;
				"b" !== e && "strong" !== e || r("b").addClass(i), "i" !== e && "em" !== e || r("i").addClass(i), "u" === e && r("u").addClass(i), "strike" === e && r("d").addClass(i), "p" === e && ("center" === t ? r("center").addClass(i) : "right" === t ? r("right").addClass(i) : r("left").addClass(i)), "a" === e && (r("link").addClass(i), r("unlink").removeClass(h))
			})
		},
		w = function(a, e, r) {
			var o = a.document,
				l = d(o.body),
				s = {
					link: function(n) {
						var e = g(n),
							i = d(e).parent();
						k.call(l, {
							href: i.attr("href"),
							target: i.attr("target")
						}, function(e) {
							var t = i[0];
							"A" === t.tagName ? t.href = e.url : b.call(a, "a", {
								target: e.target,
								href: e.url,
								text: e.url
							}, n)
						})
					},
					unlink: function(e) {
						o.execCommand("unlink")
					},
					face: function(t) {
						C.call(this, function(e) {
							b.call(a, "img", {
								src: e.src,
								alt: e.alt
							}, t)
						})
					},
					image: function(n) {
						var i = this;
						layui.use("upload", function(e) {
							var t = r.uploadImage || {};
							e.render({
								url: t.url,
								method: t.type,
								elem: d(i).find("input")[0],
								done: function(e) {
									0 == e.code ? (e.data = e.data || {}, b.call(a, "img", {
										src: e.data.src,
										alt: e.data.title
									}, n)) : u.msg(e.msg || "上传失败")
								}
							})
						})
					},
					code: function(t) {
						T.call(l, function(e) {
							b.call(a, "pre", {
								text: e.code,
								"lay-lang": e.lang
							}, t)
						})
					},
					help: function() {
						u.open({
							type: 2,
							title: "帮助",
							area: ["600px", "380px"],
							shadeClose: !0,
							shade: .1,
							skin: "layui-layer-msg",
							content: ["http://www.layui.com/about/layedit/help.html", "no"]
						})
					}
				},
				c = e.find(".layui-layedit-tool"),
				n = function() {
					var e = d(this),
						t = e.attr("layedit-event"),
						n = e.attr("lay-command");
					if (!e.hasClass(h)) {
						l.focus();
						var i = v(o);
						i.commonAncestorContainer;
						n ? (o.execCommand(n), /justifyLeft|justifyCenter|justifyRight/.test(n) && o.execCommand("formatBlock", !1, "<p>"), setTimeout(function() {
							l.focus()
						}, 10)) : s[t] && s[t].call(this, i), x.call(a, c, e)
					}
				},
				i = /image/;
			c.find(">i").on("mousedown", function() {
				var e = d(this),
					t = e.attr("layedit-event");
				i.test(t) || n.call(this)
			}).on("click", function() {
				var e = d(this),
					t = e.attr("layedit-event");
				i.test(t) && n.call(this)
			}), l.on("click", function() {
				x.call(a, c), u.close(C.index)
			})
		},
		k = function(e, i) {
			var a = this,
				t = u.open({
					type: 1,
					id: "LAY_layedit_link",
					area: "350px",
					shade: .05,
					shadeClose: !0,
					moveType: 1,
					title: "超链接",
					skin: "layui-layer-msg",
					content: ['<ul class="layui-form" style="margin: 15px;">', '<li class="layui-form-item">', '<label class="layui-form-label" style="width: 60px;">URL</label>', '<div class="layui-input-block" style="margin-left: 90px">', '<input name="url" lay-verify="url" value="' + (e.href || "") + '" autofocus="true" autocomplete="off" class="layui-input">', "</div>", "</li>", '<li class="layui-form-item">', '<label class="layui-form-label" style="width: 60px;">打开方式</label>', '<div class="layui-input-block" style="margin-left: 90px">', '<input type="radio" name="target" value="_self" class="layui-input" title="当前窗口"' + ("_self" !== e.target && e.target ? "" : "checked") + ">", '<input type="radio" name="target" value="_blank" class="layui-input" title="新窗口" ' + ("_blank" === e.target ? "checked" : "") + ">", "</div>", "</li>", '<li class="layui-form-item" style="text-align: center;">', '<button type="button" lay-submit lay-filter="layedit-link-yes" class="layui-btn"> 确定 </button>', '<button style="margin-left: 20px;" type="button" class="layui-btn layui-btn-primary"> 取消 </button>', "</li>", "</ul>"].join(""),
					success: function(e, t) {
						var n = "submit(layedit-link-yes)";
						r.render("radio"), e.find(".layui-btn-primary").on("click", function() {
							u.close(t), a.focus()
						}), r.on(n, function(e) {
							u.close(k.index), i && i(e.field)
						})
					}
				});
			k.index = t
		},
		C = function(n) {
			var i = function() {
					var e = ["[微笑]", "[嘻嘻]", "[哈哈]", "[可爱]", "[可怜]", "[挖鼻]", "[吃惊]", "[害羞]", "[挤眼]", "[闭嘴]", "[鄙视]", "[爱你]", "[泪]", "[偷笑]", "[亲亲]", "[生病]", "[太开心]", "[白眼]", "[右哼哼]", "[左哼哼]", "[嘘]", "[衰]", "[委屈]", "[吐]", "[哈欠]", "[抱抱]", "[怒]", "[疑问]", "[馋嘴]", "[拜拜]", "[思考]", "[汗]", "[困]", "[睡]", "[钱]", "[失望]", "[酷]", "[色]", "[哼]", "[鼓掌]", "[晕]", "[悲伤]", "[抓狂]", "[黑线]", "[阴险]", "[怒骂]", "[互粉]", "[心]", "[伤心]", "[猪头]", "[熊猫]", "[兔子]", "[ok]", "[耶]", "[good]", "[NO]", "[赞]", "[来]", "[弱]", "[草泥马]", "[神马]", "[囧]", "[浮云]", "[给力]", "[围观]", "[威武]", "[奥特曼]", "[礼物]", "[钟]", "[话筒]", "[蜡烛]", "[蛋糕]"],
						n = {};
					return layui.each(e, function(e, t) {
						n[t] = layui.cache.dir + "images/face/" + e + ".gif"
					}), n
				}();
			return C.hide = C.hide ||
			function(e) {
				"face" !== d(e.target).attr("layedit-event") && u.close(C.index)
			}, C.index = u.tips(function() {
				var n = [];
				return layui.each(i, function(e, t) {
					n.push('<li title="' + e + '"><img src="' + t + '" alt="' + e + '"></li>')
				}), '<ul class="layui-clear">' + n.join("") + "</ul>"
			}(), this, {
				tips: 1,
				time: 0,
				skin: "layui-box layui-util-face",
				maxWidth: 500,
				success: function(e, t) {
					e.css({
						marginTop: -4,
						marginLeft: -10
					}).find(".layui-clear>li").on("click", function() {
						n && n({
							src: i[this.title],
							alt: this.title
						}), u.close(t)
					}), d(document).off("click", C.hide).on("click", C.hide)
				}
			})
		},
		T = function(i) {
			var a = this,
				e = u.open({
					type: 1,
					id: "LAY_layedit_code",
					area: "550px",
					shade: .05,
					shadeClose: !0,
					moveType: 1,
					title: "插入代码",
					skin: "layui-layer-msg",
					content: ['<ul class="layui-form layui-form-pane" style="margin: 15px;">', '<li class="layui-form-item">', '<label class="layui-form-label">请选择语言</label>', '<div class="layui-input-block">', '<select name="lang">', '<option value="JavaScript">JavaScript</option>', '<option value="HTML">HTML</option>', '<option value="CSS">CSS</option>', '<option value="Java">Java</option>', '<option value="PHP">PHP</option>', '<option value="C#">C#</option>', '<option value="Python">Python</option>', '<option value="Ruby">Ruby</option>', '<option value="Go">Go</option>', "</select>", "</div>", "</li>", '<li class="layui-form-item layui-form-text">', '<label class="layui-form-label">代码</label>', '<div class="layui-input-block">', '<textarea name="code" lay-verify="required" autofocus="true" class="layui-textarea" style="height: 200px;"></textarea>', "</div>", "</li>", '<li class="layui-form-item" style="text-align: center;">', '<button type="button" lay-submit lay-filter="layedit-code-yes" class="layui-btn"> 确定 </button>', '<button style="margin-left: 20px;" type="button" class="layui-btn layui-btn-primary"> 取消 </button>', "</li>", "</ul>"].join(""),
					success: function(e, t) {
						var n = "submit(layedit-code-yes)";
						r.render("select"), e.find(".layui-btn-primary").on("click", function() {
							u.close(t), a.focus()
						}), r.on(n, function(e) {
							u.close(T.index), i && i(e.field)
						})
					}
				});
			T.index = e
		},
		E = {
			html: '<i class="layui-icon layedit-tool-html" title="HTML源代码" lay-command="html" layedit-event="html"">&#xe64b;</i><span class="layedit-tool-mid"></span>',
			strong: '<i class="layui-icon layedit-tool-b" title="加粗" lay-command="Bold" layedit-event="b"">&#xe62b;</i>',
			italic: '<i class="layui-icon layedit-tool-i" title="斜体" lay-command="italic" layedit-event="i"">&#xe644;</i>',
			underline: '<i class="layui-icon layedit-tool-u" title="下划线" lay-command="underline" layedit-event="u"">&#xe646;</i>',
			del: '<i class="layui-icon layedit-tool-d" title="删除线" lay-command="strikeThrough" layedit-event="d"">&#xe64f;</i>',
			"|": '<span class="layedit-tool-mid"></span>',
			left: '<i class="layui-icon layedit-tool-left" title="左对齐" lay-command="justifyLeft" layedit-event="left"">&#xe649;</i>',
			center: '<i class="layui-icon layedit-tool-center" title="居中对齐" lay-command="justifyCenter" layedit-event="center"">&#xe647;</i>',
			right: '<i class="layui-icon layedit-tool-right" title="右对齐" lay-command="justifyRight" layedit-event="right"">&#xe648;</i>',
			link: '<i class="layui-icon layedit-tool-link" title="插入链接" layedit-event="link"">&#xe64c;</i>',
			unlink: '<i class="layui-icon layedit-tool-unlink layui-disabled" title="清除链接" lay-command="unlink" layedit-event="unlink"">&#xe64d;</i>',
			face: '<i class="layui-icon layedit-tool-face" title="表情" layedit-event="face"">&#xe650;</i>',
			image: '<i class="layui-icon layedit-tool-image" title="图片" layedit-event="image">&#xe64a;<input type="file" name="file"></i>',
			code: '<i class="layui-icon layedit-tool-code" title="插入代码" layedit-event="code">&#xe64e;</i>',
			help: '<i class="layui-icon layedit-tool-help" title="帮助" layedit-event="help">&#xe607;</i>'
		},
		l = new t;
	e(n, l)
});
layui.define("jquery", function(e) {
	"use strict";
	var o = layui.$,
		l = "http://www.layui.com/doc/modules/code.html";
	e("code", function(r) {
		var e = [];
		r = r || {}, r.elem = o(r.elem || ".layui-code"), r.about = !("about" in r) || r.about, r.elem.each(function() {
			e.push(this)
		}), layui.each(e.reverse(), function(e, t) {
			var n = o(t),
				i = n.html();
			(n.attr("lay-encode") || r.encode) && (i = i.replace(/&(?!#?[a-zA-Z0-9]+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;")), n.html('<ol class="layui-code-ol"><li>' + i.replace(/[\r\t\n]+/g, "</li><li>") + "</li></ol>"), n.find(">.layui-code-h3")[0] || n.prepend('<h3 class="layui-code-h3">' + (n.attr("lay-title") || r.title || "code") + (r.about ? '<a href="' + l + '" target="_blank">layui.code</a>' : "") + "</h3>");
			var a = n.find(">.layui-code-ol");
			n.addClass("layui-box layui-code-view"), (n.attr("lay-skin") || r.skin) && n.addClass("layui-code-" + (n.attr("lay-skin") || r.skin)), (a.find("li").length / 100 | 0) > 0 && a.css("margin-left", (a.find("li").length / 100 | 0) + "px"), (n.attr("lay-height") || r.height) && a.css("max-height", n.attr("lay-height") || r.height)
		})
	})
}).addcss("modules/code.css", "skincodecss");