import { Avatar, Typography, Link, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    avatar: {
        display: 'inline-block',
        marginRight: '15px',
        verticalAlign: 'top',
        maxWidth: '15%'
    },
    project: {
        display: 'inline-block',
        maxWidth: '85%'
    },
});

interface IProjectDescriptionProps {
    name: string,
    avatar: string,
    link: string,
    description: string
}

export const ProjectDescription = ({ name, avatar, link, description }: IProjectDescriptionProps) => {
    const classes = useStyles();
    return (
        <>
            <Avatar className={classes.avatar} alt={name} src={avatar} />
            <div className={classes.project}>
                <Link href={link}>{name}</Link>
                <br />
                <Typography variant="caption" display="block" gutterBottom>
                    {description}
                </Typography>
            </div>
        </>
    )
}