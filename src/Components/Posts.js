
// import React, { useState, useEffect } from 'react'
// import { database } from '../firebase';
// import Video from './Video';
// import {Container} from '@chakra-ui/react'

// const useStyles = makeStyles(theme => ({
//     postContainer: {
//         overflow: 'auto',
//         height: '100%'
//     }
// }))



function Posts() {
    // const classes = useStyles();

    const [posts, setPosts] = useState(null);


    //```````````````INTERSECTION OBSERVER ON POSTS```````````````````````
    const callback = entries => {
        entries.forEach(async element => {
            try {

                let el = element.target;

                await el.play();
                if (!el.paused && !element.isIntersecting) {
                    el.pause();
                }

            } catch (err) {
                console.log(err);
            }

        });
    }
    const observer = new IntersectionObserver(callback, { threshold: 0.85 });
    //adding observer to every post
    useEffect(() => {
        let elements = document.querySelectorAll('.videos');
        elements.forEach(el => {
            observer.observe(el);
        })
        return (() => {
            observer.disconnect();
        })

    }, [posts])
    //```````````````````````````````````````

    useEffect(() => {
        let pArr = [];
        const unsub = database.posts.orderBy('createdAt', 'desc').onSnapshot(querySnapshot => {
            pArr = [];
            querySnapshot.forEach(doc => {
                let data = { ...doc.data(), postId: doc.id }
                pArr.push(data);
            })
            setPosts(pArr);
        })
        return unsub;
    }, [])


    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: '80vh',
                overflow: 'scrollY',
            }}
        >
            {
                posts == null ? <CircularProgress />
                    :
                    <Container
                        style={{
                            maxWidth: '300px',
                            display: "flex",
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {
                            posts.map(post => (
                                <React.Fragment key={post.postId}>
                                    <Video source={post.pURL} id={post.pId} />
                                </React.Fragment>
                            ))
                        }
                    </Container>
            }

        </div>
    )
}

// export default Posts
