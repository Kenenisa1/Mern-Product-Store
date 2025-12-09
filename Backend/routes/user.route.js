import express from 'express';
import {createUser, getUser, deleteUser, signinUser} from '../controllers/user.controller.js'

const route = express.Router();

route.get('/', getUser);
route.post('/signup', createUser )
route.post('/signin', signinUser)
route.delete('/:id', deleteUser)



export default route;