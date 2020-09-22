import React, { createContext, useContext, useMemo } from "react";
const io = require('socket.io-client');

interface IWebSocketContext {
  socket: SocketIOClient.Socket | undefined;
}

export const WebSocketContext = createContext<IWebSocketContext>({
  socket: undefined,
});

export const useWebSocketContext = () => useContext(WebSocketContext);

export const WebSocketProvider: React.FC = ({ children }) => {
  const webSocket = useMemo(() => {
    console.log('created again')
    const socket = io.connect('http://localhost:3030');

    return {
      socket,
    }
  }, []);

  return (
    <WebSocketContext.Provider value={webSocket}>
      {children}
    </WebSocketContext.Provider>
  );
};

