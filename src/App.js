import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import { getCategories, getProductsFromCategoryAndQuery } from './services/api';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      categorias: [],
      btnIsLocked: true,
      search: '',
      didSearch: '',
      produtos: [],
    };
    this.fethcCategorias = this.fethcCategorias.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.btnHandler = this.btnHandler.bind(this);
    this.clickSearch = this.clickSearch.bind(this);
  }

  componentDidMount() {
    this.fethcCategorias();
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => this.btnHandler());
  }

  btnHandler() {
    const { search } = this.state;
    if (search.length > 0) {
      this.setState({ btnIsLocked: false });
    } else {
      this.setState({ btnIsLocked: true });
    }
  }

  async clickSearch() {
    const { search } = this.state;
    const result = await getProductsFromCategoryAndQuery(undefined, search);
    this.setState({
      produtos: result.results,
      didSearch: 'Nenhum produto foi encontrado',
    });
  }

  async fethcCategorias() {
    const resultado = await getCategories();
    this.setState({ categorias: resultado });
  }

  render() {
    const { categorias, btnIsLocked, search, produtos, didSearch } = this.state;
    return (
      <main>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={ () => (<Home
                categ={ categorias }
                btnIsLocked={ btnIsLocked }
                search={ search }
                produtos={ produtos }
                didSearch={ didSearch }
                onChange={ this.handleChange }
                onClick={ this.clickSearch }
              />) }
            />
            <Route exact path="/cart" render={ () => <Cart /> } />
          </Switch>
        </BrowserRouter>
      </main>
    );
  }
}

export default App;
