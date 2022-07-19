const express = require('express');
const app = express();
const mysql = require('mysql');

app.use(express.json());

app.use('/script', express.static(`${__dirname}/front-end/assets/script.js`));
app.use('/css', express.static(`${__dirname}/front-end/assets/style.css`));
app.use('/img', express.static(`${__dirname}/front-end/assets/img`));

var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com',
    user: 'bsale_test',
    password: 'bsale_test',
    database: 'bsale_test',
});
app.listen(process.env.PORT || 3000, () => console.log("Servidor 3000 proyecto activo http://localhost:3000"));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/front-end/home.html`);
});

//llamada a la base de datos de entrega las categorias que conforman el menú
app.get('/categorias', async (req, res) => {
    try {
        pool.query('SELECT * FROM category', function (error, results, fields) {
            if (error) throw error;
            const categorias = results;
            res.status(200).send(categorias);
        });
    } catch (err) {
        res.status(500).json({
            error: `Algo salió mal... ${err}`,
            code: 500
        });
    }
});

//llamada a la base de datos que entrega todos los productos y mediante el id de categoria filtra los productos
app.get('/productos/:categoria', async (req, res) => {
    try {
        const idCategoria = req.params.categoria;
        
        if (idCategoria == 'all') {
            pool.query('SELECT * FROM product', function (error, results, fields) {
                if (error) throw error;
                const productos = results;
                res.status(200).send(productos);
            });
        } else {
            pool.query('SELECT * FROM product WHERE category = ?', [idCategoria], function (error, results, fields) {
                if (error) throw error;
                const productos = results;
                res.status(200).send(productos);
            });
        }
    } catch (err) {
        res.status(500).json({
            error: `Algo salió mal... ${err}`,
            code: 500
        });
    }
});

//llamada a la base de datos que busca mediante el string obtenido desde el input del html
app.get('/buscar', async (req, res) => {
    try {
        const busqueda = req.query.busqueda
        pool.query(`SELECT * FROM product WHERE name LIKE '%${busqueda}%'`, function (error, results, fields) {
            if (error) throw error;
            const productos = results;
            res.status(200).send(productos);
        });
    } catch (err) {
        res.status(500).json({
            error: `Algo salió mal... ${err}`,
            code: 500
        });
    }
});