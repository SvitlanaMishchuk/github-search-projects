import React from "react"
import { useSelector } from "react-redux";

import { CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core"

import { IProject } from "../../models/project";
import { ProjectInfo } from "../../shared";
import { favoritesArray } from "../../store/favorites";

export const Favorites = () => {

    const favorites: IProject[] = useSelector(favoritesArray);

    return (
        <TableContainer component={CardContent}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Project</TableCell>
                        <TableCell>Rating</TableCell>
                        <TableCell>Language</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {favorites.map((project: IProject) => (
                        <TableRow key={project.id} >
                            <ProjectInfo project={project} />
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}