import React  from 'react'
import { useSelector } from 'react-redux'
import Main from '../cmps/Main'
import Movie from '../cmps/Movie'
import Row from '../cmps/Row'
import requests from '../Requests'


export default function Home({ movies }) {

    const getRandomMovie = () => {
        if (!movies) return
        return movies[Math.floor(Math.random() * movies?.length)]
    }

    const moviesToShow = useSelector(state=>state.movieModule.moviesToShow)

    return (
        <>
            {   (!moviesToShow) 

                ?
                
                <>
                    <Main movieProp={getRandomMovie()} />
                    <Row rowId='1' title="Up Coming" fetchURL={requests.requestUpcoming} movies={movies?.slice(0, 20)} />
                    <Row rowId='2' title="Popular" fetchURL={requests.requestPopular} movies={movies?.slice(80, 100)} />
                    <Row rowId='3' title="Trending" fetchURL={requests.requestTrending} movies={movies?.slice(40, 60)} />
                    <Row rowId='4' title="Top Rated" fetchURL={requests.requestTopRated} movies={movies?.slice(20, 40)} />
                    <Row rowId='5' title="Horror" fetchURL={requests.requestHorror} movies={movies?.slice(60, 80)} />
                </>
                :
                <>
                    <Row rowId='6' title="Results" movies={moviesToShow} />
                </>
            }
        </>
    )
}

