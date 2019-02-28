import React, {Component} from 'react';
import '../css/stocks-table.css'

class StocksTable extends Component {
    render() {

        let {scriptsData, fetchChartData} = this.props;
        return (
            <div className="stocks-table">
                {scriptsData
                && (scriptsData instanceof Array)
                && scriptsData.map((script) => {

                    let script_price_className;

                    if (script.change === 'positive') {
                        script_price_className = 'script-price positive';
                    } else if (script.change === 'negative') {
                        script_price_className = 'script-price negative';
                    }

                    return (
                        <div key={script.symbol} className="script-section">
                            <div className="script-name" onClick={fetchChartData}>{script.symbol}</div>
                            <div className={script_price_className}>
                                ( {script.per} % ) {script.ltP}
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default StocksTable;
