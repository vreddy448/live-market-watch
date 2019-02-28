import React, { Component } from 'react';
import * as ScriptsDataActions from '../actions/scripts-data-actions';
import * as ChartDataActions from '../actions/chart-data-actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Header from "../components/header";
import Chart from "./chart-container";
import ExpandCollapse from "../components/expand-collapse";
import '../css/app-container.css';
import ScriptSearch from "../components/script-search";

export class AppContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {openTopGainerContent: true, openTopLoosersContent: true, openAllScriptsContent: false};
        this.props.actions.getScriptsData();
        this.fetchChartData = this.fetchChartData.bind(this);
    }

    componentDidMount() {
        setInterval(this.props.actions.getScriptsData, 120000);
        setInterval(this.props.actions.getChartData, 120000);
    }

    fetchChartData(event) {
        if (event && event.target && event.target.textContent) {
            this.props.actions.getChartData(event.target.textContent);
        }
    }

    render() {
        let {scriptsData, generalData, topGainers, topLoosers} = this.props;

        return (
            <div className="app-body">
                <Header generalData={generalData}/>
                <div className="expand-collapse-container">
                    <ScriptSearch scriptsData={scriptsData} fetchChartData={this.fetchChartData}/>
                    <ExpandCollapse
                        content={topGainers}
                        fetchChartData={this.fetchChartData}
                        header="Top Gainers"
                    />
                    <ExpandCollapse
                        content={topLoosers}
                        fetchChartData={this.fetchChartData}
                        header="Top Loosers"
                    />
                    <ExpandCollapse
                        content={scriptsData}
                        fetchChartData={this.fetchChartData}
                        header="All Scripts"
                    />
                </div>
                <div className="chart-container">
                    <Chart />
                </div>
            </div>
        )
    }
}

AppContainer.propTypes = {
    actions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
    return {
        scriptsData: state.scripts.allScriptsData,
        topLoosers: state.scripts.topLoosers,
        topGainers: state.scripts.topGainers,
        generalData: state.scripts.generalData,
        chartData: state.chartData.data,
        selectedScript: state.chartData.selectedScript
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({...ScriptsDataActions, ...ChartDataActions}, dispatch)
    }
}

// The connect function connects the Redux Dispatch and state to the AppContainer Container Component.
// Without this the Component wont be functional.

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
