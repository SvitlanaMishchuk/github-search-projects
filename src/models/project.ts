export interface IProject {
    id: number;
    avatar: string;
    name: string;
    rating: number; 
    description: string;
    link: string;
    lang: string;
}

export const createProjectsFromResponse = (response: any): IProject[] => {
    return response.map((item: any) => createProject(item));
}

export const createProject = (entity: any): IProject => {
    return {
        id: entity.id,
        avatar: entity.owner.avatar_url || '',
        name: entity.name,
        rating: parseFloat(entity.score),
        description: entity.description,
        link: entity.html_url,
        lang: entity.language
    }
}