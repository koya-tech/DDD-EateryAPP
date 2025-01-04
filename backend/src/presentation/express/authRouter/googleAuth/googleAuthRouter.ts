// eslint-disable-next-line import/no-extraneous-dependencies
import dotenv from 'dotenv';
import axios from 'axios';
import { Router } from 'express';
import jwt from 'jsonwebtoken';

dotenv.config({ path: '.env.local' });

const googleAuthRouter = Router();
googleAuthRouter.get('/', (req, res) => {
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_OAUTH_CLIENT_ID}&redirect_uri=${process.env.BACKEND_REDIRECT_URI}&response_type=code&scope=openid profile email`;
    res.redirect(googleAuthUrl);
});

// eslint-disable-next-line consistent-return
googleAuthRouter.get('/callback', async (req, res) => {
    const code = req.query.code as string;

    if (!code) {
        return res.status(400).send('Authorization code is missing');
    }

    try {
        const { data } = await axios.post('https://oauth2.googleapis.com/token', {
            code,
            client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
            client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
            redirect_uri: process.env.BACKEND_REDIRECT_URI,
            grant_type: 'authorization_code',
        });

        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { id_token } = data;
        const decoded = jwt.decode(id_token);
        const userJwt = jwt.sign({ user: decoded }, process.env.JWT_SECRET!, {
            expiresIn: '1h',
        });

        res.cookie('token', userJwt, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        });
        // res.send('User authenticated successfully');
        res.redirect('http://localhost:5173');
    } catch (error) {
        console.error('Error exchanging code for tokens:', error);
        res.status(500).send('Authentication failed');
    }
});

googleAuthRouter.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('http://localhost:5173');
});

// eslint-disable-next-line consistent-return
googleAuthRouter.get('/checkStatus', (req, res) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ isLoggedIn: false });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        // console.log('decoded :', decoded);
        res.status(200).json({ isLoggedIn: true, user: decoded });
    } catch (error) {
        res.status(401).json({ isLoggedIn: false });
    }
});

export default googleAuthRouter;
