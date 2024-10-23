import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/Firebase";


export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
        })
    },[]);

    return(
        <AuthContext.Provider value={currentUser}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;