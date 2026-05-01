import { configureStore } from '@reduxjs/toolkit'
import playerReducer from '../../features/player/state/playerSlice.jsx'

export const store = configureStore({
  reducer: {
    player: playerReducer
  },
})
