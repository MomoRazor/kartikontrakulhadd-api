import express from 'express';
import { bouncer } from './middleware';
import cors from 'cors';
import helmet from 'helmet';

const app = express();

app.use(cors());
app.use(helmet());
app.use(bouncer);

app.get('/', (_, res) => {
    res.send('Hello from the KartiKontraKulhadd API Service!');
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
