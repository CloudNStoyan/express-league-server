import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

import config from './config';

const app = express()

app.get('/', (req: Request, res: Response) => {
  res.send(config.secrets.riotApiToken)
})

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`)
})