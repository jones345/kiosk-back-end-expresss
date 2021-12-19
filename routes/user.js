import express from 'express';

import {signin, signindoc, signup, signupdoc,resetPasswordUser,resetPassword,changePassword} from '../controllers/user.js';

const router = express.Router();
router.post('/signin', signin);
router.post('/signup', signup);
router.post('/signupdoc', signupdoc)
router.post('/signinDoc',signindoc)
router.post('/resetPasswordUser',resetPasswordUser)
router.post('/resetPassword',resetPassword)
router.post('/changePassword',changePassword)

export default router;

