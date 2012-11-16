/*
Built using Kango - Cross-browser extension framework
http://kangoextensions.com/
*/
moarflo_kango.Storage=function(){};
moarflo_kango.Storage.prototype=moarflo_kango.oop.extend(moarflo_kango.IStorage,{getItem:function(a){a=moarflo_kango.simpleStorage.getItem(a);return"undefined"!=typeof a&&null!=a?JSON.parse(a):null},setItem:function(a,b){if("undefined"!=typeof b){var c=JSON.stringify(b);"undefined"!=typeof c&&moarflo_kango.simpleStorage.setItem(a,c)}else return this.removeItem(a)},removeItem:function(a){return moarflo_kango.simpleStorage.removeItem(a)},clear:function(){return moarflo_kango.simpleStorage.clear()},getKeys:function(){for(var a=[],b=moarflo_kango.simpleStorage.getKeys(),
c=0;c<b.length;c++){var d=b[c];0!=d.indexOf(this.SYSTEM_STORAGE_PREFIX)&&a.push(d)}return a}});moarflo_kango.storage=new moarflo_kango.Storage;moarflo_kango.SystemStorage=function(){this.PREFIX=moarflo_kango.storage.SYSTEM_STORAGE_PREFIX};moarflo_kango.SystemStorage.prototype={PREFIX:null,getItem:function(a){return moarflo_kango.simpleStorage.getItem(this.PREFIX+a)},setItem:function(a,b){return moarflo_kango.simpleStorage.setItem(this.PREFIX+a,b)},removeItem:function(a){return moarflo_kango.simpleStorage.removeItem(this.PREFIX+a)}};moarflo_kango.systemStorage=new moarflo_kango.SystemStorage;


// Merged from /Users/Azoff/Code/moarflo/moarflo_kango/src/js/firefox/moarflo_kango/jsonstorage.part.js

moarflo_kango.PrefStorage=function(){this._preferenceBranch=Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch(this.PREFERENCE_BRANCH_NAME)};
moarflo_kango.PrefStorage.prototype={_preferenceBranch:null,PREFERENCE_BRANCH_NAME:"extensions.moarflo_kango.storage.",setItem:function(a,b){return this._preferenceBranch.setCharPref(a,JSON.stringify(b))},getItem:function(a){var b=this._preferenceBranch.getPrefType(a),c=null;b==this._preferenceBranch.PREF_STRING?c=this._preferenceBranch.getCharPref(a):b==this._preferenceBranch.PREF_INT?c=this._preferenceBranch.getIntPref(a):b==this._preferenceBranch.PREF_BOOL&&(c=this._preferenceBranch.getBoolPref(a));return"undefined"!=
typeof c&&null!=c?JSON.parse(c):null},removeItem:function(a){try{return this._preferenceBranch.clearUserPref(a)}catch(b){return!1}},getKeys:function(){return this._preferenceBranch.getChildList("",{})},clear:function(){return this._preferenceBranch.deleteBranch("")}};(function(){var a=new moarflo_kango.PrefStorage,b=a.getKeys();if(0<b.length){for(var c=0;c<b.length;c++)moarflo_kango.storage.setItem(b[c],a.getItem(b[c]));a.clear()}})();
moarflo_kango.addEventListener(moarflo_kango.event.UNINSTALL,function(){window.addEventListener("beforeunload",function(){moarflo_kango.storage.clear()},!1)});
