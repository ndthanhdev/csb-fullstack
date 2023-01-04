import React from 'react';
import './app.css';
import LoginForm from './LoginForm';
import { useAppState } from './useStore';

function Stream({ stream }) {
  return (
    <div>
      <video
        autoPlay
        playsInline
        ref={(ref) => {
          if (ref) {
            ref.srcObject = stream;
          }
        }}
      />
    </div>
  );
}

function App() {
  const stream = useAppState((state) => state.stream);

  console.log('stream', stream);

  const content = Object.keys(stream).map((k) => {
    return <Stream key={k} stream={stream[k]} />;
  });

  return (
    <div>
      <div>streams</div>
      {content}
    </div>
  );
}

export default App;
