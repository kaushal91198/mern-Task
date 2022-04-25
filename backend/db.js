const mongoose = require('mongoose');

const url = 'mongodb://localhost/ibook';
mongoose.connect(url);


const connectToMongo = ()=>{

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected...');
}).on('error',(err) => {
    console.log('Connection failed...')
});

}
module.exports = connectToMongo