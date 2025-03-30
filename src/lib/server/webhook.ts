import { ApiClient } from '@twurple/api';
import { StaticAuthProvider } from '@twurple/auth';
import { EventSubHttpListener, ReverseProxyAdapter } from '@twurple/eventsub-http';
import { emitToOverlay } from './socket';
import { env } from '$env/dynamic/private';

// Données d'authentification Twitch
const clientId = env.TWITCH_CLIENT_ID || '';
const clientSecret = env.TWITCH_CLIENT_SECRET || '';
const userId = env.TWITCH_USER_ID || '';

// URL publique pour les webhooks (doit être accessible depuis Internet)
// En développement, utilisez ngrok ou un service similaire
const webhookUrl = env.WEBHOOK_URL || 'https://votre-url-publique.com/api/webhook';

let listener: EventSubHttpListener | null = null;

export const initTwitchWebhooks = () => {
  if (!clientId || !clientSecret || !userId) {
    console.error('Twitch credentials not provided');
    return null;
  }

  const authProvider = new StaticAuthProvider(clientId, clientSecret);
  const apiClient = new ApiClient({ authProvider });

  // Créer un adaptateur pour recevoir les événements
  const adapter = new ReverseProxyAdapter({
    hostName: new URL(webhookUrl).hostname,
    port: 443
  });

  // Créer un écouteur d'événements
  listener = new EventSubHttpListener({
    apiClient,
    adapter,
    secret: env.WEBHOOK_SECRET || 'your-webhook-secret',
    strictHostCheck: true
  });

  // S'abonner aux événements de suivi (follow)
  listener.onChannelFollow(userId, userId, (event) => {
    const data = {
      type: 'follow',
      username: event.userDisplayName,
      timestamp: new Date().toISOString()
    };

    emitToOverlay('alerts', 'new-alert', data);
  });

  // S'abonner aux événements d'abonnement (subscription)
  listener.onChannelSubscription(userId, (event) => {
    const data = {
      type: 'subscription',
      username: event.userDisplayName,
      tier: event.tier,
      isGift: event.isGift,
      timestamp: new Date().toISOString()
    };

    emitToOverlay('alerts', 'new-alert', data);
  });

  // S'abonner aux événements de dons de bits (cheer)
  listener.onChannelCheer(userId, (event) => {
    const data = {
      type: 'cheer',
      username: event.userDisplayName,
      bits: event.bits,
      message: event.message,
      timestamp: new Date().toISOString()
    };

    emitToOverlay('alerts', 'new-alert', data);
  });

  // Démarrer l'écouteur
  listener.start();

  return listener;
};

export const getWebhookListener = () => {
  return listener;
};