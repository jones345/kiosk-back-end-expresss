import express from 'express';

import {signin, signindoc, signup, signupdoc} from '../controllers/user.js';

const router = express.Router();
router.post('/signin', signin);
router.post('/signup', signup);
router.post('/signupdoc', signupdoc)
router.post('/signinDoc',signindoc)

export default router;

