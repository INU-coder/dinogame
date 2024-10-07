// import { Socket } from '../init/socket.js';
import { addUser } from '../models/user.model.js';
import { v4 as uuidv4 } from 'uuid';
import { handleConnection, handleDisconnect, handlerEvent } from './helper.js';
// const { Socket } = require("engine.io")

const registerHandler = (io) => {
  io.on('connection', (socket) => {
    const userUUID = uuidv4();
    addUser({ uuid: userUUID, socketId: socket.id });

    handleConnection(socket, userUUID);

    // 접속해제시 이벤트
    socket.on('event', (data) => handlerEvent(id, socket, data));
    socket.on('disconnect', (socket) => handleDisconnect(socket, userUUID));
  });
};
export default registerHandler;
