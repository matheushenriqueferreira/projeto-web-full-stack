import express from "express";
import cors from "cors";
import { UserController } from "./controllers/UserController.js";
import { AnnotationController } from "./controllers/AnnotationController.js";
import expressRedisCache from "express-redis-cache";
import https from "https";
import fs from "fs";
import { sanitize } from 'string-sanitizer';
import rateLimiterMiddleware from './middlewares/rateLimiter.js';

const app = express();

app.use(cors());
app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const cache = expressRedisCache({
  prefix: 'redis-test',
  host: 'redis',
  port: 6379,
});

const deleteCache = (name) => {
  cache.del(name, (error, entries) => {
    console.log(`O cache "${name}" foi deletado."`);
    return;
  });
}

const invalidateCache = async (req, res, next) => {
  const urlName = req.url;
  deleteCache('annotations');
  next();
}

const reqSanitize = (req, res, next) => {
  const { textNote } = req.params;
  req.textSanitize = sanitize.keepSpace(textNote);
  res.express_redis_cache_name = req.textSanitize;
  next();
}

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

https.createServer(certConfig, app).listen(3000, () => {
  console.log('Server HTTPS on.');
});

