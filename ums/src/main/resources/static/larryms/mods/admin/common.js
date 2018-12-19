layui.define(["jquery", "larryMenu", "util"],
function(t) {
    "use strict";
    var n = layui.$,
    e = layui.layer,
    r = layui.larryms,
    a = layui.util,
    o = layui.larryMenu();
    var i = n("#larry_layout"),
    l = [[{
        text: "刷新当前页",
        func: function() {
            if (top == self) {
                if (i.length) {
                    r.confirm("您确定要重新加载系统吗！", {},
                    function() {
                        top.document.location.reload()
                    },
                    function() {
                        return
                    })
                } else {
                    document.location.reload()
                }
            } else {
                if (layui.cache.layertype !== undefined && layui.cache.layertype == 2) {
                    var t = parent.layer.getFrameIndex(window.name),
                    e = n("#layui-layer-iframe" + t),
                    a = e.context.URL;
                    parent.layer.iframeSrc(t, a)
                } else {
                    n(".layui-tab-content .layui-tab-item", parent.document).each(function() {
                        if (n(this).hasClass("layui-show")) {
                            n(this).children("iframe").attr("src", n(this).children("iframe").attr("src"));
                            return false
                        }
                    })
                }
            }
        }
    },
    {
        text: "重载主框架",
        func: function() {
            top.document.location.reload()
        }
    },
    {
        text: "设置系统主题",
        func: function() {
            if (top.document.getElementById("larryTheme") !== null) {
                top.document.getElementById("larryTheme").click()
            } else {
                r.error("当前页面不支持主题设置或请登陆系统后设置系统主题", r.tit[0], 2)
            }
        }
    },
    {
        text: "选项卡常用操作",
        data: [[{
            text: "定位当前选项卡",
            func: function() {
                if (top.document.getElementById("tabCtrD") !== null) {
                    top.document.getElementById("tabCtrD").click()
                } else {
                    r.error("请先登陆系统，此处无选项卡操作", r.tit[0])
                }
            }
        },
        {
            text: "关闭当前选项卡",
            func: function() {
                if (top.document.getElementById("tabCtrA") !== null) {
                    top.document.getElementById("tabCtrA").click()
                } else {
                    r.error("请先登陆系统，此处无选项卡操作", r.tit[0], 2)
                }
            }
        },
        {
            text: "关闭其他选项卡",
            func: function() {
                if (top.document.getElementById("tabCtrB") !== null) {
                    top.document.getElementById("tabCtrB").click()
                } else {
                    r.error("请先登陆系统，此处无选项卡操作", r.tit[0], 2)
                }
            }
        },
        {
            text: "关闭全部选项卡",
            func: function() {
                if (top.document.getElementById("tabCtrC") !== null) {
                    top.document.getElementById("tabCtrC").click()
                } else {
                    r.error("请先登陆系统，此处无选项卡操作", r.tit[0], 2)
                }
            }
        }]]
    },
    {
        text: "清除缓存",
        func: function() {
            top.document.getElementById("clearCached").click()
        }
    }]];
    var c = new Function;
    c.prototype.tab = {
        addTab: function(t, e) {
            if (window.top == window.self) {
                if (e == "page") {
                    larryTab.tabAdd(t)
                }
            } else {
                if (e == "iframe") {
                    top.larryTab.tabAdd(t)
                }
            }
        },
        rightMenu: function(t) {
            o.ContentMenu(t, {
                name: "body"
            },
            n("body"));
            if (window.top === window.self) {
                var e = n("#larry_tab_content");
                if (e.length !== 0) {
                    e.mouseenter(function() {
                        o.remove()
                    })
                }
            } else {
                if (layui.cache.layertype !== undefined && layui.cache.layertype == 2) {
                    n("iframe", parent.document).mouseout(function() {
                        o.remove()
                    })
                }
                var a = n("#larry_tab_content", window.parent.document);
                a.mouseout(function() {
                    o.remove()
                })
            }
        }
    };
    c.prototype.init = function() {
        var i = this;
        n("[larry-tab]").on("click",
        function() {
            var t = n(this).attr("larry-tab");
            if (t !== undefined && t !== "") {
                var e;
                if (n(this).data("group") !== undefined) {
                    e = n(this).data("group")
                } else {
                    e = "larry-temp"
                }
                if (t == "page") {
                    var a = {
                        href: n(this).data("url"),
                        id: n(this).data("id"),
                        font: n(this).children("i").data("font"),
                        icon: n(this).children("i").data("icon"),
                        group: e,
                        title: n(this).children("cite").text(),
                        addType: "page"
                    };
                    i.tab.addTab(a, "page")
                } else if (t == "iframe") {
                    var a = {
                        href: n(this).data("url"),
                        id: n(this).data("id"),
                        font: n(this).data("font"),
                        icon: n(this).data("icon"),
                        group: e,
                        title: n(this).find("cite").text(),
                        addType: "iframe"
                    };
                    i.tab.addTab(a, "iframe")
                } else {
                    r.error("请检查页面中含有larry-tab属性的元素，未正确设置参数格式：目前仅支持：page|iframe两种类别", r.tit[1], 2)
                }
            } else {
                r.error("请检查页面中含有larry-tab属性的元素，未设置任何值：目前仅支持：page|iframe两种类别", r.tit[1], 2)
            }
        });
        if (layui.cache.rightMenu !== false && layui.cache.rightMenu !== "custom") {
           // i.tab.rightMenu(l)
        } else if (layui.cache.rightMenu === false) {
            o.remove();
            o = null;
            n(document).bind("contextmenu",
            function(t) {
                return false
            })
        } else if (layui.cache.rightMenu === "none") {
            o.remove();
            o = null
        }
    };
    if (window.top !== window.self) {
        if (!layui.cache.layertype) {

        }
        //a.fixbar()
    }
    n("*[lay-tips]").on("mouseenter",
    function() {
        var t = n(this).attr("lay-tips");
        this.index = e.tips('<div style="padding: 10px; font-size: 14px; color: #eee;">' + t + "</div>", this, {
            time: -1,
            maxWidth: 280,
            tips: [1, "#000"]
        })
    }).on("mouseleave",
    function() {
        e.close(this.index)
    });
    var u = new c;
    u.init();
    t("common", u)
});