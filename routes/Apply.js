import { apply , getAll, getOne } from '../controllers/Application.js';
import verify from '../controllers/verifyToken.js';
import express from 'express'
const router = express.Router();

router.post('/apply', apply);
router.get('/',verify, getAll);
router.get('/apply/:id',verify, getOne);



export default router;
