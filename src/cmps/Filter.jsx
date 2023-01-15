import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { filterMoviesToShow } from '../store/actions/movie.actions';


export default function Filter() {

    const dispatch = useDispatch()
    const navigate =useNavigate()

    const handleInput = (ev) => {
        // console.log(ev.target.value);
        navigate('/')
        if(!ev.target.value){
            return dispatch(filterMoviesToShow(null))
        }
        dispatch(filterMoviesToShow(ev.target.value))
    }


    return (
        <div> 
            <input type="text" placeholder='Search' onChange={handleInput} className="bg-black opacity-80 text-white rounded-none p-1.5 w-50 border-[1px] border-y-stone-50"/>
        </div>
    )
}
