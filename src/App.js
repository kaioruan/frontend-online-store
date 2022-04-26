import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import { getCategories } from './services/api';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      categorias: [],
    };
    this.fethcCategorias = this.fethcCategorias.bind(this);
  }

  componentDidMount() {
    this.fethcCategorias();
  }

  async fethcCategorias() {
    const resultado = await getCategories();
    this.setState({ categorias: resultado });
  }

  render() {
    const { categorias } = this.state;
    return (
      <main>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={ () => <Home categ={ categorias } /> } />
            <Route exact path="/cart" render={ () => <Cart /> } />
          </Switch>
        </BrowserRouter>
      </main>
    );
  }
}

export default App;
