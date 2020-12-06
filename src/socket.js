require('dotenv');
const socketioJwt = require('socketio-jwt');

class Socket {
  constructor() {
    this.clients = {};
    this.admins = {};
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
        const { id: clientId, isAdmin } = socket.decoded_token;

        if(isAdmin){
          delete this.admins[clientId];
        } else {
          delete this.clients[clientId];
        }
      });

      const { id: clientId, isAdmin } = socket.decoded_token;

      if(clientId){
        if(isAdmin){
          this.admins[clientId] = socket.id;
        } else {
          this.clients[clientId] = socket.id;
        }
      }
    });
  }

  static init(server) {
    if(!this.connection) {
      this.connection = new Socket();
      this.connection.connect(server);
    }
  }

  sendMessageToUser(clientId, message) {
    const socketId = this.clients[clientId];

    if(socketId){
      this.io.to(socketId).emit('new-message', message);
    }
  }

  sendMessageToAdmins(message) {
    for(let key in this.admins){
      const adminId = this.admins[key];
      this.io.to(adminId).emit('new-message', message);
    }
  }
}


module.exports = new Socket;