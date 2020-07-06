import React from 'react';
import classes from './Toolbar.module.css';
import {NavLink} from "react-router-dom";

const Toolbar = props =>{
    return(
        <header className={classes.Toolbar}>
            <nav className={classes.NavigationItem}>
                <NavLink to='/'  className={classes.Logo}> Your online shop </NavLink>
                <NavLink to='/cart' className={classes.MenuItem}>Your Cart</NavLink>
            </nav>
        </header>
    )
};

export default Toolbar;