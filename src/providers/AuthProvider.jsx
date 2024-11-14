import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react'
import auth from '../firebase/firebase.init';


export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                console.log('User logged in:', currentUser);
                setUser(currentUser);
            } else {
                console.log('No user logged in');
                setUser(null);
            }
        })

        //component unmount , clean up
        return () => {
            unSubscribe()
        }
    }, [user])

    const logoutUser = () => {
        return signOut(auth)
    }

    const authInfo = {
        createUser,
        loginUser,
        logoutUser,
        user
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

/*
    1. Create a context with a default value of null
    2. Create a component called AuthProvider
    3. Set Default value for the context
    4. Use the auth provider in main.jsx
    5. Access the children prop in the AuthProvider component
*/