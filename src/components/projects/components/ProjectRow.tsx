import React from 'react';
import { TableRow, TableCell, Checkbox } from '@material-ui/core';

import { FavoriteBorder, Favorite } from '@material-ui/icons';

import { IProject } from '../../../models/project';
import { ProjectInfo } from '../../../shared';

interface IProjectRowProps {
    project: IProject,
    onToggleFavorite: (project: IProject) => (event: React.ChangeEvent<HTMLInputElement>) => void,
    isFavorite: (id: number) => boolean
}

export const ProjectRow = ({ project, onToggleFavorite, isFavorite }: IProjectRowProps) => {

    return (
        <TableRow>
            <ProjectInfo project={project} />
            <TableCell >
                <Checkbox
                    checked={isFavorite(project.id)}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    onChange={onToggleFavorite(project)}
                    value={project.id} />
            </TableCell>
        </TableRow>
    )
}
