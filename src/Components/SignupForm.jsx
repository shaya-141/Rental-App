
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { app, auth, db } from '../utils/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'sonner';
import LoaderComponent from './loader';

function SignupForm() {
    const Navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setusername] = useState('')
    const [Role, setRole] = useState('tenant')
    const [img, setimg] = useState('')
    const [contact, setcontact] = useState('')
    const [loading, setLoading] = useState(false)



    const createAccount = async () => {

        // console.log('shayan', { email, password, username, Role });
        if (email === '' || password === "" || Role === '' || username === ''|| contact === '') {
            toast.error('please enter all field')
            return;
        }
        try {
            setLoading(true)
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredentials.user;

            const userRef = doc(db, "Users", user.uid)
            const userData = { username, email, password, Role, img ,contact}


            await setDoc(userRef, userData)
            setLoading(false)
            toast.success('Signup Successfully')
            console.log('user create successfully');
            
            console.log('user addded successfully');
            
            Navigate('/login')
            // console.log("user=>", user);

            


        } catch (error) {
            console.log('error', error);
            toast.error(error.message)
            setLoading(false)
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
                <div >
                    <p className='font-medium text-[#656e73]'>Contact</p>
                    <input type="text" onChange={(e) => setcontact(e.target.value)} placeholder='Password' className='w-full h-12 p-3 rounded mt-1  border-gray-500 border' />
                </div>
                <div>

                    <p className='font-medium text-[#656e73] '>Role</p>

                    <select name="role" id="role" onChange={(e) => setRole(e.target.value)} className='p-3 rounded border-gray-500 border w-full mt-1'>
                        <option value="tenant">Tenant</option>
                        <option value="landowner">Landowner</option>
                    </select>
                </div>

                <p className='text-gray-900  font-medium'>already have account ?  <Link to={'/login'} className='underline font-bold'> login</Link> </p>

            </section>
            <button className='w-full h-11 rounded bg-[#0b1D27] text-white mt-5 ' onClick={createAccount} >
                {
                    loading?
                    <LoaderComponent size={16} color="#ffffff" />
                    :
                    'Signup'
                }
                </button>

        </div>
    )
}

export default SignupForm