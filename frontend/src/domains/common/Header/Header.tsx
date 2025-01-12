import { BiBowlRice } from 'react-icons/bi';
import { Link, useLocation } from 'react-router-dom';
import { routeList } from '../constants/index';
import BulgerMenu from './components/burgerMenu/BurgerMenu';

function Header() {
    const location = useLocation();
    const isHome = location.pathname === '/';
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
            </header>
        </div>
    );
}

export default Header;
