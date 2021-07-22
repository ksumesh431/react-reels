import React, { useState, useEffect, useContext } from 'react'

import { AuthContext } from "../Context/AuthProvider"
import { storage, database } from "../firebase"
import {useHistory} from 'react-router-dom'


function Signup() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState(null)
    const history=useHistory()

    const { signup, deleteUser, currentUser } = useContext(AuthContext)
    // console.log(signup);

    const handleSignup = async (e) => {
        try {
            e.preventDefault();

            setLoading(true);
            let res = await signup(email, password)
            let uid = res.user.uid


            const uploadTaskListener = storage.ref(`/users/${uid}/profileImage`).put(file);
            //this puts file in storage at /users/uid/profileimage

            // Registers three observers:
            // 1. 'state_changed' observer, called any time the state changes 
            //............... fn 1 -> progress tracking

            // 2. Error observer, called on failure 
            //.............. fn2 -> error

            // 3. Completion observer, called on successful completion 
            //.............. fn3 -> success

            await uploadTaskListener.on("state_changed", fn1, fn2, fn3)

            function fn1(snapshot) {

                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                console.log('Upload is ' + progress + '% done');


            }

            function fn2(error) {
                setError(error);
                setTimeout(() => {
                    setError("");
                }, 2000)
                setLoading(false);
                deleteUser();  //deletes the signed up user entry from auth if error occours

                console.log("reached error");

            }

            async function fn3() {
                let downloadUrl = await uploadTaskListener.snapshot.ref.getDownloadURL();

                //sets the object at firestore database 
                await database.users.doc(uid).set({
                    email: email,
                    userId: uid,
                    username: name,
                    createdAt: database.getCurrentTimeStamp(),
                    profileUrl: downloadUrl,
                    postIds: []
                })
                await console.log("user has signed up")
            }

            setLoading(false);

        }
        catch (error) {
            setError(error);
            setTimeout(() => {
                setError("");
            }, 2000)
            deleteUser(); 
            setLoading(false);
        }

    }

    const handleFileSubmit = (e) => {
        let file = e.target.files[0]
        if (file !== null) {
            setFile(file)
        }
    }


    //go to Feed page if current user exists/logged in
    useEffect(()=>{
        if(currentUser){
            history.push('/')
        }
    },[])

    return (
        <>
            <div>


                <form onSubmit={handleSignup}>
                    <div>
                        <label htmlFor="">UserName</label>
                        <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
                    </div>
                    <div>
                        <label htmlFor="">Email</label>
                        <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    </div>
                    <div>
                        <label htmlFor="">Password</label>
                        <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                    <div>
                        <label htmlFor="profile">Profile image</label>
                        <input type="file" accept="image/*" onChange={handleFileSubmit} />
                    </div>
                    <button type="submit" disabled={loading}>SignUp</button>
                </form>
                {loading ? <h1>Please wait... </h1> : <></>}




            </div>
        </>
    )
}

export default Signup
