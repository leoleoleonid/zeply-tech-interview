import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import $api from "../../http";

export const AuthContext = React.createContext('');

function AuthProvider({children}) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const [isLoadingUser, setIsLoadingUser] = useState(false)

    useEffect(() => {
        if (user !== null) return;
            setIsLoadingUser(true)
            const userId = localStorage.getItem('user_id');
            if (!userId && window.location !== '/login') {
                navigate('/login');
            } else {
                $api.get(`/auth/getUserById/${userId}`)
                    .then(({data: user}) => {
                        setUser(user)
                        setIsLoadingUser(false)
                    })
            }
    }, [])

    const login = (username, password) => {
        $api.post('auth/login', {username})
            .then(({data: user}) => {
                localStorage.removeItem('user_id');
                localStorage.setItem('user_id', user.id);
                setUser(user);
                navigate('/');
            })
            .catch(e => {
                console.error(e)
            })
    };

    const logout = () => {
        localStorage.removeItem("user_id");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{user, isLoadingUser, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
