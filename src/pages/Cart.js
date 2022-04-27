import React from 'react';
import PropTypes from 'prop-types';

class Cart extends React.Component {
  render() {
    const { cartList } = this.props;

    const resultado = cartList.reduce((acc, crr) => {
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

    return (
      <div>
        <div>
          {cart.length > 0
            ? cart.map((value) => (
              <div key={ value.descricao.id }>
                <p data-testid="shopping-cart-product-name">{ value.descricao.title }</p>
                <img src={ value.descricao.thumbnail } alt={ value.descricao.title } />
                <p>{ `R$: ${value.descricao.price}` }</p>
                <p data-testid="shopping-cart-product-quantity">
                  {value.quantidade}
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
