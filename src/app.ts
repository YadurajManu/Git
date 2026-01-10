import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import webhookRoutes from './routes/webhooks.routes';
import { captureRawBody } from './middleware/webhook-verify';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
// app.use(express.json()); // Replaced by captureRawBody for webhook verification
app.use(captureRawBody);

// Logger middleware (simple placeholder for now)
app.use((req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health Check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/webhooks', webhookRoutes);

// Placeholder for future routes
app.get('/', (req: Request, res: Response) => {
  res.send('CI/CD Visualizer Backend is running.');
});

export default app;
