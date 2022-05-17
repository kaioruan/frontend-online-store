import React, { Component } from 'react';
import FormPayment from '../components/FormPayment';
import './Payment.css';

class Payment extends Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      cpf: '',
      email: '',
      telefone: '',
      cep: '',
      endereco: '',
      complemento: '',
      numero: '',
      cidade: '',
      estado: '',
      check: '',
      btnPayment: true,
      cart: [],
      total: 0,
    };

    this.handleChangeClient = this.handleChangeClient.bind(this);
    this.manipularCart = this.manipularCart.bind(this);
    this.fetchCart = this.fetchCart.bind(this);
  }

  componentDidMount() {
    this.fetchCart();
    this.ValidateFromPayment();
  }

  handleChangeClient({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => this.ValidateFromPayment());
  }

  ValidateFromPayment = () => {
    const {
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
    } = this.state;

    const booleanValidade = [
      nome.length > 0,
      telefone.length > 0,
      complemento.length > 0,
      cpf.length > 0,
      email.length > 0,
      cidade.length > 0,
      estado.length > 0,
      numero.length > 0,
      cep.length > 0,
      endereco.length > 0,
    ];
    const resultValidate = booleanValidade.every((el) => el === true);
    this.setState({
      btnPayment: !resultValidate,
    });
  }

  manipularCart(array) {
    const resultado = array.reduce((acc, crr) => {
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
    cart.map((el) => this.setState((prev) => ({
      cart: [...prev.cart, el.descricao],
      [el.descricao.id]: el.quantidade,
      total: prev.total + el.descricao.price * el.quantidade,
    })));
  }

  fetchCart() {
    const cartItens = JSON.parse(localStorage.getItem('cart'));
    if (cartItens !== null) {
      this.manipularCart(cartItens);
    }
  }

  render() {
    const {
      btnPayment,
      check,
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
      cart,
      total,
    } = this.state;

    const { state } = this;

    return (
      <section className="payment">
        <div className="dados">
          <h3>Revise seus Produtos</h3>
          <div>
            { cart.map((value) => (
              <div key={ value.id } className="listacarrinho">
                <p data-testid="shopping-cart-product-name">{ value.title }</p>
                <img src={ value.thumbnail } alt={ value.title } />
                <p>{ `Quantidade: ${state[`${value.id}`]}` }</p>
                <p>{ `R$: ${value.price * state[`${value.id}`]}` }</p>
              </div>
            ))}
          </div>
          <div className="valorTotal">
            { `Total da Compra: R$ ${total}` }
          </div>
        </div>
        <div className="forms">
          <FormPayment
            btnPayment={ btnPayment }
            cep={ cep }
            cidade={ cidade }
            complemento={ complemento }
            cpf={ cpf }
            email={ email }
            endereco={ endereco }
            estado={ estado }
            nome={ nome }
            numero={ numero }
            check={ check }
            telefone={ telefone }
            handleChangeClient={ this.handleChangeClient }
          />
        </div>
      </section>
    );
  }
}

export default Payment;
