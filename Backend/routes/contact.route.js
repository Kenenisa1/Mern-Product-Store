import express from 'express';
import { SendEmail } from '../controllers/contact.controller.js';


const router = express.Router();

router.post('/send', SendEmail);

export default router;