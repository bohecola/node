const path = require('path')

const express = require('express');
const bodyParser = require('body-parser');
// const expressHbs = require('express-handlebars') // 引入express-handlebars

const errorController = require('./controllers/error');
const sequelize = require('./utils/database');

const app = express();

// handlebars 可以简写 hbs, 并配置好相应设置
// app.engine('hbs', expressHbs({layoutsDir: 'views/layouts', defaultLayout: 'main-layout', extname: 'hbs'})); // 设置模板引擎handlebars 并初始化引擎expressHbs()
app.set('view engine', 'ejs') // 设置模板引擎
app.set('views', 'views'); // 不设置默认值是 process.cwd() + 'views' 当前文件夹下的views

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

sequelize
.sync()
.then(result => {
  // console.log(result);
  app.listen(3000);
})
.catch(err => console.log(err));
