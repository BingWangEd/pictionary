import React, { createContext, useContext, useMemo } from "react";

interface IWebSocketContext {
  ws: WebSocket | undefined;
}

export const WebSocketContext = createContext<IWebSocketContext>({
  ws: undefined,
});

export const useWebSocketContext = () => useContext(WebSocketContext);

export const WebSocketProvider: React.FC = ({ children }) => {
  const webSocket = useMemo(() => {
    const webSocketUrl = 'ws://localhost:3030';
    const ws = new WebSocket(webSocketUrl);
    ws.onopen = () => {
      console.log('connected');
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(`received message: ${message}`);
    }

    ws.onclose = () => {
      console.log('disconnected');
    };

    return {
      ws,
    }
  }, []);

  return (
    <WebSocketContext.Provider value={webSocket}>
      {children}
    </WebSocketContext.Provider>
  );
};

