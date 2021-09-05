import './App.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Admin from './pages/admin';
import NotFound from './pages/notfound';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          <Home/>
        </Route>
        <Route path='/login' exact>
          <Login/>
        </Route>
        <Route path='/admin'>
          <Admin/>
        </Route>
        <Route path='*'>
          <NotFound link="/"/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
