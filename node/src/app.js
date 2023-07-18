import express from 'express';
import cors from 'cors';
import db from './database/db.js';

import tramoRoutes from './routes/routes.js';

const app = express()

app.use(cors());
app.use(express.json());
app.use('/tramos', tramoRoutes);

try {
    await db.authenticate();
    console.log('Conectado a la bd mysql');
} catch (error) {
    console.log(`Error de conexion a mysql: ${error}`);
}

// app.get('/', (req, res) => {
//     res.send('Hello world')
// });

app.listen(8000, ()=> {
    console.log('Server upr running in: http://localhost:8000');
});
