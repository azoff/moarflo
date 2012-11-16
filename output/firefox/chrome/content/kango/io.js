/*
Built using Kango - Cross-browser extension framework
http://kangoextensions.com/
*/
moarflo_kango.IO=function(){};moarflo_kango.IO.prototype=moarflo_kango.oop.extend(moarflo_kango.IOBase,{getExtensionFileUrl:function(a){return"chrome://moarflo_kango/content/"+a},getResourceUrl:function(a){return"resource://moarflo_kango/"+a}});moarflo_kango.io=new moarflo_kango.IO;
