import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './cmps/Navbar'
import ProtectedRoute from './cmps/ProtectedRoute'
import VideoPlayer from './cmps/VideoPlayer'
import { AuthContextProvider } from './context/AuthContext'
import Account from './views/Account'
import Home from './views/Home'
import Login from './views/Login'
import MovieDetails from './views/MovieDetails'
import Signup from './views/Signup'
import { loadMovies } from './store/actions/movie.actions'
import { useDispatch, useSelector } from 'react-redux'

export default function App() {

  const dispatch = useDispatch()

  const movies = useSelector(state => state.movieModule.movies)        // movieService.getMoviesMap().then(console.log)

  useEffect(()=>{
          dispatch(loadMovies())
  }, [])

  

  return (
    <>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home movies={movies} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/movie/:id' element={<MovieDetails />} />
          <Route path='/player/:id' element={<VideoPlayer />} />
          <Route
            path='/account'
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthContextProvider>
    </>
  )
}
