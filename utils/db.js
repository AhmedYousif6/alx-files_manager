#!/usr/bin/node

const { MongoClient } = require('mongodb');
const mongo = require('mongodb');

/**
 * Represents mongoClient database.
 */
class DBClient {
  /** 
   * Creates MongoClient instance.
   */
  constructor() {
    const host = (process.env.DB_HOST) ? process.env.DB_HOST : 'localhost';
    const port = (process.env.DB_PORT) ? process.env.DB_PORT : 27017;
    this.database = (process.env.DB_DATABASE) ? process.env.DB_DATABASE : 'files_manager';
    const dbUrl = `mongodb://${host}:${port}`;
    this.connected = false;
    this.client = new MongoClient(dbUrl, { useUnifiedTopology: true });
    this.client.connect().then(() => {
      this.connected = true;
    }).catch((err) => console.log(err.message));
  }

  /**
   * Checks if the client's connection to the mongo is active.
   * @returns {boolean}
   */
  isAlive() {
    return this.connected;
  }

  /**
   * Retrieves the number of users.
   * @returns {Promise<Number>}
   */
  async nbUsers() {
    await this.client.connect();
    const users = await this.client.db(this.database).collection('users').countDocuments();
    return users;
  }

  /**
   * Retrieves the number of files in the mongo db.
   * @returns {Promise<Number>}
   */
  async nbFiles() {
    await this.client.connect();
    const users = await this.client.db(this.database).collection('files').countDocuments();
    return users;
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
