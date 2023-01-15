import React from 'react'
import { useParams } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

export default function VideoPlayer() {
    const { id: videoId } = useParams()
    const navigate = useNavigate()

    console.log(videoId);

    return (
        <>
            {videoId &&
                <div className="player">

                    <div onClick={()=>navigate('/')} className="absolute top-0 left-0 z-[220] w-24 cursor-pointer">
                        {/* <BsArrowLeft className='fill-white scale-300' onClick={() => navigate(-1)} /> */}
                        <p className='text-white text-5xl ml-5'>←</p>
                    </div>
                    
                    <iframe
                     controls='0' frameBorder="0" allow="accelerometer; autoplay; modestbranding; encrypted-media; gyroscope; picture-in-picture" allowFullScreen
                        className='absolute left-0 top-0 h-full w-full z-[110]'
                        //    width="420" height="315"
                        modestbranding='1'
                        src={`https://www.youtube.com/embed/${videoId}?modestbranding=1&showinfo=0&autoplay=1&fs=1&modestbranding=1&rel=1`}>

                    </iframe>
                </div>
            }
        </>
    )
}
