import React from 'react';

import { InputLabel, Select, MenuItem, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    filter: {
        display: 'inline-block',
        width: '15%',
        marginRight: '2%'
    },
    filterSelect: {
        width: '100%'
    },
});

interface ILanguageFilterProps {
    langFilter: string,
    langOptions: string[],
    onFilterChange: (event: React.ChangeEvent<{
        name?: string | undefined;
        value: unknown;
    }>) => void,
    onClearFilter: () => void
}

export const LanguageFilter = (props: ILanguageFilterProps) => {
    const { langFilter, langOptions, onFilterChange, onClearFilter } = props;
    const classes = useStyles();

    return (
        <>
            <div className={classes.filter}>
                <InputLabel shrink id="filter-label">
                    Language
                </InputLabel>
                <Select className={classes.filterSelect}
                    labelId="filter-label"
                    id="filter"
                    value={langFilter}
                    onChange={onFilterChange}
                >
                    {langOptions.map(lang => <MenuItem value={lang} key={lang}>{lang}</MenuItem>)}
                </Select>
            </div>
            <Button variant="contained" size="small" onClick={onClearFilter}>Clear filter</Button>
        </>
    )
}