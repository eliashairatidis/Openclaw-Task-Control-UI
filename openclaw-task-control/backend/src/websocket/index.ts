import { Server as HttpServer } from 'http';
import WebSocket, { WebSocketServer } from 'ws';

export const initWebsocket = (server: HttpServer) => {
  const wss = new WebSocketServer({ server, path: '/ws' });

  wss.on('connection', (socket: WebSocket) => {
    socket.send(JSON.stringify({ type: 'connected', message: 'WebSocket connected' }));
  });

  return {
    broadcast: (event: string, payload: unknown) => {
      const message = JSON.stringify({ event, payload, ts: new Date().toISOString() });
      for (const client of wss.clients) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      }
    },
  };
};
