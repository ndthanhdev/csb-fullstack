import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';

import App from './App';
import { useAppState } from './useStore';
import { peer } from './app-peer';
import { getUserStream } from './get-stream';

const socket = io();

let peerId = null;

peer.on('open', (id) => {
  peerId = id;

  setTimeout(() => {
    console.log('emitting', peerId);
    socket.emit('peer-id', peerId);
  }, 3000);
});

socket.on('user-connected', async (userId) => {
  console.log('user-connected', userId);

  const localStream = await getUserStream();

  const call = peer.call(userId, localStream);

  call.on('stream', (remoteStream) => {
    useAppState.getState().addUser(userId, remoteStream);
  });
});

peer.on('call', async (call) => {
  const localStream = await getUserStream();

  call.answer(localStream);
});

ReactDOM.render(<App />, document.getElementById('root'));
