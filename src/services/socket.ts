import { Socket } from 'socket.io';

var ips = new Set();

export const connetion = (socket: Socket) => {
  var address = socket.handshake.address;
  ips.add(address);
  socket.emit('online', { online: ips.size });

  socket.on('disconnect', () => {
    ips.delete(address);
  });
}

export default connetion;
