import React, {Component} from "react";
import axios from 'axios';
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import classes from './Cart.module.css';
import Spinner from "../../components/UI/Spinner";

class Cart extends Component {

    state = {
        cart: [],
        loading: true,
        titles: [],
        input: []
    }

    componentDidMount() {
        axios.get('https://ecommerce-e366c.firebaseio.com/cart.json')
            .then(response => {
                let cartNewArr = [];
                let inputsInitial = [];
                for (let key in response.data) {
                    cartNewArr.push({
                        ...response.data[key],
                        id: key
                    });
                    inputsInitial.push(0)
                }
                this.setState({
                    cart: cartNewArr,
                    loading: false,
                    input: inputsInitial
                })
            })
    }

    removeFromCartHandler = (product) => {
        axios.delete('https://ecommerce-e366c.firebaseio.com/cart/' + product.id + '.json')
            .then(response => {
                let copyCart = [...this.state.cart];
                let copyCartIDS = [];
                for (let i in copyCart) {
                    copyCartIDS.push(copyCart[i].id);
                }
                let deletedIDIndex = copyCartIDS.indexOf(product.id);
                copyCart.splice(deletedIDIndex, 1);
                this.setState({
                    cart: copyCart
                });
            });
    }

    getAmount = (item, event) => {
        let amountNumber = event.target.value;
        let productsCopy = [...this.state.cart];
        let inputCopy = [...this.state.input];
        let productsIds = [];
        for (let index in productsCopy) {
            productsIds.push(productsCopy[index].id);
        }
        let indexOfCurrProduct = productsIds.indexOf(event.target.name);
        inputCopy[indexOfCurrProduct] = Number(event.target.value);
        this.setState({
            input: inputCopy
        })
        axios.get('https://ecommerce-e366c.firebaseio.com/cart.json')
            .then(response => {
                let productsIDS = [];
                let cartTitles = [];
                for (let key in response.data) {
                    productsIDS.push(key);
                    cartTitles.push(response.data[key].title);
                }
                let indexOf = cartTitles.indexOf(item.title);
                axios.delete('https://ecommerce-e366c.firebaseio.com/cart/' + productsIDS[indexOf] + '.json')
                    .then(responseDelete => {
                        if(amountNumber>=0){
                            let updatedItem = {...response.data,[item.id]:{...item, amount: inputCopy[indexOf]}};
                            if (productsIDS.length===1){
                                updatedItem = {[item.id]:{...item, amount: inputCopy[indexOf]}};
                            }
                            axios.put('https://ecommerce-e366c.firebaseio.com/cart.json', updatedItem)
                                .then(response => {});
                            let copyCart = [...this.state.cart];
                            copyCart.splice(indexOf, 1,updatedItem[item.id]);
                            this.setState({
                                cart: copyCart
                            });
                        }else{
                            let copyCart = [...this.state.cart];
                            copyCart.splice(indexOf, 1);
                            this.setState({
                                cart: copyCart
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
            })
    }


    render() {
        let sum = Object.keys(this.state.cart) //Object.keys on an array returns an array with indexes : 0,1,2,3 etc.
            .map(key => {
                return this.state.cart[key].price * this.state.cart[key].amount;
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return (
            <React.Fragment>
                <Toolbar/>
                <div className={classes.ProductWrapper}>
                    {this.state.loading ? <Spinner/>
                        : this.state.cart.map((item, index) => {
                            return (
                                <div key={item.id} className={classes.ProductAndImageWrapper}>
                                    <div className={classes.Product}>
                                        <label htmlFor={item.id}>Qty: </label>
                                        <input
                                            className={classes.Input}
                                            name={item.id}
                                            onChange={(event) => this.getAmount(item, event)}
                                            type="number"
                                            value={item.amount}
                                            />
                                        <p>Product: &nbsp;
                                            {item.title}</p>
                                        <p>Price:
                                            ${(!this.state.input[index] ? item.amount : this.state.input[index]) * item.price}</p>
                                        <button className={classes.Button}
                                                onClick={() => this.removeFromCartHandler(item)}>Remove Product
                                        </button>
                                    </div>
                                    <img src={item.photo} alt='Product'/>
                                </div>)
                        })}
                    <p className={classes.Amount}>Amount to pay: ${sum}</p>
                </div>
            </React.Fragment>
        )

    }
}

export default Cart;
