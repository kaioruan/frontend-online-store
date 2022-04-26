import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';

class App extends React.Component {
  render() {
    return (
      <main>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={ () => (<Home />) } />
          </Switch>
        </BrowserRouter>
      </main>
    );
  }
}

export default App;
