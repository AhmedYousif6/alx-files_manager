import mongodb from 'mongodb';

/**
 * Represents a mongodb client.
 */
class DBClient {
  /**
   * Creates new db client instance.
   */
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'file_manager';
    const url = `mongodb://${host}:${port}/${database}`;
    this.client = new mongodb.MongoClient(url, { useUnifiedTopology: true });
    this.client.connect();
  }

  /**
   * Checks if this client's connection to the mongodb server is active.
   * @returns {boolean}
   */
  isAlive() {
    return this.client.isConnected();
  }

  /**
   * Retrieves the number of the users in the db.
   * @returns {Promise<Number>}
   */
  async nbUsers() {
    return this.client.db().collection('users').countDocuments();
  }

  /**
   * Retrieves the number of files in the db.
   * @returns {Promise<Number>}
   */
  async nbFiles() {
    return this.client.db().collection('files').countDocuments();
  }
}

export const dbClient = new DBClient();
export default dbClient;
