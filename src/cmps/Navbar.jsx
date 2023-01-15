import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext';
import { filterMoviesToShow } from '../store/actions/movie.actions';
import {GiHamburgerMenu } from 'react-icons/gi'
import Filter from './Filter';
export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const { user, logOut } = UserAuth()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogout = async () => {
        try {
            await logOut()
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const onBack = () => {
        dispatch(filterMoviesToShow(null))
        navigate('/')
    }

    return (
        <div className='flex items-center justify-between p-4 z-[100] w-full absolute overflow-hidden'>
            <div onClick={onBack}>
                <h1 className='text-red-600 text-4xl font-bold cursor-pointer'>
                    NETFLIX
                </h1>
            </div>
            {user?.email
                ?
                <div className={`fixed top-0 right-0 flex p-5 flex-col items-center gap-3 h-full bg-black opacity-90 z-10 shadow-menu ${isOpen ? 'translate-x-0' : 'translate-x-96'} transition-[5s] md:flex-row md:static md:bg-transparent md:translate-x-0 md:shadow-transparent`}>
                    <Filter />
                    <Link to='/account'>
                        <button className={`text-white ${isOpen ? '' : 'pl-4' }`}>
                            Account
                        </button>
                    </Link>
                    <button onClick={handleLogout} className='bg-red-600 px-6 py-4 rounded cursor-pointer text-white'>
                        Logout
                    </button>
                </div>
                :
                // <div className='fixed right-5 top-10 flex flex-col items-center justify-center gap-5 md:flex-row md:static'>
                <div className={`fixed top-0 right-0 flex p-5 flex-col items-center gap-3 h-full bg-black opacity-90 z-10 shadow-menu ${isOpen ? 'translate-x-0' : 'translate-x-96'} transition-[5s] md:flex-row md:static md:bg-transparent md:translate-x-0 md:shadow-transparent`}>
                    <Filter />
                    <Link to='/login' className='block'>
                        <button className={`text-white ${isOpen ? '' : 'pl-4' }`}>
                            Sign In
                        </button>
                    </Link>
                    <Link to='/signup' className='block'>
                        <button className='bg-red-600 px-6 py-4 rounded cursor-pointer text-white'>
                            Sign Up
                        </button>
                    </Link>
                </div>
            }
            <div onClick={toggleMenu} className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 ${isOpen ? 'fixed' : 'hidden'}`}></div>
            <button className={`block ${isOpen ? 'hidden' : '' } md:hidden text-white text-3xl `} onClick={toggleMenu}><GiHamburgerMenu/></button>
        </div>
    )
}
