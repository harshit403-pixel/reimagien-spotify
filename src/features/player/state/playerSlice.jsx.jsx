import { createSlice } from "@reduxjs/toolkit";

let playerSlice = createSlice({
    name:"playerSlice",
    initialState:{
        currentPlayingSong:null,
        isPlaying:false
    },
    reducers:{
        playNewSong:(state,action)=>{
            state.currentPlayingSong = action.payload
            state.isPlaying = true
        },
        play:(state)=>{
            state.isPlaying = true
        },
        pause:()=>{

            state.isPlaying = false
        }


    }
})

export default playerSlice.reducer
export let {pause , playNewSong, play} = playerSlice.actions