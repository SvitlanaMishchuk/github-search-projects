import { useEffect, useCallback, useMemo, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Card, CardContent } from '@material-ui/core';

import { ProjectsTable } from './components/index';
import { createProjectsFromResponse, IProject } from '../../models/project';
import { favoritesDictionary, favoritesStateSlice } from '../../store/favorites';
import { IProjectsState, projectsStateSelector, projectsStateSlice } from '../../store/projects';
import { useDebounce } from '../../hooks';
import { LanguageFilter } from '../../shared/LanguageFilter';
import { Dictionary } from '@reduxjs/toolkit';
import { Search } from '../../shared/Search';

export const Projects = () => {
    const state: IProjectsState = useSelector(projectsStateSelector);
    const favorites: Dictionary<IProject> = useSelector(favoritesDictionary);
    const debouncedSearch: string = useDebounce(state.search, 1000);

    const dispatch = useDispatch();

    const updateState = useCallback((nextState: Partial<IProjectsState>) => {
        dispatch(projectsStateSlice.actions.update(nextState));
    }, [dispatch]);

    const addFavorite = useCallback((prj: IProject) => {
        dispatch(favoritesStateSlice.actions.addOne(prj));
    }, [dispatch]);

    const removeFavorite = useCallback((prj: IProject) => {
        dispatch(favoritesStateSlice.actions.removeOne(prj.id));
    }, [dispatch]);

    const fetchProjects = useCallback((search: string, page: number, lang: string) => {
        let url = `https://api.github.com/search/repositories?q=${search}`;
        if (lang) {
            url += `+language:${lang}`;
        }

        url += `&page=${page}`;

        fetch(url)
            .then(response => response.json())
            .then((data: any) => {
                if (!data || !data.total_count) {
                    return;
                }

                const projects: IProject[] = createProjectsFromResponse(data.items);
                updateState({
                    origin: projects,
                    projects: projects,
                    page: page,
                    pages: Math.ceil(data.total_count / data.items.length),
                    langFilter: lang,
                });
            })
    }, [updateState])

    useEffect(() => {
        if (!state.page || state.page === 1) {
            return;
        }
        fetchProjects(state.search, state.page, state.langFilter);
    }, [state.page, fetchProjects]);

    useEffect(() => {
        if (!debouncedSearch) {
            updateState({
                origin: [],
                projects: [],
                page: 0,
                pages: 0,
                langFilter: '',
            });
            return;
        };

        fetchProjects(debouncedSearch, 1, state.langFilter);
    }, [debouncedSearch, state.langFilter, updateState, fetchProjects]);

    const langOptions: string[] = useMemo(() => {
        return state.origin
            .map((pr: IProject) => pr.lang)
            .filter((lang: string, i: number, arr: string[]) => arr.indexOf(lang) === i);
    }, [state.origin]);

    const handleLangChange = useCallback((event: ChangeEvent<{
        name?: string | undefined;
        value: unknown;
    }>) => {
        const langFilter = event.target.value as string;
        updateState({ langFilter });
    }, [updateState]);

    const handleSearchChange = useCallback((event: ChangeEvent<{ value: string }>) => {
        const search = event.target.value;
        updateState({ search });
    }, [updateState]);

    const handleChangePage = useCallback((_: ChangeEvent<unknown>, page: number) => {
        updateState({ page });
    }, [updateState]);

    const handleClearFilter = useCallback(() => {
        updateState({ projects: state.origin, langFilter: '' });
    }, [updateState, state.origin]);

    const handleToggleFavorite = useCallback((project: IProject) => (event: ChangeEvent<HTMLInputElement>) => {
        const id = event.target.value;
        const exist = !!favorites[id];

        if (exist) {
            removeFavorite(project)
        } else {
            addFavorite(project)
        }
    }, [addFavorite, favorites, removeFavorite]);

    const isFavorite = (id: number): boolean => Boolean(favorites[id]);

    return (
        <>
            <Card>
                <CardContent>
                    <Search
                        search={state.search}
                        onSearchChange={handleSearchChange} />
                    <LanguageFilter
                        langFilter={state.langFilter}
                        langOptions={langOptions}
                        onFilterChange={handleLangChange}
                        onClearFilter={handleClearFilter} />
                </CardContent>
            </Card>
            <ProjectsTable
                projects={state.projects}
                pages={state.pages}
                page={state.page}
                onChangePage={handleChangePage}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={isFavorite} />
        </>
    )
}
