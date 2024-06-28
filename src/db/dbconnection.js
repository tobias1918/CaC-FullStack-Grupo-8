const mysql = require ('mysql2')

const pool =mysql.createPool({
    host:'sql10.freesqldatabase.com',
    user: 'sql10716617',
    password: 'k6EyaFSM7j',
    database: 'sql10716617',
    port: 3306,
    waitForConnections: true,
	connectionLimit: 100,
	queueLimit: 0,
})

module.exports = {
	conn: pool.promise()
}