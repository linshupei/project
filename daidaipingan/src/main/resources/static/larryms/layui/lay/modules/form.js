layui.define("layer", function(e) {
	"use strict";
	var b = layui.$,
		f = layui.layer,
		l = layui.hint(),
		v = layui.device(),
		C = "form",
		h = ".layui-form",
		w = "layui-this",
		$ = "layui-hide",
		T = "layui-disabled",
		i = function() {
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
	i.prototype.set = function(e) {
		var i = this;
		return b.extend(!0, i.config, e), i
	}, i.prototype.verify = function(e) {
		var i = this;
		return b.extend(!0, i.config.verify, e), i
	}, i.prototype.on = function(e, i) {
		return layui.onevent.call(this, C, e, i)
	}, i.prototype.val = function(e, t) {
		var i = b(h + '[lay-filter="' + e + '"]');
		i.each(function(e, i) {
			var n = b(this);
			layui.each(t, function(e, i) {
				var t, a = n.find('[name="' + e + '"]');
				a[0] && (t = a[0].type, "checkbox" === t ? a[0].checked = i : "radio" === t ? a.each(function() {
					this.value === i && (this.checked = !0)
				}) : a.val(i))
			})
		}), o.render(null, e)
	}, i.prototype.render = function(e, i) {
		var t = this,
			a = b(h +
			function() {
				return i ? '[lay-filter="' + i + '"]' : ""
			}()),
			n = {
				select: function() {
					var y, d = "请选择",
						p = "layui-form-select",
						m = "layui-select-title",
						k = "layui-select-none",
						x = "",
						e = a.find("select"),
						g = function(e, i) {
							b(e.target).parent().hasClass(m) && !i || (b("." + p).removeClass(p + "ed " + p + "up"), y && x && y.val(x)), y = null
						},
						f = function(a, e, i) {
							var s, n = b(this),
								t = a.find("." + m),
								l = t.find("input"),
								o = a.find("dl"),
								r = o.children("dd"),
								c = this.selectedIndex;
							if (!e) {
								var u = function() {
										var e = a.offset().top + a.outerHeight() + 5 - j.scrollTop(),
											i = o.outerHeight();
										c = n[0].selectedIndex, a.addClass(p + "ed"), r.removeClass($), s = null, r.eq(c).addClass(w).siblings().removeClass(w), e + i > j.height() && e >= i && a.addClass(p + "up"), f()
									},
									d = function(e) {
										a.removeClass(p + "ed " + p + "up"), l.blur(), s = null, e || v(l.val(), function(e) {
											e && (x = o.find("." + w).html(), l && l.val(x))
										})
									},
									f = function() {
										var e = o.children("dd." + w);
										if (e[0]) {
											var i = e.position().top,
												t = o.height(),
												a = e.height();
											i > t && o.scrollTop(i + o.scrollTop() - t + a - 5), i < 0 && o.scrollTop(i + o.scrollTop() - 5)
										}
									};
								t.on("click", function(e) {
									a.hasClass(p + "ed") ? d() : (g(e, !0), u()), o.find("." + k).remove()
								}), t.find(".layui-edge").on("click", function() {
									l.focus()
								}), l.on("keyup", function(e) {
									var i = e.keyCode;
									9 === i && u()
								}).on("keydown", function(l) {
									var e = l.keyCode;
									9 === e && d();
									var r = function(a, n) {
											var e, i;
											l.preventDefault();
											var t = function() {
													var e = o.children("dd." + w);
													if (o.children("dd." + $)[0] && "next" === a) {
														var i = o.children("dd:not(." + $ + ",." + T + ")"),
															t = i.eq(0).index();
														if (t >= 0 && t < e.index() && !i.hasClass(w)) return i.eq(0).prev()[0] ? i.eq(0).prev() : o.children(":last")
													}
													return n && n[0] ? n : s && s[0] ? s : e
												}();
											return i = t[a](), e = t[a]("dd:not(." + $ + ")"), i[0] ? (s = t[a](), e[0] && !e.hasClass(T) || !s[0] ? (e.addClass(w).siblings().removeClass(w), void f()) : r(a, s)) : s = null
										};
									38 === e && r("prev"), 40 === e && r("next"), 13 === e && (l.preventDefault(), o.children("dd." + w).trigger("click"))
								});
								var v = function(a, e, n) {
										var l = 0;
										layui.each(r, function() {
											var e = b(this),
												i = e.text(),
												t = i.indexOf(a) === -1;
											("" === a || "blur" === n ? a !== i : t) && l++, "keyup" === n && e[t ? "addClass" : "removeClass"]($)
										});
										var i = l === r.length;
										return e(i), i
									},
									h = function(e) {
										var i = this.value,
											t = e.keyCode;
										return 9 !== t && 13 !== t && 37 !== t && 38 !== t && 39 !== t && 40 !== t && (v(i, function(e) {
											e ? o.find("." + k)[0] || o.append('<p class="' + k + '">无匹配项</p>') : o.find("." + k).remove()
										}, "keyup"), "" === i && o.find("." + k).remove(), void f())
									};
								i && l.on("keyup", h).on("blur", function(e) {
									var i = n[0].selectedIndex;
									y = l, x = b(n[0].options[i]).html(), setTimeout(function() {
										v(l.val(), function(e) {
											x || l.val("")
										}, "blur")
									}, 200)
								}), r.on("click", function() {
									var e = b(this),
										i = e.attr("lay-value"),
										t = n.attr("lay-filter");
									return !e.hasClass(T) && (e.hasClass("layui-select-tips") ? l.val("") : (l.val(e.text()), e.addClass(w)), e.siblings().removeClass(w), n.val(i).removeClass("layui-form-danger"), layui.event.call(this, C, "select(" + t + ")", {
										elem: n[0],
										value: i,
										othis: a
									}), d(!0), !1)
								}), a.find("dl>dt").on("click", function(e) {
									return !1
								}), b(document).off("click", g).on("click", g)
							}
						};
					e.each(function(e, i) {
						var t = b(this),
							a = t.next("." + p),
							n = this.disabled,
							l = i.value,
							r = b(i.options[i.selectedIndex]),
							s = i.options[0];
						if ("string" == typeof t.attr("lay-ignore")) return t.show();
						var o = "string" == typeof t.attr("lay-search"),
							c = s ? s.value ? d : s.innerHTML || d : d,
							u = b(['<div class="' + (o ? "" : "layui-unselect ") + p, (n ? " layui-select-disabled" : "") + '">', '<div class="' + m + '">', '<input type="text" placeholder="' + c + '" ' + ('value="' + (l ? r.html() : "") + '"') + (o ? "" : " readonly") + ' class="layui-input' + (o ? "" : " layui-unselect") + (n ? " " + T : "") + '">', '<i class="layui-edge"></i></div>', '<dl class="layui-anim layui-anim-upbit' + (t.find("optgroup")[0] ? " layui-select-group" : "") + '">', function(e) {
								var t = [];
								return layui.each(e, function(e, i) {
									0 !== e || i.value ? "optgroup" === i.tagName.toLowerCase() ? t.push("<dt>" + i.label + "</dt>") : t.push('<dd lay-value="' + i.value + '" class="' + (l === i.value ? w : "") + (i.disabled ? " " + T : "") + '">' + i.innerHTML + "</dd>") : t.push('<dd lay-value="" class="layui-select-tips">' + (i.innerHTML || d) + "</dd>")
								}), 0 === t.length && t.push('<dd lay-value="" class="' + T + '">没有选项</dd>'), t.join("")
							}(t.find("*")) + "</dl>", "</div>"].join(""));
						a[0] && a.remove(), t.after(u), f.call(this, u, n, o)
					})
				},
				checkbox: function() {
					var c = {
						checkbox: ["layui-form-checkbox", "layui-form-checked", "checkbox"],
						_switch: ["layui-form-switch", "layui-form-onswitch", "switch"]
					},
						e = a.find("input[type=checkbox]"),
						u = function(t, a) {
							var n = b(this);
							t.on("click", function() {
								var e = n.attr("lay-filter"),
									i = (n.attr("lay-text") || "").split("|");
								n[0].disabled || (n[0].checked ? (n[0].checked = !1, t.removeClass(a[1]).find("em").text(i[1])) : (n[0].checked = !0, t.addClass(a[1]).find("em").text(i[0])), layui.event.call(n[0], C, a[2] + "(" + e + ")", {
									elem: n[0],
									value: n[0].value,
									othis: t
								}))
							})
						};
					e.each(function(e, t) {
						var i = b(this),
							a = i.attr("lay-skin"),
							n = (i.attr("lay-text") || "").split("|"),
							l = this.disabled;
						"switch" === a && (a = "_" + a);
						var r = c[a] || c.checkbox;
						if ("string" == typeof i.attr("lay-ignore")) return i.show();
						var s = i.next("." + r[0]),
							o = b(['<div class="layui-unselect ' + r[0], t.checked ? " " + r[1] : "", l ? " layui-checkbox-disbaled " + T : "", '"', a ? ' lay-skin="' + a + '"' : "", ">", function() {
								var e = t.title.replace(/\s/g, ""),
									i = {
										checkbox: [e ? "<span>" + t.title + "</span>" : "", '<i class="layui-icon layui-icon-ok"></i>'].join(""),
										_switch: "<em>" + ((t.checked ? n[0] : n[1]) || "") + "</em><i></i>"
									};
								return i[a] || i.checkbox
							}(), "</div>"].join(""));
						s[0] && s.remove(), i.after(o), u.call(this, o, r)
					})
				},
				radio: function() {
					var s = "layui-form-radio",
						o = ["&#xe643;", "&#xe63f;"],
						e = a.find("input[type=radio]"),
						r = function(n) {
							var l = b(this),
								r = "layui-anim-scaleSpring";
							n.on("click", function() {
								var e = l[0].name,
									i = l.parents(h),
									t = l.attr("lay-filter"),
									a = i.find("input[name=" + e.replace(/(\.|#|\[|\])/g, "\\$1") + "]");
								l[0].disabled || (layui.each(a, function() {
									var e = b(this).next("." + s);
									this.checked = !1, e.removeClass(s + "ed"), e.find(".layui-icon").removeClass(r).html(o[1])
								}), l[0].checked = !0, n.addClass(s + "ed"), n.find(".layui-icon").addClass(r).html(o[0]), layui.event.call(l[0], C, "radio(" + t + ")", {
									elem: l[0],
									value: l[0].value,
									othis: n
								}))
							})
						};
					e.each(function(e, i) {
						var t = b(this),
							a = t.next("." + s),
							n = this.disabled;
						if ("string" == typeof t.attr("lay-ignore")) return t.show();
						a[0] && a.remove();
						var l = b(['<div class="layui-unselect ' + s, i.checked ? " " + s + "ed" : "", (n ? " layui-radio-disbaled " + T : "") + '">', '<i class="layui-anim layui-icon">' + o[i.checked ? 0 : 1] + "</i>", "<div>" +
						function() {
							var e = i.title || "";
							return "string" == typeof t.next().attr("lay-radio") && (e = t.next().html(), t.next().remove()), e
						}() + "</div>", "</div>"].join(""));
						t.after(l), r.call(this, l)
					})
				}
			};
		return e ? n[e] ? n[e]() : l.error("不支持的" + e + "表单渲染") : layui.each(n, function(e, i) {
			i()
		}), t
	};
	var t = function() {
			var e = b(this),
				c = o.config.verify,
				u = null,
				d = "layui-form-danger",
				a = {},
				i = e.parents(h),
				t = i.find("*[lay-verify]"),
				n = e.parents("form")[0],
				l = i.find("input,select,textarea"),
				r = e.attr("lay-filter");
			if (layui.each(t, function(e, l) {
				var r = b(this),
					i = r.attr("lay-verify").split("|"),
					s = r.attr("lay-verType"),
					o = r.val();
				if (r.removeClass(d), layui.each(i, function(e, i) {
					var t, a = "",
						n = "function" == typeof c[i];
					if (c[i]) {
						var t = n ? a = c[i](o, l) : !c[i][0].test(o);
						if (a = a || c[i][1], t) return "tips" === s ? f.tips(a, function() {
							return "string" == typeof r.attr("lay-ignore") || "select" !== l.tagName.toLowerCase() && !/^checkbox|radio$/.test(l.type) ? r : r.next()
						}(), {
							tips: 1
						}) : "alert" === s ? f.alert(a, {
							title: "提示",
							shadeClose: !0
						}) : f.msg(a, {
							icon: 5,
							shift: 6
						}), v.android || v.ios || l.focus(), r.addClass(d), u = !0
					}
				}), u) return u
			}), u) return !1;
			var s = {};
			return layui.each(l, function(e, i) {
				if (i.name = (i.name || "").replace(/^\s*|\s*&/, ""), i.name) {
					if (/^.*\[\]$/.test(i.name)) {
						var t = i.name.match(/^(.*)\[\]$/g)[0];
						s[t] = 0 | s[t], i.name = i.name.replace(/^(.*)\[\]$/, "$1[" + s[t]+++"]")
					}
					/^checkbox|radio$/.test(i.type) && !i.checked || (a[i.name] = i.value)
				}
			}), layui.event.call(this, C, "submit(" + r + ")", {
				elem: this,
				form: n,
				field: a
			})
		},
		o = new i,
		a = b(document),
		j = b(window);
	o.render(), a.on("reset", h, function() {
		var e = b(this).attr("lay-filter");
		setTimeout(function() {
			o.render(null, e)
		}, 50)
	}), a.on("submit", h, t).on("click", "*[lay-submit]", t), e(C, o)
});