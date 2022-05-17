import React, { Component } from 'react';
import './Test.css';
import PropTypes from 'prop-types';

class FormPayment extends Component {
  render() {
    const {
      btnPayment,
      cep,
      cidade,
      complemento,
      cpf,
      email,
      endereco,
      estado,
      nome,
      numero,
      telefone,
      handleChangeClient,
    } = this.props;
    return (
      <section className="payment">

        <form>
          <fieldset className="test">
            <legend> Dados Pessoais</legend>

            <label htmlFor="Nome">
              Nome:
              <input
                data-testid="checkout-fullname"
                type="text"
                value={ nome }
                name="nome"
                onChange={ handleChangeClient }
                placeholder="Nome"
              />

            </label>

            <label htmlFor="Cpf">
              Cpf:
              <input
                data-testid="checkout-cpf"
                type="text"
                value={ cpf }
                name="cpf"
                onChange={ handleChangeClient }
              />

            </label>

            <label htmlFor="Email">
              Email:
              <input
                data-testid="checkout-email"
                type="email"
                value={ email }
                name="email"
                onChange={ handleChangeClient }
              />

            </label>

            <label htmlFor="Telefone">
              Telefone:
              <input
                data-testid="checkout-phone"
                type="text"
                value={ telefone }
                name="telefone"
                onChange={ handleChangeClient }
              />

            </label>

            <label htmlFor="Cep">
              Cep:
              <input
                data-testid="checkout-cep"
                type="text"
                value={ cep }
                name="cep"
                onChange={ handleChangeClient }
              />

            </label>

            <label htmlFor="Endereço">
              Endereço:
              <input
                data-testid="checkout-address"
                type="text"
                value={ endereco }
                name="endereco"
                onChange={ handleChangeClient }
              />

            </label>

            <label htmlFor="Complemento">
              Complemento:
              <input
                type="text"
                value={ complemento }
                name="complemento"
                onChange={ handleChangeClient }

              />

            </label>

            <label htmlFor="Número">
              Número:
              <input
                type="text"
                value={ numero }
                name="numero"
                onChange={ handleChangeClient }
              />
            </label>

            <label htmlFor="Cidade">
              Cidade:
              <input
                type="text"
                value={ cidade }
                name="cidade"
                onChange={ handleChangeClient }
              />

            </label>

            <label htmlFor="Estado">
              Estado:
              <select
                value={ estado }
                name="estado"
                onChange={ handleChangeClient }
              >
                <option>MG</option>
                <option>SP</option>
                <option>AM</option>
                <option>RJ</option>
                <option>GO</option>
                <option>TI</option>
                <option>SC</option>
                <option>BA</option>
                <option>RS</option>
              </select>
            </label>
          </fieldset>
          <fieldset className="test">

            <legend>Formas De Pagamento</legend>

            <label htmlFor="boleto">
              Boleto
              <input
                id="boleto"
                value="boleto"
                type="radio"
                name="check"
                onChange={ handleChangeClient }
              />
            </label>

            <label htmlFor="visa">
              Visa
              <input
                id="visa"
                value="visa"
                type="radio"
                name="check"
                onChange={ handleChangeClient }
              />
            </label>

            <label htmlFor="masterCard">
              Master Card
              <input
                id="masterCard"
                value="masterCard"
                type="radio"
                name="check"
                onChange={ handleChangeClient }
              />
            </label>

            <label htmlFor="elo">
              Elo
              <input
                id="elo"
                value="elo"
                type="radio"
                name="check"
                onChange={ handleChangeClient }
              />
            </label>

          </fieldset>
          <button
            type="button"
            disabled={ btnPayment }
          >
            Comprar
          </button>
        </form>
      </section>
    );
  }
}

FormPayment.propTypes = {
  btnPayment: PropTypes.bool.isRequired,
  cep: PropTypes.string.isRequired,
  cidade: PropTypes.string.isRequired,
  complemento: PropTypes.string.isRequired,
  cpf: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  endereco: PropTypes.string.isRequired,
  estado: PropTypes.string.isRequired,
  nome: PropTypes.string.isRequired,
  numero: PropTypes.string.isRequired,
  telefone: PropTypes.string.isRequired,
  handleChangeClient: PropTypes.func.isRequired,
};
export default FormPayment;
