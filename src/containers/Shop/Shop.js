import React, {Component} from "react";
import classes from './Shop.module.css';
import axios from 'axios';
import ShopItem from "./ShopItem/ShopItem";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import Spinner from "../../components/UI/Spinner";

class Shop extends Component {

    state = {
        products: [],
        isLoaded: false,
        amounts:[],
        toDelete:false
    }

    componentDidMount() {
        axios.get('https://ecommerce-e366c.firebaseio.com/Products.json')
            .then(response => {
                const newProd = [];
                const amounts = [];
                for (let key in response.data) {
                    newProd.push({
                        ...response.data[key],
                        id: key,
                        amount:1
                    });
                    amounts.push(1);
                }

                this.setState({
                    products: newProd,
                    amounts:amounts,
                    isLoaded: true
                })
            })
    }

    addToCartHandler = (product) => {
        this.setState({
            toDelete:true
        });
        axios.get('https://ecommerce-e366c.firebaseio.com/cart.json')
            .then(response => {
                let cartIDS= [];
                let productsIDS = [];
                for(let key in response.data){
                    cartIDS.push(response.data[key].title);
                    productsIDS.push(key);
                }

                if (!cartIDS.includes(product.title)){
                    axios.post('https://ecommerce-e366c.firebaseio.com/cart.json', product)
                        .then(response => {

                        })
                }else{
                    let indexOf = cartIDS.indexOf(product.title);
                    axios.delete('https://ecommerce-e366c.firebaseio.com/cart/' + productsIDS[indexOf] + '.json')
                        .then(response => {
                        })
                        .catch(error=>{
                            console.log(error);
                        })
                    let updatedProduct = {...product, amount:response.data[productsIDS[indexOf]].amount+1};
                    axios.post('https://ecommerce-e366c.firebaseio.com/cart.json', updatedProduct)
                        .then(response => {

                        })
                }
            })

    }

    render() {
        return (
            <React.Fragment>
                <Toolbar/>
                <main className={this.state.isLoaded?classes.Shop:classes.ShopNotLoading}>
                    {this.state.isLoaded ? this.state.products.map((product,index) => {
                        let finalProduct = {
                            amount: this.state.amounts[index],
                            id: product.id,
                            photo: product.photo,
                            price: product.price,
                            title: product.title
                        }
                        return <ShopItem onCartAdd={() => this.addToCartHandler(finalProduct)} products={product}
                                         key={product.id} amountKey={product.id}/>
                    }) : <Spinner/>}
                </main>
            </React.Fragment>
        )
    }
};

export default Shop;