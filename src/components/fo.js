import React from 'react';
import Header from "./header";
import '../css/fo.css'

export default class FO extends React.Component {

    render() {
        return(
            <div>
                <Header />
                <p className="coming-soon">Futures and Options soon....</p>
            </div>
        )
    }
}
