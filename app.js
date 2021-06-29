const path = require('path')

const express = require('express');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars') // 引入express-handlebars

const app = express();

// handlebars 可以简写 hbs, 并配置好相应设置
app.engine('hbs', expressHbs({layoutsDir: 'views/layouts', defaultLayout: 'main-layout', extname: 'hbs'})); // 设置模板引擎handlebars 并初始化引擎expressHbs()
app.set('view engine', 'hbs');
// app.set('view engine', 'pug'); // 设置模板引擎
app.set('views', 'views'); // 不设置默认值是 process.cwd() + 'views' 当前文件夹下的views

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
  res.status(404).render('404', {pageTitle: '页面走丢了'}); // 渲染视图文件
});

app.listen(3000);
