const { conn } = require('../db/dbconnection');

exports.getHome= async(req, res) =>{
    res.render('home');
}

exports.getSobreNosotros= async(req, res) =>{
    res.render('sobreNosotros');
}



// Obtener todos los productos para la vista de administrador
exports.getAllProductos = async (req, res) => {
    try {
        const sqlProductos = `
            SELECT p.id, p.nombre, p.descripcion, p.imagen as imagen_producto,
                   m.id as marca_id, m.nombre as nombre_marca,
                   c.id as categoria_id, c.nombre as nombre_categoria
            FROM Producto p
            INNER JOIN Marca m ON p.marca_id = m.id
            INNER JOIN Categoria c ON p.categoria_id = c.id
        `;
        const [productosRows] = await conn.query(sqlProductos);

        const sqlMarcas = `SELECT id, nombre FROM Marca`;
        const [marcasRows] = await conn.query(sqlMarcas);

        const sqlCategorias = `SELECT id, nombre FROM Categoria`;
        const [categoriasRows] = await conn.query(sqlCategorias);

        const productos = productosRows.map(row => ({
            id: row.id,
            nombre: row.nombre,
            descripcion: row.descripcion,
            imagen: row.imagen_producto,
            marca: {
                id: row.marca_id,
                nombre: row.nombre_marca
            },
            categoria: {
                id: row.categoria_id,
                nombre: row.nombre_categoria
            }
        }));

        res.render('admin', {
            productos: productos,
            marcas: marcasRows,
            categorias: categoriasRows
        });
    } catch (err) {
        console.error('Error al obtener productos, marcas y categorías:', err);
        res.status(500).send('Error al obtener productos, marcas y categorías');
    }
};


// Obtener todos los productos para la vista de tienda
exports.getAllProductosTienda = async (req, res) => {
    try {
        const sqlQuery = `
            SELECT p.id, p.nombre, p.descripcion, p.imagen as imagen_producto,
                   m.id as marca_id, m.nombre as nombre_marca, m.descripcion as desc_marca,
                   c.id as categoria_id, c.nombre as nombre_categoria
            FROM Producto p
            INNER JOIN Marca m ON p.marca_id = m.id
            INNER JOIN Categoria c ON p.categoria_id = c.id
        `;
        const [rows] = await conn.query(sqlQuery);

        const productos = rows.map(row => ({
            id: row.id,
            nombre: row.nombre,
            descripcion: row.descripcion,
            imagen: row.imagen_producto,
            marca: {
                id: row.marca_id,
                nombre: row.nombre_marca,
                descripcion: row.desc_marca
            },
            categoria: {
                id: row.categoria_id,
                nombre: row.nombre_categoria
            }
        }));

        res.render('shop', { productos: productos });
    } catch (err) {
        console.error('Error al obtener productos:', err);
        res.status(500).send('Error al obtener productos');
    }
};

// Crear un nuevo producto
exports.crearProducto = async (req, res) => {
    try {
        const { nombre, descripcion, imagen, marca_id, categoria_id } = req.body;

        if (!nombre || !descripcion || !imagen || !marca_id || !categoria_id) {
            return res.status(400).send('Todos los campos son obligatorios.');
        }

        const sqlQuery = `
            INSERT INTO Producto (nombre, descripcion, imagen, marca_id, categoria_id)
            VALUES (?, ?, ?, ?, ?)
        `;
        const values = [nombre, descripcion, imagen, marca_id, categoria_id];

        await conn.query(sqlQuery, values);

        // Redirigir a la página de administrador después de crear el producto
        res.redirect('/admin');
    } catch (err) {
        console.error('Error al crear producto:', err);
        res.status(500).send('Error al crear producto.');
    }
};

// Obtener un producto por su ID para editar
exports.editarProductoForm = async (req, res) => {
    try {
        const { id } = req.params;

        // Consulta para obtener el producto por su ID
        const sqlProducto = `
            SELECT p.*, m.id as marca_id, m.nombre as nombre_marca, c.id as categoria_id, c.nombre as nombre_categoria
            FROM Producto p
            INNER JOIN Marca m ON p.marca_id = m.id
            INNER JOIN Categoria c ON p.categoria_id = c.id
            WHERE p.id = ?
        `;
        const [rowsProducto] = await conn.query(sqlProducto, [id]);

        if (rowsProducto.length === 0) {
            return res.status(404).send('Producto no encontrado.');
        }

        const producto = rowsProducto[0];

        // Obtener categorías y marcas disponibles
        const sqlCategorias = `SELECT id, nombre FROM Categoria`;
        const [categoriasRows] = await conn.query(sqlCategorias);

        const sqlMarcas = `SELECT id, nombre FROM Marca`;
        const [marcasRows] = await conn.query(sqlMarcas);

        res.render('edit', {
            producto: producto,
            categorias: categoriasRows,
            marcas: marcasRows
        });
    } catch (err) {
        console.error('Error al obtener producto, categorías y marcas:', err);
        res.status(500).send('Error al obtener producto, categorías y marcas.');
    }
};

// Actualizar un producto por su ID
exports.editarProducto = async (req, res) => {
    try {
        const id = req.params.id;
        const { nombre, descripcion, imagen, marca_id, categoria_id } = req.body;

        if (!nombre || !descripcion || !imagen || !marca_id || !categoria_id) {
            return res.status(400).send('Todos los campos son obligatorios.');
        }

        const sqlQuery = `
            UPDATE Producto
            SET nombre = ?, descripcion = ?, imagen = ?, marca_id = ?, categoria_id = ?
            WHERE id = ?
        `;
        const values = [nombre, descripcion, imagen, marca_id, categoria_id, id];

        await conn.query(sqlQuery, values);

        // Redirigir 
        res.redirect('/admin');
    } catch (err) {
        console.error('Error al editar producto:', err);
        res.status(500).send('Error al editar producto.');
    }
};

// Eliminar un producto por su ID
exports.eliminarProducto = async (req, res) => {
    try {
        const id = req.params.id;

        const sqlQuery = `
            DELETE FROM Producto
            WHERE id = ?
        `;
        await conn.query(sqlQuery, [id]);

        // Redirigir 
        res.redirect('/admin');
    } catch (err) {
        console.error('Error al eliminar producto:', err);
        res.status(500).send('Error al eliminar producto.');
    }
};
