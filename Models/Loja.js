const mongoose = require('mongoose')

const Loja = mongoose.model('Loja', {
    nome: String,
    produto: String,
    sku: String,
    preco: Number,
    estoque: Number
})

module.exports = Loja