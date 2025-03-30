import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { emitToOverlay } from '$lib/server/socket';

// Endpoint pour envoyer un événement aux overlays (utile pour les tests)
export const POST: RequestHandler = async ({ request }) => {
  try {
    const data = await request.json();
    const { overlayType, eventName, payload } = data;

    if (!overlayType || !eventName || !payload) {
      return json({ error: 'Missing required fields' }, { status: 400 });
    }

    emitToOverlay(overlayType, eventName, payload);

    return json({ success: true });
  } catch (error) {
    console.error('Error sending socket event:', error);
    return json({ error: 'Internal server error' }, { status: 500 });
  }
};