const express = require('express')
const redis = require('redis')
const pg = require('pg')

const app = express()

const redisClient = redis.createClient({
  host: 'redis'
})

const pgClient = new pg.Client({
  user: 'postgres',
  host: 'postgres',
  database: 'myapp',
  password: 'password',
  port: 5432
})
pgClient.connect()

app.get('/messages', (req, res) => {
  redisClient.lrange('messages', 0, -1, (err, messages) => {
    if (err) throw err
    res.send(messages)
  })
})

app.post('/messages', (req, res) => {
  const message = req.query.message
  redisClient.rpush('messages', message, (err) => {
    if (err) throw err
    res.send('Message added')
  })
})

app.post('/users', (req, res) => {
  const username = req.query.username
  const email = req.query.email
  const query = `INSERT INTO users (username, email) VALUES ($1, $2)`
  pgClient.query(query, [username, email], (err) => {
    if (err) throw err
    res.send('User added')
  })
})

const port = 3000
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
