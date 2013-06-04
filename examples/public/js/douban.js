var loginUserId = '';
var testUserId1 = '';
var testUserId2 = '';
var testUsername1 = '';
var testUsername2 = '';

$(document).ready(function () {
    loginUserId = $('#hidLoginUserId').val();
    testUserId1 = $('#hidTestUserId1').val();
    testUserId2 = $('#hidTestUserId2').val();
    testUsername1 = $('#hidTestUsername1').val();
    testUsername2 = $('#hidTestUsername2').val();
    var moduleName = $('#hidModule').val();
    $('#ulNav .' + moduleName).addClass('active');

    $(':text').each(function () {
        var placeholder = $(this).attr('placeholder');
        switch (placeholder) {
            case ':user_id':
            {
                $(this).val(testUserId1);
                return;
            }
            case ':user_name':
            {
                $(this).val(testUsername1);
                return;
            }
        }
    });

    $('section').each(function (index) {
        var item = $(this);
        item.attr('id', 'section' + index);
        if (item.hasClass('login') && !loginUserId) {
            item.find('ol.linenums').html('<div class="alert alert-error">请先使用豆瓣帐号登录!</div>');
            item.find('button').attr('disabled', true);
        } else {
            item.find('form').submit(function () {
                var url = $(this).attr('action');
                var post = {};
                $(this).find(':text').each(function (index) {
                    post['p' + index] = $(this).val();
                });

                item.find('ol.linenums').empty();
                item.find('.progress').show();

                $.post(url, post, function (data) {
                    var json = JSON.parse(data);
                    var str = JsonUti.convertToString(json).split('\n');
                    var html = [];
                    for (var i = 0; i < str.length; i++) {
                        html.push('<li><span>' + str[i] + '</span></li>');
                    }

                    item.find('.progress').hide();
                    item.find('ol.linenums').html(html);
                })
                return false;
            });
        }
    });

    $('#ulLink a').each(function (index) {
        var item = $(this);
        $('section:eq(' + index + ') h2').html(item.text());
        item.attr('href', '#section' + index).click(function () {
            $('#ulLink .active').removeClass('active');
            $(this).parent().css('active');
        });
        item.click(function () {
            $('#ulLink .active').removeClass('active');
            $(this).parent().addClass('active');
            setTimeout(function () {
                window.scrollBy(0, -80);
            }, 10);
        });

    });


});

//http://www.cnitblog.com/seeyeah/archive/2009/09/29/61618.html
var JsonUti = {
    //定义换行符
    n: "\n",
    //定义制表符
    t: "  ",
    //转换String
    convertToString: function (obj) {
        return JsonUti.__writeObj(obj, 1);
    },
    //写对象
    __writeObj: function (obj    //对象
        , level             //层次（基数为1）
        , isInArray) {       //此对象是否在一个集合内
        //如果为空，直接输出null
        if (obj == null) {
            return "null";
        }
        //为普通类型，直接输出值
        if (obj.constructor == Number || obj.constructor == Date || obj.constructor == String || obj.constructor == Boolean) {
            var v = obj.toString();
            var tab = isInArray ? JsonUti.__repeatStr(JsonUti.t, level - 1) : "";
            if (obj.constructor == String || obj.constructor == Date) {
                //时间格式化只是单纯输出字符串，而不是Date对象
                return tab + ("\"" + v + "\"");
            }
            else if (obj.constructor == Boolean) {
                return tab + v.toLowerCase();
            }
            else {
                return tab + (v);
            }
        }

        //写Json对象，缓存字符串
        var currentObjStrings = [];
        //遍历属性
        for (var name in obj) {
            var temp = [];
            //格式化Tab
            var paddingTab = JsonUti.__repeatStr(JsonUti.t, level);
            temp.push(paddingTab);
            //写出属性名
            temp.push(name + " : ");

            var val = obj[name];
            if (val == null) {
                temp.push("null");
            }
            else {
                var c = val.constructor;

                if (c == Array) { //如果为集合，循环内部对象
                    temp.push(JsonUti.n + paddingTab + "[" + JsonUti.n);
                    var levelUp = level + 2;    //层级+2

                    var tempArrValue = [];      //集合元素相关字符串缓存片段
                    for (var i = 0; i < val.length; i++) {
                        //递归写对象
                        tempArrValue.push(JsonUti.__writeObj(val[i], levelUp, true));
                    }

                    temp.push(tempArrValue.join("," + JsonUti.n));
                    temp.push(JsonUti.n + paddingTab + "]");
                }
                else if (c == Function) {
                    temp.push("[Function]");
                }
                else {
                    //递归写对象
                    temp.push(JsonUti.__writeObj(val, level + 1));
                }
            }
            //加入当前对象“属性”字符串
            currentObjStrings.push(temp.join(""));
        }
        return (level > 1 && !isInArray ? JsonUti.n : "")                       //如果Json对象是内部，就要换行格式化
            + JsonUti.__repeatStr(JsonUti.t, level - 1) + "{" + JsonUti.n     //加层次Tab格式化
            + currentObjStrings.join("," + JsonUti.n)                       //串联所有属性值
            + JsonUti.n + JsonUti.__repeatStr(JsonUti.t, level - 1) + "}";   //封闭对象
    },
    __isArray: function (obj) {
        if (obj) {
            return obj.constructor == Array;
        }
        return false;
    },
    __repeatStr: function (str, times) {
        var newStr = [];
        if (times > 0) {
            for (var i = 0; i < times; i++) {
                newStr.push(str);
            }
        }
        return newStr.join("");
    }
};

var api = {
    'user': [
        {
            login: true,
            title: '当前用户',
            desc: '获取当前授权用户信息',
            api: 'GET /v2/user/~me',
            sdk: 'client.user.me()',
            action: '/user/me',
            params: []
        },
        {
            title: '指定用户',
            desc: '获取用户信息',
            api: 'GET /v2/user/:name',
            sdk: 'client.user.get(id)',
            action: '/user/get',
            params: [':id']
        },
        {
            title: '搜索用户',
            desc: '搜索用户',
            api: 'GET /v2/user',
            sdk: 'client.user.search(q)',
            action: '/user/search',
            params: [':q']
        },
        {
            login: true,
            title: '关注用户',
            api: 'POST /shuo/v2/friendships/create',
            sdk: 'client.user.follow(id)',
            action: '/user/follow',
            params: [':id']
        },
        {
            login: true,
            title: '取消关注',
            api: 'POST /shuo/v2/friendships/destroy',
            sdk: 'client.user.unfollow(id)',
            action: '/user/unfollow',
            params: [':id']
        },
        {
            title: '粉丝信息',
            api: 'GET /shuo/v2/users/:id/followers',
            sdk: 'client.user.followers(id)',
            action: '/user/followers',
            params: [':id']
        },
        {
            title: '关注信息',
            api: 'GET /shuo/v2/users/:id/following',
            sdk: 'client.user.following(id)',
            action: '/user/following',
            params: [':id']
        },
        {
            title: '关注关系',
            api: 'GET /shuo/v2/friendships/show',
            sdk: 'client.user.friendships(target_id, source_id)',
            action: '/user/follow',
            params: [':target_id', ':source_id']
        },
        {
            login: true,
            title: '共同关注',
            api: 'GET /shuo/v2/users/:id/follow_in_common',
            sdk: 'client.user.follow_in_common(id)',
            action: '/user/follow_in_common',
            params: [':id']
        }
    ]
}