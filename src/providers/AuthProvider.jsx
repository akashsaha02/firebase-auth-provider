import { createContext } from 'react'


const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const authInfo={
        name: 'Blue Sky',
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