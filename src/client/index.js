import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';

import App from './App';

const socket = io();

socket.on('message', (message) => {
  console.log(message);

  socket.emit('message', 'Hello from client');
});

ReactDOM.render(<App />, document.getElementById('root'));
