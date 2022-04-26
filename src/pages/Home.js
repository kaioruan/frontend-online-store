import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Home extends React.Component {
  render() {
    const { categ } = this.props;
    return (
      <div>
        <nav>
          <Link to="/cart" data-testid="shopping-cart-button">Carrinho</Link>
        </nav>
        <h4 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h4>
        <ul>
          {
            categ.map((el) => (
              <button
                key={ el.id }
                type="button"
                id={ el.id }
                name={ el.name }
                data-testid="category"
              >
                { el.name }
              </button>
            ))
          }
        </ul>
      </div>
    );
  }
}

Home.propTypes = {
  categ: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};

export default Home;
