const { conn } = require('../db/dbconnection');

exports.getContacto= async(req, res) =>{
    res.render('contacto', { message: null});
}

exports.crearConsulta = async (req, res) => {
    try {
        const { nombre, apellido, telefono, correo, select_campo, es_cliente, problema } = req.body;

        const query = 'INSERT INTO consulta (nombre, apellido, telefono, correo, select_campo, es_cliente, problema) VALUES (?, ?, ?, ?, ?, ?, ?)';
        
        await conn.query(query, [nombre, apellido, telefono, correo, select_campo, es_cliente, problema]);
        
        res.render('contacto', { message: { type: 'success', text: 'Consulta enviada con éxito' } });
    } catch (err) {
        console.error('Error al insertar los datos en la base de datos:', err);
        res.render('contacto', { message: { type: 'error', text: 'Error al enviar la consulta. Inténtalo de nuevo.' } });
    }
};
