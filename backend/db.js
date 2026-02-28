const sql = require('mssql');

const config = {
    user: 'Professor_cafe',
    password: 'professor_cafe',
    server: 'localhost',
    database: 'Professor_cafe',
    options: {
        encrypt: false,
        trustServerCertificate:true
    }
};

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

module.exports = {
    sql, pool, poolConnect
};
