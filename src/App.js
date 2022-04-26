import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';

class App extends React.Component {
  render() {
    return (
      <main>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={ () => (<Home />) } />
            <Route exact path="/cart" render={ () => <Cart /> } />
          </Switch>
        </BrowserRouter>
      </main>
    );
  }
}

export default App;
