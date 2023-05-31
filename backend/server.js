import express from "express";
import cors from "cors";
import { UserController } from "./controllers/UserController.js";
import { AnnotationController } from "./controllers/AnnotationController.js";
import expressRedisCache from "express-redis-cache";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const cache = expressRedisCache({
  prefix: 'redis-test',
  host: 'redis',
  port: 6379
})

cache.invalidate = (name) => {
  return (req, res, next) => {
    const route_name = name ? name : req.url;
    if (!cache.connected) {
      next();
      return ;
    }
    cache.del(route_name, (err) => console.log(err));
    next();
  };
};

app.post('/users', (req, res) => UserController.register(req, res));

app.post('/login', (req, res) =>  UserController.login(req, res));

app.post('/annotations', cache.invalidate(), UserController.ensureAuthentication(), (req, res) => AnnotationController.insert(req, res));

app.get('/annotations', cache.route(), (req, res) => AnnotationController.findAll(req, res));

app.get('/annotations/:textNote', (req, res) => AnnotationController.findByTextNote(req, res));

app.use((req, res) => {
  res.status(404).json({ 
    message: 'Conteúdo não encontrado',
    path: req.path
  });
});

app.listen(3000);