import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import authApi from "./authApi";
import localStorageAdapter from "../../adapters/localStorageAdapter";
import Login from "./Login";

export const AuthContext = React.createContext('');

function AuthProvider({children}) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const [isLoadingUser, setIsLoadingUser] = useState(false)

    useEffect(() => {
        if (user !== null) return;
            setIsLoadingUser(true)
            const userId = localStorageAdapter.getItem('user-id');
            if (!userId) {
                if(window.location !== '/login') navigate('/login');
                setIsLoadingUser(false)
            } else {
                authApi.getUserById(userId)
                    .then(({data: user}) => {
                        setUser(user)
                        setIsLoadingUser(false)
                    })
            }
    }, [])

    const login = (username, password) => {
        authApi.login(username)
            .then(({data: user}) => {
                localStorageAdapter.removeItem('user-id');
                localStorageAdapter.setItem('user-id', user.id);
                setUser(user);
                navigate('/');
            })
            .catch(e => {
                console.error(e)
            })
    };

    const logout = () => {
        localStorageAdapter.removeItem("user-id");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{user, isLoadingUser, login, logout}}>
            {isLoadingUser && <div data-testid="loading">Loading</div>}
            {!user && ! isLoadingUser && <Login/>}
            {user ? children : null}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
