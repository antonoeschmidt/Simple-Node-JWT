const express = require('express')
const app = express()
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const { users } = require('./users.json')
require('dotenv').config()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Welcome')
})

app.post('/login', (req, res) => {
  if (users.includes(req.body.username)) {
    if (authenticated(req.body.password)) {
      let payload = { subject: req.body.username }
      let token = jwt.sign(payload, process.env.secret)
      res.status(200).send({ token })
    } else {
      res.status(401).send('Unauthorized')
    }
  } else {
    res.status(401).send('Username not found')
  }
})

const authenticated = (password) => {
  const hash = crypto.createHash('sha256').update(password).digest('hex')
  return hash === process.env.password
}

app.listen(3000)
