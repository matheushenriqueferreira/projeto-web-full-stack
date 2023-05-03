import { MongoClient } from "mongodb";
import * as dotenv from 'dotenv';

dotenv.config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.fltl8n2.mongodb.net/?retryWrites=true&w=majority`;
const dbName = process.env.DB_NAME;

export class AnnotationModel {
  static async insert(textNote) {
    const client = new MongoClient(uri);
    
    await client.db(dbName).collection('annotations').insertOne(textNote);

    client.close();
    return { status: 201, message: 'Anotação adicionada com sucesso' };
  }

  static async find() {
    const client = new MongoClient(uri);
    const annotationExists = await client.db(dbName).collection('annotations').find().toArray();
    
    client.close();
    return (annotationExists ? annotationExists : null);
  }

  static async findTextNote(textNote) {
    const client = new MongoClient(uri);

    const annotationExists = await client.db(dbName).collection('annotations').find({ textNote: { $eq: textNote}}).toArray();

    client.close();
    return ( annotationExists ? annotationExists : null )
  }
}