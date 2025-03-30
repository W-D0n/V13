import { writable } from 'svelte/store';

export interface Alert {
  id: string;
  type: 'follow' | 'subscription' | 'cheer' | 'donation' | 'raid';
  username: string;
  message?: string;
  amount?: number;
  tier?: string;
  timestamp: string;
  isProcessed: boolean;
  duration?: number;
}

// File d'attente des alertes
const createAlertQueue = () => {
  const { subscribe, update, set } = writable<Alert[]>([]);

  return {
    subscribe,
    // Ajouter une alerte à la file d'attente
    add: (alert: Omit<Alert, 'id' | 'isProcessed'>) => {
      const newAlert: Alert = {
        ...alert,
        id: crypto.randomUUID(),
        isProcessed: false,
        duration: getDurationForAlertType(alert.type)
      };

      update(alerts => [...alerts, newAlert]);
      return newAlert.id;
    },
    // Marquer une alerte comme traitée
    markAsProcessed: (id: string) => {
      update(alerts =>
        alerts.map(alert =>
          alert.id === id
            ? { ...alert, isProcessed: true }
            : alert
        )
      );
    },
    // Supprimer une alerte de la file d'attente
    remove: (id: string) => {
      update(alerts => alerts.filter(alert => alert.id !== id));
    },
    // Vider la file d'attente
    clear: () => {
      set([]);
    },
    // Obtenir la prochaine alerte non traitée
    getNext: () => {
      let nextAlert: Alert | null = null;

      update(alerts => {
        const index = alerts.findIndex(a => !a.isProcessed);
        if (index >= 0) {
          nextAlert = alerts[index];
        }
        return alerts;
      });

      return nextAlert;
    }
  };
};

// Durée des alertes selon leur type (en ms)
const getDurationForAlertType = (type: Alert['type']): number => {
  switch (type) {
    case 'follow':
      return 5000; // 5 secondes
    case 'subscription':
      return 8000; // 8 secondes
    case 'cheer':
    case 'donation':
      return 7000; // 7 secondes
    case 'raid':
      return 10000; // 10 secondes
    default:
      return 5000; // Valeur par défaut
  }
};

export const alertQueue = createAlertQueue();

// Store pour l'alerte actuellement affichée
export const currentAlert = writable<Alert | null>(null);

// Processeur d'alertes - gère l'affichage séquentiel des alertes
export const startAlertProcessor = () => {
  let isProcessing = false;

  const processNext = () => {
    if (isProcessing) return;

    const nextAlert = alertQueue.getNext();
    if (!nextAlert) return;

    isProcessing = true;
    alertQueue.markAsProcessed(nextAlert.id);
    currentAlert.set(nextAlert);

    // Définir un timeout pour effacer l'alerte après sa durée
    setTimeout(() => {
      currentAlert.set(null);

      // Attendre un court délai entre les alertes
      setTimeout(() => {
        isProcessing = false;
        processNext(); // Traiter l'alerte suivante
      }, 1000);
    }, nextAlert.duration || 5000);
  };

  // S'abonner aux changements dans la file d'attente
  const unsubscribe = alertQueue.subscribe(alerts => {
    if (!isProcessing && alerts.some(a => !a.isProcessed)) {
      processNext();
    }
  });

  return {
    stop: unsubscribe
  };
};