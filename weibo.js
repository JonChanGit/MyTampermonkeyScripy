// ==UserScript==
// @name         WeiBo自动发消息
// @namespace    Jonchan
// @version      2.2.6
// @description  自动判断今天是否发送过微博，若未发生，自动发送一条微博
// @author       Jon Chan
// @match       *://weibo.com/*
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @require      https://greasyfork.org/scripts/38140-bilibiliapi/code/BilibiliAPI.js
// @require      https://greasyfork.org/scripts/44866-ocrad/code/OCRAD.js
// @grant        none
// @run-at       document-start
// @license      MIT License
// ==/UserScript==


/**
 * 空字符串
 */
function stringIsBlank(str) {
    'use strict';
    let blankRex = /^\s+$/
    return str == null ? true : blankRex.test(str)
}

function getLastWeiBoTimeStr() {
    'use strict';
    return $('#Pl_Official_MyProfileFeed__20 > .WB_feed > div:eq(1) > .WB_feed_detail > .WB_detail > .WB_from > .S_txt2').html()
}

function isToday() {
    'use strict';
    let lastWeiBoTimeStr = getLastWeiBoTimeStr()
    if (stringIsBlank(lastWeiBoTimeStr)) {
        console.error('Unable to read data')
        return false
    }
    let todayRex = /(^刚刚|今天)|(前$)/

    return todayRex.test(lastWeiBoTimeStr)
}

function getContentFormBing() {
    let url = 'http://cn.bing.com/HPImageArchive.aspx?format=js&idx=1&n=1'
    $.ajax({
        url: url,
        type: 'GET',
        success: function (resp) {
            console.log(resp)
        }
    })
}

function post() {
    'use strict';
    let content = 'xxx'
    getContentFormBing()
    // $.ajax({
    //     url: 'https://weibo.com/aj/mblog/add',
    //     type: 'POST',
    //     data: `location=v6_content_home&text=$content&appkey=&style_type=1&pic_id=&tid=&pdetail=&mid=&isReEdit=false&rank=0&rankid=&module=stissue&pub_source=main_&pub_type=dialog&isPri=0&_t=0`,
    //     success: function (resp) {
    //         console.log(resp)
    //     }
    // })
}

function run() {
    'use strict';
    let time = isToday(getLastWeiBoTimeStr())
    if (time) {
        post()
    }
}

(function () {
    'use strict';
    setTimeout(run, 3000)
})();