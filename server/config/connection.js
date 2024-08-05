 const mongoose = require('mongoose');

 //Replace <db_name> with the name of your database, ex: 'userdb'
 mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/');

 module.exports = mongoose.connection;