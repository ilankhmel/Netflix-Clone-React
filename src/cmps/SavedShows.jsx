import React, { useState, useEffect } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { AiOutlineClose } from 'react-icons/ai'
import { UserAuth } from '../context/AuthContext';
import {updateDoc, doc, onSnapshot} from 'firebase/firestore'
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';


export default function SavedShows() {

    const [movies, setMovies] = useState([])
    const {user} = UserAuth()
    const navigate = useNavigate()


    const slideRow = (dir) => {
        var slider = document.getElementById('slider')
        slider.scrollLeft += (500 * dir) 
    }

    useEffect(()=>{
        onSnapshot(doc(db,'users',`${user?.email}`), (doc)=>{
            setMovies(doc.data()?.savedShows)
        })
    },[user?.email])

    const movieRef = doc(db, 'users', `${user?.email}`)

    const deleteShow = async (ev, passedId) => {
        ev.stopPropagation()
        try{
            const result = movies.filter(item => item.id !== passedId)
            await updateDoc(movieRef, {
                savedShows: result,
            })
        }catch(err){
            console.log(err);
        }
    }

    return (
        <>
            {/* <h2 className='text-white font-bold md:text-xl p-4'>
                My Shows
            </h2> */}
            
            <div className="relative flex items-center group">
                <MdChevronLeft onClick={() => slideRow(-1)} className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' size={40} />
                <div id={'slider'} className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative">
                    {movies?.map((item, id) => (
                        <div onClick={()=>navigate(`/movie/${item.id}`)} key={id} className='w-[160px] sm:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'>
                            <img className='w-60 h-auto block' src={`https://image.tmdb.org/t/p/w500/${item?.img}`} alt={item?.title} />
                            <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 text-white hover:opacity-100">
                                <p className='whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>
                                    {item?.title}
                                </p> 
                                <p onClick={(ev)=>{ deleteShow(ev, item?.id)}} className='absolute text-gray-300 top-4 right-4 hover:text-white'><AiOutlineClose/></p>   
                            </div> 
                        </div>
                    ))}
                </div>
                <MdChevronRight onClick={() => slideRow(1)} className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' size={40} />
            </div>
        </>
    )
}
