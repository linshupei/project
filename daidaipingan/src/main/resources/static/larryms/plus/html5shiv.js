(function(e,o){var t="3.7.3";var n=e.html5||{};var a=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;var i=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;var r;var c="_html5shiv";var l=0;var f={};var s;(function(){try{var e=o.createElement("a");e.innerHTML="<xyz></xyz>";r="hidden"in e;s=e.childNodes.length==1||function(){o.createElement("a");var e=o.createDocumentFragment();return typeof e.cloneNode=="undefined"||typeof e.createDocumentFragment=="undefined"||typeof e.createElement=="undefined"}()}catch(e){r=true;s=true}})();function u(e,t){var n=e.createElement("p"),r=e.getElementsByTagName("head")[0]||e.documentElement;n.innerHTML="x<style>"+t+"</style>";return r.insertBefore(n.lastChild,r.firstChild)}function m(){var e=E.elements;return typeof e=="string"?e.split(" "):e}function d(e,t){var n=E.elements;if(typeof n!="string"){n=n.join(" ")}if(typeof e!="string"){e=e.join(" ")}E.elements=n+" "+e;y(t)}function h(e){var t=f[e[c]];if(!t){t={};l++;e[c]=l;f[l]=t}return t}function v(e,t,n){if(!t){t=o}if(s){return t.createElement(e)}if(!n){n=h(t)}var r;if(n.cache[e]){r=n.cache[e].cloneNode()}else if(i.test(e)){r=(n.cache[e]=n.createElem(e)).cloneNode()}else{r=n.createElem(e)}return r.canHaveChildren&&!a.test(e)&&!r.tagUrn?n.frag.appendChild(r):r}function p(e,t){if(!e){e=o}if(s){return e.createDocumentFragment()}t=t||h(e);var n=t.frag.cloneNode(),r=0,a=m(),i=a.length;for(;r<i;r++){n.createElement(a[r])}return n}function g(t,n){if(!n.cache){n.cache={};n.createElem=t.createElement;n.createFrag=t.createDocumentFragment;n.frag=n.createFrag()}t.createElement=function(e){if(!E.shivMethods){return n.createElem(e)}return v(e,t,n)};t.createDocumentFragment=Function("h,f","return function(){"+"var n=f.cloneNode(),c=n.createElement;"+"h.shivMethods&&("+m().join().replace(/[\w\-:]+/g,function(e){n.createElem(e);n.frag.createElement(e);return'c("'+e+'")'})+");return n}")(E,n.frag)}function y(e){if(!e){e=o}var t=h(e);if(E.shivCSS&&!r&&!t.hasCSS){t.hasCSS=!!u(e,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}"+"mark{background:#FF0;color:#000}"+"template{display:none}")}if(!s){g(e,t)}return e}var E={elements:n.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",version:t,shivCSS:n.shivCSS!==false,supportsUnknownElements:s,shivMethods:n.shivMethods!==false,type:"default",shivDocument:y,createElement:v,createDocumentFragment:p,addElements:d};e.html5=E;y(o);if(typeof module=="object"&&module.exports){module.exports=E}})(typeof window!=="undefined"?window:this,document);