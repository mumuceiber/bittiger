// 我们在这里对redis重新封装一下
// 原因一是为了使redis复合我们的使用习惯，可以按自己需求处理error
// 原因二是redis不是singleton的，如果不进行封装，我们每在一个文件里call redis，
// const redis = require('redis')
// const client = redis.createClient()
// 都会新建一个instance，从thread pool里拿一个thread和数据库建立连接。这样非常不高效，而且redis一般最多只支持是个instance的连接
// 自己封装redis使用可以保证每个app只创建一个redis的instance


const redis = require('redis');
const client = redis.createClient();

function set(key, value, callback){
  client.set(key, value, function(err, res){
    if(err){
      console.log(err);
      return;
    }
    callback(res);
  });
}
function get(key, callback){
  client.get(key, function(err, res){
    if(err){
      console.log(err);
    }
    callback(res);
  });
}
function expire(key, timeInSeconds){
  client.expire(key,timeInSeconds);
}
function quit(){
  client.quit();
}

module.exports = {
  get,
  set,
  expire,
  quit,
  redisPrint: redis.print
}
