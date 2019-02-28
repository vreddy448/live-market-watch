import React from 'react';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
import '../css/area-chart.css';

export default class Chart extends React.Component{

    fetchData(data) {
        let processedData = [];
        for (let i=0; i < data.length; i++) {
            processedData.push({'name': `${data[i].time}`, 'Last Trading Price': `${data[i].ltP}`});
        };
        return processedData;
    }

    render () {
        let {chartData} = this.props;
        const length = (chartData.length - 1);

        if (!(length > 0)) {
            return <div></div>
        }

        return (
            <div className="area-chart">
                <div className="script-header text-align-center">{chartData[length].symbol}</div>
                <div className="card text-align-center">
                    <div className="card-left">
                        <div className="card">
                            <span className="card-left">Open</span>
                            <span className="card-right">{chartData[length].open}</span>
                        </div>
                        <div className="card">
                            <span className="card-left">High</span>
                            <span className="card-right">{chartData[length].high}</span>
                        </div>
                    </div>
                    <div className="card-right">
                        <div className="card">
                            <span className="card-left">Low</span>
                            <span className="card-right">{chartData[length].low}</span>
                        </div>
                        <div className="card">
                            <span className="card-left">Traded Volume (Million)</span>
                            <span className="card-right">{chartData[length].trdVolM}</span>
                        </div>
                    </div>

                </div>
                <AreaChart width={800} height={400} data={this.fetchData(chartData)}
                           margin={{top: 20, right: 30, left: 0, bottom: 0}}>
                    <CartesianGrid strokeDasharray="1 1" />
                    <XAxis dataKey="name"/>
                    <YAxis domain={['dataMin-1', 'dataMax+1']} />
                    <Tooltip />
                    <Area type='monotone' dataKey="Last Trading Price" stroke='#8884d8' fill='#8884d8' />
                </AreaChart>
            </div>
        );
    }
};
