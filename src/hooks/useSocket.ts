import {API_URL} from '../constants/basic';
import {io, Socket} from 'socket.io-client';
import {useCallback, useRef} from 'react';

const useSocket = (): [Socket | null, () => void] => {
  const socketRef = useRef<Socket | null>(null);

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
  }, []);

  if (!socketRef.current) {
    socketRef.current = io(API_URL, {
      transports: ['websocket'],
    });
  }

  return [socketRef.current, disconnect];
};

export default useSocket;
