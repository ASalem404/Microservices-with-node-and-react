import express from 'express'
import { json } from 'body-parser'

const app = express()


app.get('/api/users/currentuser', (req, res) => {
    res.send('test message')
})

app.listen(3000, () => {
    console.log('Listening in port 3000')
})

