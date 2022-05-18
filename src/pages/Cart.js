import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      btnLock: false,
      cart: [],
      total: 0,
    };
    this.fetchCart = this.fetchCart.bind(this);
    this.incrementar = this.incrementar.bind(this);
    this.decrementar = this.decrementar.bind(this);
    this.delete = this.delete.bind(this);
    this.manipularCart = this.manipularCart.bind(this);
  }

  componentDidMount() {
    this.fetchCart();
  }

  manipularCart(array) {
    const resultado = array.reduce((acc, crr) => {
      if (acc[`produto${crr.id}`] === undefined) {
        acc[`produto${crr.id}`] = {
          descricao: crr,
          quantidade: 1,
        };
      } else {
        acc[`produto${crr.id}`] = {
          descricao: crr,
          quantidade: acc[`produto${crr.id}`].quantidade + 1,
        };
      }
      return acc;
    }, {});
    const cart = Object.values(resultado);
    cart.map((el) => this.setState((prev) => ({
      cart: [...prev.cart, el.descricao],
      [el.descricao.id]: el.quantidade,
      total: prev.total + el.descricao.price * el.quantidade,
    })));
  }

  fetchCart() {
    const cartItens = JSON.parse(localStorage.getItem('cart'));
    if (cartItens !== null) {
      this.manipularCart(cartItens);
    }
  }

  incrementar({ target }) {
    const { name, value } = target;
    const { cart } = this.state;
    this.setState((prev) => ({
      [name]: prev[name] + 1,
      total: prev.total + Number(value),
    }), () => {
      const { state } = this;
      const availableItem = cart.find((el) => el.id === name).available_quantity;
      if (state[`${name}`] > availableItem) {
        this.setState((prev) => ({
          [name]: prev[name] - 1,
          total: prev.total - Number(value),
        }));
      }
    });
  }

  decrementar({ target }) {
    const { value, name } = target;
    const { state } = this;
    this.setState((prev) => ({
      [name]: prev[name] - 1,
      total: prev.total - Number(value),
    }), () => {
      if (state[`${name}`] === 1) {
        this.setState((prev) => ({
          [name]: 1,
          total: prev.total + Number(value),
        }));
      }
    });
  }

  delete({ target }) {
    const cartItens = JSON.parse(localStorage.getItem('cart'));
    const { name } = target;
    const newCart = cartItens.filter((el) => el.id !== name);
    localStorage.setItem('cart', JSON.stringify(newCart));
    this.setState({
      cart: [],
      [name]: 0,
      total: 0,
    }, () => this.manipularCart(newCart));
  }

  render() {
    const { cart, total } = this.state;
    const { state } = this;
    const cartVazio = 'shopping-cart-empty-message';

    return (
      <section className="sectionPageCart">
        <div className="cartPage">
          <div className="carrinholista">
            {
              state.cart.length > 0
                ? cart.map((value) => (
                  <div key={ value.id } className="listacarrinho">
                    <p data-testid="shopping-cart-product-name">{ value.title }</p>
                    <img src={ value.thumbnail } alt={ value.title } />
                    <p>{ `R$: ${(value.price * state[`${value.id}`]).toFixed(2)}` }</p>
                    <div className="buttons">
                      <button
                        type="button"
                        name={ value.id }
                        value={ value.price }
                        onClick={ this.delete }
                      >
                        X
                      </button>
                      <p data-testid="shopping-cart-product-quantity">
                        {state[`${value.id}`]}
                      </p>
                      <button
                        type="button"
                        data-testid="product-decrease-quantity"
                        name={ value.id }
                        value={ value.price }
                        onClick={ this.decrementar }
                      >
                        -
                      </button>
                      <button
                        type="button"
                        data-testid="product-increase-quantity"
                        name={ value.id }
                        value={ value.price }
                        onClick={ this.incrementar }
                      >
                        +
                      </button>
                    </div>
                  </div>))
                : <h3 data-testid={ cartVazio }>Seu carrinho está vazio</h3>
            }
          </div>
        </div>
        <div className="finalizar">
          <h1>{ `Total: R$${total.toFixed(2)}` }</h1>
          <Link to="/cart/payment">
            <button
              type="button"
              disabled={ cart.length === 0 }
              data-testid="checkout-products"
            >
              Finalizar
            </button>
          </Link>
        </div>
      </section>
    );
  }
}

export default Cart;
