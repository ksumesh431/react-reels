import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../Context/AuthProvider'
import { database } from '../firebase'
import Footer from './Footer';
import NavbarC from './NavbarC'
import PostsC from './PostsC';
function FeedC() {
    const [userData, setUserData] = useState(null);
    const { currentUser } = useContext(AuthContext);
    //add event listener onSmapshot on the users collection in db.. on any change.. set userData state to doc.data where doc is the document object of the user
    useEffect(() => {
        const unsub = database.users.doc(currentUser.uid).onSnapshot(doc => {
            setUserData(doc.data())
        })
    }, [])
    return (
        <div>
            <NavbarC userData={userData} />
            <Footer userData={userData}/>
            <PostsC userData={userData}/>
        </div>
    )
}

export default FeedC
