import express from "express";
import cors from "cors";
import { UserController } from "./controllers/UserController.js";
import { AnnotationController } from "./controllers/AnnotationController.js";
import https from "https";
import fs from "fs";
import { Server } from "socket.io";

import reqSanitize from "./middlewares/stringSanitizer.js";
import rateLimiterMiddleware from './middlewares/rateLimiter.js';
import cache, { deleteCache, invalidateCache } from "./middlewares/redis.js";

const dir = "./logs";

if (!fs.existsSync(dir)){
  fs.mkdirSync(dir);
}

const app = express();

app.use(cors());
app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.post('/users', (req, res) => UserController.register(req, res));

app.post('/login', 
  async (req, res, next) => await rateLimiterMiddleware(req, res, next),
  (req, res) => UserController.login(req, res)
);

app.post('/annotations', 
  UserController.ensureAuthentication(), 
  (req, res, next) => invalidateCache(req, res, next), 
  (req, res) => AnnotationController.insert(req, res)
);

app.get('/annotations',
  cache.route('annotations', 120),
  (req, res) => AnnotationController.findAll(req, res)
);

app.get('/annotations/:textNote',
  (req, res, next) => reqSanitize(req, res, next),
  cache.route(60),
  async (req, res) => {
    const result = await AnnotationController.findByTextNote(req, res)
    if(result.json().statusCode === 404) {
      deleteCache(req.textSanitize);
    }
  }
);

app.use((req, res) => {
  res.status(404).json({ 
    message: 'Conteúdo não encontrado',
    path: req.path
  });
});

const certConfig = {
  cert: fs.readFileSync('SSL/code.crt'),
  key: fs.readFileSync('SSL/code.key')
}

const server = https.createServer(certConfig, app);

const webSocket = new Server(server, {
  cors: {
    origin: "https://localhost:5173",
    methods: ["GET", "POST"]
  }
});

webSocket.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data)
  });
});

server.listen(3000, () => console.log('Server HTTPS on.'));
