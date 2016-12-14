// ==UserScript==
// @name         NCS Loader
// @namespace    http://ncscript.gq
// @version      1.0
// @description  NCS autoloader for Plug.dj!
// @author       Electric Gaming
// @match        https://plug.dj/*
// @copyright    2016, Electric Gaming
// @require      http://code.jquery.com/jquery-latest.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // This code is Copyright (C) Electric Gaming, 2016. Do not redistribute.
    window.onload = function() {
        setTimeout(function() {
            if(['/dashboard','/','/subscribe','/about','/ba','/press','/terms'].indexOf(window.location.pathname)===-1 && (window.location.host === 'plug.dj'||window.location.host==='stg.plug.dj')){
                $.getScript('https://ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular.min.js',function () {
                    setTimeout(function(){$.getScript('https://rawgit.com/Satskhi/ScriptTest/master/js/ncs.js');},3000);
                });
            }
        }, 2500);
    };
})();
