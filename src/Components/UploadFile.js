// import React, { useState } from 'react'

// import { v4 as uuidv4 } from 'uuid'
// import { storage, database } from '../firebase'


// function UploadFile(props) {
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const types = ['video/mp4', 'video/webm', 'video/ogg']

//     const onChange = (e) => {
//         const file = e?.target?.files[0];
//         if (!file) {
//             setError('Please select a file');
//             setTimeout(() => {
//                 setError(null)
//             }, 2000);
//             return;
//         }

//         if (types.indexOf(file.type) === -1) {
//             setError('Please select a "Video" file');
//             setTimeout(() => {
//                 setError(null)
//             }, 2000);
//             return;
//         }

//         if (file.size / (1024 * 1024) > 100) {

//             setError('Selected file is too big!');
//             setTimeout(() => {
//                 setError(null)
//             }, 2000);
//             return;
//         }

//         const id = uuidv4();

//         //add video file to fb storage
//         const uploadTask = storage.ref(`/posts/${props.userData.userId}/${file.name}`).put(file);


//         const fn1 = snapshot => {
//             setLoading(true);
//             let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//             console.log('Upload is ' + progress + '% done');
//         }
//         const fn2 = error => {
//             setError(error);
//             setTimeout(() => {
//                 setError(null)
//             }, 2000);
//             setLoading(false);
//         }
//         const fn3 = async () => {
//             try {
                

//                 const url = await uploadTask.snapshot.ref.getDownloadURL();

//                 const obj = {
//                     comments: [],
//                     likes: [],
//                     // pId is uique generate id for every post
//                     pId: id,

//                     // url of video in storage
//                     pURL: url,

//                     uName: props?.userData?.username,
//                     uProfile: props?.userData?.profileUrl,
//                     userId: props?.userData?.userId,
//                     createdAt: database.getCurrentTimeStamp()
//                 }

//                 //add the post object to firebase database post collection
//                 const docRef = await database.posts.add(obj);

//                 //add this post to respective user's collection 
//                 const res = await database.users.doc(props.userData.userId).update({
//                     postIds: [...props.userData.postIds, docRef.id]
//                 })
//                 setLoading(false);

//             } catch (err) {
//                 setError(e);
//                 setTimeout(() => {
//                     setError(null);
//                 }, 2000)
//                 setLoading(false)
//             }

//         }
//         uploadTask.on('state_changed', fn1, fn2, fn3);

//     }
//     return (
//         <>
//             {
//                 error !== null ?
//                     <Alert severity="error">{error}</Alert>
//                     :
//                     <>
//                         <div
//                             style={{
//                                 marginTop: '2rem',
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                                 flexDirection: 'column'
//                             }}
//                         >
//                             <input
//                                 type='file'
//                                 onChange={onChange}
//                                 id='file-upload-button'
//                                 style={{ display: 'none' }}
//                             />
//                             <label
//                                 htmlFor='file-upload-button'
//                             >
//                                 <Button disabled={loading} variant="contained" color="primary" component="span">
//                                     Upload
//                                 </Button>
//                                 {
//                                     loading ? <LinearProgress color='secondary' style={{ marginTop: '10%' }} /> : <></>
//                                 }
//                             </label>


//                         </div>

//                     </>
//             }
//         </>

//     )
// }

// export default UploadFile
