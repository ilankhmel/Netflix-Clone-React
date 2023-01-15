import React, { useEffect, useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { arrayUnion, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';

export default function Movie({item}) {
    const [like, setLike] = useState(false)
    const [saved, setSaved] = useState(false)
    const { user } = UserAuth()

    const movieId = doc(db, 'users', `${user?.email}`)

    const navigate = useNavigate()
    const saveShow = async (ev) => {
        ev.stopPropagation()
        if(user?.email){
            setLike(!like)
            setSaved(true)
            await updateDoc(movieId, {
                savedShows: arrayUnion({
                    id:item.id,
                    title: item.title,
                    img: item?.poster_path
                })
            })
        }else{
            alert('Please log in to save')
        }
    }

    useEffect(()=>{
        onSnapshot(doc(db,'users',`${user?.email}`), (doc)=>{
            const res = doc.data()?.savedShows?.some((show)=>{
                return show.id === item.id
            })
            setLike(res)
        })
    },[])

    return (
        // <Link to={`/movie/${item.id}`}>
            <div className='w-[150px] sm:w-[240px] lg:w-[240px] inline-block cursor-pointer relative p-2'>
                {/* <img className='w-full h-auto block' src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`} alt={item?.title} /> */}
                {/* <img className='w-full h-auto block' src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path || item?.belongs_to_collection?.backdrop_path || item?.poster_path}`} alt={item?.title} /> */}
                <img className='w-60 h-auto block m-0' src={`https://image.tmdb.org/t/p/w500/${item?.poster_path|| item?.belongs_to_collection?.backdrop_path || item?.backdrop_path}`} alt={item?.title} />
                {/* <img className='w-full h-auto block' src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path || item?.belongs_to_collection?.backdrop_path}`} alt={item?.title} /> */}
                <div onClick={()=>navigate(`/movie/${item.id}`)} className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 text-white hover:opacity-100">
                    <p className='whitespace-normal align-middle text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>
                        {item?.title}
                    </p>
                    <p onClick={(ev)=>saveShow(ev)} className="z-20">
                        {like ? <FaHeart className='absolute top-4 left-4 text-gray-300 hover:text-white' /> : <FaRegHeart className='absolute top-4 left-4 text-gray-300  hover:text-white' />}
                    </p>
                </div>
            </div>
        // </Link>

    )
}
