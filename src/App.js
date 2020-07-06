import React from 'react';
import Shop from "./containers/Shop/Shop";
import Cart from "./containers/Cart/Cart";
import {Route} from "react-router-dom";

function App() {
  return (
    <div>
        <Route exact path='/' component={Shop}/>
        <Route path='/cart' component={Cart}/>
    </div>
  );
}

export default App;
