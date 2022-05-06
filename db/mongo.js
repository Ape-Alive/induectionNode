// mongoose

const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017';

const options = {
    dbName: 'induection',
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const connection = mongoose.createConnection(uri, options);

connection.on('connected', () => {
    console.log(`成功连接到${uri}`);
});

connection.on('error', err => {
    console.log(`连接到${uri}发生故障:`, err);
});

connection.on('disconnected', () => {
    console.log(`成功断开与${uri}的连接`);
});

module.exports = connection;