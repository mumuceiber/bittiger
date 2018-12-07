var jayson = require('jayson');

var client = jayson.client.http({
  hostname: 'localhost',
  port: 4040
});

// invoke rpc method "add"
function add(a, b, callback) {
  client.request('add', [a,b], function(err, response) {
    if(err) throw err;
    console.log(response.result);
    callback(response.result);
  });
};

function getNewsSummariesForUser(userId, pageNum, callback) {
  console.log(userId, pageNum);
  client.request('getNewsSummariesForUser', [userId, pageNum], function(err, response) {
    if (err) throw err;
    console.log(response);
    callback(response.result)
  })
}

function logNewsClickForUser(userId, newsId, callback) {
  client.request('logNewsClickForUser', [userId, newsId], function(err, response) {
    if (err) throw err;
    console.log(response)
  })
}

module.exports = {
  add : add,
  getNewsSummariesForUser: getNewsSummariesForUser,
  logNewsClickForUser: logNewsClickForUser
}
