import React from "react";
import classes from './ShopItem.module.css';


const ShopItem = props => {
    return (
        <div className={classes.ShopItemWrapper}>
            <div className={classes.ShopItem}>
                <h1>{props.products.title}</h1>
                <img src={props.products.photo} alt='Product'/>
            </div>
            <div className={classes.BackShopItem}>
                <button onClick={props.onCartAdd} className={classes.Button}>Add to cart</button>
                <div className={classes.Price}>{props.products.price}$</div>
            </div>
        </div>
    )
};

export default ShopItem;