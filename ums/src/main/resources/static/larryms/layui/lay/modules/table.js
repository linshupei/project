layui.define(["laytpl", "laypage", "layer", "form", "util"],
function(e) {
    "use strict";
    var m = layui.$,
    g = layui.laytpl,
    r = layui.laypage,
    b = layui.layer,
    y = layui.form,
    h = (layui.util, layui.hint()),
    f = layui.device(),
    x = {
        config: {
            checkName: "LAY_CHECKED",
            indexName: "LAY_TABLE_INDEX"
        },
        cache: {},
        index: layui.table ? layui.table.index + 1e4: 0,
        set: function(e) {
            var t = this;
            return t.config = m.extend({},
            t.config, e),
            t
        },
        on: function(e, t) {
            return layui.onevent.call(this, p, e, t)
        }
    },
    d = function() {
        var t = this,
        e = t.config,
        i = e.id || e.index;
        return i && (d.config[i] = e),
        {
            reload: function(e) {
                t.reload.call(t, e)
            },
            setColsWidth: function() {
                t.setColsWidth.call(t)
            },
            config: e
        }
    },
    p = "table",
    l = ".layui-table",
    k = "layui-hide",
    s = "layui-none",
    o = "layui-table-view",
    c = ".layui-table-tool",
    u = ".layui-table-box",
    a = ".layui-table-init",
    v = ".layui-table-header",
    C = ".layui-table-body",
    w = ".layui-table-main",
    T = ".layui-table-fixed",
    A = ".layui-table-fixed-l",
    L = ".layui-table-fixed-r",
    S = ".layui-table-total",
    N = ".layui-table-page",
    W = ".layui-table-sort",
    _ = "layui-table-edit",
    E = "layui-table-hover",
    t = function(e) {
        var t = '{{#if(item2.colspan){}} colspan="{{item2.colspan}}"{{#} if(item2.rowspan){}} rowspan="{{item2.rowspan}}"{{#}}}';
        return e = e || {},
        ['<table cellspacing="0" cellpadding="0" border="0" class="layui-table" ', '{{# if(d.data.skin){ }}lay-skin="{{d.data.skin}}"{{# } }} {{# if(d.data.size){ }}lay-size="{{d.data.size}}"{{# } }} {{# if(d.data.even){ }}lay-even{{# } }}>', "<thead>", "{{# layui.each(d.data.cols, function(i1, item1){ }}", "<tr>", "{{# layui.each(item1, function(i2, item2){ }}", '{{# if(item2.fixed && item2.fixed !== "right"){ left = true; } }}', '{{# if(item2.fixed === "right"){ right = true; } }}',
        function() {
            return e.fixed && "right" !== e.fixed ? '{{# if(item2.fixed && item2.fixed !== "right"){ }}': "right" === e.fixed ? '{{# if(item2.fixed === "right"){ }}': ""
        } (), "{{# var isSort = !(item2.colGroup) && item2.sort; }}", '<th data-field="{{ item2.field||i2 }}" data-key="{{d.index}}-{{i1}}-{{i2}}" {{# if( item2.parentKey){ }}data-parentkey="{{ item2.parentKey }}"{{# } }} {{# if(item2.minWidth){ }}data-minwidth="{{item2.minWidth}}"{{# } }} ' + t + ' {{# if(item2.unresize || item2.colGroup){ }}data-unresize="true"{{# } }} class="{{# if(item2.hide){ }}layui-hide{{# } }}{{# if(isSort){ }} layui-unselect{{# } }}{{# if(!item2.field){ }} layui-table-col-special{{# } }}">', '<div class="layui-table-cell laytable-cell-', "{{# if(item2.colGroup){ }}", "group", "{{# } else { }}", "{{d.index}}-{{i1}}-{{i2}}", '{{# if(item2.type !== "normal"){ }}', " laytable-cell-{{ item2.type }}", "{{# } }}", "{{# } }}", '" {{#if(item2.align){}}align="{{item2.align}}"{{#}}}>', '{{# if(item2.type === "checkbox"){ }}', '<input type="checkbox" name="layTableCheckbox" lay-skin="primary" lay-filter="layTableAllChoose" {{# if(item2[d.data.checkName]){ }}checked{{# }; }}>', "{{# } else { }}", '<span>{{item2.title||""}}</span>', "{{# if(isSort){ }}", '<span class="layui-table-sort layui-inline"><i class="layui-edge layui-table-sort-asc" title="升序"></i><i class="layui-edge layui-table-sort-desc" title="降序"></i></span>', "{{# } }}", "{{# } }}", "</div>", "</th>", e.fixed ? "{{# }; }}": "", "{{# }); }}", "</tr>", "{{# }); }}", "</thead>", "</table>"].join("")
    },
    i = ['<table cellspacing="0" cellpadding="0" border="0" class="layui-table" ', '{{# if(d.data.skin){ }}lay-skin="{{d.data.skin}}"{{# } }} {{# if(d.data.size){ }}lay-size="{{d.data.size}}"{{# } }} {{# if(d.data.even){ }}lay-even{{# } }}>', "<tbody></tbody>", "</table>"].join(""),
    R = ['<div class="layui-form layui-border-box {{d.VIEW_CLASS}}" lay-filter="LAY-table-{{d.index}}" style="{{# if(d.data.width){ }}width:{{d.data.width}}px;{{# } }} {{# if(d.data.height){ }}height:{{d.data.height}}px;{{# } }}">', "{{# if(d.data.toolbar){ }}", '<div class="layui-table-tool">', '<div class="layui-table-tool-temp"></div>', '<div class="layui-table-tool-self"></div>', "</div>", "{{# } }}", '<div class="layui-table-box">', "{{# if(d.loading){ }}", '<div class="layui-table-init" style="background-color: #fff;">', '<i class="layui-icon layui-icon-loading layui-icon"></i>', "</div>", "{{# } }}", "{{# var left, right; }}", '<div class="layui-table-header">', t(), "</div>", '<div class="layui-table-body layui-table-main">', i, "</div>", "{{# if(left){ }}", '<div class="layui-table-fixed layui-table-fixed-l">', '<div class="layui-table-header">', t({
        fixed: !0
    }), "</div>", '<div class="layui-table-body">', i, "</div>", "</div>", "{{# }; }}", "{{# if(right){ }}", '<div class="layui-table-fixed layui-table-fixed-r">', '<div class="layui-table-header">', t({
        fixed: "right"
    }), '<div class="layui-table-mend"></div>', "</div>", '<div class="layui-table-body">', i, "</div>", "</div>", "{{# }; }}", "</div>", "{{# if(d.data.totalRow){ }}", '<div class="layui-table-total">', '<table cellspacing="0" cellpadding="0" border="0" class="layui-table" ', '{{# if(d.data.skin){ }}lay-skin="{{d.data.skin}}"{{# } }} {{# if(d.data.size){ }}lay-size="{{d.data.size}}"{{# } }} {{# if(d.data.even){ }}lay-even{{# } }}>', '<tbody><tr><td><div class="layui-table-cell" style="visibility: hidden;">Total</div></td></tr></tbody>', "</table>", "</div>", "{{# } }}", "{{# if(d.data.page){ }}", '<div class="layui-table-page">', '<div id="layui-table-page{{d.index}}"></div>', "</div>", "{{# } }}", "<style>", "{{# layui.each(d.data.cols, function(i1, item1){", "layui.each(item1, function(i2, item2){ }}", ".laytable-cell-{{d.index}}-{{i1}}-{{i2}}{ ", "{{# if(item2.width){ }}", "width: {{item2.width}}px;", "{{# } }}", " }", "{{# });", "}); }}", "</style>", "</div>"].join(""),
    H = m(window),
    j = m(document),
    n = function(e) {
        var t = this;
        t.index = ++x.index,
        t.config = m.extend({},
        t.config, x.config, e),
        t.render()
    };
    n.prototype.config = {
        limit: 10,
        loading: !0,
        cellMinWidth: 60,
        defaultToolbar: ["filter", "exports", "print"],
        text: {
            none: "无数据"
        }
    },
    n.prototype.render = function() {
        var e = this,
        t = e.config;
        if (t.elem = m(t.elem), t.where = t.where || {},
        t.id = t.id || t.elem.attr("id") || t.index, t.request = m.extend({
            pageName: "page",
            limitName: "limit"
        },
        t.request), t.response = m.extend({
            statusName: "code",
            statusCode: 0,
            msgName: "msg",
            dataName: "data",
            countName: "count"
        },
        t.response), "object" == typeof t.page && (t.limit = t.page.limit || t.limit, t.limits = t.page.limits || t.limits, e.page = t.page.curr = t.page.curr || 1, delete t.page.elem, delete t.page.jump), !t.elem[0]) return e;
        t.height && /^full-\d+$/.test(t.height) && (e.fullHeightGap = t.height.split("-")[1], t.height = H.height() - e.fullHeightGap),
        e.setInit();
        var i = t.elem,
        a = i.next("." + o),
        l = e.elem = m(g(R).render({
            VIEW_CLASS: o,
            data: t,
            index: e.index
        }));
        if (t.index = e.index, a[0] && a.remove(), i.after(l), e.layTool = l.find(c), e.layBox = l.find(u), e.layHeader = l.find(v), e.layMain = l.find(w), e.layBody = l.find(C), e.layFixed = l.find(T), e.layFixLeft = l.find(A), e.layFixRight = l.find(L), e.layTotal = l.find(S), e.layPage = l.find(N), e.renderToolbar(), e.fullSize(), t.cols.length > 1) {
            var n = e.layFixed.find(v).find("th");
            n.height(e.layHeader.height() - 1 - parseFloat(n.css("padding-top")) - parseFloat(n.css("padding-bottom")))
        }
        e.pullData(e.page),
        e.events()
    },
    n.prototype.initOpts = function(e) {
        var t = this,
        i = (t.config, {
            checkbox: 48,
            radio: 48,
            space: 15,
            numbers: 40
        });
        e.checkbox && (e.type = "checkbox"),
        e.space && (e.type = "space"),
        e.type || (e.type = "normal"),
        "normal" !== e.type && (e.unresize = !0, e.width = e.width || i[e.type])
    },
    n.prototype.setInit = function(e) {
        var t = this,
        o = t.config;
        return o.clientWidth = o.width ||
        function() {
            var a = function(e) {
                var t, i;
                e = e || o.elem.parent(),
                t = e.width();
                try {
                    i = "none" === e.css("display")
                } catch(e) {}
                return ! e[0] || t && !i ? t: a(e.parent())
            };
            return a()
        } (),
        "width" === e ? o.clientWidth: void layui.each(o.cols,
        function(n, e) {
            layui.each(e,
            function(i, a) {
                if (!a) return void e.splice(i, 1);
                if (a.key = n + "-" + i, a.hide = a.hide || !1, a.colGroup || a.colspan > 1) {
                    var l = 0;
                    layui.each(o.cols[n + 1],
                    function(e, t) {
                        t.HAS_PARENT || l > 1 && l == a.colspan || (t.HAS_PARENT = !0, t.parentKey = n + "-" + i, l += parseInt(t.colspan > 1 ? t.colspan: 1))
                    }),
                    a.colGroup = !0
                }
                t.initOpts(a)
            })
        })
    },
    n.prototype.renderToolbar = function() {
        var e = this,
        t = e.config,
        i = ['<div class="layui-inline" lay-event="add"><i class="layui-icon layui-icon-add-1"></i></div>', '<div class="layui-inline" lay-event="update"><i class="layui-icon layui-icon-edit"></i></div>', '<div class="layui-inline" lay-event="delete"><i class="layui-icon layui-icon-delete"></i></div>'].join(""),
        a = e.layTool.find(".layui-table-tool-temp");
        if ("default" === t.toolbar) a.html(i);
        else if (t.toolbar) {
            var l = m(t.toolbar).html() || "";
            l && a.html(g(l).render(t))
        }
        var n = {
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
        "object" == typeof t.defaultToolbar && layui.each(t.defaultToolbar,
        function(e, t) {
            var i = n[t];
            i && o.push('<div class="layui-inline" title="' + i.title + '" lay-event="' + i.layEvent + '"><i class="layui-icon ' + i.icon + '"></i></div>')
        }),
        e.layTool.find(".layui-table-tool-self").html(o.join(""))
    },
    n.prototype.setParentCol = function(e, t) {
        var i = this,
        a = i.config,
        l = i.layHeader.find('th[data-key="' + a.index + "-" + t + '"]'),
        n = parseInt(l.attr("colspan")) || 0;
        if (l[0]) {
            var o = t.split("-"),
            r = a.cols[o[0]][o[1]];
            e ? n--:n++,
            l.attr("colspan", n),
            l[n < 1 ? "addClass": "removeClass"](k),
            r.colspan = n,
            r.hide = n < 1;
            var d = l.data("parentkey");
            d && i.setParentCol(e, d)
        }
    },
    n.prototype.setColsPatch = function() {
        var i = this,
        e = i.config;
        layui.each(e.cols,
        function(e, t) {
            layui.each(t,
            function(e, t) {
                t.hide && i.setParentCol(t.hide, t.parentKey)
            })
        })
    },
    n.prototype.setColsWidth = function() {
        var a = this,
        o = a.config,
        i = 0,
        r = 0,
        d = 0,
        c = 0,
        s = a.setInit("width");
        a.eachCols(function(e, t) {
            t.hide || i++
        }),
        s = s -
        function() {
            return "line" === o.skin || "nob" === o.skin ? 2 : i + 1
        } () - a.getScrollWidth(a.layMain[0]) - 1;
        var e = function(n) {
            layui.each(o.cols,
            function(e, l) {
                layui.each(l,
                function(e, t) {
                    var i = 0,
                    a = t.minWidth || o.cellMinWidth;
                    return t ? void(t.colGroup || t.hide || (n ? d && d < a && (r--, i = a) : (i = t.width || 0, /\d+%$/.test(i) ? (i = Math.floor(parseFloat(i) / 100 * s), i < a && (i = a)) : i || (t.width = i = 0, r++)), t.hide && (i = 0), c += i)) : void l.splice(e, 1)
                })
            }),
            s > c && r && (d = (s - c) / r)
        };
        e(),
        e(!0),
        a.autoColNums = r,
        a.eachCols(function(e, t) {
            var i = t.minWidth || o.cellMinWidth;
            t.colGroup || t.hide || (0 === t.width ? a.getCssRule(o.index + "-" + t.key,
            function(e) {
                e.style.width = Math.floor(d >= i ? d: i) + "px"
            }) : /\d+%$/.test(t.width) && a.getCssRule(o.index + "-" + t.key,
            function(e) {
                e.style.width = Math.floor(parseFloat(t.width) / 100 * s) + "px"
            }))
        });
        var l = a.layMain.width() - a.getScrollWidth(a.layMain[0]) - a.layMain.children("table").outerWidth();
        if (a.autoColNums && l >= -i && l <= i) {
            var n = function(e) {
                var t;
                return e = e || a.layHeader.eq(0).find("thead th:last-child"),
                t = e.data("field"),
                !t && e.prev()[0] ? n(e.prev()) : e
            },
            u = n(),
            t = u.data("key");
            a.getCssRule(t,
            function(e) {
                var t = e.style.width || u.outerWidth();
                e.style.width = parseFloat(t) + l + "px",
                a.layMain.height() - a.layMain.prop("clientHeight") > 0 && (e.style.width = parseFloat(e.style.width) - 1 + "px")
            })
        }
        a.loading(!0)
    },
    n.prototype.reload = function(e) {
        var t = this;
        t.config.data && t.config.data.constructor === Array && delete t.config.data,
        t.config = m.extend({},
        t.config, e),
        t.render()
    },
    n.prototype.page = 1,
    n.prototype.pullData = function(t) {
        var i = this,
        a = i.config,
        e = a.request,
        l = a.response,
        n = function() {
            "object" == typeof a.initSort && i.sort(a.initSort.field, a.initSort.type)
        };
        if (i.startTime = (new Date).getTime(), a.url) {
            var o = {};
            o[e.pageName] = t,
            o[e.limitName] = a.limit;
            var r = m.extend(o, a.where);
            a.contentType && 0 == a.contentType.indexOf("application/json") && (r = JSON.stringify(r)),
            m.ajax({
                type: a.method || "get",
                url: a.url,
                contentType: a.contentType,
                data: r,
                dataType: "json",
                headers: a.headers || {},
                success: function(e) {
                    "function" == typeof a.parseData && (e = a.parseData(e) || e),
                    e[l.statusName] != l.statusCode ? (i.renderForm(), i.layMain.html('<div class="' + s + '">' + (e[l.msgName] || "返回的数据不符合规范，正确的成功状态码 (" + l.statusName + ") 应为：" + l.statusCode) + "</div>")) : (i.renderData(e, t, e[l.countName]), n(), a.time = (new Date).getTime() - i.startTime + " ms"),
                    i.setColsWidth(),
                    "function" == typeof a.done && a.done(e, t, e[l.countName])
                },
                error: function(e, t) {
                    i.layMain.html('<div class="' + s + '">数据接口请求异常：' + t + "</div>"),
                    i.renderForm(),
                    i.setColsWidth()
                }
            })
        } else if (a.data && a.data.constructor === Array) {
            var d = {},
            c = t * a.limit - a.limit;
            d[l.dataName] = a.data.concat().splice(c, a.limit),
            d[l.countName] = a.data.length,
            i.renderData(d, t, a.data.length),
            n(),
            i.setColsWidth(),
            "function" == typeof a.done && a.done(d, t, d[l.countName])
        }
    },
    n.prototype.eachCols = function(e) {
        var t = this;
        return x.eachCols(null, e, t.config.cols),
        t
    },
    n.prototype.renderData = function(e, t, i, a) {
        var l = this,
        h = l.config,
        n = e[h.response.dataName] || [],
        f = [],
        p = [],
        v = [],
        o = function() {
            var y;
            return ! a && l.sortKey ? l.sort(l.sortKey.field, l.sortKey.sort, !0) : (layui.each(n,
            function(o, r) {
                var d = [],
                c = [],
                s = [],
                u = o + h.limit * (t - 1) + 1;
                0 !== r.length && (a || (r[x.config.indexName] = o), l.eachCols(function(e, i) {
                    var t = i.field || e,
                    a = h.index + "-" + i.key,
                    l = r[t];
                    if (void 0 !== l && null !== l || (l = ""), !i.colGroup) {
                        var n = ['<td data-field="' + t + '" data-key="' + a + '" ' +
                        function() {
                            var e = [];
                            return i.edit && e.push('data-edit="' + i.edit + '"'),
                            i.align && e.push('align="' + i.align + '"'),
                            i.templet && e.push('data-content="' + l + '"'),
                            i.toolbar && e.push('data-off="true"'),
                            i.event && e.push('lay-event="' + i.event + '"'),
                            i.style && e.push('style="' + i.style + '"'),
                            i.minWidth && e.push('data-minwidth="' + i.minWidth + '"'),
                            e.join(" ")
                        } () + ' class="' +
                        function() {
                            var e = [];
                            return i.hide && e.push(k),
                            i.field || e.push("layui-table-col-special"),
                            e.join(" ")
                        } () + '">', '<div class="layui-table-cell laytable-cell-' +
                        function() {
                            return "normal" === i.type ? a: a + " laytable-cell-" + i.type
                        } () + '">' +
                        function() {
                            var e = m.extend(!0, {
                                LAY_INDEX: u
                            },
                            r),
                            t = x.config.checkName;
                            switch (i.type) {
                            case "checkbox":
                                return '<input type="checkbox" name="layTableCheckbox" lay-skin="primary" ' +
                                function() {
                                    return i[t] ? (r[t] = i[t], i[t] ? "checked": "") : e[t] ? "checked": ""
                                } () + ">";
                            case "radio":
                                return e[t] && (y = o),
                                '<input type="radio" name="layTableRadio_' + h.index + '" ' + (e[t] ? "checked": "") + ' lay-type="layTableRadio">';
                            case "numbers":
                                return u
                            }
                            return i.toolbar ? g(m(i.toolbar).html() || "").render(e) : i.templet ?
                            function() {
                                return "function" == typeof i.templet ? i.templet(e) : g(m(i.templet).html() || String(l)).render(e)
                            } () : l
                        } (), "</div></td>"].join("");
                        d.push(n),
                        i.fixed && "right" !== i.fixed && c.push(n),
                        "right" === i.fixed && s.push(n)
                    }
                }), f.push('<tr data-index="' + o + '">' + d.join("") + "</tr>"), p.push('<tr data-index="' + o + '">' + c.join("") + "</tr>"), v.push('<tr data-index="' + o + '">' + s.join("") + "</tr>"))
            }), l.layBody.scrollTop(0), l.layMain.find("." + s).remove(), l.layMain.find("tbody").html(f.join("")), l.layFixLeft.find("tbody").html(p.join("")), l.layFixRight.find("tbody").html(v.join("")), l.renderForm(), "number" == typeof y && l.setThisRowChecked(y), l.syncCheckAll(), l.scrollPatch(), b.close(l.tipsIndex), h.HAS_SET_COLS_PATCH || l.setColsPatch(), void(h.HAS_SET_COLS_PATCH = !0))
        };
        return l.key = h.id || h.index,
        x.cache[l.key] = n,
        l.layPage[0 == i || 0 === n.length && 1 == t ? "addClass": "removeClass"](k),
        a ? o() : 0 === n.length ? (l.renderForm(), l.layFixed.remove(), l.layMain.find("tbody").html(""), l.layMain.find("." + s).remove(), l.layMain.append('<div class="' + s + '">' + h.text.none + "</div>")) : (o(), l.renderTotal(n), void(h.page && (h.page = m.extend({
            elem: "layui-table-page" + h.index,
            count: i,
            limit: h.limit,
            limits: h.limits || [10, 20, 30, 40, 50, 60, 70, 80, 90],
            groups: 3,
            layout: ["prev", "page", "next", "skip", "count", "limit"],
            prev: '<i class="layui-icon">&#xe603;</i>',
            next: '<i class="layui-icon">&#xe602;</i>',
            jump: function(e, t) {
                t || (l.page = e.curr, h.limit = e.limit, l.loading(), l.pullData(e.curr))
            }
        },
        h.page), h.page.count = i, r.render(h.page))))
    },
    n.prototype.renderTotal = function(e) {
        var t = this,
        l = t.config,
        n = {};
        if (l.totalRow) {
            layui.each(e,
            function(e, l) {
                0 !== l.length && t.eachCols(function(e, t) {
                    var i = t.field || e,
                    a = l[i];
                    t.totalRow && (n[i] = (n[i] || 0) + (parseFloat(a) || 0))
                })
            });
            var o = [];
            t.eachCols(function(e, t) {
                var i = t.field || e;
                if (!t.hide) {
                    var a = ['<td data-field="' + i + '" data-key="' + t.key + '" ' +
                    function() {
                        var e = [];
                        return t.align && e.push('align="' + t.align + '"'),
                        t.style && e.push('style="' + t.style + '"'),
                        t.minWidth && e.push('data-minwidth="' + t.minWidth + '"'),
                        e.join(" ")
                    } () + ">", '<div class="layui-table-cell laytable-cell-' +
                    function() {
                        var e = l.index + "-" + t.key;
                        return "normal" === t.type ? e: e + " laytable-cell-" + t.type
                    } () + '">' +
                    function() {
                        var e = t.totalRowText || "";
                        return t.totalRow ? n[i] || e: e
                    } (), "</div></td>"].join("");
                    o.push(a)
                }
            }),
            t.layTotal.find("tbody").html("<tr>" + o.join("") + "</tr>")
        }
    },
    n.prototype.getColElem = function(e, t) {
        var i = this,
        a = i.config;
        return e.eq(0).find(".laytable-cell-" + (a.index + "-" + t) + ":eq(0)")
    },
    n.prototype.renderForm = function(e) {
        y.render(e, "LAY-table-" + this.index)
    },
    n.prototype.setThisRowChecked = function(e) {
        var t = this,
        i = (t.config, "layui-table-click"),
        a = t.layBody.find('tr[data-index="' + e + '"]');
        a.addClass(i).siblings("tr").removeClass(i)
    },
    n.prototype.sort = function(l, e, t, i) {
        var n, a, o = this,
        r = {},
        d = o.config,
        c = d.elem.attr("lay-filter"),
        s = x.cache[o.key];
        "string" == typeof l && o.layHeader.find("th").each(function(e, t) {
            var i = m(this),
            a = i.data("field");
            if (a === l) return l = i,
            n = a,
            !1
        });
        try {
            var n = n || l.data("field"),
            u = l.data("key");
            if (o.sortKey && !t && n === o.sortKey.field && e === o.sortKey.sort) return;
            var y = o.layHeader.find("th .laytable-cell-" + u).find(W);
            o.layHeader.find("th").find(W).removeAttr("lay-sort"),
            y.attr("lay-sort", e || null),
            o.layFixed.find("th")
        } catch(e) {
            return h.error("Table modules: Did not match to field")
        }
        o.sortKey = {
            field: n,
            sort: e
        },
        "asc" === e ? a = layui.sort(s, n) : "desc" === e ? a = layui.sort(s, n, !0) : (a = layui.sort(s, x.config.indexName), delete o.sortKey),
        r[d.response.dataName] = a,
        o.renderData(r, o.page, o.count, !0),
        i && layui.event.call(l, p, "sort(" + c + ")", {
            field: n,
            type: e
        })
    },
    n.prototype.loading = function(e) {
        var t = this,
        i = t.config;
        i.loading && (e ? (t.layInit && t.layInit.remove(), delete t.layInit, t.layBox.find(a).remove()) : (t.layInit = m(['<div class="layui-table-init">', '<i class="layui-icon layui-icon-loading layui-icon"></i>', "</div>"].join("")), t.layBox.append(t.layInit)))
    },
    n.prototype.setCheckData = function(e, t) {
        var i = this,
        a = i.config,
        l = x.cache[i.key];
        l[e] && l[e].constructor !== Array && (l[e][a.checkName] = t)
    },
    n.prototype.syncCheckAll = function() {
        var e = this,
        a = e.config,
        t = e.layHeader.find('input[name="layTableCheckbox"]'),
        i = function(i) {
            return e.eachCols(function(e, t) {
                "checkbox" === t.type && (t[a.checkName] = i)
            }),
            i
        };
        t[0] && (x.checkStatus(e.key).isAll ? (t[0].checked || (t.prop("checked", !0), e.renderForm("checkbox")), i(!0)) : (t[0].checked && (t.prop("checked", !1), e.renderForm("checkbox")), i(!1)))
    },
    n.prototype.getCssRule = function(i, a) {
        var e = this,
        t = e.elem.find("style")[0],
        l = t.sheet || t.styleSheet || {},
        n = l.cssRules || l.rules;
        layui.each(n,
        function(e, t) {
            if (t.selectorText === ".laytable-cell-" + i) return a(t),
            !0
        })
    },
    n.prototype.fullSize = function() {
        var e, t = this,
        i = t.config,
        a = i.height;
        t.fullHeightGap && (a = H.height() - t.fullHeightGap, a < 135 && (a = 135), t.elem.css("height", a)),
        a && (e = parseFloat(a) - (t.layHeader.outerHeight() || 38), i.toolbar && (e -= t.layTool.outerHeight() || 50), i.totalRow && (e -= t.layTotal.outerHeight() || 40), i.page && (e = e - (t.layPage.outerHeight() || 41) - 2), t.layMain.css("height", e))
    },
    n.prototype.getScrollWidth = function(e) {
        var t = 0;
        return e ? t = e.offsetWidth - e.clientWidth: (e = document.createElement("div"), e.style.width = "100px", e.style.height = "100px", e.style.overflowY = "scroll", document.body.appendChild(e), t = e.offsetWidth - e.clientWidth, document.body.removeChild(e)),
        t
    },
    n.prototype.scrollPatch = function() {
        var e = this,
        t = e.layMain.children("table"),
        i = e.layMain.width() - e.layMain.prop("clientWidth"),
        a = e.layMain.height() - e.layMain.prop("clientHeight"),
        l = (e.getScrollWidth(e.layMain[0]), t.outerWidth() - e.layMain.width()),
        n = function(e) {
            if (i && a) {
                if (e = e.eq(0), !e.find(".layui-table-patch")[0]) {
                    var t = m('<th class="layui-table-patch"><div class="layui-table-cell"></div></th>');
                    t.find("div").css({
                        width: i
                    }),
                    e.find("tr").append(t)
                }
            } else e.find(".layui-table-patch").remove()
        };
        n(e.layHeader),
        n(e.layTotal);
        var o = e.layMain.height(),
        r = o - a;
        e.layFixed.find(C).css("height", t.height() > r ? r: "auto"),
        e.layFixRight[l > 0 ? "removeClass": "addClass"](k),
        e.layFixRight.css("right", i - 1)
    },
    n.prototype.events = function() {
        var n, r = this,
        d = r.config,
        l = m("body"),
        o = {},
        e = r.layHeader.find("th"),
        c = ".layui-table-cell",
        s = d.elem.attr("lay-filter");
        r.layTool.on("click", "*[lay-event]",
        function(e) {
            var a = m(this),
            t = a.attr("lay-event"),
            i = function(e) {
                var t = m(e.list),
                i = m('<ul class="layui-table-tool-panel"></ul>');
                i.html(t),
                a.find(".layui-table-tool-panel")[0] || a.append(i),
                r.renderForm(),
                i.on("click",
                function(e) {
                    layui.stope(e)
                }),
                e.done && e.done(i, t)
            };
            switch (layui.stope(e), j.trigger("table.tool.panel.remove"), b.close(r.tipsIndex), t) {
            case "LAYTABLE_COLS":
                i({
                    list:
                    function() {
                        var i = [];
                        return r.eachCols(function(e, t) {
                            t.field && "normal" == t.type && i.push('<li><input type="checkbox" name="' + t.field + '" data-key="' + t.key + '" data-parentkey="' + (t.parentKey || "") + '" lay-skin="primary" ' + (t.hide ? "": "checked") + ' title="' + (t.title || t.field) + '" lay-filter="LAY_TABLE_TOOL_COLS"></li>')
                        }),
                        i.join("")
                    } (),
                    done: function() {
                        y.on("checkbox(LAY_TABLE_TOOL_COLS)",
                        function(e) {
                            var t = m(e.elem),
                            l = this.checked,
                            n = t.data("key"),
                            o = t.data("parentkey");
                            layui.each(d.cols,
                            function(a, e) {
                                layui.each(e,
                                function(e, t) {
                                    if (a + "-" + e === n) {
                                        var i = t.hide;
                                        t.hide = !l,
                                        r.elem.find('*[data-key="' + d.index + "-" + n + '"]')[l ? "removeClass": "addClass"](k),
                                        i != t.hide && r.setParentCol(!l, o),
                                        r.fullSize(),
                                        r.scrollPatch(),
                                        r.setColsWidth()
                                    }
                                })
                            })
                        })
                    }
                });
                break;
            case "LAYTABLE_EXPORT":
                f.ie ? b.tips("导出功能不支持 IE，请用 Chrome 等高级浏览器导出", this, {
                    tips: 3
                }) : i({
                    list: function() {
                        return ['<li data-type="csv">导出到 Csv 文件</li>', '<li data-type="xls">导出到 Excel 文件</li>'].join("")
                    } (),
                    done: function(e, t) {
                        t.on("click",
                        function() {
                            var e = m(this).data("type");
                            x.exportFile(d.id, null, e)
                        })
                    }
                });
                break;
            case "LAYTABLE_PRINT":
                var l = window.open("打印窗口", "_blank"),
                n = ["<style>", "body{font-size: 12px; color: #666;}", "table{width: 100%; border-collapse: collapse; border-spacing: 0;}", "th,td{line-height: 20px; padding: 9px 15px; border: 1px solid #ccc; text-align: left; font-size: 12px; color: #666;}", "a{color: #666; text-decoration:none;}", "*.layui-hide{display: none}", "</style>"].join(""),
                o = m(r.layHeader.html());
                o.append(r.layMain.find("table").html()),
                o.find("th.layui-table-patch").remove(),
                o.find(".layui-table-col-special").remove(),
                l.document.write(n + o.prop("outerHTML")),
                l.document.close(),
                l.print(),
                l.close()
            }
            layui.event.call(this, p, "toolbar(" + s + ")", m.extend({
                event: t,
                config: d
            },
            {}))
        }),
        e.on("mousemove",
        function(e) {
            var t = m(this),
            i = t.offset().left,
            a = e.clientX - i;
            t.data("unresize") || o.resizeStart || (o.allowResize = t.width() - a <= 10, l.css("cursor", o.allowResize ? "col-resize": ""))
        }).on("mouseleave",
        function() {
            m(this);
            o.resizeStart || l.css("cursor", "")
        }).on("mousedown",
        function(e) {
            var i = m(this);
            if (o.allowResize) {
                var t = i.data("key");
                e.preventDefault(),
                o.resizeStart = !0,
                o.offset = [e.clientX, e.clientY],
                r.getCssRule(t,
                function(e) {
                    var t = e.style.width || i.outerWidth();
                    o.rule = e,
                    o.ruleWidth = parseFloat(t),
                    o.minWidth = i.data("minwidth") || d.cellMinWidth
                })
            }
        }),
        j.on("mousemove",
        function(e) {
            if (o.resizeStart) {
                if (e.preventDefault(), o.rule) {
                    var t = o.ruleWidth + e.clientX - o.offset[0];
                    t < o.minWidth && (t = o.minWidth),
                    o.rule.style.width = t + "px",
                    b.close(r.tipsIndex)
                }
                n = 1
            }
        }).on("mouseup",
        function(e) {
            o.resizeStart && (o = {},
            l.css("cursor", ""), r.scrollPatch()),
            2 === n && (n = null)
        }),
        e.on("click",
        function(e) {
            var t, i = m(this),
            a = i.find(W),
            l = a.attr("lay-sort");
            return a[0] && 1 !== n ? (t = "asc" === l ? "desc": "desc" === l ? null: "asc", void r.sort(i, t, null, !0)) : n = 2
        }).find(W + " .layui-edge ").on("click",
        function(e) {
            var t = m(this),
            i = t.index(),
            a = t.parents("th").eq(0).data("field");
            layui.stope(e),
            0 === i ? r.sort(a, "asc", null, !0) : r.sort(a, "desc", null, !0)
        });
        var u = function(e) {
            var t = m(this),
            i = t.parents("tr").eq(0).data("index"),
            l = r.layBody.find('tr[data-index="' + i + '"]'),
            n = x.cache[r.key][i];
            return m.extend({
                tr: l,
                data: x.clearCacheKey(n),
                del: function() {
                    x.cache[r.key][i] = [],
                    l.remove(),
                    r.scrollPatch()
                },
                update: function(e) {
                    e = e || {},
                    layui.each(e,
                    function(i, e) {
                        if (i in n) {
                            var a, t = l.children('td[data-field="' + i + '"]');
                            n[i] = e,
                            r.eachCols(function(e, t) {
                                t.field == i && t.templet && (a = t.templet)
                            }),
                            t.children(c).html(function() {
                                return a ?
                                function() {
                                    return "function" == typeof a ? a(n) : g(m(a).html() || e).render(n)
                                } () : e
                            } ()),
                            t.data("content", e)
                        }
                    })
                }
            },
            e)
        };
        r.elem.on("click", 'input[name="layTableCheckbox"]+',
        function() {
            var e = m(this).prev(),
            t = r.layBody.find('input[name="layTableCheckbox"]'),
            i = e.parents("tr").eq(0).data("index"),
            a = e[0].checked,
            l = "layTableAllChoose" === e.attr("lay-filter");
            l ? (t.each(function(e, t) {
                t.checked = a,
                r.setCheckData(e, a)
            }), r.syncCheckAll(), r.renderForm("checkbox")) : (r.setCheckData(i, a), r.syncCheckAll()),
            layui.event.call(this, p, "checkbox(" + s + ")", u.call(this, {
                checked: a,
                type: l ? "all": "one"
            }))
        }),
        r.elem.on("click", 'input[lay-type="layTableRadio"]+',
        function() {
            var e = m(this).prev(),
            t = e[0].checked,
            i = x.cache[r.key],
            a = e.parents("tr").eq(0).data("index");
            layui.each(i,
            function(e, t) {
                a === e ? t.LAY_CHECKED = !0 : delete t.LAY_CHECKED
            }),
            r.setThisRowChecked(a),
            layui.event.call(this, p, "radio(" + s + ")", u.call(this, {
                checked: t
            }))
        }),
        r.layBody.on("mouseenter", "tr",
        function() {
            var e = m(this),
            t = e.index();
            r.layBody.find("tr:eq(" + t + ")").addClass(E)
        }).on("mouseleave", "tr",
        function() {
            var e = m(this),
            t = e.index();
            r.layBody.find("tr:eq(" + t + ")").removeClass(E)
        }).on("click", "tr",
        function() {
            t.call(this, "row")
        }).on("dblclick", "tr",
        function() {
            t.call(this, "rowDouble")
        });
        var t = function(e) {
            var t = m(this);
            layui.event.call(this, p, e + "(" + s + ")", u.call(t.children("td")[0]))
        };
        r.layBody.on("change", "." + _,
        function() {
            var e = m(this),
            t = this.value,
            i = e.parent().data("field"),
            a = e.parents("tr").eq(0).data("index"),
            l = x.cache[r.key][a];
            l[i] = t,
            layui.event.call(this, p, "edit(" + s + ")", u.call(this, {
                value: t,
                field: i
            }))
        }).on("blur", "." + _,
        function() {
            var i, e = m(this),
            a = e.parent().data("field"),
            t = e.parents("tr").eq(0).data("index"),
            l = x.cache[r.key][t];
            r.eachCols(function(e, t) {
                t.field == a && t.templet && (i = t.templet)
            }),
            e.siblings(c).html(function(e) {
                return i ?
                function() {
                    return "function" == typeof i ? i(l) : g(m(i).html() || this.value).render(l)
                } () : e
            } (this.value)),
            e.parent().data("content", this.value),
            e.remove()
        }),
        r.layBody.on("click", "td",
        function() {
            var e = m(this),
            t = (e.data("field"), e.data("edit")),
            i = e.children(c);
            if (!e.data("off") && t) {
                var a = m('<input class="layui-input ' + _ + '">');
                return a[0].value = e.data("content") || i.text(),
                e.find("." + _)[0] || e.append(a),
                void a.focus()
            }
        }).on("mouseenter", "td",
        function() {
            i.call(this)
        }).on("mouseleave", "td",
        function() {
            i.call(this, "hide")
        });
        var a = "layui-table-grid-down",
        i = function(e) {
            var t = m(this),
            i = t.children(c);
            if (e) t.find(".layui-table-grid-down").remove();
            else if (i.prop("scrollWidth") > i.outerWidth()) {
                if (i.find("." + a)[0]) return;
                t.append('<div class="' + a + '"><i class="layui-icon layui-icon-down"></i></div>')
            }
        };
        r.layBody.on("click", "." + a,
        function() {
            var e = m(this),
            t = e.parent(),
            i = t.children(c);
            r.tipsIndex = b.tips(['<div class="layui-table-tips-main" style="margin-top: -' + (i.height() + 16) + "px;" +
            function() {
                return "sm" === d.size ? "padding: 4px 15px; font-size: 12px;": "lg" === d.size ? "padding: 14px 15px;": ""
            } () + '">', i.html(), "</div>", '<i class="layui-icon layui-table-tips-c layui-icon-close"></i>'].join(""), i[0], {
                tips: [3, ""],
                time: -1,
                anim: -1,
                maxWidth: f.ios || f.android ? 300 : r.elem.width() / 2,
                isOutAnim: !1,
                skin: "layui-table-tips",
                success: function(e, t) {
                    e.find(".layui-table-tips-c").on("click",
                    function() {
                        b.close(t)
                    })
                }
            })
        }),
        r.layBody.on("click", "*[lay-event]",
        function() {
            var e = m(this),
            t = e.parents("tr").eq(0).data("index");
            layui.event.call(this, p, "tool(" + s + ")", u.call(this, {
                event: e.attr("lay-event")
            })),
            r.setThisRowChecked(t)
        }),
        r.layMain.on("scroll",
        function() {
            var e = m(this),
            t = e.scrollLeft(),
            i = e.scrollTop();
            r.layHeader.scrollLeft(t),
            r.layTotal.scrollLeft(t),
            r.layFixed.find(C).scrollTop(i),
            b.close(r.tipsIndex)
        }),
        j.on("click",
        function() {
            j.trigger("table.remove.tool.panel")
        }),
        j.on("table.remove.tool.panel",
        function() {
            m(".layui-table-tool-panel").remove()
        }),
        H.on("resize",
        function() {
            r.fullSize(),
            r.scrollPatch(),
            r.setColsWidth()
        })
    },
    x.init = function(i, a) {
        a = a || {};
        var e = this,
        t = m(i ? 'table[lay-filter="' + i + '"]': l + "[lay-data]"),
        r = "Table element property lay-data configuration item has a syntax error: ";
        return t.each(function() {
            var e = m(this),
            t = e.attr("lay-data");
            try {
                t = new Function("return " + t)()
            } catch(e) {
                h.error(r + t)
            }
            var n = [],
            o = m.extend({
                elem: this,
                cols: [],
                data: [],
                skin: e.attr("lay-skin"),
                size: e.attr("lay-size"),
                even: "string" == typeof e.attr("lay-even")
            },
            x.config, a, t);
            i && e.hide(),
            e.find("thead>tr").each(function(l) {
                o.cols[l] = [],
                m(this).children().each(function(e) {
                    var t = m(this),
                    i = t.attr("lay-data");
                    try {
                        i = new Function("return " + i)()
                    } catch(e) {
                        return h.error(r + i)
                    }
                    var a = m.extend({
                        title: t.text(),
                        colspan: t.attr("colspan") || 0,
                        rowspan: t.attr("rowspan") || 0
                    },
                    i);
                    a.colspan < 2 && n.push(a),
                    o.cols[l].push(a)
                })
            }),
            e.find("tbody>tr").each(function(e) {
                var a = m(this),
                l = {};
                a.children("td").each(function(e, t) {
                    var i = m(this),
                    a = i.data("field");
                    if (a) return l[a] = i.html()
                }),
                layui.each(n,
                function(e, t) {
                    var i = a.children("td").eq(e);
                    l[t.field] = i.html()
                }),
                o.data[e] = l
            }),
            x.render(o)
        }),
        e
    },
    d.config = {},
    x.eachCols = function(e, i, l) {
        var t = d.config[e] || {},
        n = [],
        o = 0;
        l = m.extend(!0, [], l || t.cols),
        layui.each(l,
        function(t, e) {
            layui.each(e,
            function(e, i) {
                if (i.colGroup) {
                    var a = 0;
                    o++,
                    i.CHILD_COLS = [],
                    layui.each(l[t + 1],
                    function(e, t) {
                        t.PARENT_COL_INDEX || a > 1 && a == i.colspan || (t.PARENT_COL_INDEX = o, i.CHILD_COLS.push(t), a += parseInt(t.colspan > 1 ? t.colspan: 1))
                    })
                }
                i.PARENT_COL_INDEX || n.push(i)
            })
        });
        var a = function(e) {
            layui.each(e || n,
            function(e, t) {
                return t.CHILD_COLS ? a(t.CHILD_COLS) : void("function" == typeof i && i(e, t))
            })
        };
        a()
    },
    x.checkStatus = function(e) {
        var i = 0,
        a = 0,
        l = [],
        t = x.cache[e] || [];
        return layui.each(t,
        function(e, t) {
            return t.constructor === Array ? void a++:void(t[x.config.checkName] && (i++, l.push(x.clearCacheKey(t))))
        }),
        {
            data: l,
            isAll: !!t.length && i === t.length - a
        }
    },
    x.exportFile = function(t, i, e) {
        i = i || x.clearCacheKey(x.cache[t]),
        e = e || "csv";
        var a = d.config[t] || {},
        l = {
            csv: "text/csv",
            xls: "application/vnd.ms-excel"
        } [e],
        n = document.createElement("a");
        return f.ie ? h.error("IE_NOT_SUPPORT_EXPORTS") : (n.href = "data:" + l + ";charset=utf-8,\ufeff" + encodeURIComponent(function() {
            var n = [],
            e = [];
            return layui.each(i,
            function(i, a) {
                var l = [];
                "object" == typeof t ? (layui.each(t,
                function(e, t) {
                    0 == i && n.push(t || "")
                }), layui.each(x.clearCacheKey(a),
                function(e, t) {
                    l.push(t)
                })) : x.eachCols(t,
                function(e, t) {
                    t.field && "normal" == t.type && !t.hide && (0 == i && n.push(t.title || ""), l.push(a[t.field]))
                }),
                e.push(l.join(","))
            }),
            n.join(",") + "\r\n" + e.join("\r\n")
        } ()), n.download = (a.title || "table_" + (a.index || "")) + "." + e, document.body.appendChild(n), n.click(), void document.body.removeChild(n))
    },
    x.reload = function(e, t) {
        var i = d.config[e];
        return t = t || {},
        i ? (t.data && t.data.constructor === Array && delete i.data, x.render(m.extend(!0, {},
        i, t))) : h.error("The ID option was not found in the table instance")
    },
    x.render = function(e) {
        var t = new n(e);
        return d.call(t)
    },
    x.clearCacheKey = function(e) {
        return e = m.extend({},
        e),
        delete e[x.config.checkName],
        delete e[x.config.indexName],
        e
    },
    x.init(),
    e(p, x)
});