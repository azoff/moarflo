/*
Built using Kango - Cross-browser extension framework
http://kangoextensions.com/
*/
moarflo_kango.ui.OptionsPage=function(){var a=moarflo_kango.getExtensionInfo();if("undefined"!=typeof a.options_page){var b=this._optionsUrl=moarflo_kango.io.getExtensionFileUrl(a.options_page).toLowerCase();moarflo_kango.browser.addEventListener("DOMContentLoaded",function(a){0==a.url.toLowerCase().indexOf(b)&&(a.window.kango=moarflo_kango)})}};
moarflo_kango.ui.OptionsPage.prototype=moarflo_kango.oop.extend(moarflo_kango.ui.IOptionsPage,{_optionsUrl:"",open:function(a){if(""!=this._optionsUrl){var b=this._optionsUrl;"undefined"!=typeof a&&(b+="#"+a);moarflo_kango.browser.tabs.create({url:b,focused:!0,reuse:!0});return!0}return!1}});moarflo_kango.ui.optionsPage=new moarflo_kango.ui.OptionsPage;
