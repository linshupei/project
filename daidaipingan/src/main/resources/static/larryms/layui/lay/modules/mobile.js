layui.define(function(t) {
	t("layui.mobile", layui.v)
});
layui.define(function(t) {
	"use strict";
	var a = {
		open: "{{",
		close: "}}"
	},
		s = {
			exp: function(t) {
				return new RegExp(t, "g")
			},
			query: function(t, e, n) {
				var i = ["#([\\s\\S])+?", "([^{#}])*?"][t || 0];
				return c((e || "") + a.open + i + a.close + (n || ""))
			},
			escape: function(t) {
				return String(t || "").replace(/&(?!#?[a-zA-Z0-9]+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;")
			},
			error: function(t, e) {
				var n = "Laytpl Error：";
				return "object" == typeof console && console.error(n + t + "\n" + (e || "")), n + t
			}
		},
		c = s.exp,
		e = function(t) {
			this.tpl = t
		};
	e.pt = e.prototype, window.errors = 0, e.pt.parse = function(t, e) {
		var n = this,
			i = t,
			r = c("^" + a.open + "#", ""),
			o = c(a.close + "$", "");
		t = t.replace(/\s+|\r|\t|\n/g, " ").replace(c(a.open + "#"), a.open + "# ").replace(c(a.close + "}"), "} " + a.close).replace(/\\/g, "\\\\").replace(c(a.open + "!(.+?)!" + a.close), function(t) {
			return t = t.replace(c("^" + a.open + "!"), "").replace(c("!" + a.close), "").replace(c(a.open + "|" + a.close), function(t) {
				return t.replace(/(.)/g, "\\$1")
			})
		}).replace(/(?="|')/g, "\\").replace(s.query(), function(t) {
			return t = t.replace(r, "").replace(o, ""), '";' + t.replace(/\\/g, "") + ';view+="'
		}).replace(s.query(1), function(t) {
			var e = '"+(';
			return t.replace(/\s/g, "") === a.open + a.close ? "" : (t = t.replace(c(a.open + "|" + a.close), ""), /^=/.test(t) && (t = t.replace(/^=/, ""), e = '"+_escape_('), e + t.replace(/\\/g, "") + ')+"')
		}), t = '"use strict";var view = "' + t + '";return view;';
		try {
			return n.cache = t = new Function("d, _escape_", t), t(e, s.escape)
		} catch (t) {
			return delete n.cache, s.error(t, i)
		}
	}, e.pt.render = function(t, e) {
		var n, i = this;
		return t ? (n = i.cache ? i.cache(t, s.escape) : i.parse(i.tpl, t), e ? void e(n) : n) : s.error("no data")
	};
	var n = function(t) {
			return "string" != typeof t ? s.error("Template not found") : new e(t)
		};
	n.config = function(t) {
		t = t || {};
		for (var e in t) a[e] = t[e]
	}, n.v = "1.2.0", t("laytpl", n)
});
layui.define(function(t) {
	"use strict";
	var c = (window, document),
		e = "querySelectorAll",
		u = "getElementsByClassName",
		l = function(t) {
			return c[e](t)
		},
		i = {
			type: 0,
			shade: !0,
			shadeClose: !0,
			fixed: !0,
			anim: "scale"
		},
		f = {
			extend: function(t) {
				var e = JSON.parse(JSON.stringify(i));
				for (var n in t) e[n] = t[n];
				return e
			},
			timer: {},
			end: {}
		};
	f.touch = function(t, e) {
		t.addEventListener("click", function(t) {
			e.call(this, t)
		}, !1)
	};
	var p = 0,
		h = ["layui-m-layer"],
		n = function(t) {
			var e = this;
			e.config = f.extend(t), e.view()
		};
	n.prototype.view = function() {
		var t = this,
			n = t.config,
			e = c.createElement("div");
		t.id = e.id = h[0] + p, e.setAttribute("class", h[0] + " " + h[0] + (n.type || 0)), e.setAttribute("index", p);
		var i = function() {
				var t = "object" == typeof n.title;
				return n.title ? '<h3 style="' + (t ? n.title[1] : "") + '">' + (t ? n.title[0] : n.title) + "</h3>" : ""
			}(),
			r = function() {
				"string" == typeof n.btn && (n.btn = [n.btn]);
				var t, e = (n.btn || []).length;
				return 0 !== e && n.btn ? (t = '<span yes type="1">' + n.btn[0] + "</span>", 2 === e && (t = '<span no type="0">' + n.btn[1] + "</span>" + t), '<div class="layui-m-layerbtn">' + t + "</div>") : ""
			}();
		if (n.fixed || (n.top = n.hasOwnProperty("top") ? n.top : 100, n.style = n.style || "", n.style += " top:" + (c.body.scrollTop + n.top) + "px"), 2 === n.type && (n.content = '<i></i><i class="layui-m-layerload"></i><i></i><p>' + (n.content || "") + "</p>"), n.skin && (n.anim = "up"), "msg" === n.skin && (n.shade = !1), e.innerHTML = (n.shade ? "<div " + ("string" == typeof n.shade ? 'style="' + n.shade + '"' : "") + ' class="layui-m-layershade"></div>' : "") + '<div class="layui-m-layermain" ' + (n.fixed ? "" : 'style="position:static;"') + '><div class="layui-m-layersection"><div class="layui-m-layerchild ' + (n.skin ? "layui-m-layer-" + n.skin + " " : "") + (n.className ? n.className : "") + " " + (n.anim ? "layui-m-anim-" + n.anim : "") + '" ' + (n.style ? 'style="' + n.style + '"' : "") + ">" + i + '<div class="layui-m-layercont">' + n.content + "</div>" + r + "</div></div></div>", !n.type || 2 === n.type) {
			var o = c[u](h[0] + n.type),
				a = o.length;
			a >= 1 && d.close(o[0].getAttribute("index"))
		}
		document.body.appendChild(e);
		var s = t.elem = l("#" + t.id)[0];
		n.success && n.success(s), t.index = p++, t.action(n, s)
	}, n.prototype.action = function(e, t) {
		var n = this;
		e.time && (f.timer[n.index] = setTimeout(function() {
			d.close(n.index)
		}, 1e3 * e.time));
		var i = function() {
				var t = this.getAttribute("type");
				0 == t ? (e.no && e.no(), d.close(n.index)) : e.yes ? e.yes(n.index) : d.close(n.index)
			};
		if (e.btn) for (var r = t[u]("layui-m-layerbtn")[0].children, o = r.length, a = 0; a < o; a++) f.touch(r[a], i);
		if (e.shade && e.shadeClose) {
			var s = t[u]("layui-m-layershade")[0];
			f.touch(s, function() {
				d.close(n.index, e.end)
			})
		}
		e.end && (f.end[n.index] = e.end)
	};
	var d = {
		v: "2.0 m",
		index: p,
		open: function(t) {
			var e = new n(t || {});
			return e.index
		},
		close: function(t) {
			var e = l("#" + h[0] + t)[0];
			e && (e.innerHTML = "", c.body.removeChild(e), clearTimeout(f.timer[t]), delete f.timer[t], "function" == typeof f.end[t] && f.end[t](), delete f.end[t])
		},
		closeAll: function() {
			for (var t = c[u](h[0]), e = 0, n = t.length; e < n; e++) d.close(0 | t[0].getAttribute("index"))
		}
	};
	t("layer-mobile", d)
});
layui.define(function(t) {
	var e = function() {
			function c(t) {
				return null == t ? String(t) : X[W.call(t)] || "object"
			}
			function a(t) {
				return "function" == c(t)
			}
			function o(t) {
				return null != t && t == t.window
			}
			function s(t) {
				return null != t && t.nodeType == t.DOCUMENT_NODE
			}
			function i(t) {
				return "object" == c(t)
			}
			function u(t) {
				return i(t) && !o(t) && Object.getPrototypeOf(t) == Object.prototype
			}
			function l(t) {
				var e = !! t && "length" in t && t.length,
					n = S.type(t);
				return "function" != n && !o(t) && ("array" == n || 0 === e || "number" == typeof e && e > 0 && e - 1 in t)
			}
			function r(t) {
				return k.call(t, function(t) {
					return null != t
				})
			}
			function f(t) {
				return t.length > 0 ? S.fn.concat.apply([], t) : t
			}
			function p(t) {
				return t.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
			}
			function n(t) {
				return t in e ? e[t] : e[t] = new RegExp("(^|\\s)" + t + "(\\s|$)")
			}
			function h(t, e) {
				return "number" != typeof e || z[p(t)] ? e : e + "px"
			}
			function t(t) {
				var e, n;
				return $[t] || (e = L.createElement(t), L.body.appendChild(e), n = getComputedStyle(e, "").getPropertyValue("display"), e.parentNode.removeChild(e), "none" == n && (n = "block"), $[t] = n), $[t]
			}
			function d(t) {
				return "children" in t ? D.call(t.children) : S.map(t.childNodes, function(t) {
					if (1 == t.nodeType) return t
				})
			}
			function m(t, e) {
				var n, i = t ? t.length : 0;
				for (n = 0; n < i; n++) this[n] = t[n];
				this.length = i, this.selector = e || ""
			}
			function y(t, e, n) {
				for (T in e) n && (u(e[T]) || Q(e[T])) ? (u(e[T]) && !u(t[T]) && (t[T] = {}), Q(e[T]) && !Q(t[T]) && (t[T] = []), y(t[T], e[T], n)) : e[T] !== j && (t[T] = e[T])
			}
			function v(t, e) {
				return null == e ? S(t) : S(t).filter(e)
			}
			function g(t, e, n, i) {
				return a(e) ? e.call(t, n, i) : e
			}
			function b(t, e, n) {
				null == n ? t.removeAttribute(e) : t.setAttribute(e, n)
			}
			function x(t, e) {
				var n = t.className || "",
					i = n && n.baseVal !== j;
				return e === j ? i ? n.baseVal : n : void(i ? n.baseVal = e : t.className = e)
			}
			function w(e) {
				try {
					return e ? "true" == e || "false" != e && ("null" == e ? null : +e + "" == e ? +e : /^[\[\{]/.test(e) ? S.parseJSON(e) : e) : e
				} catch (t) {
					return e
				}
			}
			function E(t, e) {
				e(t);
				for (var n = 0, i = t.childNodes.length; n < i; n++) E(t.childNodes[n], e)
			}
			var j, T, S, C, N, O, P = [],
				A = P.concat,
				k = P.filter,
				D = P.slice,
				L = window.document,
				$ = {},
				e = {},
				z = {
					"column-count": 1,
					columns: 1,
					"font-weight": 1,
					"line-height": 1,
					opacity: 1,
					"z-index": 1,
					zoom: 1
				},
				R = /^\s*<(\w+|!)[^>]*>/,
				F = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
				M = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
				q = /^(?:body|html)$/i,
				Z = /([A-Z])/g,
				_ = ["val", "css", "html", "text", "data", "width", "height", "offset"],
				H = ["after", "prepend", "before", "append"],
				I = L.createElement("table"),
				B = L.createElement("tr"),
				J = {
					tr: L.createElement("tbody"),
					tbody: I,
					thead: I,
					tfoot: I,
					td: B,
					th: B,
					"*": L.createElement("div")
				},
				V = /complete|loaded|interactive/,
				U = /^[\w-]*$/,
				X = {},
				W = X.toString,
				Y = {},
				G = L.createElement("div"),
				K = {
					tabindex: "tabIndex",
					readonly: "readOnly",
					for :"htmlFor",
					class: "className",
					maxlength: "maxLength",
					cellspacing: "cellSpacing",
					cellpadding: "cellPadding",
					rowspan: "rowSpan",
					colspan: "colSpan",
					usemap: "useMap",
					frameborder: "frameBorder",
					contenteditable: "contentEditable"
				},
				Q = Array.isArray ||
			function(t) {
				return t instanceof Array
			};
			return Y.matches = function(t, e) {
				if (!e || !t || 1 !== t.nodeType) return !1;
				var n = t.matches || t.webkitMatchesSelector || t.mozMatchesSelector || t.oMatchesSelector || t.matchesSelector;
				if (n) return n.call(t, e);
				var i, r = t.parentNode,
					o = !r;
				return o && (r = G).appendChild(t), i = ~Y.qsa(r, e).indexOf(t), o && G.removeChild(t), i
			}, N = function(t) {
				return t.replace(/-+(.)?/g, function(t, e) {
					return e ? e.toUpperCase() : ""
				})
			}, O = function(n) {
				return k.call(n, function(t, e) {
					return n.indexOf(t) == e
				})
			}, Y.fragment = function(t, e, n) {
				var i, r, o;
				return F.test(t) && (i = S(L.createElement(RegExp.$1))), i || (t.replace && (t = t.replace(M, "<$1></$2>")), e === j && (e = R.test(t) && RegExp.$1), e in J || (e = "*"), o = J[e], o.innerHTML = "" + t, i = S.each(D.call(o.childNodes), function() {
					o.removeChild(this)
				})), u(n) && (r = S(i), S.each(n, function(t, e) {
					_.indexOf(t) > -1 ? r[t](e) : r.attr(t, e)
				})), i
			}, Y.Z = function(t, e) {
				return new m(t, e)
			}, Y.isZ = function(t) {
				return t instanceof Y.Z
			}, Y.init = function(t, e) {
				var n;
				if (!t) return Y.Z();
				if ("string" == typeof t) if (t = t.trim(), "<" == t[0] && R.test(t)) n = Y.fragment(t, RegExp.$1, e), t = null;
				else {
					if (e !== j) return S(e).find(t);
					n = Y.qsa(L, t)
				} else {
					if (a(t)) return S(L).ready(t);
					if (Y.isZ(t)) return t;
					if (Q(t)) n = r(t);
					else if (i(t)) n = [t], t = null;
					else if (R.test(t)) n = Y.fragment(t.trim(), RegExp.$1, e), t = null;
					else {
						if (e !== j) return S(e).find(t);
						n = Y.qsa(L, t)
					}
				}
				return Y.Z(n, t)
			}, S = function(t, e) {
				return Y.init(t, e)
			}, S.extend = function(e) {
				var n, t = D.call(arguments, 1);
				return "boolean" == typeof e && (n = e, e = t.shift()), t.forEach(function(t) {
					y(e, t, n)
				}), e
			}, Y.qsa = function(t, e) {
				var n, i = "#" == e[0],
					r = !i && "." == e[0],
					o = i || r ? e.slice(1) : e,
					a = U.test(o);
				return t.getElementById && a && i ? (n = t.getElementById(o)) ? [n] : [] : 1 !== t.nodeType && 9 !== t.nodeType && 11 !== t.nodeType ? [] : D.call(a && !i && t.getElementsByClassName ? r ? t.getElementsByClassName(o) : t.getElementsByTagName(e) : t.querySelectorAll(e))
			}, S.contains = L.documentElement.contains ?
			function(t, e) {
				return t !== e && t.contains(e)
			} : function(t, e) {
				for (; e && (e = e.parentNode);) if (e === t) return !0;
				return !1
			}, S.type = c, S.isFunction = a, S.isWindow = o, S.isArray = Q, S.isPlainObject = u, S.isEmptyObject = function(t) {
				var e;
				for (e in t) return !1;
				return !0
			}, S.isNumeric = function(t) {
				var e = Number(t),
					n = typeof t;
				return null != t && "boolean" != n && ("string" != n || t.length) && !isNaN(e) && isFinite(e) || !1
			}, S.inArray = function(t, e, n) {
				return P.indexOf.call(e, t, n)
			}, S.camelCase = N, S.trim = function(t) {
				return null == t ? "" : String.prototype.trim.call(t)
			}, S.uuid = 0, S.support = {}, S.expr = {}, S.noop = function() {}, S.map = function(t, e) {
				var n, i, r, o = [];
				if (l(t)) for (i = 0; i < t.length; i++) n = e(t[i], i), null != n && o.push(n);
				else for (r in t) n = e(t[r], r), null != n && o.push(n);
				return f(o)
			}, S.each = function(t, e) {
				var n, i;
				if (l(t)) {
					for (n = 0; n < t.length; n++) if (e.call(t[n], n, t[n]) === !1) return t
				} else for (i in t) if (e.call(t[i], i, t[i]) === !1) return t;
				return t
			}, S.grep = function(t, e) {
				return k.call(t, e)
			}, window.JSON && (S.parseJSON = JSON.parse), S.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(t, e) {
				X["[object " + e + "]"] = e.toLowerCase()
			}), S.fn = {
				constructor: Y.Z,
				length: 0,
				forEach: P.forEach,
				reduce: P.reduce,
				push: P.push,
				sort: P.sort,
				splice: P.splice,
				indexOf: P.indexOf,
				concat: function() {
					var t, e, n = [];
					for (t = 0; t < arguments.length; t++) e = arguments[t], n[t] = Y.isZ(e) ? e.toArray() : e;
					return A.apply(Y.isZ(this) ? this.toArray() : this, n)
				},
				map: function(n) {
					return S(S.map(this, function(t, e) {
						return n.call(t, e, t)
					}))
				},
				slice: function() {
					return S(D.apply(this, arguments))
				},
				ready: function(t) {
					return V.test(L.readyState) && L.body ? t(S) : L.addEventListener("DOMContentLoaded", function() {
						t(S)
					}, !1), this
				},
				get: function(t) {
					return t === j ? D.call(this) : this[t >= 0 ? t : t + this.length]
				},
				toArray: function() {
					return this.get()
				},
				size: function() {
					return this.length
				},
				remove: function() {
					return this.each(function() {
						null != this.parentNode && this.parentNode.removeChild(this)
					})
				},
				each: function(n) {
					return P.every.call(this, function(t, e) {
						return n.call(t, e, t) !== !1
					}), this
				},
				filter: function(e) {
					return a(e) ? this.not(this.not(e)) : S(k.call(this, function(t) {
						return Y.matches(t, e)
					}))
				},
				add: function(t, e) {
					return S(O(this.concat(S(t, e))))
				},
				is: function(t) {
					return this.length > 0 && Y.matches(this[0], t)
				},
				not: function(e) {
					var n = [];
					if (a(e) && e.call !== j) this.each(function(t) {
						e.call(this, t) || n.push(this)
					});
					else {
						var i = "string" == typeof e ? this.filter(e) : l(e) && a(e.item) ? D.call(e) : S(e);
						this.forEach(function(t) {
							i.indexOf(t) < 0 && n.push(t)
						})
					}
					return S(n)
				},
				has: function(t) {
					return this.filter(function() {
						return i(t) ? S.contains(this, t) : S(this).find(t).size()
					})
				},
				eq: function(t) {
					return t === -1 ? this.slice(t) : this.slice(t, +t + 1)
				},
				first: function() {
					var t = this[0];
					return t && !i(t) ? t : S(t)
				},
				last: function() {
					var t = this[this.length - 1];
					return t && !i(t) ? t : S(t)
				},
				find: function(t) {
					var e, n = this;
					return e = t ? "object" == typeof t ? S(t).filter(function() {
						var e = this;
						return P.some.call(n, function(t) {
							return S.contains(t, e)
						})
					}) : 1 == this.length ? S(Y.qsa(this[0], t)) : this.map(function() {
						return Y.qsa(this, t)
					}) : S()
				},
				closest: function(n, i) {
					var r = [],
						o = "object" == typeof n && S(n);
					return this.each(function(t, e) {
						for (; e && !(o ? o.indexOf(e) >= 0 : Y.matches(e, n));) e = e !== i && !s(e) && e.parentNode;
						e && r.indexOf(e) < 0 && r.push(e)
					}), S(r)
				},
				parents: function(t) {
					for (var e = [], n = this; n.length > 0;) n = S.map(n, function(t) {
						if ((t = t.parentNode) && !s(t) && e.indexOf(t) < 0) return e.push(t), t
					});
					return v(e, t)
				},
				parent: function(t) {
					return v(O(this.pluck("parentNode")), t)
				},
				children: function(t) {
					return v(this.map(function() {
						return d(this)
					}), t)
				},
				contents: function() {
					return this.map(function() {
						return this.contentDocument || D.call(this.childNodes)
					})
				},
				siblings: function(t) {
					return v(this.map(function(t, e) {
						return k.call(d(e.parentNode), function(t) {
							return t !== e
						})
					}), t)
				},
				empty: function() {
					return this.each(function() {
						this.innerHTML = ""
					})
				},
				pluck: function(e) {
					return S.map(this, function(t) {
						return t[e]
					})
				},
				show: function() {
					return this.each(function() {
						"none" == this.style.display && (this.style.display = ""), "none" == getComputedStyle(this, "").getPropertyValue("display") && (this.style.display = t(this.nodeName))
					})
				},
				replaceWith: function(t) {
					return this.before(t).remove()
				},
				wrap: function(e) {
					var n = a(e);
					if (this[0] && !n) var i = S(e).get(0),
						r = i.parentNode || this.length > 1;
					return this.each(function(t) {
						S(this).wrapAll(n ? e.call(this, t) : r ? i.cloneNode(!0) : i)
					})
				},
				wrapAll: function(t) {
					if (this[0]) {
						S(this[0]).before(t = S(t));
						for (var e;
						(e = t.children()).length;) t = e.first();
						S(t).append(this)
					}
					return this
				},
				wrapInner: function(r) {
					var o = a(r);
					return this.each(function(t) {
						var e = S(this),
							n = e.contents(),
							i = o ? r.call(this, t) : r;
						n.length ? n.wrapAll(i) : e.append(i)
					})
				},
				unwrap: function() {
					return this.parent().each(function() {
						S(this).replaceWith(S(this).children())
					}), this
				},
				clone: function() {
					return this.map(function() {
						return this.cloneNode(!0)
					})
				},
				hide: function() {
					return this.css("display", "none")
				},
				toggle: function(e) {
					return this.each(function() {
						var t = S(this);
						(e === j ? "none" == t.css("display") : e) ? t.show() : t.hide()
					})
				},
				prev: function(t) {
					return S(this.pluck("previousElementSibling")).filter(t || "*")
				},
				next: function(t) {
					return S(this.pluck("nextElementSibling")).filter(t || "*")
				},
				html: function(n) {
					return 0 in arguments ? this.each(function(t) {
						var e = this.innerHTML;
						S(this).empty().append(g(this, n, t, e))
					}) : 0 in this ? this[0].innerHTML : null
				},
				text: function(n) {
					return 0 in arguments ? this.each(function(t) {
						var e = g(this, n, t, this.textContent);
						this.textContent = null == e ? "" : "" + e
					}) : 0 in this ? this.pluck("textContent").join("") : null
				},
				attr: function(e, n) {
					var t;
					return "string" != typeof e || 1 in arguments ? this.each(function(t) {
						if (1 === this.nodeType) if (i(e)) for (T in e) b(this, T, e[T]);
						else b(this, e, g(this, n, t, this.getAttribute(e)))
					}) : 0 in this && 1 == this[0].nodeType && null != (t = this[0].getAttribute(e)) ? t : j
				},
				removeAttr: function(t) {
					return this.each(function() {
						1 === this.nodeType && t.split(" ").forEach(function(t) {
							b(this, t)
						}, this)
					})
				},
				prop: function(e, n) {
					return e = K[e] || e, 1 in arguments ? this.each(function(t) {
						this[e] = g(this, n, t, this[e])
					}) : this[0] && this[0][e]
				},
				removeProp: function(t) {
					return t = K[t] || t, this.each(function() {
						delete this[t]
					})
				},
				data: function(t, e) {
					var n = "data-" + t.replace(Z, "-$1").toLowerCase(),
						i = 1 in arguments ? this.attr(n, e) : this.attr(n);
					return null !== i ? w(i) : j
				},
				val: function(e) {
					return 0 in arguments ? (null == e && (e = ""), this.each(function(t) {
						this.value = g(this, e, t, this.value)
					})) : this[0] && (this[0].multiple ? S(this[0]).find("option").filter(function() {
						return this.selected
					}).pluck("value") : this[0].value)
				},
				offset: function(o) {
					if (o) return this.each(function(t) {
						var e = S(this),
							n = g(this, o, t, e.offset()),
							i = e.offsetParent().offset(),
							r = {
								top: n.top - i.top,
								left: n.left - i.left
							};
						"static" == e.css("position") && (r.position = "relative"), e.css(r)
					});
					if (!this.length) return null;
					if (L.documentElement !== this[0] && !S.contains(L.documentElement, this[0])) return {
						top: 0,
						left: 0
					};
					var t = this[0].getBoundingClientRect();
					return {
						left: t.left + window.pageXOffset,
						top: t.top + window.pageYOffset,
						width: Math.round(t.width),
						height: Math.round(t.height)
					}
				},
				css: function(t, e) {
					if (arguments.length < 2) {
						var n = this[0];
						if ("string" == typeof t) {
							if (!n) return;
							return n.style[N(t)] || getComputedStyle(n, "").getPropertyValue(t)
						}
						if (Q(t)) {
							if (!n) return;
							var i = {},
								r = getComputedStyle(n, "");
							return S.each(t, function(t, e) {
								i[e] = n.style[N(e)] || r.getPropertyValue(e)
							}), i
						}
					}
					var o = "";
					if ("string" == c(t)) e || 0 === e ? o = p(t) + ":" + h(t, e) : this.each(function() {
						this.style.removeProperty(p(t))
					});
					else for (T in t) t[T] || 0 === t[T] ? o += p(T) + ":" + h(T, t[T]) + ";" : this.each(function() {
						this.style.removeProperty(p(T))
					});
					return this.each(function() {
						this.style.cssText += ";" + o
					})
				},
				index: function(t) {
					return t ? this.indexOf(S(t)[0]) : this.parent().children().indexOf(this[0])
				},
				hasClass: function(t) {
					return !!t && P.some.call(this, function(t) {
						return this.test(x(t))
					}, n(t))
				},
				addClass: function(i) {
					return i ? this.each(function(t) {
						if ("className" in this) {
							C = [];
							var e = x(this),
								n = g(this, i, t, e);
							n.split(/\s+/g).forEach(function(t) {
								S(this).hasClass(t) || C.push(t)
							}, this), C.length && x(this, e + (e ? " " : "") + C.join(" "))
						}
					}) : this
				},
				removeClass: function(e) {
					return this.each(function(t) {
						if ("className" in this) {
							if (e === j) return x(this, "");
							C = x(this), g(this, e, t, C).split(/\s+/g).forEach(function(t) {
								C = C.replace(n(t), " ")
							}), x(this, C.trim())
						}
					})
				},
				toggleClass: function(i, r) {
					return i ? this.each(function(t) {
						var e = S(this),
							n = g(this, i, t, x(this));
						n.split(/\s+/g).forEach(function(t) {
							(r === j ? !e.hasClass(t) : r) ? e.addClass(t) : e.removeClass(t)
						})
					}) : this
				},
				scrollTop: function(t) {
					if (this.length) {
						var e = "scrollTop" in this[0];
						return t === j ? e ? this[0].scrollTop : this[0].pageYOffset : this.each(e ?
						function() {
							this.scrollTop = t
						} : function() {
							this.scrollTo(this.scrollX, t)
						})
					}
				},
				scrollLeft: function(t) {
					if (this.length) {
						var e = "scrollLeft" in this[0];
						return t === j ? e ? this[0].scrollLeft : this[0].pageXOffset : this.each(e ?
						function() {
							this.scrollLeft = t
						} : function() {
							this.scrollTo(t, this.scrollY)
						})
					}
				},
				position: function() {
					if (this.length) {
						var t = this[0],
							e = this.offsetParent(),
							n = this.offset(),
							i = q.test(e[0].nodeName) ? {
								top: 0,
								left: 0
							} : e.offset();
						return n.top -= parseFloat(S(t).css("margin-top")) || 0, n.left -= parseFloat(S(t).css("margin-left")) || 0, i.top += parseFloat(S(e[0]).css("border-top-width")) || 0, i.left += parseFloat(S(e[0]).css("border-left-width")) || 0, {
							top: n.top - i.top,
							left: n.left - i.left
						}
					}
				},
				offsetParent: function() {
					return this.map(function() {
						for (var t = this.offsetParent || L.body; t && !q.test(t.nodeName) && "static" == S(t).css("position");) t = t.offsetParent;
						return t
					})
				}
			}, S.fn.detach = S.fn.remove, ["width", "height"].forEach(function(i) {
				var r = i.replace(/./, function(t) {
					return t[0].toUpperCase()
				});
				S.fn[i] = function(e) {
					var t, n = this[0];
					return e === j ? o(n) ? n["inner" + r] : s(n) ? n.documentElement["scroll" + r] : (t = this.offset()) && t[i] : this.each(function(t) {
						n = S(this), n.css(i, g(this, e, t, n[i]()))
					})
				}
			}), H.forEach(function(e, a) {
				var s = a % 2;
				S.fn[e] = function() {
					var n, i, r = S.map(arguments, function(t) {
						var e = [];
						return n = c(t), "array" == n ? (t.forEach(function(t) {
							return t.nodeType !== j ? e.push(t) : S.zepto.isZ(t) ? e = e.concat(t.get()) : void(e = e.concat(Y.fragment(t)))
						}), e) : "object" == n || null == t ? t : Y.fragment(t)
					}),
						o = this.length > 1;
					return r.length < 1 ? this : this.each(function(t, e) {
						i = s ? e : e.parentNode, e = 0 == a ? e.nextSibling : 1 == a ? e.firstChild : 2 == a ? e : null;
						var n = S.contains(L.documentElement, i);
						r.forEach(function(t) {
							if (o) t = t.cloneNode(!0);
							else if (!i) return S(t).remove();
							i.insertBefore(t, e), n && E(t, function(t) {
								if (!(null == t.nodeName || "SCRIPT" !== t.nodeName.toUpperCase() || t.type && "text/javascript" !== t.type || t.src)) {
									var e = t.ownerDocument ? t.ownerDocument.defaultView : window;
									e.eval.call(e, t.innerHTML)
								}
							})
						})
					})
				}, S.fn[s ? e + "To" : "insert" + (a ? "Before" : "After")] = function(t) {
					return S(t)[e](this), this
				}
			}), Y.Z.prototype = m.prototype = S.fn, Y.uniq = O, Y.deserializeValue = w, S.zepto = Y, S
		}();
	!
	function(l) {
		function f(t) {
			return t._zid || (t._zid = e++)
		}
		function a(t, e, n, i) {
			if (e = p(e), e.ns) var r = o(e.ns);
			return (E[f(t)] || []).filter(function(t) {
				return t && (!e.e || t.e == e.e) && (!e.ns || r.test(t.ns)) && (!n || f(t.fn) === f(n)) && (!i || t.sel == i)
			})
		}
		function p(t) {
			var e = ("" + t).split(".");
			return {
				e: e[0],
				ns: e.slice(1).sort().join(" ")
			}
		}
		function o(t) {
			return new RegExp("(?:^| )" + t.replace(" ", " .* ?") + "(?: |$)")
		}
		function h(t, e) {
			return t.del && !n && t.e in i || !! e
		}
		function d(t) {
			return j[t] || n && i[t] || t
		}
		function u(r, t, e, o, a, s, c) {
			var n = f(r),
				u = E[n] || (E[n] = []);
			t.split(/\s/).forEach(function(t) {
				if ("ready" == t) return l(document).ready(e);
				var n = p(t);
				n.fn = e, n.sel = a, n.e in j && (e = function(t) {
					var e = t.relatedTarget;
					if (!e || e !== this && !l.contains(this, e)) return n.fn.apply(this, arguments)
				}), n.del = s;
				var i = s || e;
				n.proxy = function(t) {
					if (t = y(t), !t.isImmediatePropagationStopped()) {
						t.data = o;
						var e = i.apply(r, t._args == g ? [t] : [t].concat(t._args));
						return e === !1 && (t.preventDefault(), t.stopPropagation()), e
					}
				}, n.i = u.length, u.push(n), "addEventListener" in r && r.addEventListener(d(n.e), n.proxy, h(n, c))
			})
		}
		function m(e, t, n, i, r) {
			var o = f(e);
			(t || "").split(/\s/).forEach(function(t) {
				a(e, t, n, i).forEach(function(t) {
					delete E[o][t.i], "removeEventListener" in e && e.removeEventListener(d(t.e), t.proxy, h(t, r))
				})
			})
		}
		function y(i, r) {
			return !r && i.isDefaultPrevented || (r || (r = i), l.each(t, function(t, e) {
				var n = r[t];
				i[t] = function() {
					return this[e] = c, n && n.apply(r, arguments)
				}, i[e] = T
			}), i.timeStamp || (i.timeStamp = Date.now()), (r.defaultPrevented !== g ? r.defaultPrevented : "returnValue" in r ? r.returnValue === !1 : r.getPreventDefault && r.getPreventDefault()) && (i.isDefaultPrevented = c)), i
		}
		function v(t) {
			var e, n = {
				originalEvent: t
			};
			for (e in t) r.test(e) || t[e] === g || (n[e] = t[e]);
			return y(n, t)
		}
		var g, e = 1,
			b = Array.prototype.slice,
			x = l.isFunction,
			w = function(t) {
				return "string" == typeof t
			},
			E = {},
			s = {},
			n = "onfocusin" in window,
			i = {
				focus: "focusin",
				blur: "focusout"
			},
			j = {
				mouseenter: "mouseover",
				mouseleave: "mouseout"
			};
		s.click = s.mousedown = s.mouseup = s.mousemove = "MouseEvents", l.event = {
			add: u,
			remove: m
		}, l.proxy = function(t, e) {
			var n = 2 in arguments && b.call(arguments, 2);
			if (x(t)) {
				var i = function() {
						return t.apply(e, n ? n.concat(b.call(arguments)) : arguments)
					};
				return i._zid = f(t), i
			}
			if (w(e)) return n ? (n.unshift(t[e], t), l.proxy.apply(null, n)) : l.proxy(t[e], t);
			throw new TypeError("expected function")
		}, l.fn.bind = function(t, e, n) {
			return this.on(t, e, n)
		}, l.fn.unbind = function(t, e) {
			return this.off(t, e)
		}, l.fn.one = function(t, e, n, i) {
			return this.on(t, e, n, i, 1)
		};
		var c = function() {
				return !0
			},
			T = function() {
				return !1
			},
			r = /^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/,
			t = {
				preventDefault: "isDefaultPrevented",
				stopImmediatePropagation: "isImmediatePropagationStopped",
				stopPropagation: "isPropagationStopped"
			};
		l.fn.delegate = function(t, e, n) {
			return this.on(e, t, n)
		}, l.fn.undelegate = function(t, e, n) {
			return this.off(e, t, n)
		}, l.fn.live = function(t, e) {
			return l(document.body).delegate(this.selector, t, e), this
		}, l.fn.die = function(t, e) {
			return l(document.body).undelegate(this.selector, t, e), this
		}, l.fn.on = function(e, r, n, o, a) {
			var s, c, i = this;
			return e && !w(e) ? (l.each(e, function(t, e) {
				i.on(t, r, n, e, a)
			}), i) : (w(r) || x(o) || o === !1 || (o = n, n = r, r = g), o !== g && n !== !1 || (o = n, n = g), o === !1 && (o = T), i.each(function(t, i) {
				a && (s = function(t) {
					return m(i, t.type, o), o.apply(this, arguments)
				}), r && (c = function(t) {
					var e, n = l(t.target).closest(r, i).get(0);
					if (n && n !== i) return e = l.extend(v(t), {
						currentTarget: n,
						liveFired: i
					}), (s || o).apply(n, [e].concat(b.call(arguments, 1)))
				}), u(i, e, o, n, r, c || s)
			}))
		}, l.fn.off = function(t, n, e) {
			var i = this;
			return t && !w(t) ? (l.each(t, function(t, e) {
				i.off(t, n, e)
			}), i) : (w(n) || x(e) || e === !1 || (e = n, n = g), e === !1 && (e = T), i.each(function() {
				m(this, t, e, n)
			}))
		}, l.fn.trigger = function(t, e) {
			return t = w(t) || l.isPlainObject(t) ? l.Event(t) : y(t), t._args = e, this.each(function() {
				t.type in i && "function" == typeof this[t.type] ? this[t.type]() : "dispatchEvent" in this ? this.dispatchEvent(t) : l(this).triggerHandler(t, e)
			})
		}, l.fn.triggerHandler = function(n, i) {
			var r, o;
			return this.each(function(t, e) {
				r = v(w(n) ? l.Event(n) : n), r._args = i, r.target = e, l.each(a(e, n.type || n), function(t, e) {
					if (o = e.proxy(r), r.isImmediatePropagationStopped()) return !1
				})
			}), o
		}, "focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(e) {
			l.fn[e] = function(t) {
				return 0 in arguments ? this.bind(e, t) : this.trigger(e)
			}
		}), l.Event = function(t, e) {
			w(t) || (e = t, t = e.type);
			var n = document.createEvent(s[t] || "Events"),
				i = !0;
			if (e) for (var r in e)"bubbles" == r ? i = !! e[r] : n[r] = e[r];
			return n.initEvent(t, i, !0), y(n)
		}
	}(e), function(m) {
		function r(t, e, n) {
			var i = m.Event(e);
			return m(t).trigger(i, n), !i.isDefaultPrevented()
		}
		function a(t, e, n, i) {
			if (t.global) return r(e || N, n, i)
		}
		function y(t) {
			t.global && 0 === m.active++ && a(t, null, "ajaxStart")
		}
		function o(t) {
			t.global && !--m.active && a(t, null, "ajaxStop")
		}
		function v(t, e) {
			var n = e.context;
			return e.beforeSend.call(n, t, e) !== !1 && a(e, n, "ajaxBeforeSend", [t, e]) !== !1 && void a(e, n, "ajaxSend", [t, e])
		}
		function g(t, e, n, i) {
			var r = n.context,
				o = "success";
			n.success.call(r, t, o, e), i && i.resolveWith(r, [t, o, e]), a(n, r, "ajaxSuccess", [e, n, t]), s(o, e, n)
		}
		function b(t, e, n, i, r) {
			var o = i.context;
			i.error.call(o, n, e, t), r && r.rejectWith(o, [n, e, t]), a(i, o, "ajaxError", [n, i, t || e]), s(e, n, i)
		}
		function s(t, e, n) {
			var i = n.context;
			n.complete.call(i, e, t), a(n, i, "ajaxComplete", [e, n]), o(n)
		}
		function x(t, e, n) {
			if (n.dataFilter == w) return t;
			var i = n.context;
			return n.dataFilter.call(i, t, e)
		}
		function w() {}
		function E(t) {
			return t && (t = t.split(";", 2)[0]), t && (t == p ? "html" : t == i ? "json" : e.test(t) ? "script" : n.test(t) && "xml") || "text"
		}
		function j(t, e) {
			return "" == e ? t : (t + "&" + e).replace(/[&?]{1,2}/, "?")
		}
		function T(t) {
			t.processData && t.data && "string" != m.type(t.data) && (t.data = m.param(t.data, t.traditional)), !t.data || t.type && "GET" != t.type.toUpperCase() && "jsonp" != t.dataType || (t.url = j(t.url, t.data), t.data = void 0)
		}
		function c(t, e, n, i) {
			return m.isFunction(e) && (i = n, n = e, e = void 0), m.isFunction(n) || (i = n, n = void 0), {
				url: t,
				data: e,
				success: n,
				dataType: i
			}
		}
		function u(n, t, i, r) {
			var o, a = m.isArray(t),
				s = m.isPlainObject(t);
			m.each(t, function(t, e) {
				o = m.type(e), r && (t = i ? r : r + "[" + (s || "object" == o || "array" == o ? t : "") + "]"), !r && a ? n.add(e.name, e.value) : "array" == o || !i && "object" == o ? u(n, e, i, t) : n.add(t, e)
			})
		}
		var S, C, l = +new Date,
			N = window.document,
			f = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
			e = /^(?:text|application)\/javascript/i,
			n = /^(?:text|application)\/xml/i,
			i = "application/json",
			p = "text/html",
			O = /^\s*$/,
			P = N.createElement("a");
		P.href = window.location.href, m.active = 0, m.ajaxJSONP = function(n, i) {
			if (!("type" in n)) return m.ajax(n);
			var r, o, t = n.jsonpCallback,
				a = (m.isFunction(t) ? t() : t) || "Zepto" + l++,
				s = N.createElement("script"),
				c = window[a],
				e = function(t) {
					m(s).triggerHandler("error", t || "abort")
				},
				u = {
					abort: e
				};
			return i && i.promise(u), m(s).on("load error", function(t, e) {
				clearTimeout(o), m(s).off().remove(), "error" != t.type && r ? g(r[0], u, n, i) : b(null, e || "error", u, n, i), window[a] = c, r && m.isFunction(c) && c(r[0]), c = r = void 0
			}), v(u, n) === !1 ? (e("abort"), u) : (window[a] = function() {
				r = arguments
			}, s.src = n.url.replace(/\?(.+)=\?/, "?$1=" + a), N.head.appendChild(s), n.timeout > 0 && (o = setTimeout(function() {
				e("timeout")
			}, n.timeout)), u)
		}, m.ajaxSettings = {
			type: "GET",
			beforeSend: w,
			success: w,
			error: w,
			complete: w,
			context: null,
			global: !0,
			xhr: function() {
				return new window.XMLHttpRequest
			},
			accepts: {
				script: "text/javascript, application/javascript, application/x-javascript",
				json: i,
				xml: "application/xml, text/xml",
				html: p,
				text: "text/plain"
			},
			crossDomain: !1,
			timeout: 0,
			processData: !0,
			cache: !0,
			dataFilter: w
		}, m.ajax = function(t) {
			var e, n, i = m.extend({}, t || {}),
				r = m.Deferred && m.Deferred();
			for (S in m.ajaxSettings) void 0 === i[S] && (i[S] = m.ajaxSettings[S]);
			y(i), i.crossDomain || (e = N.createElement("a"), e.href = i.url, e.href = e.href, i.crossDomain = P.protocol + "//" + P.host != e.protocol + "//" + e.host), i.url || (i.url = window.location.toString()), (n = i.url.indexOf("#")) > -1 && (i.url = i.url.slice(0, n)), T(i);
			var o = i.dataType,
				a = /\?.+=\?/.test(i.url);
			if (a && (o = "jsonp"), i.cache !== !1 && (t && t.cache === !0 || "script" != o && "jsonp" != o) || (i.url = j(i.url, "_=" + Date.now())), "jsonp" == o) return a || (i.url = j(i.url, i.jsonp ? i.jsonp + "=?" : i.jsonp === !1 ? "" : "callback=?")), m.ajaxJSONP(i, r);
			var s, c = i.accepts[o],
				u = {},
				l = function(t, e) {
					u[t.toLowerCase()] = [t, e]
				},
				f = /^([\w-]+:)\/\//.test(i.url) ? RegExp.$1 : window.location.protocol,
				p = i.xhr(),
				h = p.setRequestHeader;
			if (r && r.promise(p), i.crossDomain || l("X-Requested-With", "XMLHttpRequest"), l("Accept", c || "*/*"), (c = i.mimeType || c) && (c.indexOf(",") > -1 && (c = c.split(",", 2)[0]), p.overrideMimeType && p.overrideMimeType(c)), (i.contentType || i.contentType !== !1 && i.data && "GET" != i.type.toUpperCase()) && l("Content-Type", i.contentType || "application/x-www-form-urlencoded"), i.headers) for (C in i.headers) l(C, i.headers[C]);
			if (p.setRequestHeader = l, p.onreadystatechange = function() {
				if (4 == p.readyState) {
					p.onreadystatechange = w, clearTimeout(s);
					var t, e = !1;
					if (p.status >= 200 && p.status < 300 || 304 == p.status || 0 == p.status && "file:" == f) {
						if (o = o || E(i.mimeType || p.getResponseHeader("content-type")), "arraybuffer" == p.responseType || "blob" == p.responseType) t = p.response;
						else {
							t = p.responseText;
							try {
								t = x(t, o, i), "script" == o ? (0, eval)(t) : "xml" == o ? t = p.responseXML : "json" == o && (t = O.test(t) ? null : m.parseJSON(t))
							} catch (t) {
								e = t
							}
							if (e) return b(e, "parsererror", p, i, r)
						}
						g(t, p, i, r)
					} else b(p.statusText || null, p.status ? "error" : "abort", p, i, r)
				}
			}, v(p, i) === !1) return p.abort(), b(null, "abort", p, i, r), p;
			var d = !("async" in i) || i.async;
			if (p.open(i.type, i.url, d, i.username, i.password), i.xhrFields) for (C in i.xhrFields) p[C] = i.xhrFields[C];
			for (C in u) h.apply(p, u[C]);
			return i.timeout > 0 && (s = setTimeout(function() {
				p.onreadystatechange = w, p.abort(), b(null, "timeout", p, i, r)
			}, i.timeout)), p.send(i.data ? i.data : null), p
		}, m.get = function() {
			return m.ajax(c.apply(null, arguments))
		}, m.post = function() {
			var t = c.apply(null, arguments);
			return t.type = "POST", m.ajax(t)
		}, m.getJSON = function() {
			var t = c.apply(null, arguments);
			return t.dataType = "json", m.ajax(t)
		}, m.fn.load = function(t, e, n) {
			if (!this.length) return this;
			var i, r = this,
				o = t.split(/\s/),
				a = c(t, e, n),
				s = a.success;
			return o.length > 1 && (a.url = o[0], i = o[1]), a.success = function(t) {
				r.html(i ? m("<div>").html(t.replace(f, "")).find(i) : t), s && s.apply(r, arguments)
			}, m.ajax(a), this
		};
		var h = encodeURIComponent;
		m.param = function(t, e) {
			var n = [];
			return n.add = function(t, e) {
				m.isFunction(e) && (e = e()), null == e && (e = ""), this.push(h(t) + "=" + h(e))
			}, u(n, t, e), n.join("&").replace(/%20/g, "+")
		}
	}(e), function(o) {
		o.fn.serializeArray = function() {
			var n, i, e = [],
				r = function(t) {
					return t.forEach ? t.forEach(r) : void e.push({
						name: n,
						value: t
					})
				};
			return this[0] && o.each(this[0].elements, function(t, e) {
				i = e.type, n = e.name, n && "fieldset" != e.nodeName.toLowerCase() && !e.disabled && "submit" != i && "reset" != i && "button" != i && "file" != i && ("radio" != i && "checkbox" != i || e.checked) && r(o(e).val())
			}), e
		}, o.fn.serialize = function() {
			var e = [];
			return this.serializeArray().forEach(function(t) {
				e.push(encodeURIComponent(t.name) + "=" + encodeURIComponent(t.value))
			}), e.join("&")
		}, o.fn.submit = function(t) {
			if (0 in arguments) this.bind("submit", t);
			else if (this.length) {
				var e = o.Event("submit");
				this.eq(0).trigger(e), e.isDefaultPrevented() || this.get(0).submit()
			}
			return this
		}
	}(e), function() {
		try {
			getComputedStyle(void 0)
		} catch (t) {
			var n = getComputedStyle;
			window.getComputedStyle = function(t, e) {
				try {
					return n(t, e)
				} catch (t) {
					return null
				}
			}
		}
	}(), t("zepto", e)
});
layui.define(["layer-mobile", "zepto"], function(t) {
	"use strict";
	var u = layui.zepto,
		l = layui["layer-mobile"],
		a = (layui.device(), "layui-upload-enter"),
		f = "layui-upload-iframe",
		p = {
			icon: 2,
			shift: 6
		},
		s = {
			file: "文件",
			video: "视频",
			audio: "音频"
		};
	l.msg = function(t) {
		return l.open({
			content: t || "",
			skin: "msg",
			time: 2
		})
	};
	var n = function(t) {
			this.options = t
		};
	n.prototype.init = function() {
		var r = this,
			o = r.options,
			t = u("body"),
			e = u(o.elem || ".layui-upload-file"),
			n = u('<iframe id="' + f + '" class="' + f + '" name="' + f + '"></iframe>');
		return u("#" + f)[0] || t.append(n), e.each(function(t, e) {
			e = u(e);
			var n = '<form target="' + f + '" method="' + (o.method || "post") + '" key="set-mine" enctype="multipart/form-data" action="' + (o.url || "") + '"></form>',
				i = e.attr("lay-type") || o.type;
			o.unwrap || (n = '<div class="layui-box layui-upload-button">' + n + '<span class="layui-upload-icon"><i class="layui-icon">&#xe608;</i>' + (e.attr("lay-title") || o.title || "上传" + (s[i] || "图片")) + "</span></div>"), n = u(n), o.unwrap || n.on("dragover", function(t) {
				t.preventDefault(), u(this).addClass(a)
			}).on("dragleave", function() {
				u(this).removeClass(a)
			}).on("drop", function() {
				u(this).removeClass(a)
			}), e.parent("form").attr("target") === f && (o.unwrap ? e.unwrap() : (e.parent().next().remove(), e.unwrap().unwrap())), e.wrap(n), e.off("change").on("change", function() {
				r.action(this, i)
			})
		})
	}, n.prototype.action = function(t, e) {
		var n = this,
			i = n.options,
			r = t.value,
			o = u(t),
			a = o.attr("lay-ext") || i.ext || "";
		if (r) {
			switch (e) {
			case "file":
				if (a && !RegExp("\\w\\.(" + a + ")$", "i").test(escape(r))) return l.msg("不支持该文件格式", p), t.value = "";
				break;
			case "video":
				if (!RegExp("\\w\\.(" + (a || "avi|mp4|wma|rmvb|rm|flash|3gp|flv") + ")$", "i").test(escape(r))) return l.msg("不支持该视频格式", p), t.value = "";
				break;
			case "audio":
				if (!RegExp("\\w\\.(" + (a || "mp3|wav|mid") + ")$", "i").test(escape(r))) return l.msg("不支持该音频格式", p), t.value = "";
				break;
			default:
				if (!RegExp("\\w\\.(" + (a || "jpg|png|gif|bmp|jpeg") + ")$", "i").test(escape(r))) return l.msg("不支持该图片格式", p), t.value = ""
			}
			i.before && i.before(t), o.parent().submit();
			var s = u("#" + f),
				c = setInterval(function() {
					var e;
					try {
						e = s.contents().find("body").text()
					} catch (t) {
						l.msg("上传接口存在跨域", p), clearInterval(c)
					}
					if (e) {
						clearInterval(c), s.contents().find("body").html("");
						try {
							e = JSON.parse(e)
						} catch (t) {
							return e = {}, l.msg("请对上传接口返回JSON字符", p)
						}
						"function" == typeof i.success && i.success(e, t)
					}
				}, 30);
			t.value = ""
		}
	}, t("upload-mobile", function(t) {
		var e = new n(t = t || {});
		e.init()
	})
});
layui.define(function(t) {
	t("layim-mobile", layui.v)
});
layui["layui.mobile"] || layui.config({
	base: layui.cache.dir + "lay/modules/mobile/"
}).extend({
	"layer-mobile": "layer-mobile",
	zepto: "zepto",
	"upload-mobile": "upload-mobile",
	"layim-mobile": "layim-mobile"
}), layui.define(["layer-mobile", "zepto", "layim-mobile"], function(t) {
	t("mobile", {
		layer: layui["layer-mobile"],
		layim: layui["layim-mobile"]
	})
});