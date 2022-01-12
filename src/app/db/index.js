const mongoose = require('mongoose');

async function connect() {
    mongoose
        .connect('mongodb://localhost:27017/Data', {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true
            })
        .then((db) => console.log('Connect Database successfully !!!'))
        .catch((err) => console.log('Connect Database Failures !!!'));

}

module.exports = { connect };