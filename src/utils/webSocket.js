import React, { createContext } from 'react';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { updatePrice } from '../components/home/homeAction';
import { WEB_SOCKET_BASE_URL } from './constant';

const WebSocketContext = createContext(null);
const socket = io(WEB_SOCKET_BASE_URL, {
  transports: ['websocket', 'polling'], // use WebSocket first, if available
});

const WebSocketProvider = ({ children }) => {
  let ws;
  const dispatch = useDispatch();

  socket.on('connect_error', () => {
    // revert to classic upgrade
    socket.io.opts.transports = ['polling', 'websocket'];
  });

  socket.on('connect', function () {
    console.log('socket.io is connected');
  });

  socket.onAny((eventName, ...args) => {
    console.log(eventName, args);
    dispatch(updatePrice(eventName, args));
  });
  socket.on('disconnect', function () {
    console.log('socket.io is disconnected');
  });

  ws = {
    socket: socket,
  };

  return (
    <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
  );
};

export { WebSocketContext, WebSocketProvider, socket };
