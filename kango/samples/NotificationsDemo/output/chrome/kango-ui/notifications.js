﻿/*
Built using Kango - Cross-browser extension framework
http://kangoextensions.com/
*/
kango.ui.Notification=function(){this.superclass.apply(this,arguments);var b=this._impl,a=this;b.addEventListener("click",function(){a.fireEvent(a.event.Click)},!0);b.addEventListener("close",function(){a.fireEvent(a.event.Close)},!0);b.addEventListener("show",function(){a.fireEvent(a.event.Show)},!0)};kango.ui.Notification.prototype=kango.oop.extend(kango.ui.NotificationBase,{show:function(){this._impl.show()},close:function(){this._impl.close()}});
kango.ui.Notifications=function(){this.superclass.apply(this,arguments)};kango.ui.Notifications.prototype=kango.oop.extend(kango.ui.NotificationsBase,{createNotification:function(b,a,c){b=webkitNotifications.createNotification(c||"",b,a);return new kango.ui.Notification(0,b)}});kango.NotificationsModule=function(){};kango.NotificationsModule.prototype.init=function(){kango.ui.notifications=new kango.ui.Notifications};"undefined"!=typeof kango&&"undefined"!=typeof kango.registerModule&&kango.registerModule(kango.NotificationsModule);
