import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IProject } from "../models/project";
import { RootState } from "./store";

export interface IProjectsState {
    langFilter: string,
    search: string,
    page: number,
    pages: number,

    origin: IProject[],
    projects: IProject[],
}

const initialState: IProjectsState = {
    langFilter: '',
    search: '',
    page: 1,
    pages: 0,

    origin: [],
    projects: [],
}

const nameSpace = 'projectsState';

export const projectsStateSlice = createSlice({
    name: nameSpace,
    initialState,
    reducers: {
        update: (state, action: PayloadAction<Partial<IProjectsState>>) => ({ ...state, ...action.payload }),
    }
});

export const projectsStateSelector = (state: RootState) => state.projectsState;