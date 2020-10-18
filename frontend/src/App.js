import React from 'react';
import { WebSocketProvider } from './contexts/WebSocketContext';
import GetGameRoom from './components/GetGameRoom/GetGameRoom';
import './App.css';

function App() {
  return (
    <WebSocketProvider>
      <div className="App">
        <GetGameRoom />
      </div>
    </WebSocketProvider>
  );
}

export default App;
