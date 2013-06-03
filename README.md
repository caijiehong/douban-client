## douban-client

douban-client 是使用Node.js对豆瓣 API v2 接口进行了一个简单封装。

接口有：
``` 
* 用户 User
* 广播 Miniblog
* 豆邮 Doumail
* 日记 Note
```

### 安装
```
npm install douban-client
```


### 使用说明

#### OAuth 2.0 认证
```
var DoubanClient = require('douban-client');

API_KEY = 'your api key'
API_SECRET = 'your api secret'

# 在 OAuth 2.0 中，
# 获取权限需要指定相应的 scope，请注意!!
SCOPE = 'douban_basic_common,shuo_basic_r,shuo_basic_w'

var client = new DoubanClient(API_KEY, API_SECRET, your_redirect_uri, SCOPE)

# 以下方式 2 选 1:
# 1. 引导用户授权
process.stdout.write('Go to the following link in your browser:\n');
process.stdout.write(client.authorize_url() + '\n');
process.stdout.write('Enter the verification code:\n');

process.stdin.on('data', function(chunk) {
    code = chunk;
    client.auth_with_code(code);
});

# 2. 如果有之前有 token，则可以
client.auth_with_token(token)

# Token Code
token_code = client.token_code

# Refresh Token
# 请注意：`refresh_token_code` 值仅可在授权完成时获取(即在 `auth_with_code`, `auth_with_password` 之后)
refresh_token_code = client.refresh_token_code
client.refresh_token(refresh_token_code) # refresh token

```

至此，已经完成 OAuth 2.0 授权。

#### Douban SDK

__概述__
```
// 所有接口使用异步模式，返回一个 events.EventEmitter 事件对象
// 接口返回数据时，会触发 data 事件

var event = client.user.get(id);
event.on('data', function(err, data){
    //发生异常时会将异常放入err, 并且 data == null
    if(!err){
        console.log(data);
    }
});

```



__用户 User__
```
# 以下 id 指用户数字 id
当前用户 client.user.me()
指定用户 client.user.get(id) 
搜索用户 client.user.search(q)       # q: 搜索的关键词

# 此处是将广播关系接口放置到用户
关注用户 client.user.follow(id)
取消关注 client.user.unfollow(id)
粉丝信息 client.user.followers(id, start, count)
关注信息 client.user.following(id, start, count) 
关注关系 client.user.friendships(target_id, source_id) 
共同关注 client.user.follow_in_common(id, start,count) 
加入黑名单 client.user.block(id)
```
<http://developers.douban.com/wiki/?title=user_v2>

<http://developers.douban.com/wiki/?title=community_1_shuo#user_info>



__广播 Miniblog__
```
# 以下 id 指广播数字 id
当前用户Timeline client.miniblog.home_timeline(count)
指定用户Timeline client.miniblog.user_timeline(user_id, count)
@当前用户的广播  client.miniblog.mentions(count)

获取一条广播 client.miniblog.get(id)
新写一条广播 client.miniblog.new(text)
新写图片广播 client.miniblog.new(text, image=open('/path/pic.png'))
删除一条广播 client.miniblog.delete(id)

推荐网址 client.miniglog.rec(title='', url='', desc='', image='http://url.jpg')

获取某广播回复列表 client.miniblog.comments(id)
回复某条广播       client.miniblog.comment.new(id, text)
获取某条广播回复   client.miniblog.comment.get(comment_id)
删除某条广播回复   client.miniblog.comment.delete(comment_id)

赞广播 client.miniblog.like(id)
取消赞 client.miniblog.unlike(id)
赞某广播用户列表 client.miniblog.likers(id)

转发广播 client.miniblog.reshare(id)
转发某广播的用户列表 client.miniblog.resharers(id)

```
<http://developers.douban.com/wiki/?title=community_1_shuo>



__豆邮 Doumail__
```
# 以下 id 指豆邮数字 id
# 豆邮发送过多会需要验证，请注意
获取一封豆邮 client.doumail.get(id)
新写一封豆邮 client.doumail.new(title, content, receiver_id)

标记一封豆邮 client.doumail.read(id)
批量标记豆邮 client.doumail.reads(ids) # ids 为 list

删除一封豆邮 client.doumail.delete(id)
批量删除豆邮 client.doumail.deletes(ids) # ids: [id, id, id]

豆邮收件箱列表 client.doumail.inbox(start, count)
豆邮发件箱列表 client.doumail.outbox(start, count)
未读豆邮列表   client.doumail.unread(start, count)

```
<http://developers.douban.com/wiki/?title=doumail_v2>



__日记 Note__
```
# 以下 id 指日记数字 id
# format: html_full, html_short, abstract, text，默认为text
获取一篇日记 client.note.get(id, format='text')
新写一篇日记 client.note.new(title, content)
更新一篇日记 client.note.update(title, content)
删除一篇日记 client.note.delete(id)

喜欢一篇日记     client.note.like(id)
取消喜欢一篇日记 client.note.unlike(id)

获取用户日记列表       client.note.list(user_id, start, count)
获取用户喜欢的日记列表 client.note.liked_list(user_id, start, count)

获取回复列表  client.note.comments(id, start, count)
新加一条回复  client.note.comment.new(id, content)
获取一条回复  client.note.comment.get(comment_id)
删除一条回复  client.note.comment.delete(comment_id)

```
<http://developers.douban.com/wiki/?title=doumail_v2>


__相册 Album__
```
# 以下 id 指相册数字 id
# desc 描述文字
获取一个相册 client.album.get(id)
新建一个相册 client.album.new(title, desc)
更新一个相册 client.album.update(id, title, desc)
删除一个相册 client.album.delete(id)

获取用户相册列表 client.album.list(user_id, start, count)
用户喜欢相册列表 client.album.liked_list(user_id, start, count)
获取相册图片列表 client.album.photos(id, start, count)

喜欢一个相册 client.album.like(id)
取消喜欢相册 client.album.unlike(id)

```
<http://developers.douban.com/wiki/?title=photo_v2#get_album>

