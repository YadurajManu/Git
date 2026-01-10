import app from './app.js';
import { createServer } from 'node:http';
import { initSocket } from './lib/socket.js';

const PORT = process.env.PORT || 3000;

const httpServer = createServer(app);
initSocket(httpServer);

httpServer.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${PORT}`);
});
