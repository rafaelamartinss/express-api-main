import jsonwebtoken from "jsonwebtoken";
import { pool } from "../services/postgres-service.js"

export default class authController {
    async login(req, _) {
        
        const user = await pool.query(`SELECT id, password FROM users WHERE username = '${req.body.username}'`)
        console.log(user)

        if (!user.id) {
            return 'user not found'
        }
        
        if (req.body.password !== user.password) {
            return 'username or password is wrong'
        }

        const token = jsonwebtoken.sign({ id: user.id }, process.env.JWT_SECRET, { expireIn: process.env.JWT_TTL })
        
        return token
     }
 }