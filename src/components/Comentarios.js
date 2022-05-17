import React, { Component } from 'react';
import './Comentarios.css';
import PropTypes from 'prop-types';

class Comentarios extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      check: '',
      textArea: '',
      btnSubimit: true,
      review: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getAvaliacao();
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => this.validate());
  }

  validate = () => {
    const { email, check } = this.state;
    if (email.length > 0 && check > 0) {
      this.setState({ btnSubimit: false });
    } else {
      this.setState({ btnSubimit: true });
    }
  }

  saveForm = ({ target }) => {
    const { value } = target;
    const { check, email, textArea } = this.state;

    const newObjeto = {
      value,
      check,
      email,
      textArea,
    };
    const local = JSON.parse(localStorage.getItem('comentario'));

    if (local === null) {
      const newArray = [];
      newArray.push(newObjeto);
      localStorage.setItem('comentario', JSON.stringify(newArray));
    } else {
      local.push(newObjeto);
      localStorage.setItem('comentario', JSON.stringify(local));
    }

    this.setState({
      email: '',
      check: '',
      textArea: '',
    }, () => this.getAvaliacao());
  }

  getAvaliacao = () => {
    const getinfo = JSON.parse(localStorage.getItem('comentario'));
    this.setState({
      review: getinfo,
    });
  }

  render() {
    const { btnSubimit, email, textArea, review } = this.state;
    const { id } = this.props;
    const filterDados = review !== null ? review.filter((el) => el.value === id) : [];
    return (
      <section>
        <form>
          <input
            onChange={ this.handleChange }
            value={ email }
            name="email"
            id="email"
            placeholder="Email"
            data-testid="product-detail-email"
            type="email"
          />

          <label htmlFor="comentario">
            Comentários:
            <textarea
              onChange={ this.handleChange }
              name="textArea"
              value={ textArea }
              id="comentario"
              data-testid="product-detail-evaluation"
            />
          </label>

          <div>
            <label htmlFor="1">
              1
              <input
                onChange={ this.handleChange }
                value={ 1 }
                data-testid="1-rating"
                name="check"
                id="1"
                type="radio"
              />
            </label>

            <label htmlFor="2">
              2
              <input
                onChange={ this.handleChange }
                value={ 2 }
                data-testid="2-rating"
                name="check"
                id="2"
                type="radio"
              />
            </label>

            <label htmlFor="3">
              3
              <input
                onChange={ this.handleChange }
                value={ 3 }
                data-testid="3-rating"
                name="check"
                id="3"
                type="radio"
              />
            </label>

            <label htmlFor="4">
              4
              <input
                onChange={ this.handleChange }
                value={ 4 }
                data-testid="4-rating"
                name="check"
                id="4"
                type="radio"
              />
            </label>

            <label htmlFor="5">
              5
              <input
                onChange={ this.handleChange }
                value={ 5 }
                data-testid="5-rating"
                name="check"
                id="5"
                type="radio"
              />
            </label>

          </div>
          <button
            value={ id }
            data-testid="submit-review-btn"
            type="button"
            disabled={ btnSubimit }
            onClick={ this.saveForm }
          >
            Avaliar
          </button>

        </form>
        <div>
          {filterDados.length > 0 ? filterDados.map((elm, index) => (
            <div key={ index } className="comentario">
              <p>
                Email:
                {' '}
                { elm.email }
              </p>
              <p>
                Nota:
                {' '}
                { elm.check }
              </p>
              <p>
                Comentário:
                {' '}
                { elm.textArea }
              </p>
            </div>
          )) : <p> </p>}
        </div>
      </section>
    );
  }
}

Comentarios.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Comentarios;
