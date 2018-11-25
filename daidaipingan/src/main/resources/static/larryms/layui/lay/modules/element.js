layui.define("jquery",function(t){"use strict";var c=layui.$,u=(layui.hint(),layui.device()),d="element",y="layui-this",h="layui-show",a=function(){this.config={}};a.prototype.set=function(t){var a=this;return c.extend(!0,a.config,t),a},a.prototype.on=function(t,a){return layui.onevent.call(this,d,t,a)},a.prototype.tabAdd=function(t,a){var i=".layui-tab-title",e=c(".layui-tab[lay-filter="+t+"]"),l=e.children(i),n=l.children(".layui-tab-bar"),s=e.children(".layui-tab-content"),o='<li lay-id="'+(a.id||"")+'"'+(a.attr?' lay-attr="'+a.attr+'"':"")+">"+(a.title||"unnaming")+"</li>";return n[0]?n.before(o):l.append(o),s.append('<div class="layui-tab-item">'+(a.content||"")+"</div>"),k.hideTabMore(!0),k.tabAuto(),this},a.prototype.tabDelete=function(t,a){var i=".layui-tab-title",e=c(".layui-tab[lay-filter="+t+"]"),l=e.children(i),n=l.find('>li[lay-id="'+a+'"]');return k.tabDelete(null,n),this},a.prototype.tabChange=function(t,a){var i=".layui-tab-title",e=c(".layui-tab[lay-filter="+t+"]"),l=e.children(i),n=l.find('>li[lay-id="'+a+'"]');return k.tabClick.call(n[0],null,null,n),this},a.prototype.tab=function(i){i=i||{},e.on("click",i.headerElem,function(t){var a=c(this).index();k.tabClick.call(this,t,a,null,i)})},a.prototype.progress=function(t,a){var i="layui-progress",e=c("."+i+"[lay-filter="+t+"]"),l=e.find("."+i+"-bar"),n=l.find("."+i+"-text");return l.css("width",a),n.text(a),this};var f=".layui-nav",p="layui-nav-item",b="layui-nav-bar",v="layui-nav-tree",m="layui-nav-child",C="layui-nav-more",g="layui-anim layui-anim-upbit",k={tabClick:function(t,a,i,e){e=e||{};var l=i||c(this),a=a||l.parent().children("li").index(l),n=e.headerElem?l.parent():l.parents(".layui-tab").eq(0),s=e.bodyElem?c(e.bodyElem):n.children(".layui-tab-content").children(".layui-tab-item"),o=l.find("a"),r=n.attr("lay-filter");"javascript:;"!==o.attr("href")&&"_blank"===o.attr("target")||(l.addClass(y).siblings().removeClass(y),s.eq(a).addClass(h).siblings().removeClass(h)),layui.event.call(this,d,"tab("+r+")",{elem:n,index:a})},tabDelete:function(t,a){var i=a||c(this).parent(),e=i.index(),l=i.parents(".layui-tab").eq(0),n=l.children(".layui-tab-content").children(".layui-tab-item"),s=l.attr("lay-filter");i.hasClass(y)&&(i.next()[0]?k.tabClick.call(i.next()[0],null,e+1):i.prev()[0]&&k.tabClick.call(i.prev()[0],null,e-1)),i.remove(),n.eq(e).remove(),setTimeout(function(){k.tabAuto()},50),layui.event.call(this,d,"tabDelete("+s+")",{elem:l,index:e})},tabAuto:function(){var l="layui-tab-more",n="layui-tab-bar",s="layui-tab-close",o=this;c(".layui-tab").each(function(){var t=c(this),a=t.children(".layui-tab-title"),i=(t.children(".layui-tab-content").children(".layui-tab-item"),'lay-stope="tabmore"'),e=c('<span class="layui-unselect layui-tab-bar" '+i+"><i "+i+' class="layui-icon">&#xe61a;</i></span>');if(o===window&&8!=u.ie&&k.hideTabMore(!0),t.attr("lay-allowClose")&&a.find("li").each(function(){var t=c(this);if(!t.find("."+s)[0]){var a=c('<i class="layui-icon layui-unselect '+s+'">&#x1006;</i>');a.on("click",k.tabDelete),t.append(a)}}),"string"!=typeof t.attr("lay-unauto"))if(a.prop("scrollWidth")>a.outerWidth()+1){if(a.find("."+n)[0])return;a.append(e),t.attr("overflow",""),e.on("click",function(t){a[this.title?"removeClass":"addClass"](l),this.title=this.title?"":"收缩"})}else a.find("."+n).remove(),t.removeAttr("overflow")})},hideTabMore:function(t){var a=c(".layui-tab-title");t!==!0&&"tabmore"===c(t.target).attr("lay-stope")||(a.removeClass("layui-tab-more"),a.find(".layui-tab-bar").attr("title",""))},clickThis:function(){var t=c(this),a=t.parents(f),i=a.attr("lay-filter"),e=t.parent(),l=t.siblings("."+m),n="string"==typeof e.attr("lay-unselect");"javascript:;"!==t.attr("href")&&"_blank"===t.attr("target")||n||l[0]||(a.find("."+y).removeClass(y),e.addClass(y)),a.hasClass(v)&&(l.removeClass(g),l[0]&&(e["none"===l.css("display")?"addClass":"removeClass"](p+"ed"),"all"===a.attr("lay-shrink")&&e.siblings().removeClass(p+"ed"))),layui.event.call(this,d,"nav("+i+")",t)},collapse:function(){var t=c(this),a=t.find(".layui-colla-icon"),i=t.siblings(".layui-colla-content"),e=t.parents(".layui-collapse").eq(0),l=e.attr("lay-filter"),n="none"===i.css("display");if("string"==typeof e.attr("lay-accordion")){var s=e.children(".layui-colla-item").children("."+h);s.siblings(".layui-colla-title").children(".layui-colla-icon").html("&#xe602;"),s.removeClass(h)}i[n?"addClass":"removeClass"](h),a.html(n?"&#xe61a;":"&#xe602;"),layui.event.call(this,d,"collapse("+l+")",{title:t,content:i,show:n})}};a.prototype.init=function(t,a){var i=function(){return a?'[lay-filter="'+a+'"]':""}(),e={tab:function(){k.tabAuto.call({})},nav:function(){var n=200,s={},o={},r={},l=function(t,a,i){var e=c(this),l=e.find("."+m);a.hasClass(v)?t.css({top:e.position().top,height:e.children("a").outerHeight(),opacity:1}):(l.addClass(g),t.css({left:e.position().left+parseFloat(e.css("marginLeft")),top:e.position().top+e.height()-t.height()}),s[i]=setTimeout(function(){t.css({width:e.width(),opacity:1})},u.ie&&u.ie<10?0:n),clearTimeout(r[i]),"block"===l.css("display")&&clearTimeout(o[i]),o[i]=setTimeout(function(){l.addClass(h),e.find("."+C).addClass(C+"d")},300))};c(f+i).each(function(t){var a=c(this),i=c('<span class="'+b+'"></span>'),e=a.find("."+p);a.find("."+b)[0]||(a.append(i),e.on("mouseenter",function(){l.call(this,i,a,t)}).on("mouseleave",function(){a.hasClass(v)||(clearTimeout(o[t]),o[t]=setTimeout(function(){a.find("."+m).removeClass(h),a.find("."+C).removeClass(C+"d")},300))}),a.on("mouseleave",function(){clearTimeout(s[t]),r[t]=setTimeout(function(){a.hasClass(v)?i.css({height:0,top:i.position().top+i.height()/2,opacity:0}):i.css({width:0,left:i.position().left+i.width()/2,opacity:0})},n)})),e.find("a").each(function(){var t=c(this),a=(t.parent(),t.siblings("."+m));a[0]&&!t.children("."+C)[0]&&t.append('<span class="'+C+'"></span>'),t.off("click",k.clickThis).on("click",k.clickThis)})})},breadcrumb:function(){var t=".layui-breadcrumb";c(t+i).each(function(){var t=c(this),a="lay-separator",i=t.attr(a)||"/",e=t.find("a");e.next("span["+a+"]")[0]||(e.each(function(t){t!==e.length-1&&c(this).after("<span "+a+">"+i+"</span>")}),t.css("visibility","visible"))})},progress:function(){var e="layui-progress";c("."+e+i).each(function(){var t=c(this),a=t.find(".layui-progress-bar"),i=a.attr("lay-percent");a.css("width",function(){return/^.+\/.+$/.test(i)?100*new Function("return "+i)()+"%":i}()),t.attr("lay-showPercent")&&setTimeout(function(){a.html('<span class="'+e+'-text">'+i+"</span>")},350)})},collapse:function(){var t="layui-collapse";c("."+t+i).each(function(){var t=c(this).find(".layui-colla-item");t.each(function(){var t=c(this),a=t.find(".layui-colla-title"),i=t.find(".layui-colla-content"),e="none"===i.css("display");a.find(".layui-colla-icon").remove(),a.append('<i class="layui-icon layui-colla-icon">'+(e?"&#xe602;":"&#xe61a;")+"</i>"),a.off("click",k.collapse).on("click",k.collapse)})})}};return e[t]?e[t]():layui.each(e,function(t,a){a()})},a.prototype.render=a.prototype.init;var i=new a,e=c(document);i.render();var l=".layui-tab-title li";e.on("click",l,k.tabClick),e.on("click",k.hideTabMore),c(window).on("resize",k.tabAuto),t(d,i)});