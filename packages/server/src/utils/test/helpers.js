const mongoose = require('mongoose');
const config = require('./../../config/test.config');

const dbUri = process.env.DATABASE_URI
  || `mongodb://${
    !process.env.NODE_ENV || process.env.NODE_ENV === 'test' ? 'localhost' : 'mongo'
  }:27017/${config.DATABASE_URI}`;

export function connectMongoose() {
  mongoose.connect(
    dbUri,
    { useNewUrlParser: true, useCreateIndex: true },
  );
}

export function clearDatabase() {
  if (mongoose && mongoose.connection && mongoose.connection.db) mongoose.connection.db.dropDatabase();
}

export function disconnectMongoose() {
  mongoose.disconnect();
  mongoose.connections.forEach((connection) => {
    const modelNames = Object.keys(connection.models);

    modelNames.forEach((modelName) => {
      delete connection.models[modelName];
    });

    const collectionNames = Object.keys(connection.collections);
    collectionNames.forEach((collectionName) => {
      delete connection.collections[collectionName];
    });
  });

  const modelSchemaNames = Object.keys(mongoose.modelSchemas);
  modelSchemaNames.forEach((modelSchemaName) => {
    delete mongoose.modelSchemas[modelSchemaName];
  });
}
