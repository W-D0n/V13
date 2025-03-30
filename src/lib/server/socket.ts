import { Server } from 'socket.io';
import type { Server as HTTPServer } from 'http';
import type { Socket } from 'socket.io';

interface SocketData {
  clientId: string;
}

let io: Server<any, any, any, SocketData> | null = null;

// Initialiser le serveur Socket.IO
export const initSocketServer = (server: HTTPServer) => {
  if (io) return io;

  io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket: Socket) => {
    console.log('Client connected:', socket.id);

    // Attribuer un identifiant unique au client
    socket.data.clientId = socket.id;

    // Gestion des événements personnalisés
    socket.on('overlay:register', (overlayType: string) => {
      console.log(`Overlay registered: ${overlayType} (${socket.id})`);
      socket.join(overlayType);
    });

    // Déconnexion
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  return io;
};

// Fonction pour envoyer un événement aux overlays
export const emitToOverlay = (
  overlayType: string,
  eventName: string,
  data: any
) => {
  if (!io) {
    console.error('Socket server not initialized');
    return;
  }

  io.to(overlayType).emit(eventName, data);
};

// Fonction pour obtenir l'instance IO (à utiliser dans les hooks SvelteKit)
export const getSocketServer = () => {
  if (!io) {
    throw new Error('Socket server not initialized');
  }
  return io;
};