const express = require('express')
const {Client} = require('pg')
const cors = require('cors')
require('dotenv').config()

const app = express()
const client = new Client({
    connectionString: process.env.DATABASE_URL,
})

app.use(cors());
app.use(express.json())

app.get('/products', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM Products')
        res.json(result.rows)
    } catch (err) {
        res.status(500).json({error:err.message})
    }
})

const PORT = process.env.PORT || 8080;

app.listen(PORT,()=> console.log(`server running on port ${PORT}`))