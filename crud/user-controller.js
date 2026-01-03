import { pool } from "../services/postgres-service.js"

export default class userController {
    async read(_, res) {
        const users = await pool.query('SELECT * FROM users')

        return res.json(users.rows)     
    }

    async create(req, _) {
        await pool.query(`
            INSERT INTO users (username, password) VALUES ('${req.body.username}', '${req.body.password}')`
        )

        return 'user has been created'
    }

    async update(req, _) {
        await pool.query(`
            UPDATE users SET username = '${req.body.username}', password = '${req.body.password}' WHERE id = '${req.params.id}'`
        )
        
        return 'user has been updated'
    }

    async destroy(req, _) {
        await pool.query(`
            DELETE from users WHERE id = '${req.params.id}'`
        )

        return 'user has been deleted'
    }
}