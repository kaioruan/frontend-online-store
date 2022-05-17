import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import DetailsProduct from './pages/DetailsProduct';
import { getCategories, getProductsFromCategoryAndQuery,
  getCategoriesList } from './services/api';
import Header from './pages/Header';
import Payment from './pages/Payment';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      categorias: [],
      btnIsLocked: true,
      search: '',
      didSearch: '',
      didCategorie: '',
      produtos: [],
      searchCat: [],
      cartList: [],
    };
    this.fethcCategorias = this.fethcCategorias.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.btnHandler = this.btnHandler.bind(this);
    this.clickSearch = this.clickSearch.bind(this);
    this.clickCatSearch = this.clickCatSearch.bind(this);
    this.fethcCart = this.fethcCart.bind(this);
  }

  componentDidMount() {
    this.fethcCategorias();
    this.fethcCart();
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => this.btnHandler());
  }

  addCartList = ({ target }) => {
    const { value } = target;
    const list = JSON.parse(value);
    this.setState((prev) => ({
      cartList: [...prev.cartList, list],
    }), () => {
      const { cartList } = this.state;
      localStorage.setItem('cart', JSON.stringify(cartList));
    });
  }

  async clickCatSearch({ target }) {
    const { id } = target;
    this.setState({ searchCat: [], didCategorie: 'Carregando...', produtos: [] });
    const result = await getCategoriesList(id);
    this.setState({ searchCat: result.results, didCategorie: '' });
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
      searchCat: [],
      produtos: result.results,
      didSearch: 'Nenhum produto foi encontrado',
    });
  }

  async fethcCategorias() {
    const resultado = await getCategories();
    this.setState({ categorias: resultado });
  }

  fethcCart() {
    const resultado = localStorage.getItem('cart');
    this.setState({ cartList: resultado === null ? [] : JSON.parse(resultado) });
  }

  render() {
    const { categorias, btnIsLocked, search, produtos,
      didSearch, searchCat, didCategorie, cartList } = this.state;
    return (
      <main className="page">
        <BrowserRouter>
          <Header
            btnIsLocked={ btnIsLocked }
            search={ search }
            onChange={ this.handleChange }
            onClick={ this.clickSearch }
          />
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
                searchCat={ searchCat }
                didCategorie={ didCategorie }
                addCartList={ this.addCartList }
                onChange={ this.handleChange }
                onClick={ this.clickSearch }
                clickCatSearch={ this.clickCatSearch }
              />) }
            />
            <Route
              exact
              path="/cart"
              component={ Cart }
            />
            <Route
              exact
              path="/cart/payment"
              render={ (props) => (<Payment
                { ...props }
                cartList={ cartList }
              />) }
            />
            <Route
              exact
              path="/:id"
              render={ (props) => (<DetailsProduct
                { ...props }
                addCartList={ this.addCartList }
                cartItens={ cartList.length }
              />) }
            />
          </Switch>
        </BrowserRouter>
      </main>
    );
  }
}

export default App;
