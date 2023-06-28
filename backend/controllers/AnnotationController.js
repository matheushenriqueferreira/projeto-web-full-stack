import { AnnotationModel } from '../models/AnnotationModel.js';
import logger from './logger.js';

export class AnnotationController {
  static async insert(req, res) {
    const { textNote } = req.body;

    if(!textNote) {
      return res.status(422).json({message: "Campo vazio"});
    }

    try {
      const resInsert = await AnnotationModel.insert({textNote});
      const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
      logger.log('info', `Anotação com id: ${resInsert.id} foi inserida com sucesso no IP ${req.ip} em ${fullUrl}.`);
      return res.status(resInsert.status).json({message: resInsert.message});
    }
    catch(error) {
      const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
      logger.log('error', `Erro no servidor durante a inserção de anotação em ${fullUrl}.`);
      return res.status(500).json({message: 'Aconteceu um erro no servidor'});
    }
  }

  static async findAll(req, res) {
    try {
      const annotationExists = await AnnotationModel.findAll();
      
      if(annotationExists) {
        return res.status(200).json({annotationExists});
      }
      else {
        return res.status(404).json({message: 'Banco de dados vazio ou inexistente'});
      }
    }
    catch(error) {
      const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
      logger.log('error', `Erro no servidor ao tentar pegar todas as anotações em ${fullUrl}.`);
      return res.status(500).json({message: 'Aconteceu um erro no servidor'});
    }
  }

  static async findByTextNote(req, res) {
    const textNote = req.textSanitize;
    try {
      const annotationExists = await AnnotationModel.findByTextNote(textNote);
      if(annotationExists.length !== 0) {
        return res.status(200).json({annotationExists});
      }
      else {
        return res.status(404).json({message: `Não foram encontradas anotações para o termo digitado: ${textNote}`});
      }
    }
    catch(error) {
      const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
      logger.log('error', `Erro no servidor ao pesquisar as anotações em ${fullUrl}.`);
      return res.status(500).json({message: 'Aconteceu um erro no servidor'});
    }
  }
}