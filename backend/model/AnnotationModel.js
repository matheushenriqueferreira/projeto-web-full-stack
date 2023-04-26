import { MongoClient } from "mongodb";
import * as dotenv from 'dotenv';

dotenv.config();

//const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.k20jrfr.mongodb.net/?retryWrites=true&w=majority`;
const uri = process.env.DB_LOCAL_URI;
const dbName = process.env.DB_NAME;

export class AnnotationModel {
  static async insert(textNote) {
    const client = new MongoClient(uri);
    
    await client.db(dbName).collection('annotations').insertOne(textNote);

    client.close();
    return { status: 201, message: 'Anotação adicionada com sucesso' };
  }

  static async find(textNote) {
    const client = new MongoClient(uri);
    const annotationExists = textNote ? await client.db(dbName).collection('annotations').findOne(textNote) 
                                      : await client.db(dbName).collection('annotations').find().toArray();
    
    client.close();
    return (annotationExists ? annotationExists : null);
  }
}