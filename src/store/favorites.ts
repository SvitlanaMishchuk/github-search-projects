import { createSlice, createEntityAdapter, EntityState, Dictionary, AnyAction } from "@reduxjs/toolkit";
import { storageKeys } from "../constants";

import { IProject } from "../models/project";
import { RootState } from "./store";

const nameSpace: string = storageKeys.favoritesKey;

const updateStorage = (state: EntityState<IProject>) => {
    localStorage.setItem(nameSpace, JSON.stringify(state));
}

const favoritesAdapter = createEntityAdapter<IProject>({
    selectId: (project: IProject): number => project.id
})

const savedData = JSON.parse(localStorage.getItem(nameSpace) ?? '{}')

const isFavoritesAction = (action: AnyAction): boolean => action.type.startsWith(nameSpace);

export const favoritesStateSlice = createSlice({
    name: nameSpace,
    initialState: favoritesAdapter.getInitialState(savedData),
    reducers: {
        addOne: favoritesAdapter.addOne,
        removeOne: favoritesAdapter.removeOne,
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            isFavoritesAction,
            (state: EntityState<IProject>) => updateStorage(state)
        )
    }
});

export const favoritesDictionary = (state: RootState): Dictionary<IProject> => favoritesAdapter.getSelectors().selectEntities(state.favorites);
export const favoritesArray = (state: RootState): IProject[] => favoritesAdapter.getSelectors().selectAll(state.favorites);