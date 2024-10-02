import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${host}:${port}`;

    // Use async/await and try/catch to handle connection issues
    MongoClient.connect(url, { useUnifiedTopology: true })
      .then((client) => {
        this.dbClient = client.db(database);
      })
      .catch((err) => {
        console.error('Failed to connect to MongoDB', err);
        this.dbClient = false;
      });
  }

  isAlive() {
    return !!this.dbClient;
  }

  async nbUsers() {
    try {
      return this.dbClient.collection('users').countDocuments();
    } catch (err) {
      console.error('Error getting number of users:', err);
      return 0;
    }
  }

  async nbFiles() {
    try {
      return this.dbClient.collection('files').countDocuments();
    } catch (err) {
      console.error('Error getting number of files:', err);
      return 0;
    }
  }
}

export default new DBClient();
