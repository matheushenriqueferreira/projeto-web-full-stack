import { MongoClient } from "mongodb";
import * as dotenv from 'dotenv';

dotenv.config();

const uri = `mongodb://mongo/`;
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