﻿/*
Built using Kango - Cross-browser extension framework
http://kangoextensions.com/
*/
kango.MessageRouter=function(){chrome.extension.onConnect.addListener(kango.lang.bind(this._onConnect,this))};
kango.MessageRouter.prototype={_onConnect:function(a){var d=this;kango.browser._registerPortForTab(a.sender.tab.id,a.name,a);a.onMessage.addListener(function(b){d._onMessage(b,a)});a.onDisconnect.addListener(function(){kango.browser._unregisterPortForTab(a.sender.tab.id,a.name)})},_onMessage:function(a,d){var b=d.sender,c={name:a.name,data:a.data,origin:a.origin,target:null,source:null};"tab"==a.origin&&(c.source=new kango.BrowserTab(b.tab,kango.browser._getPortsForTab(b.tab.id)),c.target=c.source);
this.onmessage(c)},onmessage:function(){},dispatchMessage:function(a,d){var b={name:a,data:d,origin:"background",target:kango,source:kango},c=this;window.setTimeout(function(){c.onmessage(b)},1);return!0}};
