import express from "express";
import cors, {CorsOptions} from 'cors';
import messagesRouter from './routes/messages';

const app = express();
const port = 8000;

const whiteList = ['http://localhost:5173'];
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || whiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/messages', messagesRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});