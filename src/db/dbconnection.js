const mysql = require ('mysql2')

const pool =mysql.createPool({
    host:'sql10.freesqldatabase.com',
    user: 'sql10718549',
    password: 'FCgnXAHvxd',
    database: 'sql10718549',
    port: 3306,
    waitForConnections: true,
	connectionLimit: 100,
	queueLimit: 0,
})

module.exports = {
	conn: pool.promise()
}