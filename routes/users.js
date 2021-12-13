import express from 'express';

import { getUsers, getUsersBySearch,updateUserById,getDocById ,getAllDoc,updateStatus} from '../controllers/users.js';

const router = express.Router();
router.get('/', getUsers);
router.get('/search', getUsersBySearch);
router.put('/update/:id', updateUserById);
router.get('/find/:id', getDocById);
router.get('/all', getAllDoc);
router.put('/updateStatus/:id', updateStatus);


export default router;
