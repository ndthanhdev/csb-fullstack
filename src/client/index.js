import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';

import App from './App';

const socket = io();

ReactDOM.render(<App />, document.getElementById('root'));
