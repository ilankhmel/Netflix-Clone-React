import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Movie from './Movie'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

export default function Row({ title, fetchURL, rowId, movies}) {

    // const [movies, setMovies] = useState([])
    

    // useEffect(() => {
    //     // console.log('ran2');
    //     // axios.get(fetchURL)
    //     //     .then((res) => {
    //     //         // console.log(res.data.results);
    //     //         setMovies(res.data.results)
    //     //     })

    //     // console.log(moviesList);
    //     setMovies(moviesList)
    // }, [moviesList])

    const slideRow = (dir) => {
        var slider = document.getElementById('slider' + rowId)
        slider.scrollLeft += (500 * dir) 
    }

    return (
        <div className={+rowId === 6 ? 'py-20' : ''}>
            <h2 className='text-white font-bold md:text-xl p-4 ' >
                {title}
            </h2>
            <div className="relative flex items-center group">
                <MdChevronLeft onClick={()=>slideRow(-1)} className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' size={40}/>
                <div id={'slider' + rowId} className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative">
                    {movies?.map((item, id) => (
                        <Movie key={id} item={item} />
                    ))}
                </div>
                <MdChevronRight onClick={()=>slideRow(1)} className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' size={40}/>
            </div>
        </div>
    )
}
