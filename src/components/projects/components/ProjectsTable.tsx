import React from 'react';

import { TableContainer, CardContent, Table, TableHead, TableRow, TableCell, TableBody, Card, makeStyles } from '@material-ui/core';

import { IProject } from '../../../models/project';
import { ProjectRow } from './index';
import { Pagination } from '@material-ui/lab';

const useStyles = makeStyles({
    pagination: {
        float: 'right',
        marginTop: '10px'
    }
});

interface IProjectsTableProps {
    projects: IProject[],
    pages: number,
    page: number,
    onChangePage: (event: React.ChangeEvent<unknown>, page: number) => void,
    onToggleFavorite: (project: IProject) => (event: any) => void,
    isFavorite: (id: number) => boolean
};

export const ProjectsTable = (props: IProjectsTableProps) => {
    const { projects, pages, page, onChangePage, onToggleFavorite, isFavorite } = props;
    const classes = useStyles();
    
    return (
        <>
            <Card>
                <TableContainer component={CardContent}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Project</TableCell>
                                <TableCell>Rating</TableCell>
                                <TableCell>Language</TableCell>
                                <TableCell>Favorite</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {projects.map((project) =>
                                <ProjectRow
                                    key={project.id}
                                    project={project}
                                    onToggleFavorite={onToggleFavorite}
                                    isFavorite={isFavorite} />
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
            {!!pages && <Pagination className={classes.pagination} page={page} count={pages} onChange={onChangePage} />}
        </>
    )
}