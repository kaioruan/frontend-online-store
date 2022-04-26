import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  render() {
    return (
      <div>
        <h4 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h4>
        <nav>
          <Link to="/cart" data-testid="shopping-cart-button">Carrinho</Link>
        </nav>
      </div>
    );
  }
}

export default Home;
