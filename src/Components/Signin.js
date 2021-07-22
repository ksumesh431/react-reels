// import React, { useState, useContext, useEffect } from 'react'
// import { AuthContext } from '../Context/AuthProvider'
// import { useHistory } from 'react-router-dom'


// function Signin() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");
//     const [loading, setLoading] = useState(true);
//     const history = useHistory();
//     const { login, currentUser } = useContext(AuthContext);
//     const handleLogin = async (e) => {
//         try {
//             e.preventDefault();
//             setLoading(true);

//             let res = await login(email, password);
//             console.log(res);

//             // setLoading(false);
//         } catch (error) {
//             setError(error.message);
//             setTimeout(() => {
//                 setError("");
//             }, 2000)
//             setLoading(false);
//         }
//     }

//     useEffect(() => {
//         if (currentUser) {
//             history.push('/');
//         } else {
//             setLoading(false);
//         }
//     }, [currentUser])

    
//     return (

//         <>
//             {
//                 loading ?
//                     <CircularProgress />
//                     : <form>
//                         <div>
//                             <label>Email</label>
//                             <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
//                         </div>
//                         <div>
//                             <label>Password</label>
//                             <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
//                         </div>
//                         <button disabled={loading} onClick={handleLogin}>Login</button>
//                         {error ? <Alert severity="error">{error}</Alert> : <></>}
//                     </form>
//             }

//         </>
//     )
// }

// export default Signin
