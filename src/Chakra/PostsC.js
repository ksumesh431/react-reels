import React, { useState, useEffect } from 'react'
import { database } from '../firebase'
function PostsC() {
    const [posts, setPosts] = useState(null);
    useEffect(() => {
        let pArr = [];

        //we can call unsub to remove the listern added by onSnapshot
        const unsub = database.posts.orderBy('createdAt', 'desc').onSnapshot(querySnapshot => {
            pArr = [];
            //querySnapshot is an array holding all the posts
            querySnapshot.forEach(doc => {
                let data = { ...doc.data(), postId: doc.id };
                pArr.push(data);
            })
            setPosts(pArr);
            console.log(pArr);
        })
        return unsub;
    }, []);

    return (
        <div>
            <h1>Test</h1>
        </div>
    )
}

export default PostsC
