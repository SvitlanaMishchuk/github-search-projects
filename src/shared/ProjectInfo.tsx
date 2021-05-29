import React from 'react';

import { TableCell, makeStyles } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

import { IProject } from '../models/project';

import { ProjectDescription } from './ProjectDescription';

const useStyles = makeStyles({
    description: {
        width: '100%'
    },
});

interface IProjectInfoProps {
    project: IProject
}

export const ProjectInfo = ({ project }: IProjectInfoProps) => {
    const classes = useStyles();
    return (
        <>
            <TableCell className={classes.description}>
                <ProjectDescription
                    name={project.name}
                    avatar={project.avatar}
                    link={project.link}
                    description={project.description} />
            </TableCell>
            <TableCell >
                <Rating name="read-only" value={project.rating} readOnly />
            </TableCell>
            <TableCell >{project.lang}</TableCell>
        </>
    )
}