﻿/*
Built using Kango - Cross-browser extension framework
http://kangoextensions.com/
*/
kango.Internationalization=function(){};
kango.Internationalization.prototype={_messages:null,_currentLocale:"en",_defaultLocale:"en",_loadLocales:function(a){var b=kango.getExtensionInfo();this._locales=b.locales||null;null!=this._locales&&(this._defaultLocale=b.default_locale||"en",this._currentLocale=null!=a&&""!=a?a.slice(0,2).toLowerCase():this._defaultLocale,this._messages={},a=this._getLocaleMessages(this._currentLocale),null!=a&&(this._messages[this._currentLocale]=a),this._currentLocale!=this._defaultLocale&&(this._messages[this._defaultLocale]=
this._getLocaleMessages(this._defaultLocale)))},_getLocaleMessages:function(a){a=kango.io.getExtensionFileContents("locales/"+a+".json");return null!=a&&""!=a?JSON.parse(a):null},init:function(a){this.setCurrentLocale(a)},setCurrentLocale:function(a){this._loadLocales(a)},getCurrentLocale:function(){return this._currentLocale},getMessages:function(){return null!=this._messages?"undefined"!=typeof this._messages[this._currentLocale]?this._messages[this._currentLocale]:this._messages[this._defaultLocale]:
null},getMessage:function(a){var b=this.getMessages();return null!=b&&"undefined"!=typeof b[a]?b[a]:a}};kango.i18n=new kango.Internationalization;


// Merged from /Users/Azoff/Code/moarflo/kango/src/js/chrome opera safari firefox/kango/i18n.part.js

kango.i18n.init(window.navigator.userLanguage||window.navigator.language||null);
