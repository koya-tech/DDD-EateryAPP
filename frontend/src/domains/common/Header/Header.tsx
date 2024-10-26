import { BiBowlRice } from 'react-icons/bi';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '../../../shadcn/ui/button';
import { routeList } from '../constants/index';
import BulgerMenu from './components/burgerMenu/BurgerMenu';

function Header() {
    const location = useLocation();
    const isHome = location.pathname === '/';

    const [isLogin, setIsLogin] = useState(false);
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await fetch('http://localhost:3001/auth/google/checkStatus', {
                    method: 'GET',
                    credentials: 'include',
                });
                console.log('response :', response);

                if (response.ok) {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    const data: { isLoggedIn: boolean } = await response.json();
                    console.log('data : ', data);
                    setIsLogin(data.isLoggedIn);
                } else {
                    setIsLogin(false);
                }
            } catch (error) {
                console.error('Error checking login status:', error);
                setIsLogin(false);
            }
        };

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        checkLoginStatus();
    }, [location]);

    return (
        <div className={`p-7 ${isHome ? 'bg-black' : 'bg-transparent'}`}>
            <header className="flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2">
                    <BiBowlRice size="2rem" color="white" className="pb-1 mix-blend-difference" />
                    <p className="text-2xl text-white mix-blend-difference">Dinebnb</p>
                </Link>
                <div className="flex md:hidden ">
                    <BulgerMenu />
                </div>
                <div className="gap-1 hidden md:flex">
                    {routeList.map((item) => (
                        <Link to={item.route} className="px-2 text-xl text-white mix-blend-difference">{item.label}</Link>
                    ))}
                </div>
                <div className="hidden md:flex">
                    {isLogin ? (
                        <Link to="/profile" className="text-white">
                            Profile
                        </Link>
                    ) : (
                        <Link to="/auth">
                            <Button className="bg-black">Login</Button>
                        </Link>
                    )}
                </div>
            </header>
        </div>
    );
}

export default Header;
