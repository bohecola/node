const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db; // 保存数据库的访问

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://bohecola:7BUpdMKXgOF0JFjz@cluster0.3spr3.mongodb.net/shop?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
    .then(client => {
      console.log('连接数据库成功！');
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw '没有发现数据库!';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
