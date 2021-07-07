const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
// const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs') // 设置模板引擎
app.set('views', 'views'); // 不设置默认值是 process.cwd() + 'views' 当前文件夹下的views

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   User.findById('60e42a4fb9eb6a83fcb99a25').then(user => {
//     req.user = new User(user.name, user.email, user.cart, user._id);
//     next();
//   }).catch(err => console.log(err));
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://bohecola:B6uTxplvF06XwL1h@cluster0.3spr3.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  })