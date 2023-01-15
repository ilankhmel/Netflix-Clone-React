const INITIAL_STATE = {
    movies: null,
    moviesToShow: null,
    filterBy: {
        model: '',
        type: '',
        minBatteryStatus: '',
        maxBatteryStatus: '',
    }
}


export function movieReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case 'SET_MOVIES':
            return {
                ...state,
                movies: action.movies
            }
        case 'SET_TO_SHOW':
            return {
                ...state,
                moviesToShow: action.movies
            }
        case 'ADD_MOVIE':
            return {
                ...state,
                movies: [...state.movies, action.movie]
            }
        case 'REMOVE_MOVIE':
            return {
                ...state,
                movies: state.movies.filter(movie => movie._id !== action.movieId)
            }
        case 'UPDATE_MOVIE':
            return {
                ...state,
                movies: state.movies.map(movie => movie._id === action.movie._id ? action.movie : movie)
            }
        case 'SET_FILTER_BY':
            return {
                ...state,
                filterBy: {...action.filterBy}
            }

        default:
            return state
    }

}