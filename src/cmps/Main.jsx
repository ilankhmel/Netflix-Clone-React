import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useEffectUpdate } from '../customHooks/useEffectUpdate'
import { saveYoutubeUrl } from '../store/actions/movie.actions'

export default function Main({movieProp}) {
    const [movie, setMovie] = useState({})
    const ytKey = process.env.REACT_APP_YOUTUBE_KEY
    const dispatch = useDispatch()

    useEffect(()=>{
        console.log('running')
        setMovie(movieProp)
    },[movieProp])

    useEffectUpdate(() => {
        if (movie?.videoId) return
        console.log('fetching main');
        // axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${ytKey}&q=${movie?.original_title}trailer`)
        //     .then((res) => {
            //         setMovie({ ...movie, videoId: res.data.items[0]?.id?.videoId })
            //     })
        }, [movie])
        
    useEffectUpdate(() => {
        console.log('saving');
        dispatch(saveYoutubeUrl(movie))
    }, [movie?.videoId])

    const truncateString = (str, num) => {
        if (!str) return
        if (str.length > num) {
            return str.slice(0, num) + '...'
        } else {
            return str
        }
    }

    return (
        <div className='w-full h-[550px] text-white'>
            <div className="w-full h-full">
                <div className="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
                <img className='w-full h-full object-cover' src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt={movie?.title} />
                <div className='absolute w-full top-[20%] p-4 md:p-8'>
                    <h1 className='text-3xl md:text-5xl font-bold'>{movie?.title}</h1>
                    <div className='my-4'>
                        <Link to={`/player/${movie?.videoId}`} className='border bg-gray-300 text-black border-gray-300 py-2 px-5'>
                            Play
                        </Link>
                        <button className='border text-white  border-gray-300 py-2 px-5 ml-4'>
                            Watch Later
                        </button>
                    </div>
                    <p className='text-gray-400 text-sm'>Relesed: {movie?.release_date}</p>
                    <p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200'>{truncateString(movie?.overview, 150)}</p>
                </div>
            </div>
        </div>
    )
}
