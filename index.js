// const { urlencoded } = require('express');
const express = require('express');
const axios = require('axios').default;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* INICIO DAS CONFIGURAÇÕES DO EJS:  */
app.use(express.static('public'));
app.set('view engine', 'ejs');
/* FIM DAS CONFIGURAÇÕES DO EJS:  */

/* INICIO DAS ROTAS DE ACESSO AS PÁGINAS EJS*/
app.get('/', (req, res) => {
    res.render('index');
})
/* FIM DAS ROTAS DE ACESSO AS PÁGINAS EJS*/



/* INICIO DAS ROTAS DE CATEGORIA */

/* CADASTRO DE CATEGORIA */
app.get('/categoria', (req, res) => {
    res.render('categoria/index');
});

/* LISTAGEM DE CATEGORIA */
app.get('/listagemCategorias', (req, res) => {

    /* CONFIGURAÇÃO DA REQUISIÇÃO BACK END VIA AXIOS*/

    /* ROTA DO BACK END */
    const urlListarCategoria = 'http://localhost:3000/listarCategoria';

    /*
     CHAMADA DO AXIOS PARA A ROTA DO BACK END 
     PARAMETROS DO VERBO:
     1 - ROTA
     2 - .then DE TRATAMENTO DA RESPOSTA
     */
    axios.get(urlListarCategoria)
        .then((response) => {

            console.log(response.data);
            let categorias = response.data;
            res.render('categoria/listagemCategoria', { categorias });

        });
});

/* ALTERAÇÃO DE CATEGORIA */
app.get('/editarCategoria/:cod_categoria', (req, res) => {

    let { cod_categoria } = req.params;

    urlListarCategoriaPK = `http://localhost:3000/listarCategoriaPK/${cod_categoria}`;

    axios.get(urlListarCategoriaPK)
        .then((response) => {

            let categoria = response.data;
            console.log(categoria.data)
            res.render('categoria/editarCategoria', { categoria })
        })
})

app.post('/editarCategoria', (req, res) => {

    let urlEditarCategoria = 'http://localhost:3000/alterarCategoria'

    axios.put(urlEditarCategoria, req.body)
        .then((response) => {
            res.redirect('/listagemCategorias')
        })
})

/* EXCLUSÃO DE CATEGORIAS */
app.get('/excluirCategoria/:cod_categoria', (req, res) => {

    let { cod_categoria } = req.params;

    const urlExcluirCategoria = `http://localhost:3000/excluirCategoria/${cod_categoria}`

    axios.delete(urlExcluirCategoria)
        .then((respose) => {
            res.redirect('/listagemCategorias');
        })
})

/* FIM DAS ROTAS DE CATEGORIA */



/* INICIO DAS ROTAS DE FORNECEDOR */

/* CADASTRO DE FORNECEDOR */
app.get('/fornecedor', (req, res) => {
    res.render('fornecedor/index');
});

/* LISTAGEM DE FORNECEDOR */
app.get('/listagemFornecedores', (req, res) => {

    const urlListarFornecedores = 'http://localhost:3000/listarFornecedor'

    axios.get(urlListarFornecedores)
        .then((response) => {

            console.log(response.data);
            let fornecedores = response.data;
            res.render('fornecedor/listagemFornecedor', { fornecedores })

        })

})

/* ALTERAÇÃO DE FORNECEDOR */
app.get('/editarFornecedor/:cod_fornecedor', (req, res) => {

    let { cod_fornecedor } = req.params;

    urlListarFornecedorPK = `http://localhost:3000/listarFornecedorPK/${cod_fornecedor}`

    axios.get(urlListarFornecedorPK)
        .then((response) => {

            let fornecedor = response.data;
            console.log(fornecedor.data)
            res.render('fornecedor/editarFornecedor', { fornecedor });

        })
});

app.post('/editarFornecedor', (req, res) => {

    let urlEditarFornecedor = 'http://localhost:3000/alterarFornecedor'

    axios.put(urlEditarFornecedor, req.body)
        .then((response)=>{
            res.redirect('/listagemFornecedores')
        })
})

/* EXCLUSÃO DE FORNECEDOR */
app.get('/excluirFornecedor/:cod_fornecedor', (req, res) => {

    let {cod_fornecedor} = req.params;

    const urlExcluirFornecedor = `http://localhost:3000/excluirFornecedor/${cod_fornecedor}`;

    axios.delete(urlExcluirFornecedor)
        .then((response)=>{
            res.redirect('/listagemFornecedores')
        })
})

/* FIM DAS ROTAS DE FORNECEDOR */


/* INICIO DAS ROTAS DE MARCA */

/* CADASTRO DE MARCA */
app.get('/marca', (req, res) => {
    res.render('marca/index');
});

/* LISTAGEM DE MARCA */
app.get('/listagemMarcas', (req, res) => {

    const urlListarMarcas = 'http://localhost:3000/listarMarca'

    axios.get(urlListarMarcas)
        .then((response) => {

            console.log(response.data);
            let marcas = response.data;
            res.render('marca/listagemMarca', { marcas })

        })
})

/* FIM DAS ROTAS DE MARCA */
app.listen(3001, () => {
    console.log("SERVIDOR FRONTEND RODANDO EM http://localhost:3001")
})