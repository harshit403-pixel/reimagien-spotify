import { createSlice } from "@reduxjs/toolkit";

let playerSlice = createSlice({
    name:"playerSlice",
    initialState:{
        queue:[],
        currentPlayingSong:null,
        isPlaying:false
    },
    reducers:{
        playNewSong:(state,action)=>{
            state.currentPlayingSong = action.payload
            state.isPlaying = true
            state.queue.push(action.payload)
        },
        play:(state)=>{
            state.isPlaying = true
        },
        pause:(state)=>{

            state.isPlaying = false
        }


    }
})

export default playerSlice.reducer
export let {pause , playNewSong, play} = playerSlice.actions