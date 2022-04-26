const router = require('express').Router()
const { route } = require('express/lib/application')
const Loja = require('../Models/Loja')

//Post
router.post('/', async (req,res)=> {
    const { nome, produto, sku, preco, estoque} = req.body

    if(!nome){
        res.status(422).json({error: 'Os dados são obrigatórios'})//erros eventuais do sistema
    }

    const loja = {
        nome, produto, sku, preco, estoque
    }

    try{
        await Loja.create(loja)
        res.status(201).json({message: 'Loja inserido com sucesso!'}) //Dado criado com sucesso
    } catch(error){
        res.status(500).json({error: error}) //erro de conexão com o servidor
    }
})

//Update
router.patch('/:id', async (req,res)=>{
    const id = req.params.id
    const {nome, produto, sku, preco, estoque} = req.body

    const loja ={
        nome, produto, sku, preco, estoque
    }

    try {
        const updatePerson = await Loja.updateOne({_id: id}, loja)

        //matchedCount - quantos registros foram atualizados
        if (updatePerson.matchedCount === 0){
            res.status(201).json({message: 'Loja inserido com sucesso!'}) //Dado criado com sucesso
        }

        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({error: error}) //erro de conexão com o servidor
    }
})

//Delete
router.delete('/:id', async (req,res)=>{
    const id = req.params.id

    const loja = await Loja.findOne({_id: id})

    if (!loja){
        res.status(422).json({message: 'A Loja não foi encontrado'})
        return
    }

    try {
        await Loja.deleteOne({_id:id})
        res.status(200).json({message: 'Loja deletado com sucesso'})
    } catch (error) {
        res.status(500).json({error: error}) //erro de conexão com o servidor
    }
})

//GetAll
router.get('/', async (req, res)=> {
    try {
        const loja = await Loja.find()
        res.status(200).json(loja)
    } catch (error) {
        res.status(500).json({error: error}) //erro de conexão com o servidor
    }
})

//GetId
router.get('/:id', async (req, res)=> {
    const id = req.params.id

    try {    
        const loja = await Loja.findOne({_id: id})

        if (!loja){
            res.status(422).json({message: 'A Loja não foi encontrado'})
            return
        }
        res.status(200).json(loja)
    } catch (error) {
        res.status(500).json({error: error}) //erro de conexão com o servidor
    }
})

module.exports = router