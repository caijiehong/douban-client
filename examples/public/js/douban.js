$(document).ready(function(){

    $('#ulLink a').click(function(){
       var href = $(this).attr('href').replace('#', '');
        $('#ulLink .active').removeClass('active');
        $(this).parent().addClass('active');
        $.get(href,function(data){
            $('#pContent').html(json2list(JSON.parse(data)));
        });
        return false;
    });
});
/*
 json2list 可以很方便的把json数据转换为html列表
 可接受的参数类型为typeof: 'object'
 包括：[...], {...}, null
 [...] 表示数组形式的对象 typeOf: 'array'
 {...} 表示散列形式的对象 typeOf: 'object'
 null 表示什么都没有的对象 typeOf: 'null'
 在这里，null, [], {} 的输出结果都是: 'null'
 by rugby, wlxku123@gmail.com 2011.5.14
 */

var json2list = function _parse(o) {
    if (isFalse(o))  // 这个实际上只检查 [...], {...}, null
        return 'null'; // 如果是[],{}和null其中一个，就返回'null'字符
    else {
        var i, s = '', t = typeOf(o);
        for (i in o) {
            var s1 = '', t1 = typeof o[i];
            if (t1 === 'object')
                s1 = _parse(o[i]);
            else // 对于[...]及{...}以外的，直接字符化即可
                s1 = '<span>' + String(o[i]) + '</span>';

            if (t === 'array')
                s += '<li>' + s1 + '</li>';
            else //'object'需要加上键值
                s += '<li><span>' + i + '</span> : ' + s1 + '</li>';
        }
    }
    return '<ul>' + s + '</ul>';
}

// Default (typeof):
// typeof Object() === 'object'
// typeof Array() === 'object'
// typeof Function() === 'function'
// typeof String() === 'string'
// typeof Number() === 'number'
// typeof Boolean() === 'boolean'
// typeof null === 'object'
// typeof undefined === 'undefined'
// Costum (typeOf):
// typeOf(Object()) === 'object'
// typeOf(Array()) === 'array'
// typeOf(Function()) === 'function'
// typeOf(String()) === 'string'
// typeOf(Number()) === 'number'
// typeOf(Boolean()) === 'boolean'
// typeOf(null) === 'null'
// typeOf(undefined) === 'undefined'

function typeOf(value) {
    var t = typeof value;
    if (value === null)
        t = 'null'; //null表示什么都没有,只有null===null才返回true
    if (t === 'object' && value.constructor === Array)
        t = 'array'; //如果type确实为'object'，后面才会执行
    return t;
}

// when checked by isFalse(),
// the following values return true.
// Object: {}
// Array: []
// Function: depends on its returned value
// String: '' or ""
// Number: 0, NaN
// Boolean: false
// null: null
// undefined: undefined
// and others return false.

function isFalse(value) {
    var i, s = true, t = typeof value;
    if (value !== null && t === 'object')
        for(i in value) return false; //如果对象是可枚举的
    else if (t === 'function')
        return isFalse(value()); //依据函数的返回值判定
    else
        s = value ? false : true;
    return s;
}