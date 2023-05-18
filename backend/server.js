import express from "express";
import cors from "cors";
import { UserController } from "./controllers/UserController.js";
import { AnnotationController } from "./controllers/AnnotationController.js";
const app = express();

app.use(cors());
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.post('/users', (req, res) => UserController.register(req, res));

app.post('/login', (req, res) =>  UserController.login(req, res));

app.post('/annotations', UserController.ensureAuthentication(), (req, res) => AnnotationController.insert(req, res));

app.get('/annotations', (req, res) => AnnotationController.findAll(req, res));

app.get('/annotations/:textNote', (req, res) => AnnotationController.findByTextNote(req, res));

app.use((req, res) => {
  res.status(404).json({ 
    message: 'Conteúdo não encontrado',
    path: req.path
  });
});

app.listen(3000);