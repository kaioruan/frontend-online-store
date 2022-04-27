import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Home extends React.Component {
  render() {
    const { categ, onChange,
      onClick, btnIsLocked,
      search, produtos,
      didSearch, clickCatSearch,
      searchCat, didCategorie } = this.props;
    return (
      <div>
        <nav>
          <Link to="/cart" data-testid="shopping-cart-button">Carrinho</Link>
        </nav>
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
                onClick={ clickCatSearch }
              >
                { el.name }
              </button>
            ))
          }
        </ul>
        <div>
          {
            produtos.length > 0
              ? produtos.map((el) => (
                <div key={ el.id } data-testid="product">
                  <img src={ el.thumbnail } alt={ el.title } />
                  <p>{ el.title }</p>
                  <p>{ `R$ ${el.price}` }</p>
                </div>
              ))
              : <h4>{ didSearch }</h4>
          }
        </div>
        <div>
          {
            searchCat.length > 0
              ? searchCat.map((value) => (
                <div key={ value.id } data-testid="product">
                  <img src={ value.thumbnail } alt={ value.title } />
                  <p>{ value.title }</p>
                  <p>{ `R$ ${value.price}` }</p>
                </div>
              ))
              : <h4>{ didCategorie }</h4>
          }
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  categ: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  clickCatSearch: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  didSearch: PropTypes.string.isRequired,
  didCategorie: PropTypes.string.isRequired,
  btnIsLocked: PropTypes.bool.isRequired,
  produtos: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  searchCat: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
};

export default Home;
