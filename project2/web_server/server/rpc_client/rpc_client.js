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

module.exports = {
  add : add
}
