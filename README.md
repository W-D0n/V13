# Projet V13_Overlay

Tentative de création de système d'overlay dynamique et interactif via twitch
Créer un système d'overlay pour OBS Studio dynamique, trigger via websocket et/ou webhook.

## Packages installed

```bash
  npx sv create v13 # Création de l'app Sveltekit.
  pnpm add socket.io socket.io-client # Ajout du service de websocket.
  pnpm add @twurple/auth @twurple/api @twurple/chat @twurple/eventsub-http # Ajout d'une lib externe "twurple" (https://github.com/twurple/twurple) pour utiliser les APIs Twitch.
```

## Vie du projet

- [30/03/2025] Pour l'instant tout est généré via la réponse de claude.ia. Tout le code n'est que copié-collé. La réponse me parait compliquée (à cause de la partie websocket justement) pour l'instant. Je vais essayer de me contenter de faire du local pour me concentrer sur la construction de l'overlay et de son animation. L'interaction viendra ensuite (peut être que je n'ai pas BESOIN de créer quelque chose mais passer par des outils existant...?).

### Notes

- [30/03/2025] J'ai installé ngrok pour permettre la mise en ligne d'un lien vers le websocket ou webhook (j'ai pas encore bien compris). Car il est nécessaire d'exposer une adresse publique.
