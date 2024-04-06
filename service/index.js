const express = require('express');
require('dotenv').config({ path: '.env' });
const cors = require('cors');
const { Pool } = require('pg');
const NodeCache = require('node-cache');

const cache = new NodeCache();

const pool = new Pool({
  user: process.env.PSQL_USER,
  host: process.env.PSQL_HOST,
  database: process.env.PSQL_DB,
  password: process.env.DB_PWD,
  port: process.env.DB_PORT
});

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get('/author', async (req, res) => {
  const authorName = req.query.author_name;

  try {
    let rows;
    const cacheKey = authorName ? authorName : "authors";
    const cachedData = cache.get(cacheKey);

    if (cachedData){
      rows = cache.get(cacheKey)
    } else {
      console.info("Cache miss, searching in database...")
      
      let result;

      if (authorName) {

        const query = `
              SELECT SUM(si.item_price * si.quantity) AS total_sales, a.name AS author_name, a.email AS email
              FROM authors a
              JOIN books b ON a.id = b.author_id AND a.name=$1
              JOIN sale_items si ON b.id = si.book_id
              GROUP BY author_name,email;`;
  
        result = await pool.query(query, [authorName]);
      } else {
        const query = `
              SELECT SUM(si.item_price * si.quantity) AS total_sales, a.name AS author_name, a.email AS email
              FROM authors a
              JOIN books b ON a.id = b.author_id
              JOIN sale_items si ON b.id = si.book_id 
              GROUP BY author_name,email ORDER BY total_sales DESC LIMIT 10;`;
        result = await pool.query(query);
      }
  
      rows = result.rows;
      cache.set(cacheKey, rows)
    }

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Author not found' });
    }

    res.status(200).json(rows);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});