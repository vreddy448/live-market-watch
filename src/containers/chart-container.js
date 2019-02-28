import React from 'react';
import * as ChartDataActions from '../actions/chart-data-actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
import '../css/chart.css';

class Chart extends React.Component {

    constructor(props) {
        super(props);
        this.getChartData = this.getChartData.bind(this);
    }

    getChartData(event) {
        if (event && event.target && event.target.textContent) {
            if (event.target.textContent.includes('complete day')) {
                this.props.actions.getChartData(this.props.selectedScript, 'day');
            } else {
                this.props.actions.getChartData(this.props.selectedScript, 'hour');
            }
        }
    }

    processData(data) {
        let processedData = [];
        for (let i=0; i < data.length; i++) {
            const value = (data[i].ltP).replace(',',"");
            processedData.push({'name': `${data[i].time}`, 'Last Trading Price': parseFloat(value)});
        }
        return processedData;
    }

    calculateHeightAndWidth() {
        let width, height;
        if (window.innerWidth < 450) {
            height = 200;
            width = window.innerWidth - 50;
        } else if (window.innerWidth >= 450 && window.innerWidth < 800) {
            height = 300;
            width = 400;
        } else if (window.innerWidth >= 700 && window.innerWidth < 1300) {
            height = 300;
            width = 600;
        } else if (window.innerWidth < 1500) {
            height = 400;
            width = 800;
        } else {
            height = 400;
            width = 800;
        }

        return {width, height};
    }

    render () {
        let {chartData, selectedDuration} = this.props;
        const {width, height} = this.calculateHeightAndWidth();

        if (!(chartData.length  > 0)) {
            return <div />
        }

        const length = (chartData.length - 1);
        let dayClassName, lastOneHourClassName;

        if (selectedDuration && selectedDuration === 'day') {
            dayClassName = "chart-button selected";
            lastOneHourClassName = "chart-button";
        } else if (selectedDuration && selectedDuration === 'hour') {
            dayClassName = "chart-button";
            lastOneHourClassName = "chart-button selected";
        }

        return (
            <div className="area-chart">
                <div className="script-header text-align-center">{chartData[length].symbol}</div>
                <div className="card text-align-center">
                    <div className="card-left">
                        <div className="card">
                            <span className="card-left">LTP</span>
                            <span className="card-right">{chartData[length].ltP}</span>
                        </div>
                        <div className="card">
                            <span className="card-left">Open</span>
                            <span className="card-right">{chartData[length].open}</span>
                        </div>
                    </div>
                    <div className="card-right">
                        <div className="card">
                            <span className="card-left">Low</span>
                            <span className="card-right">{chartData[length].low}</span>
                        </div>
                        <div className="card">
                            <span className="card-left">High</span>
                            <span className="card-right">{chartData[length].high}</span>
                        </div>
                    </div>

                </div>
                <AreaChart width={width} height={height} data={this.processData(chartData)}
                           margin={{top: 30, right: 0, left: 0, bottom: 0}}>
                    <CartesianGrid strokeDasharray="1 1" />
                    <XAxis dataKey="name"/>
                    <YAxis domain={['dataMin-1', 'dataMax+1']} />
                    <Tooltip />
                    <Area type='monotone' dataKey="Last Trading Price" stroke='#8884d8' fill='#8884d8' />
                </AreaChart>
                <div className="chart-button-container">
                    <button id="last-one-hour" className={lastOneHourClassName} onClick={this.getChartData}>last one hour</button>
                    <button id="day" className={dayClassName} onClick={this.getChartData}>complete day</button>
                </div>
            </div>
        );
    }
}

Chart.propTypes = {
    actions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
    return {
        chartData: state.chartData.data,
        selectedScript: state.chartData.selectedScript,
        selectedDuration: state.chartData.selectedDuration
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({...ChartDataActions}, dispatch)
    }
}

// The connect function connects the Redux Dispatch and state to the AppContainer Container Component.
// Without this the Component wont be functional.

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
