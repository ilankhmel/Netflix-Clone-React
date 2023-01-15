import React from 'react'
import Movie from './Movie'

export default function Grid({ movies, title }) {
    return (
        <div className='translate-y-32'>
        <h1 className='text-white font-bold md:text-xl p-4 '>{title}</h1>
        <div className='text-center m-auto'>
            {movies?.map((item, id) => (
                <Movie key={id} item={item} />
            ))}
        </div>
        </div>
    )
}
