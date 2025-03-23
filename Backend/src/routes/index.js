import express from 'express'
import cors from 'cors'
import { sequelize } from '../config/database.js'
import { defineRelations } from '../models/relations.js'

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Chao')
});

async function main() {
    try {
        defineRelations()

        await sequelize.sync({alter: true, force: true})
        console.log('Base de datos sincronozada')

        app.listen(port, ()=> {
            console.log(`serve running on port ${port}`)
        })

        console.log('Conexion a la base de datos exitosa')
    } catch (error) {
        console.log('Error al conectar a la base de datos')
    }
}