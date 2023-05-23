require("dotenv").config();
const express = require("express");
const app = express();
const { pool } = require("pg");
const pool = new pool({
    host: "localhost",
    port: 5432,
    database: "resturant",
    user: "postgres",
    password: process.env.DATABASE_PASSWORD,
});
app.use(express.json());
//orders
app.get("/get_orders", (req, res) => {
    pool.connect((err, client, release) => {
        if (err) {
            release();
console.error("error connecting to the database");

        }
    })
}