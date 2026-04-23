
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux";
import { store } from "../../../app/store/store";
export let usePlayer = ()=>{
    let audioRef = useRef (new Audio());

    let { currentPlayingSong, isPlaying, currentIndex, queue } = useSelector((store)=> store.player)
    const currentSong = queue[currentIndex];


    useEffect(()=>{
        if (!currentPlayingSong){return}
        else{

        audioRef.current.src = currentPlayingSong.url
        audioRef.current.play()}
    },[currentPlayingSong])

    useEffect(()=>{
        if(!currentPlayingSong){return}
        else{
        if(!isPlaying){
            audioRef.current.pause()
        }
        else{
            audioRef.current.play()
        }}
    },[isPlaying])
}


export let usePlayerDispatch = ()=>{
    let dispatch = useDispatch()
    return {dispatch,}
}






