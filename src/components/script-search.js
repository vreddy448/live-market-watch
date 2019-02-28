import React from 'react';
import '../css/script-search.css';
import StocksTable from "./stocks-table";

export default class ScriptSearch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {script : [], scriptFound: 'default'};
        this.getScript = this.getScript.bind(this);
    }

    getScript(event) {
        let script = [];
        if (event && event.target && event.target.value) {
            script = this.props.scriptsData.filter((script) => {
                if (script && script.symbol.includes(event.target.value.toUpperCase())) {
                    return script;
                }
            });

            if (script.length > 0) {
                this.setState({script: script, scriptFound: 'yes'});
            } else {
                this.setState({script: [], scriptFound: 'no'});
            }

        } else {
            this.setState({script: [], scriptFound: 'default'});
        }
    }

    calculateHeightAndWidth() {
        let width, height;
        if (window.innerWidth < 350) {
            height = 45;
            width = 45;
        } else if (window.innerWidth < 450) {
            height = 48;
            width = 48;
        } else if (window.innerWidth > 700 && window.innerWidth <= 900) {
            height = 38;
            width = 38;
        } else if (window.innerWidth > 900 && window.innerWidth < 1100) {
            height = 44;
            width = 44;
        } else {
            height = 51;
            width = 51;
        }

        return {width, height};
    }

    render() {

        let {fetchChartData} = this.props;
        const {width, height} = this.calculateHeightAndWidth();

        return(
            <div className="search-container">
                <input type='text' placeholder='Search by Script Name' onChange={this.getScript}/>
                <img
                    src={require("../images/whitesearchicon.png")}
                    width={width}
                    height={height}
                    alt="search-icon"
                    className="search-icon"
                />
                { this.state.script && (this.state.script.length > 0) &&
                <div className="search-results">
                    <StocksTable scriptsData={this.state.script} fetchChartData={fetchChartData}/>
                </div>
                }
                {
                    (this.state.scriptFound ===  'no') &&
                    <div className="search-error-message">
                        No Script Matches with that name
                    </div>
                }
            </div>
        )
    }
}
