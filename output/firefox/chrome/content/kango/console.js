/*
Built using Kango - Cross-browser extension framework
http://kangoextensions.com/
*/
moarflo_kango.Console=function(){this._consoleService=Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService)};moarflo_kango.Console.prototype=moarflo_kango.oop.extend(moarflo_kango.IConsole,{_consoleService:null,log:function(a){1<arguments.length&&(a=moarflo_kango.string.format.apply(moarflo_kango.string,arguments));this._consoleService.logStringMessage(a)}});moarflo_kango.console=new moarflo_kango.Console;
