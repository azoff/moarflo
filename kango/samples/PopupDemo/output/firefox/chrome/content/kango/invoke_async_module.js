﻿/*
Built using Kango - Cross-browser extension framework
http://kangoextensions.com/
*/
PopupDemo_kango.InvokeAsyncModule=function(){};
PopupDemo_kango.InvokeAsyncModule.prototype.init=function(e){var g={},i=0,f=function(a){return"undefined"!=typeof a.call&&"undefined"!=typeof a.apply},j=function(a,b){var c={id:a.id,result:null,error:null};try{c.result=e.lang.invoke(e.getContext(),a.method,a.params)}catch(d){c.error=d.toString(),PopupDemo_kango.console.log("Error during async call method "+a.method+". Details: "+c.error)}null!=a.id&&b.dispatchMessage("KangoInvokeAsyncModule_result",c)},k=function(a,b){var c={id:a.id,result:null,error:null};try{a.params.push(function(d){c.result=
d;null!=a.id&&b.dispatchMessage("KangoInvokeAsyncModule_result",c)}),e.lang.invoke(e.getContext(),a.method,a.params)}catch(d){c.error=d.toString(),null!=a.id?b.dispatchMessage("KangoInvokeAsyncModule_result",c):PopupDemo_kango.console.log("Error during async call method "+a.method+". Details: "+c.error)}},l=function(a){if("undefined"!=typeof a.id&&"undefined"!=typeof g[a.id]){var b=g[a.id];try{if(null==a.error&&f(b.onSuccess))b.onSuccess(a.result);else if(f(b.onError))b.onError(a.error)}finally{delete g[a.id]}}};
e.addEventListener("message",function(a){var b={};b.KangoInvokeAsyncModule_invoke=j;b.KangoInvokeAsyncModule_invokeCallback=k;b.KangoInvokeAsyncModule_result=l;var c=a.data,d;for(d in b)if(b.hasOwnProperty(d)&&d==a.name){b[d](c,a.source);break}});var h=function(a,b){var b=Array.prototype.slice.call(b,0),c=b[b.length-1],d={onSuccess:function(){},onError:function(a){PopupDemo_kango.console.log("Error during async call method "+b[0]+". Details: "+a)},isCallbackInvoke:a,isNotifyInvoke:!1};null!=c&&f(c)?(d.onSuccess=
function(a){c(a)},b[b.length-1]=d):(d.isNotifyInvoke=!0,b.push(d));e.invokeAsyncEx.apply(e,b)};e.invokeAsyncEx=function(a){var b=arguments[arguments.length-1],c=b.isCallbackInvoke?"KangoInvokeAsyncModule_invokeCallback":"KangoInvokeAsyncModule_invoke",d=Array.prototype.slice.call(arguments,1,arguments.length-1),f=null;b.isNotifyInvoke||(f=(Math.random()+i++).toString(),g[f]=b);e.dispatchMessage(c,{id:f,method:a,params:d})};e.invokeAsync=function(a){h(!1,arguments)};e.invokeAsyncCallback=function(a){h(!0,
arguments)}};"undefined"!=typeof PopupDemo_kango&&"undefined"!=typeof PopupDemo_kango.registerModule&&PopupDemo_kango.registerModule(PopupDemo_kango.InvokeAsyncModule);
