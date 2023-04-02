import express from 'express';
const router = express.Router();
const passport=require('passport')
import auth from '../controllers/auth';
import { verifyAccessToken } from '../helpers/jwt';

router.post('/register', auth.Register);
router.post('/login', auth.Login);
router.post('/refresh_token', auth.RefreshToken);
router.post('/logout', auth.Logout);
router.get('/me', verifyAccessToken, auth.Me);
router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: process.env.CLIENT_URL,
		failureRedirect: "/login/failed",
	})
);

export default router;
