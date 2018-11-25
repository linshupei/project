layui.define(["larryms", "larryElem"],
function(e) {
    var u = layui.$,
    h = layui.larryElem,
    y = layui.larryms,
    g = layui.layer,
    t = "larryTab",
    b = {},
    v = 0,
    a = new Array,
    r = function() {
        this.config = {
            data: undefined,
            url: undefined,
            type: "POST",
            cached: true,
            top_menu: "#larryms_top_menu",
            spreadOne: false,
            topFilter: "TopMenu",
            left_menu: "#larryms_left_menu",
            leftFilter: "LarrySide",
            tab_elem: "#larry_tab",
            tabFilter: "larryTab",
            tabSession: true,
            closed: true,
            tabMax: 25,
            autoRefresh: true,
            contextMenu: true,
            tabShow: true,
            pageEffect: y.pageAnim,
            isPageEffect: true
        },
        this.larrymsCache = {
            navHtml: undefined,
            tab: undefined
        }
    },
    n = function() {
        u("body").on("selectstart",
        function() {
            return false
        });
        u("#buttonRCtrl").find("dd").each(function() {
            u(this).on("click",
            function() {
                var e = u(this).children("a").attr("data-eName");
                d.tabCtrl(e)
            })
        });
        u("#larryms_refresh").off("click").on("click",
        function() {
            var e = u("#larry_tab_content").children(".layui-show").children("iframe");
            if (u(this).hasClass("refreshThen")) {
                u(this).removeClass("refreshThen");
                e.attr("src", e.attr("src"));
                u("#larry_tab_content").children(".layui-show").css({
                    opacity: "0",
                    "margin-left": "80px",
                    "margin-top": "60px"
                }).delay(100).animate({
                    opacity: "1",
                    marginLeft: "0",
                    marginTop: "0"
                },
                100);
                setTimeout(function() {
                    u("#larryms_refresh").addClass("refreshThen")
                },
                500)
            } else {
                y.msg("您在半秒内连续点击速度过快，为降低服务器压力，请稍后再试")
            }
        })
    },
    l = {
        larryMenuClick: function() {
            var e = "#larryms_top_menu",
            t = u(e).find("li.larryms-this").children("a").data("group");
            var a = t !== undefined ? t: "0";
            d.on("click(LarrySide)", a,
            function(e) {
                d.tabAdd(e.field)
            })
        }
    };
    r.prototype.set = function(e) {
        var t = this;
        u.extend(true, t.config, e);
        return t
    };
    r.prototype.menuSet = function(e) {
        var t = this;
        if (!e.hasOwnProperty("url") && !e.hasOwnProperty("data")) {
            return y.error("数据源解析出错：请设置data或url参数，否则导航菜单无法正常初始化！", y.tit[1])
        }
        var a = ["data", "url", "type", "cached", "spreadOne", "top_menu", "topFilter", "left_menu", "leftFilter"];
        var r = y.configFilter(e, a);
        t.set(r)
    };
    r.prototype.menu = function() {
        var r = this,
        e = r.config;
        if (e.url === undefined && e.data === undefined) {
            return y.error("请为菜单项配置数据源[data || url]", y.tit[1])
        }
        if (e.data !== undefined && typeof e.data === "object") {
            r.larryCompleteMenu(e.data.data);
            h.render()
        } else {
            if (e.url !== undefined) {
                var t = u.ajax({
                    type: e.type,
                    url: e.url,
                    async: false,
                    dataType: "json",
                    success: function(e, t, a) {
                        r.larryCompleteMenu(e.data)
                    },
                    error: function(e, t, a) {
                        return y.error("larryMS Error:" + a, y.tit[1])
                    },
                    complete: function() {
                        h.render()
                    }
                })
            }
        }
        return r
    };
    r.prototype.larryCompleteMenu = function(e) {
        var t = this,
        a = t.config,
        r = y.elemCheck(a.top_menu, "top_menu"),
        i = y.elemCheck(a.left_menu, "left_menu");
        if (i !== "error" && a.top_menu !== false) {
            if (r != "undefined") {
                var n = o(e, "on");
                layui.data("larry_menu", {
                    key: "navHtml",
                    value: n
                });
                r.html(n.top);
                i.html(n.left[0]);
                a.top_menu = r;
                a.left_menu = i
            }
        } else {
            var n = o(e, "off");
            layui.data("larry_menu", {
                key: "navHtml",
                value: n
            });
            i.html(n);
            a.left_menu = i
        }
    };
    r.prototype.on = function(e, t, s) {
        var a = this,
        r = a.config,
        i = y.eventsCheck(e),
        d = t !== undefined ? t: "0";
        if (i.eventName === "click" && i.filter === r.topFilter) {
            r.left_menu.empty();
            r.left_menu.attr("data-group", d);
            r.left_menu.html(layui.data("larry_menu").navHtml.left[d]);
            h.render("nav");
            return "success"
        }
        if (i.eventName === "click" && i.filter === r.leftFilter) {
            var n = r.left_menu.find("li");
            n.each(function() {
                var l = u(this),
                e = l.find("dl"),
                t = l.find(".grandson");
                if (r.spreadOne) {
                    l.on("click",
                    function() {
                        if (l.hasClass("larryms-nav-itemed")) {
                            l.siblings().removeClass("larryms-nav-itemed")
                        }
                    })
                }
                if (e.length > 0) {
                    e.children("dd").each(function() {
                        var l = u(this);
                        u(this).on("click",
                        function() {
                            if (!l.hasClass("grandson")) {
                                var e = u(this).children("a"),
                                t = e.data("id"),
                                a = e.data("url"),
                                r = e.children("i:first").data("font"),
                                i = e.children("i:first").data("icon"),
                                n = e.children("cite").text(),
                                o = {
                                    elem: e,
                                    field: {
                                        id: t,
                                        href: a,
                                        font: r,
                                        icon: i,
                                        title: n,
                                        group: d,
                                        addType: "nav"
                                    }
                                };
                                s(o)
                            }
                        })
                    })
                } else {
                    l.on("click",
                    function() {
                        var e = l.children("a"),
                        t = e.data("id"),
                        a = e.data("url"),
                        r = e.children("i:first").data("font"),
                        i = e.children("i:first").data("icon"),
                        n = e.children("cite").text(),
                        o = {
                            elem: e,
                            field: {
                                id: t,
                                href: a,
                                font: r,
                                icon: i,
                                title: n,
                                group: d,
                                addType: "nav"
                            }
                        };
                        s(o)
                    })
                }
            })
        }
    };
    r.prototype.tabInit = function() {
        var e = this,
        t = e.config;
        $container = y.elemCheck(t.tab_elem, "tab_elem");
        t.tab_elem = $container;
        b.titleBox = $container.children("#larryms_title").children("ul.larryms-tab-title");
        b.contentBox = $container.children(".larryms-tab-content");
        b.tabFilter = $container.attr("lay-filter");
        b.tabCtrBox = $container.find("#buttonRCtrl");
        return e
    };
    r.prototype.tabSet = function(e) {
        var t = this,
        a = ["tab_elem", "tabFilter", "tabSession", "closed", "tabMax", "autoRefresh", "tabShow", "pageEffect", "isPageEffect"];
        var r = y.configFilter(e, a);
        u.extend(t.config, r);
        return t
    };
    r.prototype.exists = function(l, s, d, f) {
        var p = -1,
        e = b.titleBox === undefined ? this.tabInit() : this;
        b.titleBox.find("li").each(function(e, t) {
            var a = u(this).children("cite"),
            r = u(this).data("id"),
            i = u(this).attr("id"),
            n = u(this).data("url"),
            o = u(this).attr("lay-id");
            if (y.typeFn.isString(s)) {
                s = s.indexOf("larry-") !== -1 ? s: "larry-" + s
            } else {
                s = "larry-" + s
            }
            if (d !== undefined) {
                if (s !== undefined) {
                    if (s === r) {
                        if (f = "iframe") {
                            if (a.text() === l && d !== n) {
                                p = -2;
                                return false
                            }
                        }
                        if (a.text() === l) {
                            p = e;
                            return false
                        } else if (d === n && (a.text().indexOf(l) !== -1 || l.indexOf(a.text()) !== -1)) {
                            p = e;
                            return false
                        }
                    } else {
                        if (r === "larryms_home") {
                            if (a.text() === l) {
                                p = 0;
                                return false
                            }
                        } else {
                            if (a.text() === l && d === n) {
                                p = e;
                                return false
                            } else if (d === n && (a.text().indexOf(l) !== -1 || l.indexOf(a.text()) !== -1)) {
                                p = e;
                                return false
                            }
                        }
                    }
                } else {
                    if (a.text() === l && d === n) {
                        p = e;
                        return false
                    }
                }
            } else {
                if (s === r && a.text() === l) {
                    p = e;
                    return false
                }
            }
        });
        return p
    };
    r.prototype.getCurrentTabId = function() {
        var e = this,
        t = e.config;
        return u(t.tab_elem).find("ul.larryms-tab-title").children("li.layui-this").attr("lay-id")
    };
    r.prototype.getCurrentGroup = function() {
        var e = this,
        t = e.config;
        return u(t.top_menu).children("li.larryms-this").children("a").data("group")
    };
    r.prototype.getTabId = function(n, o, l) {
        var s = -1,
        e = b.titleBox === undefined ? this.tabInit() : this;
        b.titleBox.find("li").each(function(e, t) {
            var a = u(this).data("id"),
            r = u(this).data("url"),
            i = u(this).children("cite");
            if (l !== undefined) {
                if (o !== undefined) {
                    if (a === o) {
                        if (i.text() === n) {
                            s = u(this).attr("lay-id");
                            return false
                        } else if (i.text().indexOf(n) !== -1 || n.indexOf(i.text()) !== -1) {
                            s = u(this).attr("lay-id");
                            return false
                        }
                    } else {
                        if (a === "larryms_home") {
                            if (i.text() === n) {
                                s = 0;
                                return false
                            } else if (l === r && (i.text().indexOf(n) !== -1 || n.indexOf(i.text()) !== -1)) {
                                s = 0;
                                return false
                            }
                        }
                    }
                } else {
                    if (o === a && i.text() === n) {
                        s = u(this).attr("lay-id");
                        return false
                    }
                }
            }
        });
        return s
    };
    r.prototype.tabAdd = function(r) {
        var e = this,
        n = e.config,
        t = "",
        a = "",
        o = r.addType === undefined ? "nav": r.addType;
        if (y.typeFn.isString(r.id)) {
            r.id = r.id.indexOf("larry-") !== -1 ? r.id: "larry-" + r.id
        } else {
            r.id = "larry-" + r.id
        }
        var l = e.exists(r.title, r.id, r.href, o);
        if (l === -1) {
            if (n.tabMax !== "undefined") {
                var s = b.titleBox.children("li").length,
                d = n.tabMax.tipMsg || "为了保障系统流畅运行，当前默认只允许同时打开：" + n.tabMax + "个选项卡，可先关闭已打开的选项卡再继续浏览或请设置允许新增选项卡的最大个数";
                if (typeof n.tabMax === "number") {
                    if (s === n.tabMax) {
                        return y.error(d, y.tit[1], 2)
                    }
                }
                if (typeof n.tabMax === "object" || typeof n.tabMax === "string") {
                    if (s === n.tabMx.max) {
                        return y.error(d, y.tit[1], 2)
                    }
                }
            }
            if (!n.tabSession) {
                v++
            } else {
                e.session(function(e) {
                    var t = JSON.parse(e.getItem("tabMenu"));
                    if (t) {
                        var a = new Array;
                        for (i = 0; i < t.length; i++) {
                            a[i] = t[i]["id"]
                        }
                        v = Math.max.apply(null, a);
                        v++
                    } else {
                        v++
                    }
                })
            }
            if (r.font !== undefined) {
                if (r.icon !== undefined) {
                    a += '<i class="' + r.font + " " + r.icon + '" data-icon="' + r.icon + '"></i>'
                }
            } else {
                a += '<i class="larry-icon ' + r.icon + '" data-icon="' + r.icon + '"></i>'
            }
            a += "<cite>" + r.title + "</cite>";
            var f;
            if (o === "nav") {
                f = "nav";
                c()
            } else {
                if (e.getNavTab(r.id, r.group)) {
                    f = "nav";
                    c()
                } else {
                    if (r.group === "larry-temp") {
                        var p = e.getCurrentGroup();
                        r.group = p;
                        if (r.id.indexOf("undefined") !== -1) {
                            r.id = "larry-temp-" + v
                        }
                        f = "navNone";
                        u()
                    }
                }
            }
            function c() {
                if (n.closed) {
                    a += '<i class="layui-icon layui-unselect layui-tab-close" data-id="' + v + '">&#x1006;</i>'
                }
                t = '<iframe src="' + r.href + '" id="ifr' + v + '" data-group="' + r.group + '" data-id="' + r.id + '" lay-id="' + v + '" name="ifr_' + v + '" class="larryms-iframe"></iframe>';
                h.tabAdd(b.tabFilter, {
                    title: a,
                    content: t,
                    id: v,
                    larryID: r.id,
                    url: r.href,
                    group: r.group,
                    flag: "nav"
                })
            }
            function u() {
                if (n.closed) {
                    a += '<i class="layui-icon layui-unselect layui-tab-close" data-id="' + r.id + '">&#x1006;</i>'
                }
                t = '<iframe src="' + r.href + '" id="ifr' + v + '" data-group="' + r.group + '" data-id="' + r.id + '" lay-id="' + v + '" name="ifr_' + v + '" class="larryms-iframe"></iframe>';
                h.tabAdd(b.tabFilter, {
                    title: a,
                    content: t,
                    id: v,
                    larryID: r.id,
                    url: r.href,
                    group: r.group,
                    flag: "navNone"
                })
            }
            e.tabChange(v, "off", "navNone", true);
            e.pageEffect(v, n.pageEffect);
            if (n.tabSession) {
                e.session(function(e) {
                    var t = JSON.parse(e.getItem("tabMenu")) || [];
                    var a = {
                        title: r.title,
                        href: r.href,
                        font: r.font,
                        icon: r.icon,
                        closed: n.closed,
                        group: r.group,
                        id: v,
                        larryID: r.id,
                        addType: f
                    };
                    t.push(a);
                    e.setItem("tabMenu", JSON.stringify(t));
                    e.setItem("currentTabMenu", JSON.stringify(a))
                })
            }
        } else if (l == -2) {
            var g = e.getTabId(r.title, r.id, r.href),
            m = b.contentBox.find("iframe[lay-id='" + g + "']");
            m.attr("src", r.href);
            if (e.getNavTab(r.id, r.group)) {
                e.tabChange(g)
            } else {
                e.tabChange(g)
            }
            e.pageEffect(v, n.pageEffect)
        } else {
            var g = e.getTabId(r.title, r.id, r.href);
            if (e.getNavTab(r.id, r.group)) {
                e.tabChange(g)
            } else {
                e.tabChange(g)
            }
            e.pageEffect(v, n.pageEffect)
        }
    };
    r.prototype.getNavTab = function(i, e) {
        var t = this,
        a = u(t.config.top_menu),
        n = false;
        if (y.typeFn.isString(i)) {
            i = i.indexOf("larry-") !== -1 ? i: "larry-" + i
        } else {
            i = "larry-" + i
        }
        if (e < a.children("li").length) {
            a.children("li").eq(e).click()
        }
        var r = u(t.config.left_menu),
        o = r.find("a");
        u.each(o,
        function(e, t) {
            var a = u(t).data("id"),
            r = u(".larryms-nav-tree");
            if (a !== undefined && a === i) {
                r.find(".larryms-this").removeClass("larryms-this");
                r.find(".larryms-nav-itemed").removeClass("larryms-nav-itemed");
                r.find(".grandsoned").removeClass("grandsoned");
                if (u(t).parents("dd").hasClass("grandson")) {
                    u(t).parents("li").addClass("larryms-nav-itemed");
                    u(t).parents("dd.grandson").addClass("grandsoned");
                    u(t).parent("dd").addClass("larryms-this")
                } else if (!u(t).parents("dd").hasClass("grandson") && u(t).parent("dd").length) {
                    u(t).parents("li").addClass("larryms-nav-itemed");
                    u(t).parent("dd").addClass("larryms-this")
                } else {
                    u(t).parent("li").addClass("larryms-this")
                }
                n = true;
                return false
            }
        });
        return n
    };
    r.prototype.tabChange = function(i, e, t, a) {
        var r = this,
        e = e || "off",
        t = t || "navNone",
        a = a || false;
        if (r.config.tabSession) {
            r.session(function(e) {
                if (e.getItem("currentTabMenu") !== "undefined") {
                    var t = JSON.parse(e.getItem("currentTabMenu"));
                    if (!t) return false
                } else {
                    return false
                }
                if (t.id != i) {
                    var a = JSON.parse(e.getItem("tabMenu"));
                    for (var r = 0; r < a.length; r++) {
                        if (a[r].id == i) {
                            e.setItem("currentTabMenu", JSON.stringify(a[r]));
                            break
                        }
                    }
                }
            })
        }
        if (e === "on") {
            if (t === "nav") {
                var n = u(r.config.top_menu),
                o = u('#larry_tab_title li[lay-id="' + i + '"]'),
                l = o.data("id"),
                s = o.data("group");
                if (s < n.children("li").length) {
                    n.children("li").eq(s).click()
                }
                var d = u(r.config.left_menu),
                f = d.find("a");
                if (l !== "larryms_home") {
                    u.each(f,
                    function(e, t) {
                        var a = u(t).data("id"),
                        r = u(".larryms-nav-tree");
                        if (a !== undefined && a === l) {
                            r.find(".larryms-this").removeClass("larryms-this");
                            r.find(".larryms-nav-itemed").removeClass("larryms-nav-itemed");
                            r.find(".grandsoned").removeClass("grandsoned");
                            if (u(t).parents("dd").hasClass("grandson")) {
                                u(t).parents("li").addClass("larryms-nav-itemed");
                                u(t).parents("dd.grandson").addClass("grandsoned");
                                u(t).parent("dd").addClass("larryms-this")
                            } else if (!u(t).parents("dd").hasClass("grandson") && u(t).parent("dd").length) {
                                u(t).parents("li").addClass("larryms-nav-itemed");
                                u(t).parent("dd").addClass("larryms-this")
                            } else {
                                u(t).parent("li").addClass("larryms-this")
                            }
                            e = f.length - 1;
                            return false
                        }
                    })
                }
            } else {}
        }
        h.tabChange(r.config.tabFilter, i, t).render();
        if (r.config.autoRefresh) {
            if (a !== true) {
                r.autoRefresh()
            }
        }
        r.tabAuto()
    };
    r.prototype.tabChangeBefore = function(e, t) {
        var a = this,
        t = t || Math.ceil(Math.random() * 67),
        r = b.contentBox.children(".layui-show")
    };
    r.prototype.autoRefresh = function() {
        var e = this;
        if (e.config.autoRefresh) {
            if (u("#homePage").children("iframe").length !== 0) {
                var t = b.contentBox.children(".layui-show").children("iframe");
                t.attr("src", t.attr("src"))
            }
        }
    };
    r.prototype.pageEffect = function(e, t) {
        var a = this;
        if (a.config.isPageEffect == true) {
            var t = t || Math.ceil(Math.random() * 67),
            r = b.contentBox.children(".layui-show");
            var i = s(t);
            r.addClass(i.inClass)
        }
    };
    r.prototype.tabDelete = function(i) {
        var e = this;
        if (e.config.tabSession) {
            e.session(function(e) {
                var t = JSON.parse(e.getItem("tabMenu"));
                for (var a = 0; a < t.length; a++) {
                    if (t[a].id == i) {
                        t.splice(a, 1)
                    }
                }
                e.setItem("tabMenu", JSON.stringify(t));
                var r = JSON.parse(e.getItem("currentTabMenu"));
                if (r.id == i) {
                    e.setItem("currentTabMenu", JSON.stringify(t.pop()))
                }
            })
        }
        var t = h.tabDelete(e.config.tabFilter, i).render();
        e.tabChange(t.larryElem.LarryLayID, "on");
        e.tabAuto()
    };
    r.prototype.tabAuto = function(c) {
        var e = this;
        u("#larryms_title").each(function() {
            var l = u(this),
            s = l.children(".larryms-tab-title"),
            d = s.find(".layui-this"),
            e = s.children("#larryms_home"),
            f = l.find(".larryms-btn-default"),
            p = 0;
            s.find("li").each(function(e, t) {
                p += parseInt(u(t).outerWidth(true))
            });
            if (!s.find("li")[0]) return;
            u(window).off("resize").on("resize",
            function() {
                var t = parseInt(l.outerWidth(true) - 264),
                a = parseInt(d.outerWidth(true)),
                e = parseInt(d.position().left + 1),
                r = parseInt(s.css("marginLeft")),
                i = e + r,
                n = t - p;
                if (p > t) {
                    f.removeClass("hide");
                    l.addClass("larryms-tab-auto");
                    if (r + e <= 0) {
                        n = 0 - e
                    } else {
                        var o = t + Math.abs(r) - e - a;
                        if (o <= 0) {
                            n = t - e - a
                        } else {
                            n = t - e - a;
                            if (c == 0) {
                                if (n > 0) {
                                    n = 0
                                }
                            } else {
                                if (n > 0) {
                                    n = 0
                                }
                            }
                        }
                    }
                    s.css({
                        marginLeft: n
                    })
                } else {
                    f.addClass("hide");
                    l.removeClass("larryms-tab-auto");
                    s.css({
                        marginLeft: 0
                    })
                }
                u(".larryms-btn-default").off("click").on("click",
                function() {
                    if (p > t) {
                        var e = parseInt(s.css("marginLeft"));
                        if (u(this).attr("id") === "goLeft") {
                            if (Math.abs(e) !== 0) {
                                if (e + t < 0) {
                                    s.css({
                                        marginLeft: e + t
                                    })
                                } else {
                                    s.css({
                                        marginLeft: 0
                                    })
                                }
                            } else {
                                g.tips("已滚动到最左侧了", u(this), {
                                    tips: [1, "#FF5722"]
                                })
                            }
                        }
                        if (u(this).attr("id") === "goRight") {
                            if (Math.abs(e) !== p - t) {
                                if (Math.abs(e) + t >= p - a) {
                                    s.css({
                                        marginLeft: t - p
                                    })
                                } else {
                                    s.css({
                                        marginLeft: e - t / 2
                                    })
                                }
                            } else {
                                g.tips("已滚动到最右侧了", u(this), {
                                    tips: [1, "#FF5722"]
                                })
                            }
                        }
                    }
                })
            }).resize()
        })
    };
    r.prototype.recoveryTab = function(e) {
        var t = this,
        a = t.config;
        var r = e.addType === undefined ? "nav": e.addType;
        if (y.typeFn.isString(e.LarryID)) {
            e.LarryID = e.LarryID.indexOf("larry") !== -1 ? e.LarryID: "larry-" + e.LarryID
        } else {
            e.LarryID = "larry-" + e.LarryID
        }
        var i = t.exists(e.title, e.LarryID, e.href);
        if (i === -1) {
            var n = "";
            if (e.font !== undefined) {
                if (e.icon !== undefined) {
                    n += '<i class="' + e.font + " " + e.icon + '" data-icon="' + e.icon + '"></i>'
                }
            } else {
                n += '<i class="larry-icon ' + e.icon + '" data-icon="' + e.icon + '"></i>'
            }
            n += "<cite>" + e.title + "</cite>";
            if (a.closed) {
                n += '<i class="layui-icon layui-unselect layui-tab-close" data-id="' + e.id + '">&#x1006;</i>'
            }
            var o = '<iframe src="' + e.href + '" id="ifr' + e.id + '" data-group="' + e.group + '" data-id="' + e.LarryID + '" lay-id="' + e.id + '" name="ifr_' + e.id + '" class="larryms-iframe"></iframe>';
            h.tabAdd(b.tabFilter, {
                title: n,
                content: o,
                id: e.id,
                larryID: e.larryID,
                url: e.href,
                group: e.group,
                font: e.font,
                icon: e.icon,
                closed: e.closed,
                flag: r
            })
        } else {}
    };
    r.prototype.session = function(e) {
        if (!window.sessionStorage) {
            return false
        }
        e(window.sessionStorage)
    };
    r.prototype.tabCtrl = function(e) {
        var a = this,
        t = a.config,
        r = a.getCurrentTabId();
        switch (e) {
        case "positionCurrent":
            var i = u(t.tab_elem).find("ul.layui-tab-title").children("li.layui-this"),
            n = u(t.tab_elem).find('iframe[lay-id="' + r + '"]').attr("src"),
            o = i.children("i:first").data("font"),
            l = i.children("i:first").data("icon"),
            s = i.data("group"),
            d = i.data("id"),
            f = {
                title: i.children("cite").text(),
                href: n,
                font: o,
                icon: l,
                group: s,
                id: d
            };
            a.tabAdd(f);
            a.tabAuto(0);
            break;
        case "closeCurrent":
            if (r > 0) {
                a.tabDelete(r)
            } else {
                y.error("默认首页不能关闭的哦！", y.tit[0], 2)
            }
            break;
        case "closeOther":
            var p = u(t.tab_elem).find("ul.layui-tab-title").children("li"),
            c = p.length;
            if (c > 2) {
                p.each(function() {
                    var e = u(this),
                    t = e.attr("lay-id");
                    if (t !== r && t !== undefined && t !== "0") {
                        a.tabDelete(t)
                    }
                })
            } else if (c == 2) {
                y.error("【默认首页】不能关闭，当前暂无其他可关闭选项卡！", y.tit[0], 2)
            } else {
                y.error("当前暂无其他可关闭选项卡！", y.tit[0], 2)
            }
            break;
        case "closeAll":
            var p = u(t.tab_elem).find("ul.layui-tab-title").children("li"),
            c = p.length;
            if (c > 1) {
                p.each(function() {
                    var e = u(this),
                    t = e.attr("lay-id");
                    if (t > 0) {
                        a.tabDelete(t)
                    }
                })
            } else {
                y.error("当前暂无其他可关闭选项卡！", y.tit[0], 2)
            }
            break;
        case "refreshAdmin":
            y.confirm("您确定要重新加载系统吗！",
            function() {
                location.reload()
            },
            function() {
                return
            });
            break
        }
    };
    r.prototype.render = function() {
        var o = this,
        a = o.config,
        e = a.top_menu !== undefined ? a.top_menu: "#larryms_top_menu",
        r = a.left_menu !== undefined ? a.left_menu: "#larryms_left_menu";
        if (a.top_menu !== undefined) {
            u(e).on("click", "li",
            function() {
                var e = u(this),
                t = e.children("a").data("group");
                d.on("click(" + a.topFilter + ")", t);
                u(r).off("mouseenter", l.larryMenuClick).one("mouseenter", l.larryMenuClick)
            })
        }
        u(r).one("mouseenter", l.larryMenuClick);
        u("#larry_tab").on("click", "#larry_tab_title li",
        function() {
            var e = u(this).attr("lay-id"),
            t = u(this).data("flag");
            o.tabChange(e, "on", t)
        });
        var t = layui.data("larryms").systemSet === undefined ? true: layui.data("larryms").systemSet.tabCache;
        if (!t) {
            a.tabSession = t;
            sessionStorage.removeItem("tabMenu");
            sessionStorage.removeItem("currentTabMenu")
        }
        var i = layui.data("larryms").systemSet === undefined ? false: layui.data("larryms").systemSet.tabCache;
        if (i) {
            o.session(function(e) {
                if (e.getItem("tabMenu")) {
                    var t = JSON.parse(e.getItem("tabMenu"));
                    u.each(t,
                    function(e, t) {
                        o.recoveryTab(t)
                    });
                    if (e.getItem("currentTabMenu") !== "undefined") {
                        var a = JSON.parse(e.getItem("currentTabMenu"))
                    } else {
                        var a = {
                            id: "0"
                        }
                    }
                    if (a) {
                        o.tabChange(a.id, "on");
                        o.tabAuto(1)
                    } else {
                        o.tabChange(t[0].id, "on");
                        o.tabAuto(1)
                    }
                    v = t.length
                } else {
                    var r = u("#larry_tab_title li").eq(0);
                    if (r.length) {
                        var i = JSON.parse(e.getItem("tabMenu")) || [];
                        var n = {
                            font: r.children("i").data("font"),
                            icon: r.children("i").data("icon"),
                            title: r.find("cite").text() == undefined ? r.find("cite").text() : "后台首页",
                            href: r.data("url"),
                            id: r.attr("lay-id"),
                            LarryID: r.data("id"),
                            closed: false
                        };
                        i.push(n);
                        e.setItem("tabMenu", JSON.stringify(i));
                        e.setItem("currentTabMenu", JSON.stringify(n))
                    }
                }
            })
        }
        u("#larry_tab").on("click", "#larry_tab_title li i.layui-tab-close",
        function() {
            if (a.closed) {
                o.tabDelete(u(this).parent("li").attr("lay-id"))
            }
        });
        n()
    };
    function o(e, t) {
        if (t == "on") {
            var a = {
                top: "",
                left: []
            };
            for (var r = 0; r < e.length; r++) {
                if (r == 0) {
                    a.top += '<li class="larryms-nav-item larryms-this">'
                } else {
                    a.top += '<li class="larryms-nav-item">'
                }
                a.top += '<a data-group="' + r + '" data-id="larry-' + e[r].id + '">';
                a.top += '<i class="' + e[r].font + " " + e[r].icon + '" data-icon="' + e[r].icon + '" data-font="' + e[r].font + '"></i>';
                a.top += "<cite>" + e[r].title + "</cite>";
                a.top += "</a>";
                a.top += "</li>";
                if (e[r].children !== undefined && e[r].children !== null && e[r].children.length > 0) {
                    a.left[r] = "";
                    var i = "";
                    for (var n = 0; n < e[r].children.length; n++) {
                        i = e[r].children[n];
                        if (r == 0 && n == 0) {
                            if (i.children !== undefined && i.children !== null && i.children.length > 0) {
                                a.left[r] += '<li class="larryms-nav-item larryms-nav-itemed">'
                            } else {
                                a.left[r] += '<li class="larryms-nav-item larryms-this">'
                            }
                        } else if (i.spread && n != 0) {
                            a.left[r] += '<li class="larryms-nav-item larryms-nav-itemed">'
                        } else {
                            a.left[r] += '<li class="larryms-nav-item">'
                        }
                        if (i.children !== undefined && i.children !== null && i.children.length > 0) {
                            a.left[r] += '<a data-group="' + r + '" data-id="larry-' + i.id + '">';
                            if (i.icon !== undefined && i.icon !== "") {
                                if (i.font !== undefined && i.font !== "") {
                                    a.left[r] += '<i class="' + i.font + " " + i.icon + '" data-icon="' + i.icon + '" data-font="' + i.font + '"></i>'
                                } else {
                                    a.left[r] += '<i class="larry-icon" data-icon="' + i.icon + '" data-font="larry-icon"></i>'
                                }
                            }
                            a.left[r] += "<cite>" + i.title + "</cite>";
                            a.left[r] += '<span class="larryms-nav-more"></span>';
                            a.left[r] += "</a>";
                            a.left[r] += '<dl class="larryms-nav-child">';
                            var o = "";
                            for (d = 0; d < i.children.length; d++) {
                                o = i.children[d];
                                if (o.children !== undefined && o.children !== null && o.children.length > 0) {
                                    a.left[r] += '<dd class="grandson">';
                                    a.left[r] += '<a data-group="' + r + '" data-id="larry-' + o.id + '">';
                                    if (o.icon !== undefined && o.icon !== "") {
                                        if (o.font !== undefined && o.font !== "") {
                                            a.left[r] += '<i class="' + o.font + " " + o.icon + '" data-icon="' + o.icon + '" data-font="' + o.font + '"></i>'
                                        } else {
                                            a.left[r] += '<i class="larry-icon" data-icon="' + o.icon + '" data-font="larry-icon"></i>'
                                        }
                                    }
                                    a.left[r] += "<cite>" + o.title + "</cite>";
                                    a.left[r] += '<span class="larryms-nav-more"></span>';
                                    a.left[r] += "</a>";
                                    a.left[r] += '<dl class="larryms-nav-child">';
                                    var l = "";
                                    for (var s = 0; s < o.children.length; s++) {
                                        l = o.children[s];
                                        a.left[r] += "<dd>";
                                        a.left[r] += l.url !== undefined && l.url !== "" ? '<a data-group="' + r + '" data-url="' + l.url + '" data-id="larry-' + l.id + '">': '<a data-group="' + r + '" data-id="larry-' + l.id + '">';
                                        if (l.icon !== undefined && l.icon !== "") {
                                            if (l.font !== undefined && l.font !== "") {
                                                a.left[r] += '<i class="' + l.font + " " + l.icon + '" data-icon="' + l.icon + '" data-font="' + l.font + '"></i>'
                                            } else {
                                                a.left[r] += '<i class="larry-icon" data-icon="' + l.icon + '" data-font="larry-icon"></i>'
                                            }
                                        }
                                        a.left[r] += "<cite>" + l.title + "</cite>";
                                        a.left[r] += "</a>"
                                    }
                                    a.left[r] += "</dl>"
                                } else {
                                    a.left[r] += "<dd>";
                                    a.left[r] += o.url !== undefined && o.url !== "" ? '<a data-group="' + r + '" data-url="' + o.url + '" data-id="larry-' + o.id + '">': '<a data-group="' + r + '" data-id="larry-' + o.id + '">';
                                    if (o.icon !== undefined && o.icon !== "") {
                                        if (o.font !== undefined && o.font !== "") {
                                            a.left[r] += '<i class="' + o.font + " " + o.icon + '" data-icon="' + o.icon + '" data-font="' + o.font + '"></i>'
                                        } else {
                                            a.left[r] += '<i class="larry-icon" data-icon="' + o.icon + '" data-font="larry-icon"></i>'
                                        }
                                    }
                                    a.left[r] += "<cite>" + o.title + "</cite>";
                                    a.left[r] += "</a>"
                                }
                                a.left[r] += "</dd>"
                            }
                            a.left[r] += "</dl>"
                        } else {
                            a.left[r] += i.url !== undefined && i.url !== "" ? '<a data-group="' + r + '" data-url="' + i.url + '" data-id="larry-' + i.id + '">': '<a data-group="' + r + '" data-id=larry-' + i.id + '">';
                            if (i.icon !== undefined && i.icon !== "") {
                                if (i.font !== undefined && i.font !== "") {
                                    a.left[r] += '<i class="' + i.font + " " + i.icon + '" data-icon="' + i.icon + '" data-font="' + i.font + '"></i>'
                                } else {
                                    a.left[r] += '<i class="larry-icon" data-icon="' + i.icon + '" data-font="larry-icon"></i>'
                                }
                            }
                            a.left[r] += "<cite>" + i.title + "</cite>";
                            a.left[r] += "</a>"
                        }
                        a.left[r] += "</li>"
                    }
                }
            }
        } else {
            var a = "";
            for (var r = 0; r < e.length; r++) {
                if (r == 0) {
                    a += '<li class="larryms-nav-item">'
                } else {
                    a += '<li class="larryms-nav-item">'
                }
                if (e[r].children !== undefined && e[r].children !== null && e[r].children.length > 0) {
                    a += '<a data-id="larry-' + e[r].id + '">';
                    if (e[r].icon !== undefined && e[r].icon !== null) {
                        if (e[r].font !== undefined && e[r].font !== null) {
                            a += '<i class="' + e[r].font + " " + e[r].icon + '" data-icon="' + e[r].icon + '" data-font="' + e[r].font + '"></i>'
                        } else {
                            a += '<i class="larry-icon" data-icon="' + e[r].icon + '" data-font="larry-icon"></i>'
                        }
                    }
                    a += "<cite>" + e[r].title + "</cite>";
                    a += '<span class="larryms-nav-more"></span>';
                    a += "</a>";
                    a += '<dl class="larryms-nav-child">';
                    var i = "";
                    for (var n = 0; n < e[r].children.length; n++) {
                        i = e[r].children[n];
                        if (i.children !== undefined && i.children !== null && i.children.length > 0) {
                            a += '<dd class="grandson">';
                            a += '<a data-id="larry-' + i.id + '">';
                            if (i.icon !== undefined && i.icon !== "") {
                                if (i.font !== undefined && i.font !== "") {
                                    a += '<i class="' + i.font + " " + i.icon + '" data-icon="' + i.icon + '" data-font="' + i.font + '"></i>'
                                } else {
                                    a += '<i class="larry-icon" data-icon="' + i.icon + '" data-font="larry-icon"></i>'
                                }
                            }
                            a += "<cite>" + i.title + "</cite>";
                            a += '<span class="larryms-nav-more"></span>';
                            a += "</a>";
                            a += '<dl class="larryms-nav-child">';
                            var o = "";
                            for (var d = 0; d < i.children.length; d++) {
                                o = i.children[d];
                                a += "<dd>";
                                a += o.url !== undefined && o.url !== "" ? '<a data-url="' + o.url + '" data-id="larry-' + o.id + '">': '<a data-id="larry-' + o.id + '">';
                                if (o.icon !== undefined && o.icon !== "") {
                                    if (o.font !== undefined && o.font !== "") {
                                        a += '<i class="' + o.font + " " + o.icon + '" data-icon="' + o.icon + '" data-font="' + o.font + '"></i>'
                                    } else {
                                        a += '<i class="larry-icon" data-icon="' + o.icon + '" data-font="larry-icon"></i>'
                                    }
                                }
                                a += "<cite>" + o.title + "</cite>";
                                a += "</a>";
                                a += "</dd>"
                            }
                            a += "</dl>"
                        } else {
                            a += "<dd>";
                            a += i.url !== undefined && i.url !== "" ? '<a data-url="' + i.url + '" data-id="larry-' + i.id + '">': '<a data-id="larry-' + i.id + '">';
                            if (i.icon !== undefined && i.icon !== "") {
                                if (i.font !== undefined && i.font !== "") {
                                    a += '<i class="' + i.font + " " + i.icon + '" data-icon="' + i.icon + '" data-font="' + i.font + '"></i>'
                                } else {
                                    a += '<i class="larry-icon" data-icon="' + i.icon + '" data-font="larry-icon"></i>'
                                }
                            }
                            a += "<cite>" + i.title + "</cite>";
                            a += "</a>"
                        }
                        a += "</dd>"
                    }
                    a += "</dl>"
                } else {
                    a += e[r].url !== undefined && e[r].url !== "" ? '<a data-url="' + e[r].url + '" data-id="larry-' + e[r].id + '">': '<a data-id="larry-' + e[r].id + '">';
                    if (e[r].icon !== undefined && e[r].icon !== "") {
                        if (e[r].font !== undefined && e[r].font !== "") {
                            a += '<i class="' + e[r].font + " " + e[r].icon + '" data-icon="' + e[r].icon + '" data-font="' + e[r].font + '"></i>'
                        } else {
                            a += '<i class="larry-icon" data-icon="' + e[r].icon + '" data-font="larry-icon"></i>'
                        }
                    }
                    a += "<cite>" + e[r].title + "</cite>";
                    a += "</a>"
                }
                a += "</li>"
            }
        }
        return a
    }
    function s(e) {
        var t = {},
        a = "",
        r = "";
        switch (e) {
        case 1:
            a = "pt-page-moveToLeft";
            r = "pt-page-moveFromRight";
            break;
        case 2:
            a = "pt-page-moveToRight";
            r = "pt-page-moveFromLeft";
            break;
        case 3:
            a = "pt-page-moveToTop";
            r = "pt-page-moveFromBottom";
            break;
        case 4:
            a = "pt-page-moveToBottom";
            r = "pt-page-moveFromTop";
            break;
        case 5:
            a = "pt-page-fade";
            r = "pt-page-moveFromRight pt-page-ontop";
            break;
        case 6:
            a = "pt-page-fade";
            r = "pt-page-moveFromLeft pt-page-ontop";
            break;
        case 7:
            a = "pt-page-fade";
            r = "pt-page-moveFromBottom pt-page-ontop";
            break;
        case 8:
            a = "pt-page-fade";
            r = "pt-page-moveFromTop pt-page-ontop";
            break;
        case 9:
            a = "pt-page-moveToLeftFade";
            r = "pt-page-moveFromRightFade";
            break;
        case 10:
            a = "pt-page-moveToRightFade";
            r = "pt-page-moveFromLeftFade";
            break;
        case 11:
            a = "pt-page-moveToTopFade";
            r = "pt-page-moveFromBottomFade";
            break;
        case 12:
            a = "pt-page-moveToBottomFade";
            r = "pt-page-moveFromTopFade";
            break;
        case 13:
            a = "pt-page-moveToLeftEasing pt-page-ontop";
            r = "pt-page-moveFromRight";
            break;
        case 14:
            a = "pt-page-moveToRightEasing pt-page-ontop";
            r = "pt-page-moveFromLeft";
            break;
        case 15:
            a = "pt-page-moveToTopEasing pt-page-ontop";
            r = "pt-page-moveFromBottom";
            break;
        case 16:
            a = "pt-page-moveToBottomEasing pt-page-ontop";
            r = "pt-page-moveFromTop";
            break;
        case 17:
            a = "pt-page-scaleDown";
            r = "pt-page-moveFromRight pt-page-ontop";
            break;
        case 18:
            a = "pt-page-scaleDown";
            r = "pt-page-moveFromLeft pt-page-ontop";
            break;
        case 19:
            a = "pt-page-scaleDown";
            r = "pt-page-moveFromBottom pt-page-ontop";
            break;
        case 20:
            a = "pt-page-scaleDown";
            r = "pt-page-moveFromTop pt-page-ontop";
            break;
        case 21:
            a = "pt-page-scaleDown";
            r = "pt-page-scaleUpDown pt-page-delay300";
            break;
        case 22:
            a = "pt-page-scaleDownUp";
            r = "pt-page-scaleUp pt-page-delay300";
            break;
        case 23:
            a = "pt-page-moveToLeft pt-page-ontop";
            r = "pt-page-scaleUp";
            break;
        case 24:
            a = "pt-page-moveToRight pt-page-ontop";
            r = "pt-page-scaleUp";
            break;
        case 25:
            a = "pt-page-moveToTop pt-page-ontop";
            r = "pt-page-scaleUp";
            break;
        case 26:
            a = "pt-page-moveToBottom pt-page-ontop";
            r = "pt-page-scaleUp";
            break;
        case 27:
            a = "pt-page-scaleDownCenter";
            r = "pt-page-scaleUpCenter pt-page-delay400";
            break;
        case 28:
            a = "pt-page-rotateRightSideFirst";
            r = "pt-page-moveFromRight pt-page-delay200 pt-page-ontop";
            break;
        case 29:
            a = "pt-page-rotateLeftSideFirst";
            r = "pt-page-moveFromLeft pt-page-delay200 pt-page-ontop";
            break;
        case 30:
            a = "pt-page-rotateTopSideFirst";
            r = "pt-page-moveFromTop pt-page-delay200 pt-page-ontop";
            break;
        case 31:
            a = "pt-page-rotateBottomSideFirst";
            r = "pt-page-moveFromBottom pt-page-delay200 pt-page-ontop";
            break;
        case 32:
            a = "pt-page-flipOutRight";
            r = "pt-page-flipInLeft pt-page-delay500";
            break;
        case 33:
            a = "pt-page-flipOutLeft";
            r = "pt-page-flipInRight pt-page-delay500";
            break;
        case 34:
            a = "pt-page-flipOutTop";
            r = "pt-page-flipInBottom pt-page-delay500";
            break;
        case 35:
            a = "pt-page-flipOutBottom";
            r = "pt-page-flipInTop pt-page-delay500";
            break;
        case 36:
            a = "pt-page-rotateFall pt-page-ontop";
            r = "pt-page-scaleUp";
            break;
        case 37:
            a = "pt-page-rotateOutNewspaper";
            r = "pt-page-rotateInNewspaper pt-page-delay500";
            break;
        case 38:
            a = "pt-page-rotatePushLeft";
            r = "pt-page-moveFromRight";
            break;
        case 39:
            a = "pt-page-rotatePushRight";
            r = "pt-page-moveFromLeft";
            break;
        case 40:
            a = "pt-page-rotatePushTop";
            r = "pt-page-moveFromBottom";
            break;
        case 41:
            a = "pt-page-rotatePushBottom";
            r = "pt-page-moveFromTop";
            break;
        case 42:
            a = "pt-page-rotatePushLeft";
            r = "pt-page-rotatePullRight pt-page-delay180";
            break;
        case 43:
            a = "pt-page-rotatePushRight";
            r = "pt-page-rotatePullLeft pt-page-delay180";
            break;
        case 44:
            a = "pt-page-rotatePushTop";
            r = "pt-page-rotatePullBottom pt-page-delay180";
            break;
        case 45:
            a = "pt-page-rotatePushBottom";
            r = "pt-page-rotatePullTop pt-page-delay180";
            break;
        case 46:
            a = "pt-page-rotateFoldLeft";
            r = "pt-page-moveFromRightFade";
            break;
        case 47:
            a = "pt-page-rotateFoldRight";
            r = "pt-page-moveFromLeftFade";
            break;
        case 48:
            a = "pt-page-rotateFoldTop";
            r = "pt-page-moveFromBottomFade";
            break;
        case 49:
            a = "pt-page-rotateFoldBottom";
            r = "pt-page-moveFromTopFade";
            break;
        case 50:
            a = "pt-page-moveToRightFade";
            r = "pt-page-rotateUnfoldLeft";
            break;
        case 51:
            a = "pt-page-moveToLeftFade";
            r = "pt-page-rotateUnfoldRight";
            break;
        case 52:
            a = "pt-page-moveToBottomFade";
            r = "pt-page-rotateUnfoldTop";
            break;
        case 53:
            a = "pt-page-moveToTopFade";
            r = "pt-page-rotateUnfoldBottom";
            break;
        case 54:
            a = "pt-page-rotateRoomLeftOut pt-page-ontop";
            r = "pt-page-rotateRoomLeftIn";
            break;
        case 55:
            a = "pt-page-rotateRoomRightOut pt-page-ontop";
            r = "pt-page-rotateRoomRightIn";
            break;
        case 56:
            a = "pt-page-rotateRoomTopOut pt-page-ontop";
            r = "pt-page-rotateRoomTopIn";
            break;
        case 57:
            a = "pt-page-rotateRoomBottomOut pt-page-ontop";
            r = "pt-page-rotateRoomBottomIn";
            break;
        case 58:
            a = "pt-page-rotateCubeLeftOut pt-page-ontop";
            r = "pt-page-rotateCubeLeftIn";
            break;
        case 59:
            a = "pt-page-rotateCubeRightOut pt-page-ontop";
            r = "pt-page-rotateCubeRightIn";
            break;
        case 60:
            a = "pt-page-rotateCubeTopOut pt-page-ontop";
            r = "pt-page-rotateCubeTopIn";
            break;
        case 61:
            a = "pt-page-rotateCubeBottomOut pt-page-ontop";
            r = "pt-page-rotateCubeBottomIn";
            break;
        case 62:
            a = "pt-page-rotateCarouselLeftOut pt-page-ontop";
            r = "pt-page-rotateCarouselLeftIn";
            break;
        case 63:
            a = "pt-page-rotateCarouselRightOut pt-page-ontop";
            r = "pt-page-rotateCarouselRightIn";
            break;
        case 64:
            a = "pt-page-rotateCarouselTopOut pt-page-ontop";
            r = "pt-page-rotateCarouselTopIn";
            break;
        case 65:
            a = "pt-page-rotateCarouselBottomOut pt-page-ontop";
            r = "pt-page-rotateCarouselBottomIn";
            break;
        case 66:
            a = "pt-page-rotateSidesOut";
            r = "pt-page-rotateSidesIn pt-page-delay200";
            break;
        case 67:
            a = "pt-page-rotateSlideOut";
            r = "pt-page-rotateSlideIn";
            break
        }
        t.inClass = r;
        t.outClass = a;
        return t
    }
    var d = new r;
    d.render();
    e(t,
    function(e) {
        return d.set(e)
    })
});