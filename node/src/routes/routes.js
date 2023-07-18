import express from 'express';

const router = express.Router();
import { getAllConsumoTramo, getConsumoTramo, createConsumoTramo, updateConsumoTramo, deleteConsumoTramo, getHistTramos, getHistCliente, getTramosCliente } from '../controllers/Controllers.js'

router.get('/', getAllConsumoTramo);
router.get('/tram', getHistTramos);
router.get('/clientes', getHistCliente);
router.get('/tramos-cliente', getTramosCliente);
router.get('/:id', getConsumoTramo);
router.post('/', createConsumoTramo);
router.put('/:id', updateConsumoTramo);
router.delete('/:id', deleteConsumoTramo);

export default router;