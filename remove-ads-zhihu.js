// ==UserScript==
// @name           知乎去广告、视频
// @namespace   http://tampermonkey.net/
// @version         0.4
// @description   a script to remove ads in www.zhihu.com
// @author          CoderBen
// @match          https://www.zhihu.com/*
// @grant           none
// @icon            https://tse2-mm.cn.bing.net/th/id/OIP.7D-LqgunUUDXVESZYas8GAHaHa?pid=Api&rs=1
// ==/UserScript==

(function() {
    'use strict';

    removeAds()
    removeMovies()

    window.onscroll = throttle(function() {
        removeAds()
        removeMovies()
    }, 2000)

    function removeAds () {
        document.querySelectorAll('.Pc-feedAd-container').forEach(function(elem) {
            elem.style.display = 'none'
        })
    }

    function removeMovies() {
        document.querySelectorAll('[data-za-extra-module]').forEach(function(elem) {
            if (elem.dataset.zaExtraModule.indexOf('has_video":true') > -1) {
                elem.style.display = 'none'
                elem.parentNode.style.height = '0'
                elem.parentNode.style.border = 'none'
            }
        })
    }

    function throttle(func, delay) {
       let last;
       return function () {
           const _this = this;
           const _args = arguments;
           const now = +new Date();
           if (last && now < last + delay) {
               clearTimeout(func.tid);
               func.tid = setTimeout(function () {
                   last = now;
                   func.call(_this, [..._args]);
               }, delay);
           } else {
               last = now;
               func.call(_this, [..._args]);
           }
       }
   }

})();
