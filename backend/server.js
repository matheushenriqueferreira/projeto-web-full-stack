import express from "express";
import cors from "cors";
import { UserController } from "./controllers/UserController.js";
import { AnnotationController } from "./controllers/AnnotationController.js";
import expressRedisCache from "express-redis-cache";
import https from "https";
import fs from "fs";
import { sanitize }from 'string-sanitizer';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const cache = expressRedisCache({
  prefix: 'redis-test',
  host: 'redis',
  port: 6379
})

cache.invalidate = () => {
  return (req, res, next) => {
    const route_name = req.url;
    if (!cache.connected) {
      next();
      return ;
    }
    cache.del(route_name, (err) => console.log(err));
    next();
  };
};

const reqSanitize = (req, res, next) => {
  const { textNote } = req.params;
  req.textSanitize = sanitize.keepSpace(textNote);
  next();
}

app.post('/users', (req, res) => UserController.register(req, res));

app.post('/login', (req, res) => UserController.login(req, res));

app.post('/annotations', cache.invalidate(), UserController.ensureAuthentication(), (req, res) => AnnotationController.insert(req, res));

app.get('/annotations', (req, res) => AnnotationController.findAll(req, res));

app.get('/annotations/:textNote', (req, res, next) => reqSanitize(req, res, next), (req, res) => AnnotationController.findByTextNote(req, res));

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
  console.log('Server HTTPS');
});