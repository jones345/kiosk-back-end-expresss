import {addConsult} from '../controllers/ConsultController.js';
import express from 'express'
const router = express.Router();


router.post('/addConsult',addConsult);

export default router;


