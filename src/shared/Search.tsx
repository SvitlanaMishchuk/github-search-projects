import React from 'react';

import { TextField, InputAdornment, makeStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles({
    search: {
        width: '60%',
        marginRight: '10%'
    },
});

interface ISearchProps {
    search: string;
    onSearchChange: (event: React.ChangeEvent<{ value: string }>) => void;
}

export const Search = ({ search, onSearchChange }: ISearchProps) => {
    const classes = useStyles();

    return (
        <TextField
            className={classes.search}
            label="Search"
            value={search}
            onChange={onSearchChange}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
        />
    )
}