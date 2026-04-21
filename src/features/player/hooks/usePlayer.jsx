
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux";
import { store } from "../../../app/store/store";
export let usePlayer = ()=>{
    let audioRef = useRef (new Audio());

    let { currentPlayingSong, isPlaying } = useSelector((store)=> store.player)
    console.log(currentPlayingSong)
    

    useEffect(()=>{
        if (!currentPlayingSong){return}
        else{

        audioRef.current.src = currentPlayingSong.url
        audioRef.current.play()}
    },[currentPlayingSong])
}


export let usePlayerDispatch = ()=>{
    let dispatch = useDispatch()
    return {dispatch,}
}






