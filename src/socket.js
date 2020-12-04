require('dotenv');
const socketioJwt = require('socketio-jwt');

class Socket {
  constructor() {
    this.clients = {};
    this.io = null;
    this.connection = null;
  }

  connect(server) {
    this.io = require('socket.io')(server, {
      cors: {
        origin: '*',
      }
    });

    this.io.use(socketioJwt.authorize({
      secret: process.env.APP_SECRET,
      handshake: true
    }));

    this.io.on('connection', (socket) => {
      socket.on('disconnect', () => {
        const clientId = socket.decoded_token.id;
        delete this.clients[clientId];
      });

      const clientId = socket.decoded_token.id;

      if(clientId){
        this.clients[clientId] = socket.id;
      }
    });
  }

  static init(server) {
    if(!this.connection) {
      this.connection = new Socket();
      this.connection.connect(server);
    }
  }

  sendMessage(clientId, message) {
    const socketId = this.clients[clientId];

    if(socketId){
      this.io.to(socketId).emit('new-message', message);
    }
  }
}


module.exports = new Socket;