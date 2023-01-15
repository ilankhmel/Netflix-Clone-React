import { movieService } from "../../services/movie.service"
import { storageService } from "../../services/storage.service"

export function loadMovies() {

    return async (dispatch, getState) => {
        try {
            // const filterBy = getState().movieModule.filterBy
            var movies = storageService.load('movies')
            if(movies){
                dispatch({ type: 'SET_MOVIES', movies})
            }else{
                const moviesMap = await movieService.getMoviesMap()
                movies = [...Object.values(moviesMap).flat(Infinity)]
                storageService.store('movies', movies)
                dispatch({ type: 'SET_MOVIES', movies})
            }
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function getMovieById(movieId) {

    return async (dispatch, getState) => {
        try {
            const movies = getState().movieModule.movies
            // const movieArr = [...Object.values(movies).flat(Infinity)]
            return movies.find(movie => movie.id === +movieId)
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function saveYoutubeUrl(movie) {

    return async (dispatch, getState) => {
        try {
            const movies = getState().movieModule.movies
            // const movieArr = [...Object.values(movies).flat(Infinity)]
            const idx = movies.findIndex(currMovie => currMovie.id === movie.id)
            movies[idx] = movie
            storageService.store('movies', movies)
            dispatch({ type: 'SET_MOVIES', movies})
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function filterMoviesToShow(term) {

    return async (dispatch, getState) => {
        try {
            // console.log('term', term);
            if(!term){
                return dispatch({ type: 'SET_TO_SHOW', movies: null})
            }
            const movies = getState().movieModule.movies
            const regEx = new RegExp(term, 'i')
            const filteredMovies = movies.filter(movie => regEx.test(movie.title))
            // console.log(filteredMovies);
            dispatch({ type: 'SET_TO_SHOW', movies: filteredMovies})
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function removeRobot(movieId) {

    return async (dispatch) => {
        try {
            const movies = await movieService.remove(movieId)
            dispatch({ type: 'REMOVE_MOVIE', movieId })
            return 'hello'
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function setFilterBy(filterBy) {

    return (dispatch) => {
        try {
            dispatch({ type: 'SET_FILTER_BY', filterBy: { ...filterBy } })
        } catch (err) {
            console.log('err:', err)
        }
    }
}