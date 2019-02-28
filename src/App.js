import React from 'react';
import './App.css';
import { Routes } from './Routes';
import { Provider } from 'react-redux';
import { configureStore } from './store/configureStore'
const store = configureStore();

// store.dispatch(MarketValuesActions.getMarketValues());

const App = (props) => {
    return (

        //Provider needs to contain all the Containers/Components it will give access to the Store
        <Provider store={store} >
            <Routes />
        </Provider>
    )
};

export default App;
