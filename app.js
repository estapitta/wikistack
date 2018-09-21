const express = request('express')
const morgan = require('morgan')
const app =    express()

app.use(morgan('dev'))
const staticMiddleware = express.static('/public')
app.use(staticMiddleware)