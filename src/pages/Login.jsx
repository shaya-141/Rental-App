import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { Loader } from 'rsuite'
import { toast } from 'sonner'
import { auth } from '../utils/firebase'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    
    const navigate = useNavigate()

    const handleLoginuser= async ()=>{
        setLoading(true)
        await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
            setLoading(false)
          toast.success('Login Successfully')
          navigate('/')
          console.log("user=>",user);
          
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
          
        });
    }


    return (
        <div className='bg-[#fafafa] h-screen w-screen flex items-center justify-center'>

            <div id='loginPage' className='w-[380px] h-[500px] p-6 rounded-[20px]  '>
                <h1 className='text-[26px] mt-2 font-semibold'>Login</h1>
                <section className='flex flex-col gap-8 mt-10'>

                <div >
                    <p className='font-medium text-[#656e73] '>Email</p>
                    <input type="email" onChange={(e)=>setEmail(e.target.value)} placeholder='Your@gmail.com' className='w-full border border-gray-500 h-12 p-3 rounded mt-2 ' />
                </div>

                <div >
                    <p className='font-medium text-[#656e73] '>Password</p>
                    <input type="text" onChange={(e)=>setPassword(e.target.value)} placeholder='Password' className='w-full border border-gray-500 h-12 p-3 rounded mt-2 ' />
                </div>
                <p className=' font-medium text-gray-900 '>if dont have account ? <Link to={'/signup'} className='underline font-bold'> signup</Link> </p>
                </section>

                <button className='w-full h-11 rounded bg-[#0b1D27] text-white mt-5 font-medium text-[16px]' onClick={handleLoginuser}>
                    {
                        loading ?
                        <Loader size="sm" content="loading..." />
                        :
                    'Login'
                }
                </button>
            </div>

        </div>
    )
}

export default Login