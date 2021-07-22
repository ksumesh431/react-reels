// import React, { useState, useEffect, useContext } from 'react'
// import { AuthContext } from '../Context/AuthProvider'
// import { database } from '../firebase'


// import Navbar from './Navbar'
// import UploadFile from './UploadFile'
// import Posts from './Posts'




// function Feed() {
//     const [userData, setUserData] = useState(null);
//     const { currentUser } = useContext(AuthContext);


//     //add event listener onSmapshot on the users collection in db.. on any change.. set userData state to doc.data where doc is the document object of the user
//     useEffect(() => {
//         const unsub = database.users.doc(currentUser.uid).onSnapshot(doc => {
//             setUserData(doc.data())
//         })
//     }, [])
//     return (
//         <>
//             {
//                 userData == null ?
//                     <CircularProgress />
//                     :
//                     <>
//                         <Navbar />

//                         {/* Pass user object as prop to uplaod file */}
//                         <UploadFile userData={userData}/>
//                         <Posts userData={userData}/>
//                     </>


//             }

//         </>
//     )
// }

// export default Feed
