import { apply , getAll, getOne } from '../controllers/Application.js';
import express from 'express'
const router = express.Router();

router.post('/apply', apply);
router.get('/', getAll);
router.get('/apply/:id', getOne);



export default router;
