import { UserModel } from "../models/UserModel.js";
import jsonwebtoken from 'jsonwebtoken';
import { expressjwt } from "express-jwt";
import * as dotenv from 'dotenv';
import bcrypt from "bcrypt";

import logger from "./logger.js";

dotenv.config();

const secret = process.env.SECRET;

export class UserController {
  static async register(req, res) {
    const { userEmail, userPassword, userConfirmPassword } = req.body;
  
    if(!userEmail) {
      return res.status(422).json({message: "Insira um e-mail"});
    }
    
    if(!userPassword) {
      return res.status(422).json({message: "Insira uma senha"});
    }
    
    if(!userConfirmPassword) {
      return res.status(422).json({message: "Confirme sua senha"});
    }

    if(userPassword !== userConfirmPassword) {
      return res.status(422).json({message: "As senhas não são iguais. Tente novamente."});
    }

    try {
      const userExists = await UserModel.findOne(userEmail);
      if(userExists) {
        return res.status(422).json({message: 'Já existe um usuário cadastrado com este e-mail!'});
      }
      else {
        const hash = bcrypt.hashSync(userPassword, 10);

        const resInsert = await UserModel.insert({
          userEmail,
          userPassword: hash
        });
        
        const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        logger.log('info', `Usuário: ${resInsert.id} criado com sucesso no IP ${req.ip} em ${fullUrl}.`);
        
        return res.status(resInsert.status).json({message: resInsert.message});
      }
    }
    catch(error) {
      const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
      logger.log('error', `Erro no servidor ao tentar cadastrar um usuário em ${fullUrl}.`);
      return res.status(500).json({message: 'Aconteceu um erro no servidor'});
    }
  }

  static async login(req, res) {
    const { userEmail, userPassword } = req.body;
    if(!userEmail) {
      return res.status(422).json({message: "Insira um e-mail"});
    }
    
    if(!userPassword) {
      return res.status(422).json({message: "Insira uma senha"});
    }
    
    try {
      const user = await UserModel.findOne(userEmail);
      if(!user) {
        return res.status(404).json({message: 'Não foi encontrado cadastro vinculado a este e-mail'});
      }

      const match = await bcrypt.compare(userPassword, user.password);
      
      //Verificar senha
      if(match) {
        const token = jsonwebtoken.sign({}, secret, {
          subject: `${user._id}`,
          expiresIn: "300s"
        });

        const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        logger.log('info', `Usuário: ${user._id.toString()} autenticado com sucesso no IP ${req.ip} em ${fullUrl}.`);
        
        return res.status(200).json({message: 'Usuário autenticado', token});
      }
      else {        
        return res.status(422).json({message: 'Usuário ou senha incorretos.'});
      }
    }
    catch(error) {
      const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
      logger.log('error', `Erro no servidor ao tentar fazer login em ${fullUrl}.`);
      return res.status(500).json({message: 'Aconteceu um erro no servidor'});
    }
  }

  static ensureAuthentication() {
    return [
      expressjwt( {secret: secret, algorithms: ["HS256"]}),
      (err, req, res, next) => {res.status(err.status).json({ message: err.message }); }
    ]
  }
}