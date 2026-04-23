import React from 'react'

const SideSong = ({song}) => {
  console.log(song)
  return (
    
            <div className="flex items-center gap-3">
        <div className="w-14 h-14 bg-cover bg-center rounded-md  " style={{ backgroundImage: `url('${song?.thumbnail}')` }}></div>
        <div>
          <p className="text-sm font-semibold">{song?.title}</p>
          <p className="text-xs text-gray-400">{song?.artist}</p>
        </div>
      </div>
      
    
  )
}

export default SideSong
