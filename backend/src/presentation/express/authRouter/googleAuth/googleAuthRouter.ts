// eslint-disable-next-line import/no-extraneous-dependencies
import dotenv from 'dotenv';
import axios from 'axios';
import { Router } from 'express';
import jwt from 'jsonwebtoken';

dotenv.config({ path: '.env.local' });

const googleAuthRouter = Router();
// Step 1: Redirect to Google OAuth2 login page
googleAuthRouter.get('/', (req, res) => {
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_OAUTH_CLIENT_ID}&redirect_uri=${process.env.BACKEND_REDIRECT_URI}&response_type=code&scope=openid profile email`;
    res.redirect(googleAuthUrl);
});

// Step 2: Handle Google OAuth2 callback
// eslint-disable-next-line consistent-return
googleAuthRouter.get('/callback', async (req, res) => {
    const code = req.query.code as string;

    if (!code) {
        return res.status(400).send('Authorization code is missing');
    }

    try {
        // Step 3: Exchange authorization code for tokens
        const { data } = await axios.post('https://oauth2.googleapis.com/token', {
            code,
            client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
            client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
            redirect_uri: process.env.BACKEND_REDIRECT_URI,
            grant_type: 'authorization_code',
        });

        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { id_token } = data;

        // Step 4: (Optional) Verify and decode the ID token
        const decoded = jwt.decode(id_token);

        // Step 5: Create your own JWT or session token for user
        const userJwt = jwt.sign({ user: decoded }, process.env.JWT_SECRET!, {
            expiresIn: '1h', // Set token expiration
        });

        // Send the token as a cookie or in the response
        res.cookie('token', userJwt, { httpOnly: true });
        res.send('User authenticated successfully');
    } catch (error) {
        console.error('Error exchanging code for tokens:', error);
        res.status(500).send('Authentication failed');
    }
});

export default googleAuthRouter;
