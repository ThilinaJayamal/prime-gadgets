import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppProvider'
import axios from 'axios';
import toast from 'react-hot-toast';

function SellerLogin() {
    const { isSeller, setIsSeller, navigate } = useAppContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault()
            const { data } = await axios.post("/api/seller/login", { email, password });
            if (data.success) {
                setIsSeller(true);
                navigate("/seller");
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    useEffect(() => {
        if (isSeller) {
            navigate("/seller")
        }

    }, [isSeller])

    return !isSeller && (
        <form onSubmit={onSubmitHandler} className='min-h-screen flex items-center
            text-sm text-gray-600'>
            <div className='flex flex-col gap-5 m-auto items-start p-8 py-12
                min-w-80 sm:min-w-88 rounded-lg shadow-xl border-gray-200'>
                <p className='text-2xl font-medium m-auto'>
                    <span className='text-primary'>Seller</span>
                    <span> Login</span>
                </p>

                <div className='w-full'>
                    <p>Email</p>
                    <input type="email" placeholder='Email ID' onChange={(e) => setEmail(e.target.value)}
                        className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary'
                        required />
                </div>
                <div className='w-full'>
                    <p>Password</p>
                    <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)}
                        className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary'
                        required />
                </div>

                <button className='bg-primary hover:bg-primary-dull text-white w-full py-2
                rounded-md cursor-pointer'>
                    Login
                </button>
            </div>
        </form>
    )
}

export default SellerLogin