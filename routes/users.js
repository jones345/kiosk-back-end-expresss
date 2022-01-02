import express from 'express';
import verify from '../controllers/verifyToken.js';
import { getUsers, getUsersBySearch,updateUserById,getDocById ,getAllDoc,updateStatus} from '../controllers/users.js';

const router = express.Router();
router.get( '/', verify, getUsers);
router.get('/search',verify, getUsersBySearch);
router.put('/update/:id',verify, updateUserById);
router.get('/find/:id',verify, getDocById);
router.get('/all',verify, getAllDoc);
router.put('/updateStatus/:id',verify, updateStatus);


export default router;
