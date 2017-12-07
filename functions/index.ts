import { json } from 'body-parser';
import { config, https } from 'firebase-functions';
import * as express from 'express';
import { initializeApp } from 'firebase-admin';

import auth from './auth';
import comment from './comment';
import { notFound } from './util';

initializeApp(config().firebase);

const app = express();

app.use(json());
app.use('/api/auth', auth);
app.use('/api/comment', comment);
app.use('*', (req, res) => notFound(res));

exports.api = https.onRequest(app);
