import React from 'react';
import '../css/expand-collapse.css'
import StocksTable from "./stocks-table";

export default class ExpandCollapse extends React.Component {

    constructor(props) {
        super(props);
        this.state = {isOpen: this.getOpenValue(props.header)};
        this.expandContent = this.expandContent.bind(this);
    }

    getOpenValue = (header) => {
        return (header === "Top Gainers" || header === "Top Loosers");
    };

    fetchArrow() {
        if (this.state.isOpen) {
            return <span className="expand-collapse-arrow open">&#9662;</span>
        } else {
            return <span className="expand-collapse-arrow close">&#9662;</span>
        }
    }

    expandContent() {
        this.setState({isOpen:!this.state.isOpen})
    }

    fetchHeaderClassName = (header) => {
        let headerClassName;
        if (header === "Top Gainers") {
            headerClassName = "gainers";
        } else if (header === "Top Loosers") {
            headerClassName = "loosers";
        } else {
            headerClassName = "";
        }
        return headerClassName;
    };

    render() {
        let {content, header, fetchChartData} = this.props;
        return (
            <div className="expand-collapse">
                <div className="expand-collapse-header" onClick={this.expandContent}>
                    <span className={this.fetchHeaderClassName(header)}>{header}</span>
                    {this.fetchArrow()}
                </div>
                {
                    this.state.isOpen && content
                    && <StocksTable scriptsData={content} fetchChartData={fetchChartData}/>
                }
            </div>
        )
    }
}
