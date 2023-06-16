const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Cadastro
router.post('/signup', (req, res) => {
  const { codigoAcesso, senha, docente, unidadeTematica, monitoriaResponsavel, tipoAtividade, turno } = req.body;

  if (!codigoAcesso || !senha || !docente || !unidadeTematica || !monitoriaResponsavel || !tipoAtividade || !turno) {
    return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
  }

  User.findOne({ codigoAcesso })
    .then(existingUser => {
      if (existingUser) {
        return res.status(400).json({ mensagem: 'Código de acesso já está em uso' });
      }

      const newUser = new User({
        codigoAcesso,
        senha,
        docente,
        unidadeTematica,
        monitoriaResponsavel,
        tipoAtividade,
        turno,
      });

      newUser.save()
        .then(() => {
          res.status(201).json({ mensagem: 'Usuário criado com sucesso' });
          console.log('Novo usuário cadastrado!')
        })
        .catch(err => {
          res.status(500).json({ erro: 'Erro ao criar o usuário' });
        });
    })
    .catch(err => {
      res.status(500).json({ erro: 'Erro ao verificar o código de acesso' });
    });
});

// login
router.post('/login', (req, res) => {
  const { codigoAcesso, senha } = req.body;

  if (!codigoAcesso || !senha) {
    return res.status(400).json({ mensagem: 'Código de acesso e senha são obrigatórios' });
  }

  User.findOne({ codigoAcesso })
    .then(user => {
      if (!user) {
        return res.status(401).json({ mensagem: 'Código de acesso ou senha inválidos' });
      }

      if (user.senha !== senha) {
        return res.status(401).json({ mensagem: 'Código de acesso ou senha inválidos' });
      }

      const token = jwt.sign({ userId: user._id }, 'chave-secreta-do-token', { expiresIn: '1h' });

      res.status(200).json({ mensagem: 'Login bem-sucedido', token });
    })
    .catch(err => {
      res.status(500).json({ erro: 'Erro ao realizar o login' });
    });
});

router.put('/att/:codigoAcesso', (req, res) => {
  const { codigoAcesso } = req.params;
  const updatedUser = req.body;

  User.findOneAndUpdate({ codigoAcesso }, updatedUser, { new: true })
    .then(user => {
      if (!user) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado' });
      }
      res.status(200).json({ mensagem: 'Usuário atualizado com sucesso', user });
    })
    .catch(err => {
      res.status(500).json({ erro: 'Erro ao atualizar o usuário' });
    });
});

router.delete('/del/:codigoAcesso', (req, res) => {
  const { codigoAcesso } = req.params;

  User.findOneAndDelete({ codigoAcesso })
    .then(user => {
      if (!user) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado' });
      }
      res.status(200).json({ mensagem: 'Usuário deletado com sucesso' });
    })
    .catch(err => {
      res.status(500).json({ erro: 'Erro ao deletar o usuário' });
    });
});

module.exports = router;