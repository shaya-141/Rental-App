
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { app, auth, db } from '../utils/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'sonner';
import { Loader } from 'rsuite';
function SignupForm() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setusername] = useState('')
    const [Role, setRole] = useState('tenant')
    const [img, setimg] = useState('')
    const [loading, setLoading] = useState(false)



    const createAccount = async () => {

        // console.log('shayan', { email, password, username, Role });
        if (email === '' || password === "" || Role === '' || username === '') {
            toast.error('please enter all field')
            return;
        }
        try {
            setLoading(true)
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredentials.user;

            const userRef = doc(db, "Users", user.uid)
            const userData = { username, email, password, Role, img }


            await setDoc(userRef, userData)
            setLoading(false)
            toast.success('Signup Successfully')
            console.log('user create successfully');
            
            console.log('user addded successfully');

            // console.log("user=>", user);

            


        } catch (error) {
            console.log('error', error);
            toast.error(error.message)

        }

    }



    return (
        <div id='signupPage' className='w-[380px] h-[600px] p-6 rounded-[20px]  '>

            <h1 className='text-[26px] mt-2 font-semibold'>Signup</h1>
            <section className='flex flex-col gap-5 mt-8'>
                <div >
                    <p className='font-medium text-[#656e73]'>Full Name</p>
                    <input required onChange={(e) => setusername(e.target.value)} type="text" placeholder='Username'  className='w-full h-12 p-3 rounded mt-1  border-gray-500 border ' />
                </div>
                <div >
                    <p className='font-medium text-[#656e73]'>Email</p>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder='Your@gmail.com' required className='w-full h-12 p-3 rounded mt-1  border-gray-500 border' />
                </div>

                <div >
                    <p className='font-medium text-[#656e73]'>Password</p>
                    <input type="text" onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='w-full h-12 p-3 rounded mt-1  border-gray-500 border' />
                </div>
                <div>

                    <p className='font-medium text-[#656e73] '>Role</p>

                    <select name="role" id="role" onChange={(e) => setRole(e.target.value)} className='p-3 rounded border-gray-500 border w-full mt-1'>
                        <option value="tenant">Tenant</option>
                        <option value="landlord">Landlord</option>
                    </select>
                </div>

                <p className='text-gray-900  font-medium'>already have account ?  <Link to={'/login'} className='underline font-bold'> login</Link> </p>

            </section>
            <button className='w-full h-11 rounded bg-[#0b1D27] text-white mt-5 ' onClick={createAccount} >
                {
                    loading?
                    <Loader content="loading..." />
                    :
                    'Signup'
                }
                </button>

        </div>
    )
}

export default SignupForm