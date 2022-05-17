import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Home.css';

class Header extends React.Component {
  render() {
    const { onChange,
      onClick, btnIsLocked,
      search } = this.props;
    return (
      <div className="fundo">
        <div className="header">
          <div className="search">
            <input
              type="text"
              name="search"
              value={ search }
              onChange={ onChange }
              data-testid="query-input"
            />
            <button
              type="button"
              name="btn-search"
              disabled={ btnIsLocked }
              onClick={ onClick }
              data-testid="query-button"
            >
              Procurar
            </button>
          </div>
          <div className="carrinho">
            <nav>
              <Link
                to="/"
                className="carrinho"
              >
                Início

              </Link>
              <Link
                to="/cart"
                data-testid="shopping-cart-button"
                className="carrinho"
              >
                🛒

              </Link>
            </nav>
          </div>
        </div>
        <div className="texto">
          <h4 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h4>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  btnIsLocked: PropTypes.bool.isRequired,
};

export default Header;
