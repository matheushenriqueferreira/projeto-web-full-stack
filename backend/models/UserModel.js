import { MongoClient } from "mongodb";
import * as dotenv from 'dotenv';

dotenv.config();

const uri = `mongodb://mongo/`;
const dbName = process.env.DB_NAME;

const poolConfig = {
  minPoolSize: 10,
  maxPoolSize: 50
}

export class UserModel {
  static async insert(content) {
    const client = new MongoClient(uri, poolConfig);
    
    const { insertedId } = await client.db(dbName).collection('users').insertOne({ 
      email: content.userEmail,
      password: content.userPassword
    });
    
    client.close();
    return { status: 201, message: 'Conta criada com sucesso', id: insertedId.toString() }
  }

  static async findOne(userEmail) {
    const client = new MongoClient(uri, poolConfig);
    const userExists = await client.db(dbName).collection('users').findOne({ email: userEmail });

    client.close();
    return (userExists ? userExists : null);
  }
}