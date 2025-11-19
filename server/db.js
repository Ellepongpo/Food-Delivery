import dotenv from 'dotenv'
dotenv.config();
import mysql from 'mysql2/promise'

console.log(process.env.DB_USER)
console.log(process.env.DB_PASSWORD)

export const db = await mysql.createConnection({
  dateStrings: true, 
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});
