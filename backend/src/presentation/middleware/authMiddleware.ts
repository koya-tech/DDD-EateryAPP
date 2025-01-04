import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface AuthenticatedRequest extends Request {
    user?: string | jwt.JwtPayload;
}

// eslint-disable-next-line consistent-return
const authenticateJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const { token } = req.cookies; // Retrieve the JWT from the cookie
        console.log('Token:', token);

        // if (!token) {
        //     // return res.status(401).json({ message: 'Authentication required.' });
        //     return res.redirect('http://localhost:5173/auth');
        // }
        if (token === undefined) {
            return res.status(401).json({ redirect: true, url: 'http://localhost:5173/auth' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        console.log('Decoded:', decoded);
        req.user = decoded; // Attach user info to the request if token is valid
        next();
    } catch (error) {
        console.error('Invalid token:', error);
        // return res.status(403).json({ message: 'Invalid or expired token.' });
        return res.redirect('http://localhost:5173/auth');
    }
};

export default authenticateJWT;
