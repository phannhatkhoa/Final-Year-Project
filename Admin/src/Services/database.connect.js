const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://khoapngcd201807:khoapngcd201807@ecommerce.lmrmstc.mongodb.net/?retryWrites=true&w=majority&appName=Ecommerce';

class DatabaseServices {
  constructor() {
    this.client = new MongoClient(uri);
    this.db = this.client.db('ecommerce');
  }

  async connect() {
    try {
      // Send a ping to confirm a successful connection
      await this.db.command({ ping: 1 });
      console.log('Pinged your deployment. You successfully connected to MongoDB!');
    } catch (error) {
      console.error('Unable to connect to MongoDB Atlas. Check your env file for more details.');
      console.error(error);
    }
  }

  get userCollection() {
    return this.db.collection('users');
  }
  get productCollection() {
    return this.db.collection('products');
  }
  get cartCollection() {
    return this.db.collection('cart');
  }
  get paymentCollection() {
    return this.db.collection('payment');
  }
  get categoryCollection() {
    return this.db.collection('category');
  }
  get brandCollection() {
    return this.db.collection('brand');
  }
  get orderHistoryCollection() {
    return this.db.collection('orderHistory');
  }
}

const databaseServices = new DatabaseServices();
module.exports = databaseServices;
