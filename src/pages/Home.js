import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Home.css';

class Home extends React.Component {
  render() {
    const { categ, onChange,
      onClick, btnIsLocked,
      search, produtos,
      didSearch, clickCatSearch,
      searchCat, didCategorie,
      addCartList } = this.props;
    return (
      <div>
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
              <Link to="/cart" data-testid="shopping-cart-button">🛒</Link>
            </nav>
          </div>
        </div>
        <div className="texto">
          <h4 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h4>
        </div>
        <div className="produtos">
          <div className="lista">
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
          </div>
          <div className="produtoslista">
            {
              produtos.length > 0
                ? produtos.map((el) => (
                  <div key={ el.id } data-testid="product">
                    <img src={ el.thumbnail } alt={ el.title } />
                    <p>{ el.title }</p>
                    <p>{ `R$ ${el.price}` }</p>
                    <Link
                      to={ `/${el.id}` }
                      data-testid="product-detail-link"
                    >
                      Detalhes do Produto

                    </Link>
                    <button
                      type="button"
                      data-testid="product-add-to-cart"
                      value={ JSON.stringify(el) }
                      onClick={ addCartList }
                    >
                      Adicionar ao Carrinho

                    </button>
                  </div>
                ))
                : <h4>{ didSearch }</h4>
            }
          </div>
        </div>
        <div>
          {
            searchCat.length > 0
              ? searchCat.map((value) => (
                <div key={ value.id } data-testid="product">
                  <img src={ value.thumbnail } alt={ value.title } />
                  <p>{ value.title }</p>
                  <p>{ `R$ ${value.price}` }</p>
                  <Link
                    to={ `/${value.id}` }
                    data-testid="product-detail-link"
                  >
                    Detalhes do Produto

                  </Link>
                  <button
                    type="button"
                    data-testid="product-add-to-cart"
                    value={ JSON.stringify(value) }
                    onClick={ addCartList }
                  >
                    Adicionar ao Carrinho

                  </button>
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
  addCartList: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  didSearch: PropTypes.string.isRequired,
  didCategorie: PropTypes.string.isRequired,
  btnIsLocked: PropTypes.bool.isRequired,
  produtos: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  searchCat: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
};

export default Home;
