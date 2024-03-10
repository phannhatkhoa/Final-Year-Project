// const { MongoClient } = require('mongodb');

// class MongoDBConnector {
//     constructor() {
//         this.uri ="mongodb+srv://khoapngcd201807:khoapngcd201807@cluster0.csh60at.mongodb.net/?retryWrites=true&w=majority";
//         this.client = new MongoClient(this.uri);
//     }

//     async connect() {
//         try {
//             await this.client.connect();
//             await this.client.db("admin").command({ ping: 1 });
//             console.log("Pinged your deployment. You successfully connected to MongoDB!");
//         } catch (error) {
//             console.error("Error connecting to MongoDB:", error);
//         }
//     }
// }

// module.exports = { MongoDBConnector };

