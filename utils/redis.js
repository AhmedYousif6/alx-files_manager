import { createClient } from 'redis';
import { promisify } from 'util';

/**
 * Represents Redis Client.
 */
class RedisClient {
  /**
   * Creates a new RedisClient instance.
   */
  constructor() {
    this.client = createClient();
    this.client.on('error', (err) => {
      console.log(`Redis client failed to connect: ${err}`);
    });
  }

  /**
   * Checks if thsi client's connection to the Redis server is active.
   * @returns {boolean}
   */
  isAlive() {
    return this.client.connected;
  }

  /**
   * Retrieves the value of a given key.
   * @param {String} key the key of the item to retrieve.
   * @returns {String | Object}
   */
  async get(key) {
    return promisify(this.client.GET).bind(this.client)(key);
  }

  /**
   * Stores key and its value with an expiration time.
   * @param {String} key the key of the item to store.
   * @param {string | Number | Boolean} value the item to store.
   * @param {Number} duration the expiration of the item in seconds.
   * @returns {Promise<void>}
   */
  async set(key, value, duration) {
    await promisify(this.client.SETEX)
      .bind(this.client)(key, duration, value);
  }

  /**
   * Removes the value of a given key.
   * @param {String} key the key of the item to remove.
   * returns {Promise>void>}
   */
  async del(key) {
    await promisify(this.client.DEL).bind(this.client)(key);
  }

export const redisClient = new RedisClient();
export default redisClient;
