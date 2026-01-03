import express from 'express'
import userController from './crud/user-controller.js'
import authController from './crud/auth-controller.js'

const app = express()
app.use(express.json())
const userControllerClass = new userController()
const authControllerClass = new authController()

app.post('/users', async (req, res) => {
    const returned = await userControllerClass.create(req, res)
    
    return res.status(201).json({message: returned})
})


app.put('/users/:id', async (req, res) => {   
    const returned =  await userControllerClass.update(req, res)
    return res.status(200).json({message: returned})
})

app.get('/users', (req, res) => {
    const query = req.query
   
    return res.send(userControllerClass.read(req, res)) 
})

app.delete('/users/:id', async (req, res) => {
    const returned = await userControllerClass.destroy(req, res)

    return res.status(200).json({message: returned})
})

app.post('/login', async (req, res) => {
    const auth = await authControllerClass.login(req, res)

    return auth
})

app.listen(3001)