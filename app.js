const express = require('express');
const exphbs = require('express-handlebars');
const sequelize = require('./config/db');
const Produto = require('./models/produto.model');

const app = express();
app.engine('handlebars', exphbs.engine({defaultLayout: false}));
app.set('view engine', 'handlebars');

app.get('/exercicio4', async (req, res) => {
    await Produto.create({
        nome: 'Picolé de morango',
        preco: 2.25
    });
    await Produto.create({
        nome: 'Picolé de Uva',
        preco: 2.25
    });
    await Produto.create({
        nome: 'Picolé de ninho com nutela',
        preco: 3.50
    });
    const produtos = await Produto.findAll();
    console.log(produtos);
    res.send('3 produtos criados com sucesso!');
});

app.get('/exercicio5', async (req, res) => {
    const id = 2; 

    const produto = await Produto.findByPk(id);

    if (!produto) {
        console.log('Produto não encontrado');
        res.send('Produto não encontrado');
    }else{
        console.log('Nome:', produto.nome);
        console.log('Preço:', produto.preco);
        res.send('Produto encontrado!');
    }
});

app.get('/exercicio6', async (req, res) => {
    const id = 1;
    const produto = await Produto.findByPk(id);
    produto.preco = produto.preco + 1;
    await produto.save();
    console.log('Nome:', produto.nome);
    console.log('Novo preço:', produto.preco);

    res.send('Preço do produto atualizado com sucesso!');
});


app.get('/exercicio6/deletar', async (req, res) => {
    const product = await Produto.findByPk(3);
    await product.destroy();

    const produtosSobra = await Produto.findAll({raw:true});
    res.send('produto deletado com sucesso!');
})

async function conectarBD() {
    try {   
        await sequelize.sync();
        console.log('Conexão com o banco estabelecida!');
    } catch (erro) {
        console.error(erro);
    }
}
conectarBD();

app.listen(
    3000,
    () => console.log('Servidor em execução')
)