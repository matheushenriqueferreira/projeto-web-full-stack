import { MongoClient } from "mongodb";
import * as dotenv from 'dotenv';

dotenv.config();

const uri = `mongodb://mongo/`;
const dbName = process.env.DB_NAME;

const poolConfig = {
  minPoolSize: 10,
  maxPoolSize: 50
}

export class AnnotationModel {
  static async insert(textNote) {
    const client = new MongoClient(uri, poolConfig);
    
    await client.db(dbName).collection('annotations').insertOne(textNote);

    client.close();
    return { status: 201, message: 'Anotação adicionada com sucesso' };
  }

  static async findAll() {
    const client = new MongoClient(uri, poolConfig);
    console.log(client)
    const annotationExists = await client.db(dbName).collection('annotations').find().toArray();
    client.close();
    return (annotationExists ? annotationExists : null);
  }

  static async findByTextNote(textNote) {
    const client = new MongoClient(uri, poolConfig);

    const annotationExists = await client.db(dbName).collection('annotations').find({ textNote: { $eq: textNote}}).toArray();

    client.close();
    return ( annotationExists ? annotationExists : null )
  }
}