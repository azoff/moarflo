﻿/*
Built using Kango - Cross-browser extension framework
http://kangoextensions.com/
*/
ChristmasTree_kango.ui.ToolbarButton=function(a,b){this.superclass.call(this,a,b)};ChristmasTree_kango.ui.ToolbarButton.prototype=ChristmasTree_kango.oop.extend(ChristmasTree_kango.ui.Button,{setMenu:function(a,b){this._element.type="menu";var c=document.createElement("menupopup");c.setAttribute("id",this._element.id+"-menu");this._element.appendChild(c);var d=document.createElement("menuitem");d.setAttribute("label",a);d.addEventListener("command",function(){b()},!1);c.appendChild(d)}});
ChristmasTree_kango.ui.Toolbar=function(){this._container=document.getElementById("ChristmasTree_kango-ui-toolbar-container");this._toolbar=document.getElementById("ChristmasTree_kango-ui-toolbar");this._elements={}};
ChristmasTree_kango.ui.Toolbar.prototype={_toolbar:null,_elements:{},_container:null,_idPrefix:"ChristmasTree_kango-ui-toolbar-",_addButton:function(a,b){var c=document.createElement("toolbarbutton");c.setAttribute("id",this._idPrefix+a);this._container.appendChild(c);this._elements[a]=new ChristmasTree_kangoUIToolbarButton(c,b);return this._elements[a]},addElement:function(a,b,c){return null!=b&&(null!=b&&""!=b&&""!=a&&"undefined"==typeof this._elements[b])&&"button"==a?this._addButton(b,c):null},removeElement:function(){},getElementById:function(a){return this._elements[a]}};
