import jsonwebtoken from "jsonwebtoken";
import 'dotenv/config';
import { pool } from "../services/postgres-service.js"

export default class authController {
    async login(req, _) {
        
        const result = await pool.query(`SELECT id, password FROM users WHERE username = '${req.body.username}' LIMIT 1`)
        const user = result.rows[0]

        if (!user.id) {
            return 'user not found'
        }
        
        if (req.body.password !== user.password) {

            return 'username or password is wrong'
        }

        const token = jsonwebtoken.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TTL })
        
        return token
    }
    
    async refresh(req, res) {
        const token = req.body.token

        const verify = jsonwebtoken.verify(token, process.env.JWT_SECRET)
        return jsonwebtoken.sign({ id: verify.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TTL })
    }

 }