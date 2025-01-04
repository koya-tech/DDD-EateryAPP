import {
    useEffect,
    useState,
} from 'react';
import { redirect } from 'react-router-dom';
import axios from '../../lib/axios';

interface UserDto {
    userId: string;
    userName: string;
    userPassword: string;
    userImage: string;
}

function Profile() {
    const [user, setUsers] = useState<UserDto>();
    useEffect(() => {
        axios.get('/api/v1/users/67225c873632f8e32e6fa67d')
            .then((response: { data: { user: UserDto } }) => {
                console.log(`response Dto : ${JSON.stringify(response.data.user)}`);
                setUsers(response.data.user);
            })
            .catch((error) => {
                console.log(error);
                redirect('/auth');
            });
    }, []);

    return (
        <div>
            <h1>Home</h1>
            <ul>
                {user
                    && (
                        <li key={user.userId}>
                            Name:
                            {user.userName}
                            /Password:
                            {user.userPassword}
                        </li>
                    )}
            </ul>
        </div>
    );
}

export default Profile;
