import zustand from 'zustand';

export const useAppState = zustand((set) => ({
  stream: {},
  addUser: (userId, remoteStream) =>
    set((state) => {
      const stream = {...state.stream};

      stream[userId] = remoteStream;

      return {
        stream
      };
    })
}));
