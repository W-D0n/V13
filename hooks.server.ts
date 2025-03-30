import type { Handle } from '@sveltejs/kit';
import { building } from '$app/environment';
import { initSocketServer } from '$lib/server/socket';

export const handle: Handle = async ({ event, resolve }) => {
  // Ne pas initialiser le serveur WebSocket lors de la construction (SSG)
  if (!building) {
    // Accéder au serveur HTTP sous-jacent et initialiser Socket.IO
    const { server } = event.platform as { server: any };
    if (server) {
      initSocketServer(server);
    }
  }

  return resolve(event);
};