import React from 'react'
import { useSelector } from 'react-redux'
import requests from '../Requests'
import Row from './Row'

export default function HomeContent({ movies }) {

    const moviesToShow = useSelector(state => state.movieModule.moviesToShow)


    return (
        <>
            {(!moviesToShow)

                ?

                <>
                    <Row rowId='1' title="Up Coming"  movies={movies?.slice(0, 20)} />
                    <Row rowId='2' title="Popular"  movies={movies?.slice(80, 100)} />
                    <Row rowId='3' title="Trending"  movies={movies?.slice(40, 60)} />
                    <Row rowId='4' title="Top Rated"  movies={movies?.slice(20, 40)} />
                    <Row rowId='5' title="Horror" movies={movies?.slice(60, 80)} />
                </>
                :
                <>
                    <Row rowId='6' title="Results" movies={moviesToShow} />
                </>
            }
        </>
    )
}
