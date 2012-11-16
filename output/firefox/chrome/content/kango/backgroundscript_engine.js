/*
Built using Kango - Cross-browser extension framework
http://kangoextensions.com/
*/
moarflo_kango.BackgroundScriptEngine=function(){};
moarflo_kango.BackgroundScriptEngine.prototype={_sandbox:null,_window:null,init:function(a){var b=this;this._sandbox=moarflo_kango.lang.createHTMLSandbox("background.html",function(c){b._initScripts(c,a)})},getContext:function(){return this._window},_initScripts:function(a,b){this._window=a;a.kango=b;var c=a.document,d=moarflo_kango.getExtensionInfo().background_scripts;if("undefined"!=typeof d){var e=0,f=function(){var a=c.createElement("script");a.setAttribute("type","text/javascript");a.setAttribute("src",moarflo_kango.io.getExtensionFileUrl(d[e]));
var b=function(){e++;e<d.length&&f()};"undefined"!=typeof a.onreadystatechange?a.onreadystatechange=function(){"complete"==a.readyState&&b()}:a.onload=b;c.body.appendChild(a)};f()}}};moarflo_kango.BackgroundScriptModule=function(){};moarflo_kango.BackgroundScriptModule.prototype.init=function(a){moarflo_kango.backgroundScript=new moarflo_kango.BackgroundScriptEngine;moarflo_kango.addEventListener(moarflo_kango.event.READY,function(){moarflo_kango.backgroundScript.init(a)})};moarflo_kango.registerModule(moarflo_kango.BackgroundScriptModule);
