process.on('uncaughtException', (err) => { console.log('err in code', err) })

import express from 'express'
import { dbConnection } from './database/db.connections.js'
import authenticationRouter from './src/authentication/authentication.routes.js'
import messageRouter from './src/messages/messages.routes.js'
import globalErrorHandler from './src/utils/global.error.js'
const app = express()
const port = 3000
app.use(express.json())
dbConnection

/*  Router */
// app.use('/users', userRouter)

app.use('/auth', authenticationRouter)
app.use('/messages', messageRouter)

/* Err Handel Routes */
app.use('*', (req, res, next) => {
    next(new AppError(`route not found ${req.originalUrl}`, 404))
})


/* Err Handdilig */

/* Err Handdilig */

app.use(globalErrorHandler)



process.on('unhandledRejection', (err) => {
    console.log('error', err)
})

app.get('/', (req, res) => res.send('Sarah Application'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))