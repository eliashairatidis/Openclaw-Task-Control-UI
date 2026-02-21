import { Server as HttpServer } from 'http';
import { WebSocketServer } from 'ws';

export const initWebsocket = (server: HttpServer) => {
  const wss = new WebSocketServer({ server, path: '/ws' });

  wss.on('connection', (socket) => {
    socket.send(JSON.stringify({ type: 'connected', message: 'WebSocket connected' }));
  });

  return {
    broadcast: (event: string, payload: unknown) => {
      const message = JSON.stringify({ event, payload, ts: new Date().toISOString() });
      for (const client of wss.clients) {
        if (client.readyState === client.OPEN) {
          client.send(message);
        }
      }
    },
  };
};
