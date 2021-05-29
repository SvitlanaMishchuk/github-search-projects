import {
  BrowserRouter as Router,
  Link as RouterLink,
  Switch,
  Route
} from 'react-router-dom';

import { Container, AppBar, Toolbar, Button, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Projects } from './components/projects';
import { Favorites } from './components/favorites';
import { routes } from './constants/routes';

const useStyles = makeStyles({
  link: {
    color: "#ffffff",
    textDecoration: 'none'
  }
});

function App() {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <Router>
        <AppBar position="static">
          <Toolbar>
            <RouterLink to={routes.home} className={classes.link}>
              <Button color="inherit">Search</Button>
            </RouterLink>
            <RouterLink to={routes.favorites} className={classes.link}>
              <Button color="inherit">Favorites</Button>
            </RouterLink>
          </Toolbar>
        </AppBar>
        <Card>
          <Switch>
            <Route path={routes.favorites}>
              <Favorites />
            </Route>
            <Route path={routes.home}>
              <Projects />
            </Route>
          </Switch>
        </Card>
      </Router>
    </Container>
  );
}

export default App;

