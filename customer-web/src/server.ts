import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';

import express from 'express';
import cookieParser from 'cookie-parser';
import { join } from 'node:path';
import dotenv from 'dotenv';
import { requestLogger } from '../server/utils/requestLogger';
import { requestIdMiddleware } from '../server/middlewares/requestId.middleware';
import { REQUEST_ID } from './app/core/tokens/request-id.token';
import { randomUUID } from 'crypto';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

dotenv.config();

// 🔥 Backend imports
import backendApp from '../server/app';
import connectDB from '../server/config/db';

// 🔥 Connect MongoDB
connectDB();
app.use(requestIdMiddleware);
app.use((req, res, next) => {
  // 🚫 Skip SSR logging for API routes
  if (req.originalUrl.startsWith('/api')) {
    return next();
  }
  requestLogger('SSR')(req, res, next);
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔥 Mount backend API
app.use('/api', requestLogger('API'), backendApp);


// ================== EXISTING MAPBOX APIs ==================

app.get('/api/location-search', async (req, res) => {
  const query = req.query['q'];
  if (!query) return res.json([]);

  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?limit=5&autocomplete=true&access_token=${process.env['MAPBOX_TOKEN']}`
    );

    const data = await response.json();
    return res.json(data.features);

  } catch (error) {
    return res.status(500).json({ error: 'Location search failed' });
  }
});

app.get('/api/location/reverse', async (req, res) => {
  const lat = req.query['lat'];
  const lng = req.query['lng'];
  if (!lat || !lng) {
    return res.status(400).json({ error: 'Latitude and Longitude required' });
  }
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${process.env['MAPBOX_TOKEN']}`
    );
    const data = await response.json();
    return res.json(data.features[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Reverse geocoding failed' });
  }
});

// ================== STATIC ==================

app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

// ================== SSR ==================

/**
 * Handle all other requests by rendering the Angular application.
 */


app.use(async (req, res, next) => {

  // 🚫 Skip SSR for API routes
  if (req.path.startsWith('/api')) {
    return next();
  }

  try {
    const city = req.cookies?.city;
    const isRoot = req.path === '/';

    if (isRoot && city) {
      return res.redirect(`/india/${city}`);
    }

    (globalThis as any).REQUEST_ID = req.requestId
    const response = await angularApp.handle(req);

    if (response) {
      return writeResponseToNodeResponse(response, res);
    }

    next();

  } catch (err) {
    next(err);
  }
});

// ================== SERVER START ==================

if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;

  app.listen(port, (error) => {
    if (error) throw error;

    console.log(`Server running on http://localhost:${port}`);
  });
}

export const reqHandler = createNodeRequestHandler(app);