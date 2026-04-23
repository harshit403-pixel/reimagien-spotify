import React from 'react'
import { allSongs } from '../../api/songsApi'
import MusicCard from '../components/SongCard'
import Footer from '../components/Footer'

const HomePage = () => {
    let songs = allSongs()
    console.log(songs)
  return (
    <div>
      <div className='flex flex-wrap justify-center gap-4  ' >
      {
        songs.map((elem)=> <MusicCard data={elem} key={elem.url} />)
      }
    </div>
    <Footer/>
    </div>
    
  )
}

export default HomePage
