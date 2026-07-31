import express from "express";
const router = express.Router();

import { phoneAuth, completeSignup, logout } from '../controllers/auth.controller';
import phoneValidation from '../validations/auth.validation';

router.post('/phone-auth', phoneValidation, phoneAuth);
router.post('/complete-profile', completeSignup);
router.post('/logout', logout);

export default router;