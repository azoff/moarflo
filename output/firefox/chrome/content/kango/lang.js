/*
Built using Kango - Cross-browser extension framework
http://kangoextensions.com/
*/
moarflo_kango.HTMLSandbox=function(){this._browser=document.getElementById(this._browserId)};moarflo_kango.HTMLSandbox.prototype={_browserId:"moarflo_kango-background-script-host",_browser:null,create:function(a,b){this._browser.addEventListener("DOMContentLoaded",function(a){b(a.target.defaultView.wrappedJSObject)},!0);this._browser.setAttribute("src",moarflo_kango.io.getExtensionFileUrl(a))}};moarflo_kango.Lang=function(){};
moarflo_kango.Lang.prototype=moarflo_kango.oop.extend(moarflo_kango.LangBase,{_contentProxyCode:null,makeDataExposed:function(a){a.__exposedProps__=a.__exposedProps__||{};for(var b in a)"__exposedProps__"!=b&&a.hasOwnProperty(b)&&(a.__exposedProps__[b]="wr",null!=a[b]&&moarflo_kango.lang.isObject(a[b])&&moarflo_kango.lang.makeDataExposed(a[b]));return a},createHTMLSandbox:function(a,b){return(new moarflo_kango.HTMLSandbox).create(a,b)},evalInSandbox:function(a,b,d){"undefined"!=typeof b.kango&&(null!=a&&a!=window)&&(b.kango=moarflo_kango.browser.getTabProxyForWindow(a));
var a=new Components.utils.Sandbox(a,{sandboxPrototype:a,wantXrays:!0}),c;for(c in b)b.hasOwnProperty(c)&&(a[c]=b[c]);Components.utils.evalInSandbox("(function(){"+d+"\n})();",a)}});moarflo_kango.lang=new moarflo_kango.Lang;
