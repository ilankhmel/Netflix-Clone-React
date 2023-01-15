import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import VideoPlayer from '../cmps/VideoPlayer'
import { useEffectUpdate } from '../customHooks/useEffectUpdate'
import {  getMovieById, saveYoutubeUrl } from '../store/actions/movie.actions'

export default function MovieDetails() {
    const [movie, setMovie] = useState({})
    const ytKey = process.env.REACT_APP_YOUTUBE_KEY
    const { id } = useParams()
    const dispatch = useDispatch()

    const movies = useSelector(state => state.movieModule.movies)

    useEffect(() => {
        // axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US&external_source=imdb_id`)
        //     .then((res) => setMovie(res.data))

        dispatch(getMovieById(+id))
            .then((movie) => {
                setMovie(movie)           
            })
    }, [movies])

    useEffectUpdate(() => {
        if (!movie || movie?.videoId) return
        console.log('fetching');
        axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${ytKey}&q=${movie?.original_title}trailerenglish`)
            .then((res) => {
                setMovie({ ...movie, videoId: res.data.items[0]?.id?.videoId })
            })          
    }, [movie])


    useEffectUpdate(() => {
        dispatch(saveYoutubeUrl(movie))
    }, [movie?.videoId])

    return (
        <div className='w-full h-full text-white'>
            <div className="w-full h-full">
                <div className="absolute w-full h-full bg-gradient-to-r from-black"></div>
                <img className='w-full h-screen object-cover' src={`https://image.tmdb.org/t/p/original/${movie?.belongs_to_collection?.backdrop_path || movie?.backdrop_path}`} alt={movie?.title} />
                <div className='absolute w-full top-[20%] p-4 md:p-8'>
                    <h1 className='text-3xl md:text-5xl font-bold'>{movie?.original_title}</h1>
                    <div className='my-4'>
                        <Link to={`/player/${movie?.videoId}`} className='border bg-gray-300 text-black border-gray-300 py-2 px-5'>
                            Play
                        </Link>
                        <button className='border text-white  border-gray-300 py-2 px-5 ml-4'>
                            Watch Later
                        </button>
                    </div>
                    <p className='text-gray-400 text-sm'>Relesed: {movie?.release_date}</p>
                    <p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200'>{(movie?.overview)}</p>
            
                </div>
            </div>
        </div>
    )
}
