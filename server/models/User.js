const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  codigoAcesso: {
    type: String,
    required: true
  },
  senha: {
    type: String,
    required: true
  },
  docente: {
    type: String,
    required: true
  },
  unidadeTematica: {
    type: String,
    required: true
  },
  monitoriaResponsavel: {
    type: String,
    required: true
  },
  tipoAtividade: {
    type: String,
    required: true
  },
  turno: {
    type: String,
    required: true
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;