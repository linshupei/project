!
function(d, s) {
    "use strict";
    var y, c, a = d.layui && layui.define,
    u = {
        getPath: function() {
            var e = document.currentScript ? document.currentScript.src: function() {
                for (var e, t = document.scripts,
                i = t.length - 1,
                n = i; n > 0; n--) if ("interactive" === t[n].readyState) {
                    e = t[n].src;
                    break
                }
                return e || t[i].src
            } ();
            return e.substring(0, e.lastIndexOf("/") + 1)
        } (),
        config: {},
        end: {},
        minIndex: 0,
        minLeft: [],
        btn: ["&#x786E;&#x5B9A;", "&#x53D6;&#x6D88;"],
        type: ["dialog", "page", "iframe", "loading", "tips"],
        getStyle: function(e, t) {
            var i = e.currentStyle ? e.currentStyle: d.getComputedStyle(e, null);
            return i[i.getPropertyValue ? "getPropertyValue": "getAttribute"](t)
        },
        link: function(e, t, i) {
            if (p.path) {
                var n = document.getElementsByTagName("head")[0],
                a = document.createElement("link");
                "string" == typeof t && (i = t);
                var o = (i || e).replace(/\.|\//g, ""),
                r = "layuicss-" + o,
                s = 0;
                a.rel = "stylesheet",
                a.href = p.path + e,
                a.id = r,
                document.getElementById(r) || n.appendChild(a),
                "function" == typeof t && !
                function e() {
                    return++s > 80 ? d.console && console.error("layer.css: Invalid") : void(1989 === parseInt(u.getStyle(document.getElementById(r), "width")) ? t() : setTimeout(e, 100))
                } ()
            }
        }
    },
    p = {
        v: "3.1.1",
        ie: function() {
            var e = navigator.userAgent.toLowerCase();
            return !! (d.ActiveXObject || "ActiveXObject" in d) && ((e.match(/msie\s(\d+)/) || [])[1] || "11")
        } (),
        index: d.layer && d.layer.v ? 1e5: 0,
        path: u.getPath,
        config: function(e, t) {
            return e = e || {},
            p.cache = u.config = y.extend({},
            u.config, e),
            p.path = u.config.path || p.path,
            "string" == typeof e.extend && (e.extend = [e.extend]),
            u.config.path && p.ready(),
            e.extend ? (a ? layui.addcss("modules/layer/" + e.extend) : u.link("theme/" + e.extend), this) : this
        },
        ready: function(e) {
            var t = "layer",
            i = "",
            n = (a ? "modules/layer/": "theme/") + "default/layer.css?v=" + p.v + i;
            return a ? layui.addcss(n, e, t) : u.link(n, e, t),
            this
        },
        alert: function(e, t, i) {
            var n = "function" == typeof t;
            return n && (i = t),
            p.open(y.extend({
                content: e,
                yes: i
            },
            n ? {}: t))
        },
        confirm: function(e, t, i, n) {
            var a = "function" == typeof t;
            return a && (n = i, i = t),
            p.open(y.extend({
                content: e,
                btn: u.btn,
                yes: i,
                btn2: n
            },
            a ? {}: t))
        },
        msg: function(e, t, i) {
            var n = "function" == typeof t,
            a = u.config.skin,
            o = (a ? a + " " + a + "-msg": "") || "layui-layer-msg",
            r = f.anim.length - 1;
            return n && (i = t),
            p.open(y.extend({
                content: e,
                time: 3e3,
                shade: !1,
                skin: o,
                title: !1,
                closeBtn: !1,
                btn: !1,
                resize: !1,
                end: i
            },
            n && !u.config.skin ? {
                skin: o + " layui-layer-hui",
                anim: r
            }: function() {
                return t = t || {},
                (t.icon === -1 || t.icon === s && !u.config.skin) && (t.skin = o + " " + (t.skin || "layui-layer-hui")),
                t
            } ()))
        },
        load: function(e, t) {
            return p.open(y.extend({
                type: 3,
                icon: e || 0,
                resize: !1,
                shade: .01
            },
            t))
        },
        tips: function(e, t, i) {
            return p.open(y.extend({
                type: 4,
                content: [e, t],
                closeBtn: !1,
                time: 3e3,
                shade: !1,
                resize: !1,
                fixed: !1,
                maxWidth: 210
            },
            i))
        }
    },
    i = function(e) {
        var t = this;
        t.index = ++p.index,
        t.config = y.extend({},
        t.config, u.config, e),
        document.body ? t.creat() : setTimeout(function() {
            t.creat()
        },
        30)
    };
    i.pt = i.prototype;
    var f = ["layui-layer", ".layui-layer-title", ".layui-layer-main", ".layui-layer-dialog", "layui-layer-iframe", "layui-layer-content", "layui-layer-btn", "layui-layer-close"];
    f.anim = ["layer-anim-00", "layer-anim-01", "layer-anim-02", "layer-anim-03", "layer-anim-04", "layer-anim-05", "layer-anim-06"],
    i.pt.config = {
        type: 0,
        shade: .3,
        fixed: !0,
        move: f[1],
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
    },
    i.pt.vessel = function(e, t) {
        var i = this,
        n = i.index,
        a = i.config,
        o = a.zIndex + n,
        r = "object" == typeof a.title,
        s = a.maxmin && (1 === a.type || 2 === a.type),
        l = a.title ? '<div class="layui-layer-title" style="' + (r ? a.title[1] : "") + '">' + (r ? a.title[0] : a.title) + "</div>": "";
        return a.zIndex = o,
        t([a.shade ? '<div class="layui-layer-shade" id="layui-layer-shade' + n + '" times="' + n + '" style="' + ("z-index:" + (o - 1) + "; ") + '"></div>': "", '<div class="' + f[0] + (" layui-layer-" + u.type[a.type]) + (0 != a.type && 2 != a.type || a.shade ? "": " layui-layer-border") + " " + (a.skin || "") + '" id="' + f[0] + n + '" type="' + u.type[a.type] + '" times="' + n + '" showtime="' + a.time + '" conType="' + (e ? "object": "string") + '" style="z-index: ' + o + "; width:" + a.area[0] + ";height:" + a.area[1] + (a.fixed ? "": ";position:absolute;") + '">' + (e && 2 != a.type ? "": l) + '<div id="' + (a.id || "") + '" class="layui-layer-content' + (0 == a.type && a.icon !== -1 ? " layui-layer-padding": "") + (3 == a.type ? " layui-layer-loading" + a.icon: "") + '">' + (0 == a.type && a.icon !== -1 ? '<i class="layui-layer-ico layui-layer-ico' + a.icon + '"></i>': "") + (1 == a.type && e ? "": a.content || "") + '</div><span class="layui-layer-setwin">' +
        function() {
            var e = s ? '<a class="layui-layer-min" href="javascript:;"><cite></cite></a><a class="layui-layer-ico layui-layer-max" href="javascript:;"></a>': "";
            return a.closeBtn && (e += '<a class="layui-layer-ico ' + f[7] + " " + f[7] + (a.title ? a.closeBtn: 4 == a.type ? "1": "2") + '" href="javascript:;"></a>'),
            e
        } () + "</span>" + (a.btn ?
        function() {
            var e = "";
            "string" == typeof a.btn && (a.btn = [a.btn]);
            for (var t = 0,
            i = a.btn.length; t < i; t++) e += '<a class="' + f[6] + t + '">' + a.btn[t] + "</a>";
            return '<div class="' + f[6] + " layui-layer-btn-" + (a.btnAlign || "") + '">' + e + "</div>"
        } () : "") + (a.resize ? '<span class="layui-layer-resize"></span>': "") + "</div>"], l, y('<div class="layui-layer-move"></div>')),
        i
    },
    i.pt.creat = function() {
        var n = this,
        a = n.config,
        o = n.index,
        r = a.content,
        s = "object" == typeof r,
        l = y("body");
        if (!a.id || !y("#" + a.id)[0]) {
            switch ("string" == typeof a.area && (a.area = "auto" === a.area ? ["", ""] : [a.area, ""]), a.shift && (a.anim = a.shift), 6 == p.ie && (a.fixed = !1), a.type) {
            case 0:
                a.btn = "btn" in a ? a.btn: u.btn[0],
                p.closeAll("dialog");
                break;
            case 2:
                var r = a.content = s ? a.content: [a.content || "", "auto"];
                a.content = '<iframe scrolling="' + (a.content[1] || "auto") + '" allowtransparency="true" id="' + f[4] + o + '" name="' + f[4] + o + '" onload="this.className=\'\';" class="layui-layer-load" frameborder="0" src="' + a.content[0] + '"></iframe>';
                break;
            case 3:
                delete a.title,
                delete a.closeBtn,
                a.icon === -1 && 0 === a.icon,
                p.closeAll("loading");
                break;
            case 4:
                s || (a.content = [a.content, "body"]),
                a.follow = a.content[1],
                a.content = a.content[0] + '<i class="layui-layer-TipsG"></i>',
                delete a.title,
                a.tips = "object" == typeof a.tips ? a.tips: [a.tips, !0],
                a.tipsMore || p.closeAll("tips")
            }
            if (n.vessel(s,
            function(e, t, i) {
                l.append(e[0]),
                s ?
                function() {
                    2 == a.type || 4 == a.type ?
                    function() {
                        y("body").append(e[1])
                    } () : function() {
                        r.parents("." + f[0])[0] || (r.data("display", r.css("display")).show().addClass("layui-layer-wrap").wrap(e[1]), y("#" + f[0] + o).find("." + f[5]).before(t))
                    } ()
                } () : l.append(e[1]),
                y(".layui-layer-move")[0] || l.append(u.moveElem = i),
                n.layero = y("#" + f[0] + o),
                a.scrollbar || f.html.css("overflow", "hidden").attr("layer-full", o)
            }).auto(o), y("#layui-layer-shade" + n.index).css({
                "background-color": a.shade[1] || "#000",
                opacity: a.shade[0] || a.shade
            }), 2 == a.type && 6 == p.ie && n.layero.find("iframe").attr("src", r[0]), 4 == a.type ? n.tips() : n.offset(), a.fixed && c.on("resize",
            function() {
                n.offset(),
                (/^\d+%$/.test(a.area[0]) || /^\d+%$/.test(a.area[1])) && n.auto(o),
                4 == a.type && n.tips()
            }), a.time <= 0 || setTimeout(function() {
                p.close(n.index)
            },
            a.time), n.move().callback(), f.anim[a.anim]) {
                var e = "layer-anim " + f.anim[a.anim];
                n.layero.addClass(e).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
                function() {
                    y(this).removeClass(e)
                })
            }
            a.isOutAnim && n.layero.data("isOutAnim", !0)
        }
    },
    i.pt.auto = function(e) {
        var t = this,
        i = t.config,
        n = y("#" + f[0] + e);
        "" === i.area[0] && i.maxWidth > 0 && (p.ie && p.ie < 8 && i.btn && n.width(n.innerWidth()), n.outerWidth() > i.maxWidth && n.width(i.maxWidth));
        var a = [n.innerWidth(), n.innerHeight()],
        o = n.find(f[1]).outerHeight() || 0,
        r = n.find("." + f[6]).outerHeight() || 0,
        s = function(e) {
            e = n.find(e),
            e.height(a[1] - o - r - 2 * (0 | parseFloat(e.css("padding-top"))))
        };
        switch (i.type) {
        case 2:
            s("iframe");
            break;
        default:
            "" === i.area[1] ? i.maxHeight > 0 && n.outerHeight() > i.maxHeight ? (a[1] = i.maxHeight, s("." + f[5])) : i.fixed && a[1] >= c.height() && (a[1] = c.height(), s("." + f[5])) : s("." + f[5])
        }
        return t
    },
    i.pt.offset = function() {
        var e = this,
        t = e.config,
        i = e.layero,
        n = [i.outerWidth(), i.outerHeight()],
        a = "object" == typeof t.offset;
        e.offsetTop = (c.height() - n[1]) / 2,
        e.offsetLeft = (c.width() - n[0]) / 2,
        a ? (e.offsetTop = t.offset[0], e.offsetLeft = t.offset[1] || e.offsetLeft) : "auto" !== t.offset && ("t" === t.offset ? e.offsetTop = 0 : "r" === t.offset ? e.offsetLeft = c.width() - n[0] : "b" === t.offset ? e.offsetTop = c.height() - n[1] : "l" === t.offset ? e.offsetLeft = 0 : "lt" === t.offset ? (e.offsetTop = 0, e.offsetLeft = 0) : "lb" === t.offset ? (e.offsetTop = c.height() - n[1], e.offsetLeft = 0) : "rt" === t.offset ? (e.offsetTop = 0, e.offsetLeft = c.width() - n[0]) : "rb" === t.offset ? (e.offsetTop = c.height() - n[1], e.offsetLeft = c.width() - n[0]) : e.offsetTop = t.offset),
        t.fixed || (e.offsetTop = /%$/.test(e.offsetTop) ? c.height() * parseFloat(e.offsetTop) / 100 : parseFloat(e.offsetTop), e.offsetLeft = /%$/.test(e.offsetLeft) ? c.width() * parseFloat(e.offsetLeft) / 100 : parseFloat(e.offsetLeft), e.offsetTop += c.scrollTop(), e.offsetLeft += c.scrollLeft()),
        i.attr("minLeft") && (e.offsetTop = c.height() - (i.find(f[1]).outerHeight() || 0), e.offsetLeft = i.css("left")),
        i.css({
            top: e.offsetTop,
            left: e.offsetLeft
        })
    },
    i.pt.tips = function() {
        var e = this,
        t = e.config,
        i = e.layero,
        n = [i.outerWidth(), i.outerHeight()],
        a = y(t.follow);
        a[0] || (a = y("body"));
        var o = {
            width: a.outerWidth(),
            height: a.outerHeight(),
            top: a.offset().top,
            left: a.offset().left
        },
        r = i.find(".layui-layer-TipsG"),
        s = t.tips[0];
        t.tips[1] || r.remove(),
        o.autoLeft = function() {
            o.left + n[0] - c.width() > 0 ? (o.tipLeft = o.left + o.width - n[0], r.css({
                right: 12,
                left: "auto"
            })) : o.tipLeft = o.left
        },
        o.where = [function() {
            o.autoLeft(),
            o.tipTop = o.top - n[1] - 10,
            r.removeClass("layui-layer-TipsB").addClass("layui-layer-TipsT").css("border-right-color", t.tips[1])
        },
        function() {
            o.tipLeft = o.left + o.width + 10,
            o.tipTop = o.top,
            r.removeClass("layui-layer-TipsL").addClass("layui-layer-TipsR").css("border-bottom-color", t.tips[1])
        },
        function() {
            o.autoLeft(),
            o.tipTop = o.top + o.height + 10,
            r.removeClass("layui-layer-TipsT").addClass("layui-layer-TipsB").css("border-right-color", t.tips[1])
        },
        function() {
            o.tipLeft = o.left - n[0] - 10,
            o.tipTop = o.top,
            r.removeClass("layui-layer-TipsR").addClass("layui-layer-TipsL").css("border-bottom-color", t.tips[1])
        }],
        o.where[s - 1](),
        1 === s ? o.top - (c.scrollTop() + n[1] + 16) < 0 && o.where[2]() : 2 === s ? c.width() - (o.left + o.width + n[0] + 16) > 0 || o.where[3]() : 3 === s ? o.top - c.scrollTop() + o.height + n[1] + 16 - c.height() > 0 && o.where[0]() : 4 === s && n[0] + 16 - o.left > 0 && o.where[1](),
        i.find("." + f[5]).css({
            "background-color": t.tips[1],
            "padding-right": t.closeBtn ? "30px": ""
        }),
        i.css({
            left: o.tipLeft - (t.fixed ? c.scrollLeft() : 0),
            top: o.tipTop - (t.fixed ? c.scrollTop() : 0)
        })
    },
    i.pt.move = function() {
        var r = this,
        s = r.config,
        e = y(document),
        l = r.layero,
        t = l.find(s.move),
        i = l.find(".layui-layer-resize"),
        f = {};
        return s.move && t.css("cursor", "move"),
        t.on("mousedown",
        function(e) {
            e.preventDefault(),
            s.move && (f.moveStart = !0, f.offset = [e.clientX - parseFloat(l.css("left")), e.clientY - parseFloat(l.css("top"))], u.moveElem.css("cursor", "move").show())
        }),
        i.on("mousedown",
        function(e) {
            e.preventDefault(),
            f.resizeStart = !0,
            f.offset = [e.clientX, e.clientY],
            f.area = [l.outerWidth(), l.outerHeight()],
            u.moveElem.css("cursor", "se-resize").show()
        }),
        e.on("mousemove",
        function(e) {
            if (f.moveStart) {
                var t = e.clientX - f.offset[0],
                i = e.clientY - f.offset[1],
                n = "fixed" === l.css("position");
                if (e.preventDefault(), f.stX = n ? 0 : c.scrollLeft(), f.stY = n ? 0 : c.scrollTop(), !s.moveOut) {
                    var a = c.width() - l.outerWidth() + f.stX,
                    o = c.height() - l.outerHeight() + f.stY;
                    t < f.stX && (t = f.stX),
                    t > a && (t = a),
                    i < f.stY && (i = f.stY),
                    i > o && (i = o)
                }
                l.css({
                    left: t,
                    top: i
                })
            }
            if (s.resize && f.resizeStart) {
                var t = e.clientX - f.offset[0],
                i = e.clientY - f.offset[1];
                e.preventDefault(),
                p.style(r.index, {
                    width: f.area[0] + t,
                    height: f.area[1] + i
                }),
                f.isResize = !0,
                s.resizing && s.resizing(l)
            }
        }).on("mouseup",
        function(e) {
            f.moveStart && (delete f.moveStart, u.moveElem.hide(), s.moveEnd && s.moveEnd(l)),
            f.resizeStart && (delete f.resizeStart, u.moveElem.hide())
        }),
        r
    },
    i.pt.callback = function() {
        function e() {
            var e = a.cancel && a.cancel(i.index, n);
            e === !1 || p.close(i.index)
        }
        var i = this,
        n = i.layero,
        a = i.config;
        i.openLayer(),
        a.success && (2 == a.type ? n.find("iframe").on("load",
        function() {
            a.success(n, i.index)
        }) : a.success(n, i.index)),
        6 == p.ie && i.IE6(n),
        n.find("." + f[6]).children("a").on("click",
        function() {
            var e = y(this).index();
            if (0 === e) a.yes ? a.yes(i.index, n) : a.btn1 ? a.btn1(i.index, n) : p.close(i.index);
            else {
                var t = a["btn" + (e + 1)] && a["btn" + (e + 1)](i.index, n);
                t === !1 || p.close(i.index)
            }
        }),
        n.find("." + f[7]).on("click", e),
        a.shadeClose && y("#layui-layer-shade" + i.index).on("click",
        function() {
            p.close(i.index)
        }),
        n.find(".layui-layer-min").on("click",
        function() {
            var e = a.min && a.min(n);
            e === !1 || p.min(i.index, a)
        }),
        n.find(".layui-layer-max").on("click",
        function() {
            y(this).hasClass("layui-layer-maxmin") ? (p.restore(i.index), a.restore && a.restore(n)) : (p.full(i.index, a), setTimeout(function() {
                a.full && a.full(n)
            },
            100))
        }),
        a.end && (u.end[i.index] = a.end)
    },
    u.reselect = function() {
        y.each(y("select"),
        function(e, t) {
            var i = y(this);
            i.parents("." + f[0])[0] || 1 == i.attr("layer") && y("." + f[0]).length < 1 && i.removeAttr("layer").show(),
            i = null
        })
    },
    i.pt.IE6 = function(e) {
        y("select").each(function(e, t) {
            var i = y(this);
            i.parents("." + f[0])[0] || "none" === i.css("display") || i.attr({
                layer: "1"
            }).hide(),
            i = null
        })
    },
    i.pt.openLayer = function() {
        var e = this;
        p.zIndex = e.config.zIndex,
        p.setTop = function(e) {
            var t = function() {
                p.zIndex++,
                e.css("z-index", p.zIndex + 1)
            };
            return p.zIndex = parseInt(e[0].style.zIndex),
            e.on("mousedown", t),
            p.zIndex
        }
    },
    u.record = function(e) {
        var t = [e.width(), e.height(), e.position().top, e.position().left + parseFloat(e.css("margin-left"))];
        e.find(".layui-layer-max").addClass("layui-layer-maxmin"),
        e.attr({
            area: t
        })
    },
    u.rescollbar = function(e) {
        f.html.attr("layer-full") == e && (f.html[0].style.removeProperty ? f.html[0].style.removeProperty("overflow") : f.html[0].style.removeAttribute("overflow"), f.html.removeAttr("layer-full"))
    },
    d.layer = p,
    p.getChildFrame = function(e, t) {
        return t = t || y("." + f[4]).attr("times"),
        y("#" + f[0] + t).find("iframe").contents().find(e)
    },
    p.getFrameIndex = function(e) {
        return y("#" + e).parents("." + f[4]).attr("times")
    },
    p.iframeAuto = function(e) {
        if (e) {
            var t = p.getChildFrame("html", e).outerHeight(),
            i = y("#" + f[0] + e),
            n = i.find(f[1]).outerHeight() || 0,
            a = i.find("." + f[6]).outerHeight() || 0;
            i.css({
                height: t + n + a
            }),
            i.find("iframe").css({
                height: t
            })
        }
    },
    p.iframeSrc = function(e, t) {
        y("#" + f[0] + e).find("iframe").attr("src", t)
    },
    p.style = function(e, t, i) {
        var n = y("#" + f[0] + e),
        a = n.find(".layui-layer-content"),
        o = n.attr("type"),
        r = n.find(f[1]).outerHeight() || 0,
        s = n.find("." + f[6]).outerHeight() || 0;
        n.attr("minLeft");
        o !== u.type[3] && o !== u.type[4] && (i || (parseFloat(t.width) <= 260 && (t.width = 260), parseFloat(t.height) - r - s <= 64 && (t.height = 64 + r + s)), n.css(t), s = n.find("." + f[6]).outerHeight(), o === u.type[2] ? n.find("iframe").css({
            height: parseFloat(t.height) - r - s
        }) : a.css({
            height: parseFloat(t.height) - r - s - parseFloat(a.css("padding-top")) - parseFloat(a.css("padding-bottom"))
        }))
    },
    p.min = function(e, t) {
        var i = y("#" + f[0] + e),
        n = i.find(f[1]).outerHeight() || 0,
        a = i.attr("minLeft") || 181 * u.minIndex + "px",
        o = i.css("position");
        u.record(i),
        u.minLeft[0] && (a = u.minLeft[0], u.minLeft.shift()),
        i.attr("position", o),
        p.style(e, {
            width: 180,
            height: n,
            left: a,
            top: c.height() - n,
            position: "fixed",
            overflow: "hidden"
        },
        !0),
        i.find(".layui-layer-min").hide(),
        "page" === i.attr("type") && i.find(f[4]).hide(),
        u.rescollbar(e),
        i.attr("minLeft") || u.minIndex++,
        i.attr("minLeft", a)
    },
    p.restore = function(e) {
        var t = y("#" + f[0] + e),
        i = t.attr("area").split(",");
        t.attr("type");
        p.style(e, {
            width: parseFloat(i[0]),
            height: parseFloat(i[1]),
            top: parseFloat(i[2]),
            left: parseFloat(i[3]),
            position: t.attr("position"),
            overflow: "visible"
        },
        !0),
        t.find(".layui-layer-max").removeClass("layui-layer-maxmin"),
        t.find(".layui-layer-min").show(),
        "page" === t.attr("type") && t.find(f[4]).show(),
        u.rescollbar(e)
    },
    p.full = function(t) {
        var e, i = y("#" + f[0] + t);
        u.record(i),
        f.html.attr("layer-full") || f.html.css("overflow", "hidden").attr("layer-full", t),
        clearTimeout(e),
        e = setTimeout(function() {
            var e = "fixed" === i.css("position");
            p.style(t, {
                top: e ? 0 : c.scrollTop(),
                left: e ? 0 : c.scrollLeft(),
                width: c.width(),
                height: c.height()
            },
            !0),
            i.find(".layui-layer-min").hide()
        },
        100)
    },
    p.title = function(e, t) {
        var i = y("#" + f[0] + (t || p.index)).find(f[1]);
        i.html(e)
    },
    p.close = function(n) {
        var a = y("#" + f[0] + n),
        o = a.attr("type"),
        e = "layer-anim-close";
        if (a[0]) {
            var r = "layui-layer-wrap",
            t = function() {
                if (o === u.type[1] && "object" === a.attr("conType")) {
                    a.children(":not(." + f[5] + ")").remove();
                    for (var e = a.find("." + r), t = 0; t < 2; t++) e.unwrap();
                    e.css("display", e.data("display")).removeClass(r)
                } else {
                    if (o === u.type[2]) try {
                        var i = y("#" + f[4] + n)[0];
                        i.contentWindow.document.write(""),
                        i.contentWindow.close(),
                        a.find("." + f[5])[0].removeChild(i)
                    } catch(e) {}
                    a[0].innerHTML = "",
                    a.remove()
                }
                "function" == typeof u.end[n] && u.end[n](),
                delete u.end[n]
            };
            a.data("isOutAnim") && a.addClass("layer-anim " + e),
            y("#layui-layer-moves, #layui-layer-shade" + n).remove(),
            6 == p.ie && u.reselect(),
            u.rescollbar(n),
            a.attr("minLeft") && (u.minIndex--, u.minLeft.push(a.attr("minLeft"))),
            p.ie && p.ie < 10 || !a.data("isOutAnim") ? t() : setTimeout(function() {
                t()
            },
            200)
        }
    },
    p.closeAll = function(i) {
        y.each(y("." + f[0]),
        function() {
            var e = y(this),
            t = i ? e.attr("type") === i: 1;
            t && p.close(e.attr("times")),
            t = null
        })
    };
    var t = p.cache || {},
    h = function(e) {
        return t.skin ? " " + t.skin + " " + t.skin + "-" + e: ""
    };
    p.prompt = function(i, n) {
        var e = "";
        if (i = i || {},
        "function" == typeof i && (n = i), i.area) {
            var t = i.area;
            e = 'style="width: ' + t[0] + "; height: " + t[1] + ';"',
            delete i.area
        }
        var a, o = 2 == i.formType ? '<textarea class="layui-layer-input"' + e + "></textarea>": function() {
            return '<input type="' + (1 == i.formType ? "password": "text") + '" class="layui-layer-input">'
        } (),
        r = i.success;
        return delete i.success,
        p.open(y.extend({
            type: 1,
            btn: ["&#x786E;&#x5B9A;", "&#x53D6;&#x6D88;"],
            content: o,
            skin: "layui-layer-prompt" + h("prompt"),
            maxWidth: c.width(),
            success: function(e) {
                a = e.find(".layui-layer-input"),
                a.val(i.value || "").focus(),
                "function" == typeof r && r(e)
            },
            resize: !1,
            yes: function(e) {
                var t = a.val();
                "" === t ? a.focus() : t.length > (i.maxlength || 500) ? p.tips("&#x6700;&#x591A;&#x8F93;&#x5165;" + (i.maxlength || 500) + "&#x4E2A;&#x5B57;&#x6570;", a, {
                    tips: 1
                }) : n && n(t, e, a)
            }
        },
        i))
    },
    p.tab = function(a) {
        a = a || {};
        var n = a.tab || {},
        o = "layui-this",
        i = a.success;
        return delete a.success,
        p.open(y.extend({
            type: 1,
            skin: "layui-layer-tab" + h("tab"),
            resize: !1,
            title: function() {
                var e = n.length,
                t = 1,
                i = "";
                if (e > 0) for (i = '<span class="' + o + '">' + n[0].title + "</span>"; t < e; t++) i += "<span>" + n[t].title + "</span>";
                return i
            } (),
            content: '<ul class="layui-layer-tabmain">' +
            function() {
                var e = n.length,
                t = 1,
                i = "";
                if (e > 0) for (i = '<li class="layui-layer-tabli ' + o + '">' + (n[0].content || "no content") + "</li>"; t < e; t++) i += '<li class="layui-layer-tabli">' + (n[t].content || "no  content") + "</li>";
                return i
            } () + "</ul>",
            success: function(e) {
                var t = e.find(".layui-layer-title").children(),
                n = e.find(".layui-layer-tabmain").children();
                t.on("mousedown",
                function(e) {
                    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0;
                    var t = y(this),
                    i = t.index();
                    t.addClass(o).siblings().removeClass(o),
                    n.eq(i).show().siblings().hide(),
                    "function" == typeof a.change && a.change(i)
                }),
                "function" == typeof i && i(e)
            }
        },
        a))
    },
    p.photos = function(a, e, t) {
        function i(e, t, i) {
            var n = new Image;
            return n.src = e,
            n.complete ? t(n) : (n.onload = function() {
                n.onload = null,
                t(n)
            },
            void(n.onerror = function(e) {
                n.onerror = null,
                i(e)
            }))
        }
        var o = {};
        if (a = a || {},
        a.photos) {
            var n = a.photos.constructor === Object,
            r = n ? a.photos: {},
            s = r.data || [],
            l = r.start || 0;
            o.imgIndex = (0 | l) + 1,
            a.img = a.img || "img";
            var f = a.success;
            if (delete a.success, n) {
                if (0 === s.length) return p.msg("&#x6CA1;&#x6709;&#x56FE;&#x7247;")
            } else {
                var c = y(a.photos),
                u = function() {
                    s = [],
                    c.find(a.img).each(function(e) {
                        var t = y(this);
                        t.attr("layer-index", e),
                        s.push({
                            alt: t.attr("alt"),
                            pid: t.attr("layer-pid"),
                            src: t.attr("layer-src") || t.attr("src"),
                            thumb: t.attr("src")
                        })
                    })
                };
                if (u(), 0 === s.length) return;
                if (e || c.on("click", a.img,
                function() {
                    var e = y(this),
                    t = e.attr("layer-index");
                    p.photos(y.extend(a, {
                        photos: {
                            start: t,
                            data: s,
                            tab: a.tab
                        },
                        full: a.full
                    }), !0),
                    u()
                }), !e) return
            }
            o.imgprev = function(e) {
                o.imgIndex--,
                o.imgIndex < 1 && (o.imgIndex = s.length),
                o.tabimg(e)
            },
            o.imgnext = function(e, t) {
                o.imgIndex++,
                o.imgIndex > s.length && (o.imgIndex = 1, t) || o.tabimg(e)
            },
            o.keyup = function(e) {
                if (!o.end) {
                    var t = e.keyCode;
                    e.preventDefault(),
                    37 === t ? o.imgprev(!0) : 39 === t ? o.imgnext(!0) : 27 === t && p.close(o.index)
                }
            },
            o.tabimg = function(e) {
                if (! (s.length <= 1)) return r.start = o.imgIndex - 1,
                p.close(o.index),
                p.photos(a, !0, e)
            },
            o.event = function() {
                o.bigimg.hover(function() {
                    o.imgsee.show()
                },
                function() {
                    o.imgsee.hide()
                }),
                o.bigimg.find(".layui-layer-imgprev").on("click",
                function(e) {
                    e.preventDefault(),
                    o.imgprev()
                }),
                o.bigimg.find(".layui-layer-imgnext").on("click",
                function(e) {
                    e.preventDefault(),
                    o.imgnext()
                }),
                y(document).on("keyup", o.keyup)
            },
            o.loadi = p.load(1, {
                shade: !("shade" in a) && .9,
                scrollbar: !1
            }),
            i(s[l].src,
            function(n) {
                p.close(o.loadi),
                o.index = p.open(y.extend({
                    type: 1,
                    id: "layui-layer-photos",
                    area: function() {
                        var e = [n.width, n.height],
                        t = [y(d).width() - 100, y(d).height() - 100];
                        if (!a.full && (e[0] > t[0] || e[1] > t[1])) {
                            var i = [e[0] / t[0], e[1] / t[1]];
                            i[0] > i[1] ? (e[0] = e[0] / i[0], e[1] = e[1] / i[0]) : i[0] < i[1] && (e[0] = e[0] / i[1], e[1] = e[1] / i[1])
                        }
                        return [e[0] + "px", e[1] + "px"]
                    } (),
                    title: !1,
                    shade: .9,
                    shadeClose: !0,
                    closeBtn: !1,
                    move: ".layui-layer-phimg img",
                    moveType: 1,
                    scrollbar: !1,
                    moveOut: !0,
                    isOutAnim: !1,
                    skin: "layui-layer-photos" + h("photos"),
                    content: '<div class="layui-layer-phimg"><img src="' + s[l].src + '" alt="' + (s[l].alt || "") + '" layer-pid="' + s[l].pid + '"><div class="layui-layer-imgsee">' + (s.length > 1 ? '<span class="layui-layer-imguide"><a href="javascript:;" class="layui-layer-iconext layui-layer-imgprev"></a><a href="javascript:;" class="layui-layer-iconext layui-layer-imgnext"></a></span>': "") + '<div class="layui-layer-imgbar" style="display:' + (t ? "block": "") + '"><span class="layui-layer-imgtit"><a href="javascript:;">' + (s[l].alt || "") + "</a><em>" + o.imgIndex + "/" + s.length + "</em></span></div></div></div>",
                    success: function(e, t) {
                        o.bigimg = e.find(".layui-layer-phimg"),
                        o.imgsee = e.find(".layui-layer-imguide,.layui-layer-imgbar"),
                        o.event(e),
                        a.tab && a.tab(s[l], e),
                        "function" == typeof f && f(e)
                    },
                    end: function() {
                        o.end = !0,
                        y(document).off("keyup", o.keyup)
                    }
                },
                a))
            },
            function() {
                p.close(o.loadi),
                p.msg("&#x5F53;&#x524D;&#x56FE;&#x7247;&#x5730;&#x5740;&#x5F02;&#x5E38;<br>&#x662F;&#x5426;&#x7EE7;&#x7EED;&#x67E5;&#x770B;&#x4E0B;&#x4E00;&#x5F20;&#xFF1F;", {
                    time: 3e4,
                    btn: ["&#x4E0B;&#x4E00;&#x5F20;", "&#x4E0D;&#x770B;&#x4E86;"],
                    yes: function() {
                        s.length > 1 && o.imgnext(!0, !0)
                    }
                })
            })
        }
    },
    u.run = function(e) {
        y = e,
        c = y(d),
        f.html = y("html"),
        p.open = function(e) {
            var t = new i(e);
            return t.index
        }
    },
    d.layui && layui.define ? (p.ready(), layui.define("jquery",
    function(e) {
        p.path = layui.cache.dir,
        u.run(layui.$),
        d.layer = p,
        e("layer", p)
    })) : "function" == typeof define && define.amd ? define(["jquery"],
    function() {
        return u.run(d.jQuery),
        p
    }) : function() {
        u.run(d.jQuery),
        p.ready()
    } ()
} (window);