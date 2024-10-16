import { CLIENT_VERSION } from '../constants.js';
import { createStage } from '../models/stage.model.js';
import { getUsers, removeUser } from '../models/user.model.js';
import handlerMappings from './handlerMapping.js';

export const handleDisconnect = (socket, uuid) => {
  removeUser(socket.id);
  console.log(`ser disconnected: ${socket.id}`);
  console.log('Current users ', getUsers());
};

//스테이지에 따라서 더 높은 점수 획득

export const handleConnection = (socket, userUUID) => {
  console.log(`New user connected!: ${userUUID} with socket ID ${socket.id}`);
  console.log('Current users: ', getUsers());

  createStage(userUUID);

  socket.emit('connection', { uuid: userUUID });
};

export const handlerEvent = (io, socket, data) => {
  if (!CLIENT_VERSION.includes(data.clientVersion)) {
    socket.emit('response', {
      status: 'fail',
      message: 'Client version mismatch',
    });
    return;
  }

  const handler = handlerMappings[data.handlerId];
  if (!handler) {
    socket.emit('response', { status: 'fail', message: 'Handler not found' });
    return;
  }

  const response = handler(data.userId, data.payload);
  //패이로드에 변동이있는거고 유저아이디는 불변.
  //클라이언트에서 서버에게로 보내주기로 약속이 되어있기 때문에 첫번째 인자로는 무조건 유저아이디를 보내준다.
  if (response.broadcast) {
    io.emit('response', response);
    return;
  }
  socket.emit('response', response);
};
