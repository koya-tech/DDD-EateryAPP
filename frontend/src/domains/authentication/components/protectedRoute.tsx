// import { Navigate } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import useAuthContext from './useAuthContext';

// interface ProtectedRouteProps {
//     element: React.ReactNode;
// }

// function ProtectedRoute({ element }: ProtectedRouteProps) {
//     const { isLoggedIn, checkAuthStatus } = useAuthContext();
//     const [isCheckingAuth, setIsCheckingAuth] = useState(true);
//     useEffect(() => {
//         const verifyAuthStatus = async () => {
//             try {
//                 await checkAuthStatus();
//             } finally {
//                 setIsCheckingAuth(false);
//             }
//         };
//         verifyAuthStatus().catch(console.error);
//     }, [checkAuthStatus]);
//     if (isCheckingAuth) {
//         // You can return a loading spinner or placeholder during the check
//         return <div>Loading...</div>;
//     }

//     if (!isLoggedIn) {
//         return <Navigate to="/auth" />;
//     }

//     return element;
// }

// export default ProtectedRoute;
