(function(){if(!window.console||!window.console.log){return}if(!jQuery||!jQueryVersionSince("3.0.0")){window.console.log("JQMIGRATE: jQuery 3.0.0+ REQUIRED")}if(jQuery.migrateWarnings){window.console.log("JQMIGRATE: Migrate plugin loaded multiple times")}window.console.log("JQMIGRATE: Migrate is installed"+(jQuery.migrateMute?"":" with logging active")+", version "+jQuery.migrateVersion)})();var warnedAbout={};jQuery.migrateWarnings=[];if(jQuery.migrateTrace===undefined){jQuery.migrateTrace=true}jQuery.migrateReset=function(){warnedAbout={};jQuery.migrateWarnings.length=0};function migrateWarn(e){var r=window.console;if(!warnedAbout[e]){warnedAbout[e]=true;jQuery.migrateWarnings.push(e);if(r&&r.warn&&!jQuery.migrateMute){r.warn("JQMIGRATE: "+e);if(jQuery.migrateTrace&&r.trace){r.trace()}}}}function migrateWarnProp(e,r,n,i){Object.defineProperty(e,r,{configurable:true,enumerable:true,get:function(){migrateWarn(i);return n},set:function(e){migrateWarn(i);n=e}})}function migrateWarnFunc(e,r,n,i){e[r]=function(){migrateWarn(i);return n.apply(this,arguments)}}if(window.document.compatMode==="BackCompat"){migrateWarn("jQuery is not compatible with Quirks Mode")}