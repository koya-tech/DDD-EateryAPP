import { IoMenu } from 'react-icons/io5';
import { Link, useLocation } from 'react-router-dom';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../../../../../shadcn/ui/dropdown-menu';
import { routeList } from '../../../constants/index';

function BulgerMenu() {
    const location = useLocation();
    const isHome = location.pathname === '/';
    return (
        <div className="z-50">
            <DropdownMenu>
                <DropdownMenuTrigger>
                    {isHome
                        ? <IoMenu size="2rem" color="white" />
                        : <IoMenu size="2rem" />}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {routeList.map((item) => (
                        <Link to={item.route}>
                            <DropdownMenuItem>{item.label}</DropdownMenuItem>
                        </Link>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

export default BulgerMenu;
