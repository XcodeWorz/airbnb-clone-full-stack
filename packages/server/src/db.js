const mongoose = require('mongoose');
const config = require('./config');

mongoose.Promise = global.Promise;

const connectDatabase = () => mongoose.connect(
  process.env.DATABASE_URI || config.DATABASE_URI,
  { useNewUrlParser: true },
);

mongoose.connection
  .once('open', () => console.log('[📚] Mongodb is up and running'))
  .on('error', console.error.bind(console, '[❌ ] MongoDB connection error:'));

module.exports = connectDatabase;
