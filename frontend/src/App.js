import React from 'react';
import { WebSocketProvider } from './contexts/WebSocketContext';

function App() {

  return (
    <WebSocketProvider>
      <div className="App">
        <h1>React</h1>
      </div>
    </WebSocketProvider>
  );
}

export default App;
