layui.define(function(e){"use strict";var p={open:"{{",close:"}}"},a={exp:function(e){return new RegExp(e,"g")},query:function(e,r,c){var n=["#([\\s\\S])+?","([^{#}])*?"][e||0];return l((r||"")+p.open+n+p.close+(c||""))},escape:function(e){return String(e||"").replace(/&(?!#?[a-zA-Z0-9]+;)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&#39;").replace(/"/g,"&quot;")},error:function(e,r){var c="Laytpl Error：";return"object"==typeof console&&console.error(c+e+"\n"+(r||"")),c+e}},l=a.exp,r=function(e){this.tpl=e};r.pt=r.prototype,window.errors=0,r.pt.parse=function(e,r){var c=this,n=e,t=l("^"+p.open+"#",""),o=l(p.close+"$","");e=e.replace(/\s+|\r|\t|\n/g," ").replace(l(p.open+"#"),p.open+"# ").replace(l(p.close+"}"),"} "+p.close).replace(/\\/g,"\\\\").replace(l(p.open+"!(.+?)!"+p.close),function(e){return e=e.replace(l("^"+p.open+"!"),"").replace(l("!"+p.close),"").replace(l(p.open+"|"+p.close),function(e){return e.replace(/(.)/g,"\\$1")})}).replace(/(?="|')/g,"\\").replace(a.query(),function(e){return e=e.replace(t,"").replace(o,""),'";'+e.replace(/\\/g,"")+';view+="'}).replace(a.query(1),function(e){var r='"+(';return e.replace(/\s/g,"")===p.open+p.close?"":(e=e.replace(l(p.open+"|"+p.close),""),/^=/.test(e)&&(e=e.replace(/^=/,""),r='"+_escape_('),r+e.replace(/\\/g,"")+')+"')}),e='"use strict";var view = "'+e+'";return view;';try{return c.cache=e=new Function("d, _escape_",e),e(r,a.escape)}catch(e){return delete c.cache,a.error(e,n)}},r.pt.render=function(e,r){var c,n=this;return e?(c=n.cache?n.cache(e,a.escape):n.parse(n.tpl,e),r?void r(c):c):a.error("no data")};var c=function(e){return"string"!=typeof e?a.error("Template not found"):new r(e)};c.config=function(e){e=e||{};for(var r in e)p[r]=e[r]},c.v="1.2.0",e("laytpl",c)});