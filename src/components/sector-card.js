import React from 'react';
import '../css/sector-card.css';
import StocksTable from "./stocks-table";

export default class SectorCard extends React.Component {

    render() {

        let {header, scriptsData} = this.props;
        return(
            <div className="sector-card">
                <div className="sector-card-header">
                    {header}
                </div>
                <StocksTable scriptsData={scriptsData}/>
            </div>
        )
    }
}
