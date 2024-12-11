const mongoose = require('mongoose');

const ConnectionDb = async () => {
  try {
    // Establish a connection
    await mongoose.connect('mongodb://localhost:27017/lmsproject', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Log connection details
    console.log('Successfully connected to the database');
    console.log('Host:', mongoose.connection.host);

  } catch (error) {
    console.log('There is an error, cannot connect to the DB:', error);
  }
};

module.exports = ConnectionDb;
