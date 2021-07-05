const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://bohecola:ESVnYMDNXCuBPdRm@cluster0.tqbpd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
    .then(client => {
      console.log('连接数据库成功！');
      callback(client);
    })
    .catch(err => console.log(err));
}

module.exports = mongoConnect;