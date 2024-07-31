import express from 'express'
const testRouter = express.Router()

testRouter.get('/', (req, res) => res.status(200).send('Hello'))
export default testRouter
