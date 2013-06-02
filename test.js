var querystring = require('querystring');
var post_data = querystring.stringify(null);

console.log(Buffer.byteLength(post_data))