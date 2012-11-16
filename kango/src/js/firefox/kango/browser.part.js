kango.WebProgressListener=function(a){this._callback=a};
kango.WebProgressListener.prototype={_callback:null,QueryInterface:function(a){if(a.equals(Components.interfaces.nsIWebProgressListener)||a.equals(Components.interfaces.nsISupportsWeakReference)||a.equals(Components.interfaces.nsISupports))return this;throw Components.results.NS_NOINTERFACE;},onProgressChange:function(){},onStatusChange:function(){},onSecurityChange:function(){},onLocationChange:function(){},onStateChange:function(a,b,c){var d=Components.interfaces.nsIWebProgressListener;c&d.STATE_START&&
c&d.STATE_IS_DOCUMENT&&(a={url:b.QueryInterface(Components.interfaces.nsIChannel).originalURI.spec,window:a.DOMWindow,document:a.DOMWindow.document},this._callback(a))}};kango.Browser=function(){this.superclass.apply(this,arguments);this._lastTabId=0;this._webProgressListener=new kango.WebProgressListener(kango.lang.bind(this._onPageBeforeNavigate,this));kango.addEventListener(kango.event.READY,kango.lang.bind(this._subscribeEvents,this))};
kango.Browser.prototype=kango.oop.extend(kango.BrowserBase,{_webProgressListener:null,_lastTabId:0,_generateTabId:function(){return this._lastTabId++},_subscribeEvents:function(){document.getElementById("appcontent").addEventListener("DOMContentLoaded",kango.lang.bind(this._onPageLoad,this),!0);gBrowser.addProgressListener(this._webProgressListener);gBrowser.tabContainer.addEventListener("TabSelect",kango.lang.bind(this._onTabSelect,this),!1);gBrowser.tabContainer.addEventListener("TabOpen",kango.lang.bind(this._onTabOpen,
this),!1);gBrowser.tabContainer.addEventListener("TabClose",kango.lang.bind(this._onTabClose,this),!1)},_onPageBeforeNavigate:function(a){a.document.defaultView.frameElement||this.fireEvent(this.event.BEFORE_NAVIGATE,{url:a.url,target:this.getKangoTab(this.getTabFromWindow(a.document.defaultView.top))})},_onPageLoad:function(a){a=a.originalTarget;if(a instanceof HTMLDocument){var b=a.defaultView,c=this.getKangoTab(this.getTabFromWindow(b));c.deleteTabProxy(b);c={url:c.getUrl(),title:c.getTitle(),
target:c};a.defaultView.frameElement||this.fireEvent(this.event.DOCUMENT_COMPLETE,c);c.window=b;this.fireEvent("DOMContentLoaded",c)}},_onTabSelect:function(a){a=this.getKangoTab(a.target);this.fireEvent(this.event.TAB_CHANGED,{url:a.getUrl(),title:a.getTitle(),target:a,tabId:a.getId()})},_onTabOpen:function(a){a=this.getKangoTab(a.target);this.fireEvent(this.event.TAB_CREATED,{target:a,tabId:a.getId()})},_onTabClose:function(a){this.fireEvent(this.event.TAB_REMOVED,{tabId:this.getKangoTab(a.target).getId()})},
getTabFromWindow:function(a){a=gBrowser.getBrowserIndexForDocument((a.top||a).document);return-1!=a?gBrowser.tabContainer.childNodes[a]:null},getTabBrowsers:function(){return[gBrowser]},getKangoTabs:function(a){return kango.array.map(a.tabContainer.childNodes,function(a){return kango.browser.getKangoTab(a)})},getKangoTab:function(a){var b="KangoTab_"+kango.getExtensionInfo().id,c=a.getUserData(b);null==c&&(c=this._generateTabId(),c=new kango.BrowserTab(a,c),a.setUserData(b,c,null));return c},removeTab:function(a){this.getTabBrowsers()[0].removeTab(a)},
getName:function(){return"firefox"},getCookies:function(a,b){var c=[],d=Components.classes["@mozilla.org/cookiemanager;1"].getService(Components.interfaces.nsICookieManager),f=Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI(a,null,null);if(null!=f)for(var g=f.host,f=f.path||"/",d=d.enumerator;d.hasMoreElements();){var e=d.getNext().QueryInterface(Components.interfaces.nsICookie2);g.indexOf(e.host)+e.host.length==g.length&&0==f.indexOf(e.path)&&
c.push({name:e.name,value:e.value,domain:e.host,hostOnly:e.isDomain,path:e.path,secure:e.isSecure,httpOnly:e.isHttpOnly,session:e.isSession,expires:e.expires})}b(c)},getCookie:function(a,b,c){this.getCookies(a,function(a){for(var f=0;f<a.length;f++)a[f].name==b&&c(a[f]);c(null)})},setCookie:function(a,b){var c=b.name,d=b.value,f=b.expires||null,g=b.secure||!1,e=b.httpOnly||!1,i=Components.classes["@mozilla.org/cookiemanager;1"].getService(Components.interfaces.nsICookieManager2),h=Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI(a,
null,null);null!=h&&i.add(h.host,h.path,c,d,g,e,g,f)},tabs:{getAll:function(a){for(var b=[],c=kango.browser.getTabBrowsers(),d=0;d<c.length;d++)b=b.concat(kango.browser.getKangoTabs(c[d]));a(b)},getCurrent:function(a){kango.browser.windows.getCurrent(function(b){b.getCurrentTab(function(b){a(b)})})},create:function(a){var b="undefined"==typeof a.focused||a.focused,c=null;if("undefined"!=typeof a.reuse&&a.reuse)for(var d=0;d<gBrowser.browsers.length;d++)if(gBrowser.getBrowserAtIndex(d).currentURI.spec==
a.url){c=gBrowser.tabContainer.childNodes[d];break}null==c&&(c=gBrowser.addTab(a.url));b&&(gBrowser.selectedTab=c)}},windows:{getAll:function(a){this.getCurrent(function(b){a([b])})},getCurrent:function(a){a(new kango.BrowserWindow(gBrowser))},create:function(a){window.open(a.url)}},getTabProxyForWindow:function(a){return this.getKangoTab(this.getTabFromWindow(a)).getProxyForWindow(a)}});kango.BrowserWindow=function(a){this._tabbrowser=a};
kango.BrowserWindow.prototype=kango.oop.extend(kango.IBrowserWindow,{_tabbrowser:null,getTabs:function(a){a(kango.browser.getKangoTabs(this._tabbrowser))},getCurrentTab:function(a){for(var b=this._tabbrowser.tabContainer,c=null,d=0;d<b.childNodes.length&&!(c=b.childNodes[d],c.selected);d++);a(kango.browser.getKangoTab(c))},isActive:function(){return!0}});kango.BrowserTab=function(a,b){this._id=b;this._tab=a;this._proxies=[]};
kango.BrowserTab.prototype=kango.oop.extend(kango.IBrowserTab,{_tab:null,_id:null,_proxies:[],deleteTabProxy:function(a){for(var b=0;b<this._proxies.length;b++)if(this._proxies[b].window==a)return this._proxies.splice(b,1),!0;return!1},getProxyForWindow:function(a){for(var b=0;b<this._proxies.length;b++)if(this._proxies[b].window==a)return this._proxies[b].proxy;b=new kango.TabProxy(this);this._proxies.push({window:a,proxy:b});var c=this,d=function(){c.deleteTabProxy(a);a.removeEventListener("unload",
d)};a.addEventListener("unload",d);return b},getId:function(){return this._id},getUrl:function(){var a="";try{a=this.getDOMWindow().document.URL||""}catch(b){}return a},getTitle:function(){var a="";try{a=this.getDOMWindow().document.title||""}catch(b){}return a},getDOMWindow:function(){return gBrowser.getBrowserForTab(this._tab).contentWindow},isActive:function(){return this._tab.selected},navigate:function(a){gBrowser.getBrowserForTab(this._tab).loadURI(a)},dispatchMessage:function(a,b){if(0<this._proxies.length){var c=
{__exposedProps__:{name:"r",data:"r",origin:"r",source:"r",target:"r"},name:a,data:b,origin:"background",source:null,target:null};null!=c.data&&kango.lang.isObject(c.data)&&kango.lang.makeDataExposed(c.data);kango.array.forEach(this._proxies,function(a){a.proxy.fireEvent("message",c)});return!0}return!1},close:function(){kango.browser.removeTab(this._tab)}});kango.browser=new kango.Browser;
