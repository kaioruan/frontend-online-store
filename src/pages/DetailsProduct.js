import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductDetails } from '../services/api';
import Comentarios from '../components/Comentarios';
import './DetailsProduct.css';

class DetailsProduct extends Component {
  constructor() {
    super();
    this.state = {
      details: [],
    };
  }

  componentDidMount() {
    this.searchDetails();
  }

  searchDetails = async () => {
    const { match: { params: { id } } } = this.props;
    this.setState({ details: [] });
    const result = await getProductDetails(id);
    this.setState({ details: [result] }, () => {
    });
  }

  render() {
    const { match: { params: { id } } } = this.props;
    const { addCartList } = this.props;
    const { details } = this.state;
    return (
      <section className="detailsPage">
        <div className="details">
          <div className="product">
            {details.map((value) => (
              <div key={ value.id }>
                <p data-testid="product-detail-name">
                  { value.title }
                  {' '}
                  -R$:
                  {' '}
                  { value.price.toFixed(2) }
                </p>
                <div>
                  {
                    value.shipping.free_shipping
                  && <p data-testid="free-shipping">Frete Grátis!</p>
                  }
                </div>
                <div className="especificacoes">
                  <img src={ value.thumbnail } alt={ value.title } />
                  <div className="infoDetails">
                    <h3>Especificações Técnicas</h3>
                    <ul>
                      {value.attributes.map((el) => (
                        <li key={ el.id }>
                          { el.name }
                          {' '}
                          -
                          {' '}
                          { el.value_name }
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <button
                  type="button"
                  data-testid="product-detail-add-to-cart"
                  value={ JSON.stringify(value) }
                  onClick={ addCartList }
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            ))}
          </div>
          <Comentarios id={ id } />
        </div>
      </section>
    );
  }
}

DetailsProduct.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  addCartList: PropTypes.func.isRequired,
};

export default DetailsProduct;
