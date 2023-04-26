import { MongoClient } from "mongodb";
import * as dotenv from 'dotenv';

dotenv.config();

//const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.k20jrfr.mongodb.net/?retryWrites=true&w=majority`;
const uri = process.env.DB_LOCAL_URI;
const dbName = process.env.DB_NAME;

export class UserModel {
  static async insert(content) {
    const client = new MongoClient(uri);
    
    await client.db(dbName).collection('users').insertOne({ 
      email: content.userEmail,
      password: content.userPassword
    });

    client.close();
    return { status: 201, message: 'Conta criada com sucesso' }
  }

  static async findOne(userEmail) {
    const client = new MongoClient(uri);
    const userExists = await client.db(dbName).collection('users').findOne({ email: userEmail });

    client.close();
    return (userExists ? userExists : null);
  }
}