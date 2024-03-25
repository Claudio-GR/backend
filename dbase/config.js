import pg from 'pg';
import 'dotenv/config';

//checking the env variables are available
if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_DATABASE) {
    throw new Error('Faltan variables de entorno necesarias para la conexión a la base de datos.');
}

//inputing the env variables to conect with the DB
const pool = new pg.Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    allowExitOnIdle: true,
});

//checking if we can conect with the DB
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err);
        process.exit(1);
    } else {
        console.log('🔋 Database on 🔋', res.rows[0].now);
    }
});

export default pool;
