var koa = require('koa');
var app = koa();

app.use(function *(){
    this.body = '何婷婷,好漂亮~~';
});

app.listen(3000);