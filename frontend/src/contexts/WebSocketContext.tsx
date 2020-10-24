import React, { createContext, useContext, useState, useEffect, useCallback, FunctionComponent } from 'react';

export enum WebSocketEvent {
  CreateRoom = 'Create Room',
  EnterRoom = 'Enter Room',
  SetName = 'Set Name',
  SetWords = 'Set Words',
}

const io = require('socket.io-client');

interface IWebSocketContext {
  connected: boolean;
  handleEnterRoom: (roomName: string) => void;
  handleCreateRoom: () => void;
  handleSetName: (name: string) => void;
}

export const WebSocketContext = createContext<IWebSocketContext>({
  connected: false,
  handleEnterRoom: (roomName) => console.log('Call dummy handleEnterRoom.'),
  handleCreateRoom: () => console.log('Call dummy handleCreateRoom.'),
  handleSetName: (name) => console.log('Call dummy handleSetName.'),
});

export const useWebSocketContext = () => useContext(WebSocketContext);

export const WebSocketProvider: FunctionComponent = ({ children }) => {
  const [webSocket, setWebSocket] = useState<SocketIOClient.Socket | null>(null);
  const [joinedRoom, setJoinedRoom] = useState<string | undefined>();

  useEffect(() => {
    if (!webSocket) {
      const socket = io.connect('http://localhost:3030');

      socket.on('new member', () => console.log('new member'));
      socket.on('joined room', (data: any) => setJoinedRoom(data.room));
      setWebSocket(socket);
    }
  }, []);

  const setName = useCallback(
    (name: string) => {
      webSocket && webSocket.emit(WebSocketEvent.SetName, { name }, () => console.log('Recorded name'));
    },
    [webSocket],
  );

  const enterRoom = useCallback(
    (roomName: string) => {
      if (webSocket) {
        webSocket.emit(WebSocketEvent.EnterRoom, { roomName });
      }
    },
    [webSocket],
  );

  const createRoom = useCallback(() => {
    if (webSocket) {
      webSocket.emit(WebSocketEvent.CreateRoom);
      console.log('Create a new room');
    }
  }, [webSocket]);

  return (
    <WebSocketContext.Provider
      value={{
        connected: webSocket !== null,
        handleEnterRoom: enterRoom,
        handleCreateRoom: createRoom,
        handleSetName: setName,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};
