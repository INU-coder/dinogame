import { Server as SocketIO } from 'socket.io';
import registerHandler from '../handlers/register.handler.js';

const initSocket = (server) => {
  const io = new SocketIO(server, {
    cors: {
      origin: 'http://127.0.0.1:5500', // 허용할 도메인
      methods: ['GET', 'POST'],
    },
  });

  registerHandler(io);
};

export default initSocket;
