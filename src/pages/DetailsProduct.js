import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductDetails } from '../services/api';

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
    const { details } = this.state;
    return (
      <div>
        <nav>
          <Link to="/cart" data-testid="shopping-cart-button">Carrinho</Link>
        </nav>
        <div>
          {details.map((value) => (
            <div key={ value.id }>
              <p data-testid="product-detail-name">
                { value.title }
                {' '}
                -R$:
                {' '}
                { value.price }
              </p>
              <img src={ value.thumbnail } alt={ value.title } />
              <h3>Especifichções Técnicas</h3>
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
          ))}
        </div>
      </div>
    );
  }
}

DetailsProduct.propTypes = {
  match: PropTypes.objectOf(PropTypes.objectOf(PropTypes.any)).isRequired,
};

export default DetailsProduct;
