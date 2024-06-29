import express from 'express';
import cors from 'cors';
import testRouter from './routes/test.route.js'
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/get', (req, res) => {
  res.send('API Working');
});

app.use('/api/auth', authRouter);
app.use('/api/test',testRouter)

app.listen(8800, () => {
  console.log('Server is running');
});
