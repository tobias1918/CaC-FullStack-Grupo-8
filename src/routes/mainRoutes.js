const express = require('express');
const router = express.Router();

const { conn } = require('../db/dbconnection'); // Importa la conexión desde tu módulo

router.get('/productos', async (req, res) => {
    try {
        const sqlQuery = `
            SELECT p.id, p.nombre, p.descripcion,
                   m.id as marca_id, m.nombre as nombre_marca, m.descripcion as desc_marca,
                   c.id as categoria_id, c.nombre as nombre_categoria
            FROM Producto p
            INNER JOIN Marca m ON p.marca_id = m.id
            INNER JOIN Categoria c ON p.categoria_id = c.id
        `;
        const [rows] = await conn.query(sqlQuery);

        // Formatear json
        const productos = rows.map(row => ({
            id: row.id,
            nombre: row.nombre,
            descripcion: row.descripcion,
            marca_id: {
                id: row.marca_id,
                nombre: row.nombre_marca,
                descripcion: row.desc_marca
            },
            categoria_id: {
                id: row.categoria_id,
                nombre: row.nombre_categoria
            }
        }));

        res.json(productos);
    } catch (err) {
        console.error('Error al obtener productos:', err);
        res.status(500).send('Error al obtener productos');
    }
});

module.exports = router;
