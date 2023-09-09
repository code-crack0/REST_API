import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';
const app = express();

app.use(cors(
    {
        credentials: true,
    }
));

app.use(bodyParser.json());
app.use(compression());
app.use(cookieParser());

const server = http.createServer(app);

server.listen(8080, () => {
    console.log('Server listening on port http://localhost:8080');
}
)
const MONGO_URL = "mongodb+srv://samad:samad@cluster0.xpcvrdm.mongodb.net/?retryWrites=true&w=majority";
mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);

mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance');
}
)
app.use('/',router())