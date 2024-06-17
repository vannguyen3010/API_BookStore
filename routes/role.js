import express from 'express';
import { createRole, updateRole, getAllRoles, deleteRole } from '../controllers/role.controller.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

//Create a new Role in DB
router.post('/create', verifyAdmin, createRole);

//Update role in DB 
router.put('/update/:id', verifyAdmin, updateRole)

//Get all the Roles
router.get('/getAll', getAllRoles)

//Delete Roles
router.delete('/deleteRole/:id', deleteRole)

export default router;