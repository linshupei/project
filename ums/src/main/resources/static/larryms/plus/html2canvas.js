(function(xe,ve,ke){var Ce={},a,o,e;Ce.Util={};Ce.Util.log=function(e){if(Ce.logging&&xe.console&&xe.console.log){xe.console.log(e)}};Ce.Util.trimText=function(t){return function(e){return t?t.apply(e):((e||"")+"").replace(/^\s+|\s+$/g,"")}}(String.prototype.trim);Ce.Util.asFloat=function(e){return parseFloat(e)};(function(){var a=/((rgba|rgb)\([^\)]+\)(\s-?\d+px){0,})/g;var o=/(-?\d+px)|(#.+)|(rgb\(.+\))|(rgba\(.+\))/g;Ce.Util.parseTextShadows=function(e){if(!e||e==="none"){return[]}var t=e.match(a),n=[];for(var r=0;t&&r<t.length;r++){var i=t[r].match(o);n.push({color:i[0],offsetX:i[1]?i[1].replace("px",""):0,offsetY:i[2]?i[2].replace("px",""):0,blur:i[3]?i[3].replace("px",""):0})}return n}})();Ce.Util.parseBackgroundImage=function(e){var t=" \r\n\t",n,r,i,a,o,l=[],s,c=0,d=0,f,u;var h=function(){if(n){if(r.substr(0,1)==='"'){r=r.substr(1,r.length-2)}if(r){u.push(r)}if(n.substr(0,1)==="-"&&(a=n.indexOf("-",1)+1)>0){i=n.substr(0,a);n=n.substr(a)}l.push({prefix:i,method:n.toLowerCase(),value:o,args:u})}u=[];n=i=r=o=""};h();for(var p=0,g=e.length;p<g;p++){s=e[p];if(c===0&&t.indexOf(s)>-1){continue}switch(s){case'"':if(!f){f=s}else if(f===s){f=null}break;case"(":if(f){break}else if(c===0){c=1;o+=s;continue}else{d++}break;case")":if(f){break}else if(c===1){if(d===0){c=0;o+=s;h();continue}else{d--}}break;case",":if(f){break}else if(c===0){h();continue}else if(c===1){if(d===0&&!n.match(/^url$/i)){u.push(r);r="";o+=s;continue}}break}o+=s;if(c===0){n+=s}else{r+=s}}h();return l};Ce.Util.Bounds=function(e){var t,n={};if(e.getBoundingClientRect){t=e.getBoundingClientRect();n.top=t.top;n.bottom=t.bottom||t.top+t.height;n.left=t.left;n.width=e.offsetWidth;n.height=e.offsetHeight}return n};Ce.Util.OffsetBounds=function(e){var t=e.offsetParent?Ce.Util.OffsetBounds(e.offsetParent):{top:0,left:0};return{top:e.offsetTop+t.top,bottom:e.offsetTop+e.offsetHeight+t.top,left:e.offsetLeft+t.left,width:e.offsetWidth,height:e.offsetHeight}};function i(e,t,n){var r=e.runtimeStyle&&e.runtimeStyle[t],i,a=e.style;if(!/^-?[0-9]+\.?[0-9]*(?:px)?$/i.test(n)&&/^-?\d/.test(n)){i=a.left;if(r){e.runtimeStyle.left=e.currentStyle.left}a.left=t==="fontSize"?"1em":n||0;n=a.pixelLeft+"px";a.left=i;if(r){e.runtimeStyle.left=r}}if(!/^(thin|medium|thick)$/i.test(n)){return Math.round(parseFloat(n))+"px"}return n}function l(e){return parseInt(e,10)}function s(e){return e.toString().indexOf("%")!==-1}function c(e,t,n,r){e=(e||"").split(",");e=e[r||0]||e[0]||"auto";e=Ce.Util.trimText(e).split(" ");if(n==="backgroundSize"&&(e[0]&&e[0].match(/^(cover|contain|auto)$/))){return e}else{e[0]=e[0].indexOf("%")===-1?i(t,n+"X",e[0]):e[0];if(e[1]===ke){if(n==="backgroundSize"){e[1]="auto";return e}else{e[1]=e[0]}}e[1]=e[1].indexOf("%")===-1?i(t,n+"Y",e[1]):e[1]}return e}Ce.Util.getCSS=function(e,t,n){if(a!==e){o=ve.defaultView.getComputedStyle(e,null)}var r=o[t];if(/^background(Size|Position)$/.test(t)){return c(r,e,t,n)}else if(/border(Top|Bottom)(Left|Right)Radius/.test(t)){var i=r.split(" ");if(i.length<=1){i[1]=i[0]}return i.map(l)}return r};Ce.Util.resizeBounds=function(e,t,n,r,i){var a=n/r,o=e/t,l,s;if(!i||i==="auto"){l=n;s=r}else if(a<o^i==="contain"){s=r;l=r*o}else{l=n;s=n/o}return{width:l,height:s}};Ce.Util.BackgroundPosition=function(e,t,n,r,i){var a=Ce.Util.getCSS(e,"backgroundPosition",r),o,l;if(a.length===1){a=[a[0],a[0]]}if(s(a[0])){o=(t.width-(i||n).width)*(parseFloat(a[0])/100)}else{o=parseInt(a[0],10)}if(a[1]==="auto"){l=o/n.width*n.height}else if(s(a[1])){l=(t.height-(i||n).height)*parseFloat(a[1])/100}else{l=parseInt(a[1],10)}if(a[0]==="auto"){o=l/n.height*n.width}return{left:o,top:l}};Ce.Util.BackgroundSize=function(e,t,n,r){var i=Ce.Util.getCSS(e,"backgroundSize",r),a,o;if(i.length===1){i=[i[0],i[0]]}if(s(i[0])){a=t.width*parseFloat(i[0])/100}else if(/contain|cover/.test(i[0])){return Ce.Util.resizeBounds(n.width,n.height,t.width,t.height,i[0])}else{a=parseInt(i[0],10)}if(i[0]==="auto"&&i[1]==="auto"){o=n.height}else if(i[1]==="auto"){o=a/n.width*n.height}else if(s(i[1])){o=t.height*parseFloat(i[1])/100}else{o=parseInt(i[1],10)}if(i[0]==="auto"){a=o/n.height*n.width}return{width:a,height:o}};Ce.Util.BackgroundRepeat=function(e,t){var n=Ce.Util.getCSS(e,"backgroundRepeat").split(",").map(Ce.Util.trimText);return n[t]||n[0]};Ce.Util.Extend=function(e,t){for(var n in e){if(e.hasOwnProperty(n)){t[n]=e[n]}}return t};Ce.Util.Children=function(e){var t;try{t=e.nodeName&&e.nodeName.toUpperCase()==="IFRAME"?e.contentDocument||e.contentWindow.document:function(e){var t=[];if(e!==null){(function(e,t){var n=e.length,r=0;if(typeof t.length==="number"){for(var i=t.length;r<i;r++){e[n++]=t[r]}}else{while(t[r]!==ke){e[n++]=t[r++]}}e.length=n;return e})(t,e)}return t}(e.childNodes)}catch(e){Ce.Util.log("html2canvas.Util.Children failed with exception: "+e.message);t=[]}return t};Ce.Util.isTransparent=function(e){return!e||e==="transparent"||e==="rgba(0, 0, 0, 0)"};Ce.Util.Font=function(){var d={};return function(e,t,n){if(d[e+"-"+t]!==ke){return d[e+"-"+t]}var r=n.createElement("div"),i=n.createElement("img"),a=n.createElement("span"),o="Hidden Text",l,s,c;r.style.visibility="hidden";r.style.fontFamily=e;r.style.fontSize=t;r.style.margin=0;r.style.padding=0;n.body.appendChild(r);i.src="data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACwAAAAAAQABAAACAkQBADs=";i.width=1;i.height=1;i.style.margin=0;i.style.padding=0;i.style.verticalAlign="baseline";a.style.fontFamily=e;a.style.fontSize=t;a.style.margin=0;a.style.padding=0;a.appendChild(n.createTextNode(o));r.appendChild(a);r.appendChild(i);l=i.offsetTop-a.offsetTop+1;r.removeChild(a);r.appendChild(n.createTextNode(o));r.style.lineHeight="normal";i.style.verticalAlign="super";s=i.offsetTop-r.offsetTop+1;c={baseline:l,lineWidth:1,middle:s};d[e+"-"+t]=c;n.body.removeChild(r);return c}}();(function(){var n=Ce.Util,e={};Ce.Generate=e;var g=[/^(-webkit-linear-gradient)\(([a-z\s]+)([\w\d\.\s,%\(\)]+)\)$/,/^(-o-linear-gradient)\(([a-z\s]+)([\w\d\.\s,%\(\)]+)\)$/,/^(-webkit-gradient)\((linear|radial),\s((?:\d{1,3}%?)\s(?:\d{1,3}%?),\s(?:\d{1,3}%?)\s(?:\d{1,3}%?))([\w\d\.\s,%\(\)\-]+)\)$/,/^(-moz-linear-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?))([\w\d\.\s,%\(\)]+)\)$/,/^(-webkit-radial-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?)),\s(\w+)\s([a-z\-]+)([\w\d\.\s,%\(\)]+)\)$/,/^(-moz-radial-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?)),\s(\w+)\s?([a-z\-]*)([\w\d\.\s,%\(\)]+)\)$/,/^(-o-radial-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?)),\s(\w+)\s([a-z\-]+)([\w\d\.\s,%\(\)]+)\)$/];e.parseGradient=function(e,t){var n,r,i=g.length,a,o,l,s,c,d,f,u,h,p;for(r=0;r<i;r+=1){a=e.match(g[r]);if(a){break}}if(a){switch(a[1]){case"-webkit-linear-gradient":case"-o-linear-gradient":n={type:"linear",x0:null,y0:null,x1:null,y1:null,colorStops:[]};l=a[2].match(/\w+/g);if(l){s=l.length;for(r=0;r<s;r+=1){switch(l[r]){case"top":n.y0=0;n.y1=t.height;break;case"right":n.x0=t.width;n.x1=0;break;case"bottom":n.y0=t.height;n.y1=0;break;case"left":n.x0=0;n.x1=t.width;break}}}if(n.x0===null&&n.x1===null){n.x0=n.x1=t.width/2}if(n.y0===null&&n.y1===null){n.y0=n.y1=t.height/2}l=a[3].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)(?:\s\d{1,3}(?:%|px))?)+/g);if(l){s=l.length;c=1/Math.max(s-1,1);for(r=0;r<s;r+=1){d=l[r].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\s*(\d{1,3})?(%|px)?/);if(d[2]){o=parseFloat(d[2]);if(d[3]==="%"){o/=100}else{o/=t.width}}else{o=r*c}n.colorStops.push({color:d[1],stop:o})}}break;case"-webkit-gradient":n={type:a[2]==="radial"?"circle":a[2],x0:0,y0:0,x1:0,y1:0,colorStops:[]};l=a[3].match(/(\d{1,3})%?\s(\d{1,3})%?,\s(\d{1,3})%?\s(\d{1,3})%?/);if(l){n.x0=l[1]*t.width/100;n.y0=l[2]*t.height/100;n.x1=l[3]*t.width/100;n.y1=l[4]*t.height/100}l=a[4].match(/((?:from|to|color-stop)\((?:[0-9\.]+,\s)?(?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)\))+/g);if(l){s=l.length;for(r=0;r<s;r+=1){d=l[r].match(/(from|to|color-stop)\(([0-9\.]+)?(?:,\s)?((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\)/);o=parseFloat(d[2]);if(d[1]==="from"){o=0}if(d[1]==="to"){o=1}n.colorStops.push({color:d[3],stop:o})}}break;case"-moz-linear-gradient":n={type:"linear",x0:0,y0:0,x1:0,y1:0,colorStops:[]};l=a[2].match(/(\d{1,3})%?\s(\d{1,3})%?/);if(l){n.x0=l[1]*t.width/100;n.y0=l[2]*t.height/100;n.x1=t.width-n.x0;n.y1=t.height-n.y0}l=a[3].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)(?:\s\d{1,3}%)?)+/g);if(l){s=l.length;c=1/Math.max(s-1,1);for(r=0;r<s;r+=1){d=l[r].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\s*(\d{1,3})?(%)?/);if(d[2]){o=parseFloat(d[2]);if(d[3]){o/=100}}else{o=r*c}n.colorStops.push({color:d[1],stop:o})}}break;case"-webkit-radial-gradient":case"-moz-radial-gradient":case"-o-radial-gradient":n={type:"circle",x0:0,y0:0,x1:t.width,y1:t.height,cx:0,cy:0,rx:0,ry:0,colorStops:[]};l=a[2].match(/(\d{1,3})%?\s(\d{1,3})%?/);if(l){n.cx=l[1]*t.width/100;n.cy=l[2]*t.height/100}l=a[3].match(/\w+/);d=a[4].match(/[a-z\-]*/);if(l&&d){switch(d[0]){case"farthest-corner":case"cover":case"":f=Math.sqrt(Math.pow(n.cx,2)+Math.pow(n.cy,2));u=Math.sqrt(Math.pow(n.cx,2)+Math.pow(n.y1-n.cy,2));h=Math.sqrt(Math.pow(n.x1-n.cx,2)+Math.pow(n.y1-n.cy,2));p=Math.sqrt(Math.pow(n.x1-n.cx,2)+Math.pow(n.cy,2));n.rx=n.ry=Math.max(f,u,h,p);break;case"closest-corner":f=Math.sqrt(Math.pow(n.cx,2)+Math.pow(n.cy,2));u=Math.sqrt(Math.pow(n.cx,2)+Math.pow(n.y1-n.cy,2));h=Math.sqrt(Math.pow(n.x1-n.cx,2)+Math.pow(n.y1-n.cy,2));p=Math.sqrt(Math.pow(n.x1-n.cx,2)+Math.pow(n.cy,2));n.rx=n.ry=Math.min(f,u,h,p);break;case"farthest-side":if(l[0]==="circle"){n.rx=n.ry=Math.max(n.cx,n.cy,n.x1-n.cx,n.y1-n.cy)}else{n.type=l[0];n.rx=Math.max(n.cx,n.x1-n.cx);n.ry=Math.max(n.cy,n.y1-n.cy)}break;case"closest-side":case"contain":if(l[0]==="circle"){n.rx=n.ry=Math.min(n.cx,n.cy,n.x1-n.cx,n.y1-n.cy)}else{n.type=l[0];n.rx=Math.min(n.cx,n.x1-n.cx);n.ry=Math.min(n.cy,n.y1-n.cy)}break}}l=a[5].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)(?:\s\d{1,3}(?:%|px))?)+/g);if(l){s=l.length;c=1/Math.max(s-1,1);for(r=0;r<s;r+=1){d=l[r].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\s*(\d{1,3})?(%|px)?/);if(d[2]){o=parseFloat(d[2]);if(d[3]==="%"){o/=100}else{o/=t.width}}else{o=r*c}n.colorStops.push({color:d[1],stop:o})}}break}}return n};function d(e){return function(t){try{e.addColorStop(t.stop,t.color)}catch(e){n.log(["failed to add color stop: ",e,"; tried to add: ",t])}}}e.Gradient=function(e,t){if(t.width===0||t.height===0){return}var n=ve.createElement("canvas"),r=n.getContext("2d"),i,a;n.width=t.width;n.height=t.height;i=Ce.Generate.parseGradient(e,t);if(i){switch(i.type){case"linear":a=r.createLinearGradient(i.x0,i.y0,i.x1,i.y1);i.colorStops.forEach(d(a));r.fillStyle=a;r.fillRect(0,0,t.width,t.height);break;case"circle":a=r.createRadialGradient(i.cx,i.cy,0,i.cx,i.cy,i.rx);i.colorStops.forEach(d(a));r.fillStyle=a;r.fillRect(0,0,t.width,t.height);break;case"ellipse":var o=ve.createElement("canvas"),l=o.getContext("2d"),s=Math.max(i.rx,i.ry),c=s*2;o.width=o.height=c;a=l.createRadialGradient(i.rx,i.ry,0,i.rx,i.ry,s);i.colorStops.forEach(d(a));l.fillStyle=a;l.fillRect(0,0,c,c);r.fillStyle=i.colorStops[i.colorStops.length-1].color;r.fillRect(0,0,n.width,n.height);r.drawImage(o,i.cx-i.rx,i.cy-i.ry,2*i.rx,2*i.ry);break}}return n};e.ListAlpha=function(e){var t="",n;do{n=e%26;t=String.fromCharCode(n+64)+t;e=e/26}while(e*26>26);return t};e.ListRoman=function(e){var t=["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"],n=[1e3,900,500,400,100,90,50,40,10,9,5,4,1],r="",i,a=t.length;if(e<=0||e>=4e3){return e}for(i=0;i<a;i+=1){while(e>=n[i]){e-=n[i];r+=t[i]}}return r}})();function Te(e,t){var n=[];return{storage:n,width:e,height:t,clip:function(){n.push({type:"function",name:"clip",arguments:arguments})},translate:function(){n.push({type:"function",name:"translate",arguments:arguments})},fill:function(){n.push({type:"function",name:"fill",arguments:arguments})},save:function(){n.push({type:"function",name:"save",arguments:arguments})},restore:function(){n.push({type:"function",name:"restore",arguments:arguments})},fillRect:function(){n.push({type:"function",name:"fillRect",arguments:arguments})},createPattern:function(){n.push({type:"function",name:"createPattern",arguments:arguments})},drawShape:function(){var e=[];n.push({type:"function",name:"drawShape",arguments:e});return{moveTo:function(){e.push({name:"moveTo",arguments:arguments})},lineTo:function(){e.push({name:"lineTo",arguments:arguments})},arcTo:function(){e.push({name:"arcTo",arguments:arguments})},bezierCurveTo:function(){e.push({name:"bezierCurveTo",arguments:arguments})},quadraticCurveTo:function(){e.push({name:"quadraticCurveTo",arguments:arguments})}}},drawImage:function(){n.push({type:"function",name:"drawImage",arguments:arguments})},fillText:function(){n.push({type:"function",name:"fillText",arguments:arguments})},setVariable:function(e,t){n.push({type:"variable",name:e,arguments:t});return t}}}Ce.Parse=function(n,d,r){xe.scroll(0,0);var i=d.elements===ke?ve.body:d.elements[0],o=0,c=i.ownerDocument,u=Ce.Util,l=u.Support(d,c),h=new RegExp("("+d.ignoreElements+")"),s=c.body,p=u.getCSS,f="___html2canvas___pseudoelement",a=c.createElement("style");a.innerHTML="."+f+'-parent:before { content: "" !important; display: none !important; }'+"."+f+'-parent:after { content: "" !important; display: none !important; }';s.appendChild(a);n=n||{};e();function e(){var e=p(ve.documentElement,"backgroundColor"),t=u.isTransparent(e)&&i===ve.body,n=me(i,null,false,t);g(i);we(i,n,function(){if(t){e=n.backgroundColor}m();u.log("Done parsing, moving to Render.");r({backgroundColor:e,stack:n})})}function g(e){var r=[],l=[];t();n(e);a();function t(){var e=/:before|:after/;var t=ve.styleSheets;for(var n=0,r=t.length;n<r;n++){try{var i=t[n].cssRules;for(var a=0,o=i.length;a<o;a++){if(e.test(i[a].selectorText)){l.push(i[a].selectorText)}}}catch(e){}}for(n=0,r=l.length;n<r;n++){l[n]=l[n].match(/(^[^:]*)/)[1]}}function n(e){var t=ve.querySelectorAll(l.join(","));for(var n=0,r=t.length;n<r;n++){i(t[n])}}function i(e){var t=ne(e,":before"),n=ne(e,":after");if(t){r.push({type:"before",pseudo:t,el:e})}if(n){r.push({type:"after",pseudo:n,el:e})}}function a(){r.forEach(function(e){y(e.el,f+"-parent")});r.forEach(function(e){if(e.type==="before"){e.el.insertBefore(e.pseudo,e.el.firstChild)}else{e.el.appendChild(e.pseudo)}})}}function m(){s.removeChild(a);var e=ve.getElementsByClassName(f+"-element");while(e.length){e[0].parentNode.removeChild(e[0])}var t=ve.getElementsByClassName(f+"-parent");while(t.length){b(t[0],f+"-parent")}}function y(e,t){if(e.classList){e.classList.add(t)}else{e.className=e.className+" "+t}}function b(e,t){if(e.classList){e.classList.remove(t)}else{e.className=e.className.replace(t,"").trim()}}function t(e,t){return e.className.indexOf(t)>-1}function w(e){return Array.prototype.slice.call(e)}function x(){return Math.max(Math.max(c.body.scrollWidth,c.documentElement.scrollWidth),Math.max(c.body.offsetWidth,c.documentElement.offsetWidth),Math.max(c.body.clientWidth,c.documentElement.clientWidth))}function v(){return Math.max(Math.max(c.body.scrollHeight,c.documentElement.scrollHeight),Math.max(c.body.offsetHeight,c.documentElement.offsetHeight),Math.max(c.body.clientHeight,c.documentElement.clientHeight))}function k(e,t){var n=parseInt(p(e,t),10);return isNaN(n)?0:n}function C(e,t,n,r,i,a){if(a!=="transparent"){e.setVariable("fillStyle",a);e.fillRect(t,n,r,i);o+=1}}function T(e,t,n){if(e.length>0){return t+n.toUpperCase()}}function S(e,t){switch(t){case"lowercase":return e.toLowerCase();case"capitalize":return e.replace(/(^|\s|:|-|\(|\))([a-z])/g,T);case"uppercase":return e.toUpperCase();default:return e}}function E(e){return/^(normal|none|0px)$/.test(e)}function R(e,t,n,r){if(e!==null&&u.trimText(e).length>0){r.fillText(e,t,n);o+=1}}function M(e,t,n,r){var i=false,a=p(t,"fontWeight"),o=p(t,"fontFamily"),l=p(t,"fontSize"),s=u.parseTextShadows(p(t,"textShadow"));switch(parseInt(a,10)){case 401:a="bold";break;case 400:a="normal";break}e.setVariable("fillStyle",r);e.setVariable("font",[p(t,"fontStyle"),p(t,"fontVariant"),a,l,o].join(" "));e.setVariable("textAlign",i?"right":"left");if(s.length){e.setVariable("shadowColor",s[0].color);e.setVariable("shadowOffsetX",s[0].offsetX);e.setVariable("shadowOffsetY",s[0].offsetY);e.setVariable("shadowBlur",s[0].blur)}if(n!=="none"){return u.Font(o,l,c)}}function I(e,t,n,r,i){switch(t){case"underline":C(e,n.left,Math.round(n.top+r.baseline+r.lineWidth),n.width,1,i);break;case"overline":C(e,n.left,Math.round(n.top),n.width,1,i);break;case"line-through":C(e,n.left,Math.ceil(n.top+r.middle+r.lineWidth),n.width,1,i);break}}function L(e,t,n,r,i){var a;if(l.rangeBounds&&!i){if(n!=="none"||u.trimText(t).length!==0){a=O(t,e.node,e.textOffset)}e.textOffset+=t.length}else if(e.node&&typeof e.node.nodeValue==="string"){var o=r?e.node.splitText(t.length):null;a=z(e.node,i);e.node=o}return a}function O(e,t,n){var r=c.createRange();r.setStart(t,n);r.setEnd(t,n+e.length);return r.getBoundingClientRect()}function z(e,t){var n=e.parentNode,r=c.createElement("wrapper"),i=e.cloneNode(true);r.appendChild(e.cloneNode(true));n.replaceChild(r,e);var a=t?u.OffsetBounds(r):u.Bounds(r);n.replaceChild(i,r);return a}function A(e,t,r){var i=r.ctx,a=p(e,"color"),o=p(e,"textDecoration"),n=p(e,"textAlign"),l,s,c={node:t,textOffset:0};if(u.trimText(t.nodeValue).length>0){t.nodeValue=S(t.nodeValue,p(e,"textTransform"));n=n.replace(["-webkit-auto"],["auto"]);s=!d.letterRendering&&/^(left|right|justify|auto)$/.test(n)&&E(p(e,"letterSpacing"))?t.nodeValue.split(/(\b| )/):t.nodeValue.split("");l=M(i,e,o,a);if(d.chinese){s.forEach(function(e,t){if(/.*[\u4E00-\u9FA5].*$/.test(e)){e=e.split("");e.unshift(t,1);s.splice.apply(s,e)}})}s.forEach(function(e,t){var n=L(c,e,o,t<s.length-1,r.transform.matrix);if(n){R(e,n.left,n.bottom,i);I(i,o,n,l,a)}})}}function B(e,t){var n=c.createElement("boundelement"),r,i;n.style.display="inline";r=e.style.listStyleType;e.style.listStyleType="none";n.appendChild(c.createTextNode(t));e.insertBefore(n,e.firstChild);i=u.Bounds(n);e.removeChild(n);e.style.listStyleType=r;return i}function U(e){var t=-1,n=1,r=e.parentNode.childNodes;if(e.parentNode){while(r[++t]!==e){if(r[t].nodeType===1){n++}}return n}else{return-1}}function N(e,t){var n=U(e),r;switch(t){case"decimal":r=n;break;case"decimal-leading-zero":r=n.toString().length===1?n="0"+n.toString():n.toString();break;case"upper-roman":r=Ce.Generate.ListRoman(n);break;case"lower-roman":r=Ce.Generate.ListRoman(n).toLowerCase();break;case"lower-alpha":r=Ce.Generate.ListAlpha(n).toLowerCase();break;case"upper-alpha":r=Ce.Generate.ListAlpha(n);break}return r+". "}function P(e,t,n){var r,i,a=t.ctx,o=p(e,"listStyleType"),l;if(/^(decimal|decimal-leading-zero|upper-alpha|upper-latin|upper-roman|lower-alpha|lower-greek|lower-latin|lower-roman)$/i.test(o)){i=N(e,o);l=B(e,i);M(a,e,"none",p(e,"color"));if(p(e,"listStylePosition")==="inside"){a.setVariable("textAlign","left");r=n.left}else{return}R(i,r,l.bottom,a)}}function F(e){var t=n[e];return t&&t.succeeded===true?t.img:false}function V(e,t){var n=Math.max(e.left,t.left),r=Math.max(e.top,t.top),i=Math.min(e.left+e.width,t.left+t.width),a=Math.min(e.top+e.height,t.top+t.height);return{left:n,top:r,width:i-n,height:a-r}}function D(e,t,n){var r,i=t.cssPosition!=="static",a=i?p(e,"zIndex"):"auto",o=p(e,"opacity"),l=p(e,"cssFloat")!=="none";t.zIndex=r=$(a);r.isPositioned=i;r.isFloated=l;r.opacity=o;r.ownStacking=a!=="auto"||o<1;r.depth=n?n.zIndex.depth+1:0;if(n){n.zIndex.children.push(t)}}function $(e){return{depth:0,zindex:e,children:[]}}function G(e,t,n,r,i){var a=k(t,"paddingLeft"),o=k(t,"paddingTop"),l=k(t,"paddingRight"),s=k(t,"paddingBottom");te(e,n,0,0,n.width,n.height,r.left+a+i[3].width,r.top+o+i[0].width,r.width-(i[1].width+i[3].width+a+l),r.height-(i[0].width+i[2].width+o+s))}function W(t){return["Top","Right","Bottom","Left"].map(function(e){return{width:k(t,"border"+e+"Width"),color:p(t,"border"+e+"Color")}})}function H(t){return["TopLeft","TopRight","BottomRight","BottomLeft"].map(function(e){return p(t,"border"+e+"Radius")})}function j(e,t,n,r){var i=4*((Math.sqrt(2)-1)/3);var a=n*i,o=r*i,l=e+n,s=t+r;return{topLeft:q({x:e,y:s},{x:e,y:s-o},{x:l-a,y:t},{x:l,y:t}),topRight:q({x:e,y:t},{x:e+a,y:t},{x:l,y:s-o},{x:l,y:s}),bottomRight:q({x:l,y:t},{x:l,y:t+o},{x:e+a,y:s},{x:e,y:s}),bottomLeft:q({x:l,y:s},{x:l-a,y:s},{x:e,y:t+o},{x:e,y:t})}}function q(l,s,c,d){var f=function(e,t,n){return{x:e.x+(t.x-e.x)*n,y:e.y+(t.y-e.y)*n}};return{start:l,startControl:s,endControl:c,end:d,subdivide:function(e){var t=f(l,s,e),n=f(s,c,e),r=f(c,d,e),i=f(t,n,e),a=f(n,r,e),o=f(i,a,e);return[q(l,t,i,o),q(o,a,r,d)]},curveTo:function(e){e.push(["bezierCurve",s.x,s.y,c.x,c.y,d.x,d.y])},curveToReversed:function(e){e.push(["bezierCurve",c.x,c.y,s.x,s.y,l.x,l.y])}}}function X(e,t,n,r,i,a,o){if(t[0]>0||t[1]>0){e.push(["line",r[0].start.x,r[0].start.y]);r[0].curveTo(e);r[1].curveTo(e)}else{e.push(["line",a,o])}if(n[0]>0||n[1]>0){e.push(["line",i[0].start.x,i[0].start.y])}}function _(e,t,n,r,i,a,o){var l=[];if(t[0]>0||t[1]>0){l.push(["line",r[1].start.x,r[1].start.y]);r[1].curveTo(l)}else{l.push(["line",e.c1[0],e.c1[1]])}if(n[0]>0||n[1]>0){l.push(["line",a[0].start.x,a[0].start.y]);a[0].curveTo(l);l.push(["line",o[0].end.x,o[0].end.y]);o[0].curveToReversed(l)}else{l.push(["line",e.c2[0],e.c2[1]]);l.push(["line",e.c3[0],e.c3[1]])}if(t[0]>0||t[1]>0){l.push(["line",i[1].end.x,i[1].end.y]);i[1].curveToReversed(l)}else{l.push(["line",e.c4[0],e.c4[1]])}return l}function Y(e,t,n){var r=e.left,i=e.top,a=e.width,o=e.height,l=t[0][0],s=t[0][1],c=t[1][0],d=t[1][1],f=t[2][0],u=t[2][1],h=t[3][0],p=t[3][1],g=a-c,m=o-u,y=a-f,b=o-p;return{topLeftOuter:j(r,i,l,s).topLeft.subdivide(.5),topLeftInner:j(r+n[3].width,i+n[0].width,Math.max(0,l-n[3].width),Math.max(0,s-n[0].width)).topLeft.subdivide(.5),topRightOuter:j(r+g,i,c,d).topRight.subdivide(.5),topRightInner:j(r+Math.min(g,a+n[3].width),i+n[0].width,g>a+n[3].width?0:c-n[3].width,d-n[0].width).topRight.subdivide(.5),bottomRightOuter:j(r+y,i+m,f,u).bottomRight.subdivide(.5),bottomRightInner:j(r+Math.min(y,a+n[3].width),i+Math.min(m,o+n[0].width),Math.max(0,f-n[1].width),Math.max(0,u-n[2].width)).bottomRight.subdivide(.5),bottomLeftOuter:j(r,i+b,h,p).bottomLeft.subdivide(.5),bottomLeftInner:j(r+n[3].width,i+b,Math.max(0,h-n[3].width),Math.max(0,p-n[2].width)).bottomLeft.subdivide(.5)}}function Q(e,t,n,r,i){var a=p(e,"backgroundClip"),o=[];switch(a){case"content-box":case"padding-box":X(o,r[0],r[1],t.topLeftInner,t.topRightInner,i.left+n[3].width,i.top+n[0].width);X(o,r[1],r[2],t.topRightInner,t.bottomRightInner,i.left+i.width-n[1].width,i.top+n[0].width);X(o,r[2],r[3],t.bottomRightInner,t.bottomLeftInner,i.left+i.width-n[1].width,i.top+i.height-n[2].width);X(o,r[3],r[0],t.bottomLeftInner,t.topLeftInner,i.left+n[3].width,i.top+i.height-n[2].width);break;default:X(o,r[0],r[1],t.topLeftOuter,t.topRightOuter,i.left,i.top);X(o,r[1],r[2],t.topRightOuter,t.bottomRightOuter,i.left+i.width,i.top);X(o,r[2],r[3],t.bottomRightOuter,t.bottomLeftOuter,i.left+i.width,i.top+i.height);X(o,r[3],r[0],t.bottomLeftOuter,t.topLeftOuter,i.left,i.top+i.height);break}return o}function J(e,t,n){var r=t.left,i=t.top,a=t.width,o=t.height,l,s,c,d,f,u,h=H(e),p=Y(t,h,n),g={clip:Q(e,p,n,h,t),borders:[]};for(l=0;l<4;l++){if(n[l].width>0){s=r;c=i;d=a;f=o-n[2].width;switch(l){case 0:f=n[0].width;u=_({c1:[s,c],c2:[s+d,c],c3:[s+d-n[1].width,c+f],c4:[s+n[3].width,c+f]},h[0],h[1],p.topLeftOuter,p.topLeftInner,p.topRightOuter,p.topRightInner);break;case 1:s=r+a-n[1].width;d=n[1].width;u=_({c1:[s+d,c],c2:[s+d,c+f+n[2].width],c3:[s,c+f],c4:[s,c+n[0].width]},h[1],h[2],p.topRightOuter,p.topRightInner,p.bottomRightOuter,p.bottomRightInner);break;case 2:c=c+o-n[2].width;f=n[2].width;u=_({c1:[s+d,c+f],c2:[s,c+f],c3:[s+n[3].width,c],c4:[s+d-n[3].width,c]},h[2],h[3],p.bottomRightOuter,p.bottomRightInner,p.bottomLeftOuter,p.bottomLeftInner);break;case 3:d=n[3].width;u=_({c1:[s,c+f+n[2].width],c2:[s,c],c3:[s+d,c+n[0].width],c4:[s+d,c+f]},h[3],h[0],p.bottomLeftOuter,p.bottomLeftInner,p.topLeftOuter,p.topLeftInner);break}g.borders.push({args:u,color:n[l].color})}}return g}function K(e,t){var n=e.drawShape();t.forEach(function(e,t){n[t===0?"moveTo":e[0]+"To"].apply(null,e.slice(1))});return n}function Z(e,t,n){if(n!=="transparent"){e.setVariable("fillStyle",n);K(e,t);e.fill();o+=1}}function ee(t,e,n){var r=c.createElement("valuewrap"),i=["lineHeight","textAlign","fontFamily","color","fontSize","paddingLeft","paddingTop","width","height","border","borderLeftWidth","borderTopWidth"],a,o;i.forEach(function(e){try{r.style[e]=p(t,e)}catch(e){u.log("html2canvas: Parse: Exception caught in renderFormValue: "+e.message)}});r.style.borderColor="black";r.style.borderStyle="solid";r.style.display="block";r.style.position="absolute";if(/^(submit|reset|button|text|password)$/.test(t.type)||t.nodeName==="SELECT"){r.style.lineHeight=p(t,"height")}r.style.top=e.top+"px";r.style.left=e.left+"px";a=t.nodeName==="SELECT"?(t.options[t.selectedIndex]||0).text:t.value;if(!a){a=t.placeholder}o=c.createTextNode(a);r.appendChild(o);s.appendChild(r);A(t,o,n);s.removeChild(r)}function te(e){e.drawImage.apply(e,Array.prototype.slice.call(arguments,1));o+=1}function ne(e,t){var n=xe.getComputedStyle(e,t);var r=xe.getComputedStyle(e);if(!n||!n.content||n.content==="none"||n.content==="-moz-alt-content"||n.display==="none"||r.content===n.content){return}var i=n.content+"";if(i[0]==="'"||i[0]==='"'){i=i.replace(/(^['"])|(['"]$)/g,"")}var a=i.substr(0,3)==="url",o=ve.createElement(a?"img":"span");o.className=f+"-element ";Object.keys(n).filter(re).forEach(function(t){try{o.style[t]=n[t]}catch(e){u.log(["Tried to assign readonly property ",t,"Error:",e])}});if(a){o.src=u.parseBackgroundImage(i)[0].args[0]}else{o.innerHTML=i}return o}function re(e){return isNaN(xe.parseInt(e,10))}function ie(e,t,n,r){var i=Math.round(r.left+n.left),a=Math.round(r.top+n.top);e.createPattern(t);e.translate(i,a);e.fill();e.translate(-i,-a)}function ae(e,t,n,r,i,a,o,l){var s=[];s.push(["line",Math.round(i),Math.round(a)]);s.push(["line",Math.round(i+o),Math.round(a)]);s.push(["line",Math.round(i+o),Math.round(l+a)]);s.push(["line",Math.round(i),Math.round(l+a)]);K(e,s);e.save();e.clip();ie(e,t,n,r);e.restore()}function oe(e,t,n){C(e,t.left,t.top,t.width,t.height,n)}function le(e,t,n,r,i){var a=u.BackgroundSize(e,t,r,i),o=u.BackgroundPosition(e,t,r,i,a),l=u.BackgroundRepeat(e,i);r=ce(r,a);switch(l){case"repeat-x":case"repeat no-repeat":ae(n,r,o,t,t.left,t.top+o.top,99999,r.height);break;case"repeat-y":case"no-repeat repeat":ae(n,r,o,t,t.left+o.left,t.top,r.width,99999);break;case"no-repeat":ae(n,r,o,t,t.left+o.left,t.top+o.top,r.width,r.height);break;default:ie(n,r,o,{top:t.top,left:t.left,width:r.width,height:r.height});break}}function se(e,t,n){var r=p(e,"backgroundImage"),i=u.parseBackgroundImage(r),a,o=i.length;while(o--){r=i[o];if(!r.args||r.args.length===0){continue}var l=r.method==="url"?r.args[0]:r.value;a=F(l);if(a){le(e,t,n,a,o)}else{u.log("html2canvas: Error loading background:",r)}}}function ce(e,t){if(e.width===t.width&&e.height===t.height){return e}var n,r=c.createElement("canvas");r.width=t.width;r.height=t.height;n=r.getContext("2d");te(n,e,0,0,e.width,e.height,0,0,t.width,t.height);return r}function de(e,t,n){return e.setVariable("globalAlpha",p(t,"opacity")*(n?n.opacity:1))}function fe(e){return e.replace("px","")}function ue(e,t){var n=/(matrix)\((.+)\)/;var r=p(e,"transform")||p(e,"-webkit-transform")||p(e,"-moz-transform")||p(e,"-ms-transform")||p(e,"-o-transform");var i=p(e,"transform-origin")||p(e,"-webkit-transform-origin")||p(e,"-moz-transform-origin")||p(e,"-ms-transform-origin")||p(e,"-o-transform-origin")||"0px 0px";i=i.split(" ").map(fe).map(u.asFloat);var a;if(r&&r!=="none"){var o=r.match(n);if(o){switch(o[1]){case"matrix":a=o[2].split(",").map(u.trimText).map(u.asFloat);break}}}return{origin:i,matrix:a}}function he(e,t,n,r){var i=Te(!t?x():n.width,!t?v():n.height),a={ctx:i,opacity:de(i,e,t),cssPosition:p(e,"position"),borders:W(e),transform:r,clip:t&&t.clip?u.Extend({},t.clip):null};D(e,a,t);if(d.useOverflow===true&&/(hidden|scroll|auto)/.test(p(e,"overflow"))===true&&/(BODY)/i.test(e.nodeName)===false){a.clip=a.clip?V(a.clip,n):n}return a}function pe(e,t,n){var r={left:t.left+e[3].width,top:t.top+e[0].width,width:t.width-(e[1].width+e[3].width),height:t.height-(e[0].width+e[2].width)};if(n){r=V(r,n)}return r}function ge(e,t){var n=t.matrix?u.OffsetBounds(e):u.Bounds(e);t.origin[0]+=n.left;t.origin[1]+=n.top;return n}function me(e,t,n){var r=ue(e,t),i=ge(e,r),a,o=he(e,t,i,r),l=o.borders,s=o.ctx,c=pe(l,i,o.clip),d=J(e,i,l),f=h.test(e.nodeName)?"#efefef":p(e,"backgroundColor");K(s,d.clip);s.save();s.clip();if(c.height>0&&c.width>0&&!n){oe(s,i,f);se(e,c,s)}else if(n){o.backgroundColor=f}s.restore();d.borders.forEach(function(e){Z(s,e.args,e.color)});switch(e.nodeName){case"IMG":if(a=F(e.getAttribute("src"))){G(s,e,a,i,l)}else{u.log("html2canvas: Error loading <img>:"+e.getAttribute("src"))}break;case"INPUT":if(/^(text|url|email|submit|button|reset)$/.test(e.type)&&(e.value||e.placeholder||"").length>0){ee(e,i,o)}break;case"TEXTAREA":if((e.value||e.placeholder||"").length>0){ee(e,i,o)}break;case"SELECT":if((e.options||e.placeholder||"").length>0){ee(e,i,o)}break;case"LI":P(e,o,c);break;case"CANVAS":G(s,e,e,i,l);break}return o}function ye(e){return p(e,"display")!=="none"&&p(e,"visibility")!=="hidden"&&!e.hasAttribute("data-html2canvas-ignore")}function be(e,t,n){if(!n){n=function(){}}if(ye(e)){t=me(e,t,false)||t;if(!h.test(e.nodeName)){return we(e,t,n)}}n()}function we(t,n,r){var i=u.Children(t);var a=i.length+1;l();if(d.async){i.forEach(function(e){setTimeout(function(){o(e)},0)})}else{i.forEach(o)}function o(e){if(e.nodeType===e.ELEMENT_NODE){be(e,n,l)}else if(e.nodeType===e.TEXT_NODE){A(t,e,n);l()}else{l()}}function l(e){if(--a<=0){u.log("finished rendering "+i.length+" children.");r()}}}};Ce.Preload=function(o){var l={numLoaded:0,numFailed:0,numTotal:0,cleanupDone:false},n,r=Ce.Util,i,e,s=0,t=o.elements[0]||ve.body,c=t.ownerDocument,a=t.getElementsByTagName("img"),d=a.length,f=c.createElement("a"),u=function(e){return e.crossOrigin!==ke}(new Image),h;f.href=xe.location.href;n=f.protocol+f.host;function p(e){f.href=e;f.href=f.href;var t=f.protocol+f.host;return t===n}function g(){r.log("html2canvas: start: images: "+l.numLoaded+" / "+l.numTotal+" (failed: "+l.numFailed+")");if(!l.firstRun&&l.numLoaded>=l.numTotal){r.log("Finished loading images: # "+l.numTotal+" (failed: "+l.numFailed+")");if(typeof o.complete==="function"){o.complete(l)}}}function m(e,t,n){var r,i=o.proxy,a;f.href=e;e=f.href;r="html2canvas_"+s++;n.callbackname=r;if(i.indexOf("?")>-1){i+="&"}else{i+="?"}i+="url="+encodeURIComponent(e)+"&callback="+r;a=c.createElement("script");xe[r]=function(e){if(e.substring(0,6)==="error:"){n.succeeded=false;l.numLoaded++;l.numFailed++;g()}else{C(t,n);t.src=e}xe[r]=ke;try{delete xe[r]}catch(e){}a.parentNode.removeChild(a);a=null;delete n.script;delete n.callbackname};a.setAttribute("type","text/javascript");a.setAttribute("src",i);n.script=a;xe.document.body.appendChild(a)}function y(e,t){var n=xe.getComputedStyle(e,t),r=n.content;if(r.substr(0,3)==="url"){i.loadImage(Ce.Util.parseBackgroundImage(r)[0].args[0])}v(n.backgroundImage,e)}function b(e){y(e,":before");y(e,":after")}function w(e,t){var n=Ce.Generate.Gradient(e,t);if(n!==ke){l[e]={img:n,succeeded:true};l.numTotal++;l.numLoaded++;g()}}function x(e){return e&&e.method&&e.args&&e.args.length>0}function v(e,t){var n;Ce.Util.parseBackgroundImage(e).filter(x).forEach(function(e){if(e.method==="url"){i.loadImage(e.args[0])}else if(e.method.match(/\-?gradient$/)){if(n===ke){n=Ce.Util.Bounds(t)}w(e.value,n)}})}function k(e){var t=false;try{r.Children(e).forEach(k)}catch(e){}try{t=e.nodeType}catch(e){t=false;r.log("html2canvas: failed to access some element's nodeType - Exception: "+e.message)}if(t===1||t===ke){b(e);try{v(r.getCSS(e,"backgroundImage"),e)}catch(e){r.log("html2canvas: failed to get background-image - Exception: "+e.message)}v(e)}}function C(t,n){t.onload=function(){if(n.timer!==ke){xe.clearTimeout(n.timer)}l.numLoaded++;n.succeeded=true;t.onerror=t.onload=null;g()};t.onerror=function(){if(t.crossOrigin==="anonymous"){xe.clearTimeout(n.timer);if(o.proxy){var e=t.src;t=new Image;n.img=t;t.src=e;m(t.src,t,n);return}}l.numLoaded++;l.numFailed++;n.succeeded=false;t.onerror=t.onload=null;g()}}i={loadImage:function(e){var t,n;if(e&&l[e]===ke){t=new Image;if(e.match(/data:image\/.*;base64,/i)){t.src=e.replace(/url\(['"]{0,}|['"]{0,}\)$/gi,"");n=l[e]={img:t};l.numTotal++;C(t,n)}else if(p(e)||o.allowTaint===true){n=l[e]={img:t};l.numTotal++;C(t,n);t.src=e}else if(u&&!o.allowTaint&&o.useCORS){t.crossOrigin="anonymous";n=l[e]={img:t};l.numTotal++;C(t,n);t.src=e}else if(o.proxy){n=l[e]={img:t};l.numTotal++;m(e,t,n)}}},cleanupDOM:function(e){var t,n;if(!l.cleanupDone){if(e&&typeof e==="string"){r.log("html2canvas: Cleanup because: "+e)}else{r.log("html2canvas: Cleanup after timeout: "+o.timeout+" ms.")}for(n in l){if(l.hasOwnProperty(n)){t=l[n];if(typeof t==="object"&&t.callbackname&&t.succeeded===ke){xe[t.callbackname]=ke;try{delete xe[t.callbackname]}catch(e){}if(t.script&&t.script.parentNode){t.script.setAttribute("src","about:blank");t.script.parentNode.removeChild(t.script)}l.numLoaded++;l.numFailed++;r.log("html2canvas: Cleaned up failed img: '"+n+"' Steps: "+l.numLoaded+" / "+l.numTotal)}}}if(xe.stop!==ke){xe.stop()}else if(ve.execCommand!==ke){ve.execCommand("Stop",false)}if(ve.close!==ke){ve.close()}l.cleanupDone=true;if(!(e&&typeof e==="string")){g()}}},renderingDone:function(){if(h){xe.clearTimeout(h)}}};if(o.timeout>0){h=xe.setTimeout(i.cleanupDOM,o.timeout)}r.log("html2canvas: Preload starts: finding background-images");l.firstRun=true;k(t);r.log("html2canvas: Preload: Finding images");for(e=0;e<d;e+=1){i.loadImage(a[e].getAttribute("src"))}l.firstRun=false;r.log("html2canvas: Preload: Done.");if(l.numTotal===l.numLoaded){g()}return i};Ce.Renderer=function(e,n){function r(e,t){if(e==="children"){return-1}else if(t==="children"){return 1}else{return e-t}}function t(e){var o=[],t;t=function e(t){var n={};function c(e,t,n){var r=t.zIndex.zindex==="auto"?0:Number(t.zIndex.zindex),i=e,a=t.zIndex.isPositioned,o=t.zIndex.isFloated,l={node:t},s=n;if(t.zIndex.ownStacking){i=l.context={children:[{node:t,children:[]}]};s=ke}else if(a||o){s=l.children=[]}if(r===0&&n){n.push(l)}else{if(!e[r]){e[r]=[]}e[r].push(l)}t.zIndex.children.forEach(function(e){c(i,e,s)})}c(n,t);return n}(e);function l(a){Object.keys(a).sort(r).forEach(function(e){var t=[],n=[],r=[],i=[];a[e].forEach(function(e){if(e.node.zIndex.isPositioned||e.node.zIndex.opacity<1){r.push(e)}else if(e.node.zIndex.isFloated){n.push(e)}else{t.push(e)}});(function t(e){e.forEach(function(e){i.push(e);if(e.children){t(e.children)}})})(t.concat(n,r));i.forEach(function(e){if(e.context){l(e.context)}else{o.push(e.node)}})})}l(t);return o}function i(e){var t;if(typeof n.renderer==="string"&&Ce.Renderer[e]!==ke){t=Ce.Renderer[e](n)}else if(typeof e==="function"){t=e(n)}else{throw new Error("Unknown renderer")}if(typeof t!=="function"){throw new Error("Invalid renderer defined")}return t}return i(n.renderer)(e,n,ve,t(e.stack),Ce)};Ce.Util.Support=function(e,a){function t(){var e=new Image,t=a.createElement("canvas"),n=t.getContext===ke?false:t.getContext("2d");if(n===false){return false}t.width=t.height=10;e.src=["data:image/svg+xml,","<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'>","<foreignObject width='10' height='10'>","<div xmlns='http://www.w3.org/1999/xhtml' style='width:10;height:10;'>","sup","</div>","</foreignObject>","</svg>"].join("");try{n.drawImage(e,0,0);t.toDataURL()}catch(e){return false}Ce.Util.log("html2canvas: Parse: SVG powered rendering available");return true}function n(){var e,t,n,r,i=false;if(a.createRange){e=a.createRange();if(e.getBoundingClientRect){t=a.createElement("boundtest");t.style.height="123px";t.style.display="block";a.body.appendChild(t);e.selectNode(t);n=e.getBoundingClientRect();r=n.height;if(r===123){i=true}a.body.removeChild(t)}}return i}return{rangeBounds:n(),svgRendering:e.svgRendering&&t()}};xe.html2canvas=function(e,t){e=e.length?e:[e];var n,r,i={logging:false,elements:e,background:"#fff",proxy:null,timeout:0,useCORS:false,allowTaint:false,svgRendering:false,ignoreElements:"IFRAME|OBJECT|PARAM",useOverflow:true,letterRendering:false,chinese:false,async:false,width:null,height:null,taintTest:true,renderer:"Canvas"};i=Ce.Util.Extend(t,i);Ce.logging=i.logging;i.complete=function(e){if(typeof i.onpreloaded==="function"){if(i.onpreloaded(e)===false){return}}Ce.Parse(e,i,function(e){if(typeof i.onparsed==="function"){if(i.onparsed(e)===false){return}}r=Ce.Renderer(e,i);if(typeof i.onrendered==="function"){i.onrendered(r)}})};xe.setTimeout(function(){Ce.Preload(i)},0);return{render:function(e,t){return Ce.Renderer(e,Ce.Util.Extend(t,i))},parse:function(e,t){return Ce.Parse(e,Ce.Util.Extend(t,i))},preload:function(e){return Ce.Preload(Ce.Util.Extend(e,i))},log:Ce.Util.log}};xe.html2canvas.log=Ce.Util.log;xe.html2canvas.Renderer={Canvas:ke};Ce.Renderer.Canvas=function(n){n=n||{};var t=ve,r=[],i=ve.createElement("canvas"),a=i.getContext("2d"),d=Ce.Util,f=n.canvas||t.createElement("canvas");function o(t,e){t.beginPath();e.forEach(function(e){t[e.name].apply(t,e["arguments"])});t.closePath()}function l(e){if(r.indexOf(e["arguments"][0].src)===-1){a.drawImage(e["arguments"][0],0,0);try{a.getImageData(0,0,1,1)}catch(e){i=t.createElement("canvas");a=i.getContext("2d");return false}r.push(e["arguments"][0].src)}return true}function u(e,t){switch(t.type){case"variable":e[t.name]=t["arguments"];break;case"function":switch(t.name){case"createPattern":if(t["arguments"][0].width>0&&t["arguments"][0].height>0){try{e.fillStyle=e.createPattern(t["arguments"][0],"repeat")}catch(e){d.log("html2canvas: Renderer: Error creating pattern",e.message)}}break;case"drawShape":o(e,t["arguments"]);break;case"drawImage":if(t["arguments"][8]>0&&t["arguments"][7]>0){if(!n.taintTest||n.taintTest&&l(t)){e.drawImage.apply(e,t["arguments"])}}break;default:e[t.name].apply(e,t["arguments"])}break}}return function(e,t,n,r,i){var a=f.getContext("2d"),o,l,s,c=e.stack;f.width=f.style.width=t.width||c.ctx.width;f.height=f.style.height=t.height||c.ctx.height;s=a.fillStyle;a.fillStyle=d.isTransparent(e.backgroundColor)&&t.background!==ke?t.background:e.backgroundColor;a.fillRect(0,0,f.width,f.height);a.fillStyle=s;r.forEach(function(e){a.textBaseline="bottom";a.save();if(e.transform.matrix){a.translate(e.transform.origin[0],e.transform.origin[1]);a.transform.apply(a,e.transform.matrix);a.translate(-e.transform.origin[0],-e.transform.origin[1])}if(e.clip){a.beginPath();a.rect(e.clip.left,e.clip.top,e.clip.width,e.clip.height);a.clip()}if(e.ctx.storage){e.ctx.storage.forEach(function(e){u(a,e)})}a.restore()});d.log("html2canvas: Renderer: Canvas renderer done - returning canvas obj");if(t.elements.length===1){if(typeof t.elements[0]==="object"&&t.elements[0].nodeName!=="BODY"){l=i.Util.Bounds(t.elements[0]);o=n.createElement("canvas");o.width=Math.ceil(l.width);o.height=Math.ceil(l.height);a=o.getContext("2d");a.drawImage(f,l.left,l.top,l.width,l.height,0,0,l.width,l.height);f=null;return o}}return f}}})(window,document);