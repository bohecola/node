const path = require('path')

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoConnect = require('./utils/database').mongoConnect;

const app = express();

app.set('view engine', 'ejs') // 设置模板引擎
app.set('views', 'views'); // 不设置默认值是 process.cwd() + 'views' 当前文件夹下的views

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  // User.findByPk(1).then(user => {
  //   req.user = user;
  //   next();
  // }).catch(err => console.log(err));
  next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3000);
})