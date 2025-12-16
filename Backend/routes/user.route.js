import express from 'express';
import {createUser, getUser, deleteUser, signinUser} from '../controllers/user.controller.js'
import {protect} from '../middleware/auth.middleware.js'
const route = express.Router();

route.get('/', getUser);
route.post('/signup', protect, createUser )
route.post('/signin',protect, signinUser)
route.delete('/:id',protect, deleteUser)



export default route;