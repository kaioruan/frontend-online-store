import React from 'react';
import PropTypes from 'prop-types';

class Cart extends React.Component {
  render() {
    const { cartList } = this.props;
    return (
      <div>
        <div>
          {cartList.length > 0
            ? cartList.map((value) => (
              <div key={ value.id }>
                <p data-testid="shopping-cart-product-name">{ value.title }</p>
                <img src={ value.thumbnail } alt={ value.title } />
                <p>{ `R$: ${value.price}` }</p>
                <p data-testid="shopping-cart-product-quantity">
                  {(cartList.filter((el) => el.id === value.id)).length}
                </p>
              </div>))
            : <h3 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h3>}
        </div>
      </div>
    );
  }
}

Cart.propTypes = {
  cartList: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
};

export default Cart;
