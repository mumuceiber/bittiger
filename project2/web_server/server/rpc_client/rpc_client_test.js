var client = require('./rpc_client');

client.add(1, 2, function(response) {
  console.assert(response == 3);
})

client.getNewsSummariesForUser("user123", 1, function(response) {
  console.assert(response != null);
  console.log("getNewsSummariesForUser pass");
})
