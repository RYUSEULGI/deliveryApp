import {API_URL} from '../constants/basic';
import {io, Socket} from 'socket.io-client';
import {useCallback} from 'react';

let socket: Socket | undefined;

const useSocket = (): [typeof socket, () => void] => {
  const disconnect = useCallback(() => {
    if (socket) {
      socket.disconnect();
      socket = undefined;
    }
  }, []);

  if (!socket) {
    socket = io(API_URL, {
      transports: ['websocket'],
    });
  }

  return [socket, disconnect];
};

export default useSocket;
