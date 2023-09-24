import { createPool } from "mysql2/promise";

export const pool = createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});


//docker run --name techlibrary -e MYSQL_ROOT_PASSWORD=colombiaprr -e MYSQL_DATEBASE=techlibrary -p 3306:3306  -d mysql