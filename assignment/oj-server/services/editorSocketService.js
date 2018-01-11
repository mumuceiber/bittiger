const redisClient = require('../modules/redisClient');
const TIMEOUT_IN_SECONDS = 3600;

// socket IO 习惯的写法
// 调用的时候要把socket io传进来
module.exports = function(io){
  // collaboration sessions
  const collaborations = {};
  // map from socket id to session id
  const socketIdToSessionId = {};
  // 定义一个path,这个项目中所有用的key value的数据都存在这个path下面
  const sessionPath = '/temp_sessions';

  io.on('connection', (socket) => {
    const sessionId = socket.handshake.query['sessionId'];
    socketIdToSessionId[socket.id] = sessionId;

    if(sessionId in collaborations){
      collaborations[sessionId]['participants'].push(socket.id);
    }else{
      redisClient.get(sessionPath + '/' + sessionId, data=>{
        if(data){
          console.log('session terminated previously, pulling from redis');
          collaborations[sessionId] = {
            'cachedInstructions': JSON.parse(data),
            'participants':[]
          }
        }else{
          console.log('no data from redis');
          collaborations[sessionId] = {
            'cachedInstructions': [],
            'participants': []
          }
        }
        collaborations[sessionId]['participants'].push(socket.id)
      });
    }

    // if(!(sessionId in collaborations)){
    //     collaborations[sessionId] = {'participants': []};
    // }
    // collaborations[sessionId]['participants'].push(socket.id);
    // console.log(collaborations[sessionId].length);

    socket.on('change', delta =>{
      const sessionId = socketIdToSessionId[socket.id];
      if(sessionId in collaborations){
        collaborations[sessionId]['cachedInstructions'].push(['change', delta]);
        const participants = collaborations[sessionId]['participants'];
        for(let participant of participants){
          if(participant !== socket.id){
            // 向client端发送信息
            io.to(participant).emit('change', delta);
          }
        }
      }else{
        console.error('error');
      }

      // if(sessionId in collaborations){
      //   const participants = collaborations[sessionId]['participants'];
      //   for(let participant of participants){
      //     if(participant !== socket.id){
      //       // 向client端发送信息
      //       io.to(participant).emit('change', delta);
      //     }
      //   }
      // }
    });

    socket.on('restoreBuffer', () => {
      const sessionId = socketIdToSessionId[socket.id];
      if(sessionId in collaborations){
        const instructions = collaborations[sessionId]['cachedInstructions'];
        for(let instruction of instructions){
          socket.emit(instruction[0], instruction[1]);
        }
      }
    });

    socket.on('disconnect', () => {
      const session = socketIdToSessionId[socket.id];
      let foundAndRemove = false;
      if(sessionId in collaborations){
        const participants = collaborations[sessionId]['participants'];
        const index = participants.indexOf(socket.id);
        if(index >= 0){
          participants.slice(index, 1);
          foundAndRemove = true;
          if(participants.length === 0){
            const key = sessionPath + '/' + sessionId;
            const value = JSON.stringify(collaborations[sessionId]['cachedInstructions']);
            redisClient.set(key, value, redisClient.redisPrint);
            redisClient.expire(key, TIMEOUT_IN_SECONDS);
            delete collaborations[sessionId];
          }
        }
      }
    })
  });

}
