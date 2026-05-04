import React from 'react'
import { Navigate, Outlet } from 'react-router'
import Navbar from '../../features/dashboard/ui/components/Navbar'
import { Group, Panel } from 'react-resizable-panels'
import Player from '../../features/player/ui/component/Player.jsx'
import LeftPanel from '../../features/dashboard/ui/components/LeftPanel'
import RightPanel from '../../features/dashboard/ui/components/RightPanel'
import { useSelector } from 'react-redux'
import { allSongs } from '../../features/dashboard/api/songsApi'
import {
  getLoggedInUser,
  hasRegisteredUsers,
} from '../../features/auth/utils/authStorage.js'

const DashboardLayout = () => {
   let loggedInUser = getLoggedInUser()
   if (!loggedInUser) {
    return <Navigate replace to={hasRegisteredUsers() ? "/" : "/register"} />
   }

   let { currentPlayingSong} = useSelector((store)=> store.player)
     let smallSongArr = []
     smallSongArr.push(currentPlayingSong)

     let songs = allSongs()
    let oneSong =  songs.filter((elem,index)=> index < 1)
 
     

  return (
    <div className='h-screen bg-black w-screen overflow-hidden'>
      <Navbar/>

      <div className='h-[80%]'>
              <Group className='flex gap-2' >
        <Panel maxSize={"20%"} minSize={"15%"} className='bg-[#121212] rounded-xl p-5 ' ><LeftPanel/></Panel>
        <Panel className='bg-[#121212] rounded-xl p-5 ' ><Outlet/></Panel>
        <Panel maxSize={"20%"} minSize={"15%"} className='bg-[#121212] rounded-xl p-5 '>
          {
            smallSongArr?.filter((elem) => elem && elem.url).length > 0 ? (
              smallSongArr
                .filter((elem) => elem && elem.url)
                .map((elem) => (
                  <RightPanel key={elem.url} song={elem} />
                ))
            ) : (
              oneSong.map((elem)=> <RightPanel key={elem.url} song={elem} />)
            )
          }
            

        </Panel>
      </Group>
      </div>

      <Player/>


      
    </div>
  )
}

export default DashboardLayout
