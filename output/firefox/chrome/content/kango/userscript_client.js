/*
Built using Kango - Cross-browser extension framework
http://kangoextensions.com/
*/
moarflo_kango.UserscriptEngineClient=function(){};moarflo_kango.UserscriptEngineClient.prototype={run:function(c,b,a){var d=this;moarflo_kango.invokeAsync("kango.userscript.getScripts",c.document.URL,b,a,function(a){for(var b in a)a.hasOwnProperty(b)&&d.executeScript(c,a[b].join("\n\n"))})},executeScript:function(c,b){try{var a=new moarflo_kango.UserscriptApi(c);a.kango=moarflo_kango;moarflo_kango.lang.evalInSandbox(c,a,b)}catch(d){moarflo_kango.console.log("US: "+d.message+"\n"+d.stack||"")}}};moarflo_kango.UserscriptApi=function(){};
moarflo_kango.UserscriptApi.prototype={};
