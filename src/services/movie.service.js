import axios from "axios";
import requests from "../Requests";

async function getMoviesMap(){
    return Promise.resolve({
        popular: await axios.get(requests.requestPopular).then((res)=> res.data.results),
        topRated: await axios.get(requests.requestTopRated).then((res)=> res.data.results),
        trending: await axios.get(requests.requestTrending).then((res)=> res.data.results),
        horror: await axios.get(requests.requestHorror).then((res)=> res.data.results),
        upComing: await axios.get(requests.requestUpcoming).then((res)=> res.data.results),
      })
}

export const movieService = {
  getMoviesMap,
}