import { Server } from 'socket.io';
import type { Server as HttpServer } from 'node:http';

let io: Server | null = null;

export const initSocket = (httpServer: HttpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: '*', // Allow all origins for now (Phase 7 will restrict)
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    // eslint-disable-next-line no-console
    console.log(`[Socket] Client connected: ${socket.id}`);

    socket.on('disconnect', () => {
      // eslint-disable-next-line no-console
      console.log(`[Socket] Client disconnected: ${socket.id}`);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
};
