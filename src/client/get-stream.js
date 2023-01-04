import pDefer from 'p-defer';

let userMediaStream;

export function getUserStream() {
  if (userMediaStream) {
    return userMediaStream.promise;
  }

  userMediaStream = pDefer();

  navigator.mediaDevices
    .getUserMedia({
      video: {
        width: 320,
        height: 240
      },
      audio: false
    })
    .then(userMediaStream.resolve)
    .catch(userMediaStream.reject);

  return userMediaStream.promise;
}
