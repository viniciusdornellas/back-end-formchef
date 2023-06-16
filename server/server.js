const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use(cors());

mongoose.connect('mongodb://localhost:27017/usuario', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexão com o banco bem sucedida');
  })
  .catch(err => {
    console.error('Erro ao conectar com o banco:', err);
  });

 app.listen(3000,function(){
     console.log('Listening on port 3000!');
 });