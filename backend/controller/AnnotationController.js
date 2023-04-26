import { AnnotationModel } from '../model/AnnotationModel.js';

export class AnnotationController {
  static async insert(req, res) {
    const { textNote } = req.body;

    if(!textNote) {
      return res.status(422).json({message: "Campo vazio"});
    }

    try { 
      const resInsert = await AnnotationModel.insert({textNote});
      return res.status(resInsert.status).json({message: resInsert.message});
    }
    catch(error) {
      return res.status(500).json({message: 'Aconteceu um erro no servidor'});
    }
  }

  static async getAllAnnotations(req, res) {
    try {
      const annotationExists = await AnnotationModel.find();
      
      if(annotationExists) {
        return res.status(201).json({annotationExists});
      }
      else {
        return res.status(404).json({message: 'Banco de dados vazio ou inexistente'});
      }
    }
    catch(error) {
      return res.status(500).json({message: 'Aconteceu um erro no servidor'});
    }
  }

  static async getAnnotationsByName(req, res) {
    const textNote = req.params.name;
    try {
      const annotations = await AnnotationModel.find(textNote);
    
      if(annotations) {
        return res.status(201).json({annotations});
      }
      else {
        return res.status(404).json({message: 'Anotação não encontrada'});
      }
    }
    catch(error) {
      return res.status(500).json({message: 'Aconteceu um erro no servidor'});
    }
  }
}