import express from 'express'
import userController from './crud/user-controller.js'
import authController from './crud/auth-controller.js'

const app = express()
app.use(express.json())
const userControllerClass = new userController()
const authControllerClass = new authController()

app.route('/users')
    .post(async (req, res) => {
        return res.status(201).json({message: await userControllerClass.create(req, res)})
    })
    .get(async (req, res) => {
        return res.status(200).json(await userControllerClass.read(req, res)) 
    })

app.put('/users/:id', async (req, res) => {   
    return res.status(200).json({message: await userControllerClass.update(req, res)})
})

app.delete('/users/:id', async (req, res) => {
    return res.status(200).json({message: await userControllerClass.destroy(req, res)})
})

app.post('/login', async (req, res) => {
    return res.status(200).json({message: await authControllerClass.login(req, res)})
})

app.post('/token/refresh', async (req, res) => {
    return res.status(200).json({ message: await authControllerClass.refresh(req, res) })
})

app.listen(3001)