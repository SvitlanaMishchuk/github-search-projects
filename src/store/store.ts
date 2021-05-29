import { configureStore } from "@reduxjs/toolkit";

import  { projectsStateSlice }  from './projects';
import { favoritesStateSlice } from './favorites';

export const store = configureStore({
    reducer: {
        projectsState: projectsStateSlice.reducer,
        favorites: favoritesStateSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
