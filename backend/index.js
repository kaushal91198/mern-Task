const connectToMongo  = require('./db');
const express = require('express')
const cors = require('cors')
const session = require('express-session');

connectToMongo()

const app = express()
const port = 5000

app.use(express.json())
app.use(cors())

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie:{maxAge:1000 * 60 * 60 * 12}
}))

//Available Routes
app.use('/api/auth',require('./routes/auth.js'))
app.use('/api/notes',require('./routes/notes.js'))


app.listen(port, () => {
  console.log(`iBook backend listening at http://localhost:${port}`)
})