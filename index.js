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