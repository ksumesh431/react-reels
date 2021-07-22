import React, { useState, useContext, useEffect } from "react"
import { auth } from "../firebase"

export const AuthContext = React.createContext();

function AuthProvider({ children }) {

    //states
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    //auth functions to be passed as context values
    const signup = (email, password) => auth.createUserWithEmailAndPassword(email, password);
    const deleteUser = async () => {
        try {
            const user = auth.currentUser;
            await user.delete();
        }
        catch (e) {
            console.log(e)
        }

    }
    const login = (email, password) => auth.signInWithEmailAndPassword(email, password);
    const logout = () => auth.signOut();

    //event listener for change of state of "auth"
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })
        return () => {
            unsubscribe();
        }
    }, [])

    const value = {
        currentUser,
        login,
        signup,
        logout,
        deleteUser
    }

    //if not loading and children exist..then render CHILDREN
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )

}
export default AuthProvider