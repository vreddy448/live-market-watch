import { MARKET_API } from "../api/market-api";

export const GET_CHART_DATA = 'GET_CHART_DATA';
export const GET_CHART_DATA_SUCCESS = 'GET_CHART_DATA_SUCCESS';
export const GET_CHART_DATA_ERROR = 'GET_CHART_DATA_SUCCESS';

export function getChartData(symbol, period){
    return (dispatch, getState) => {
        if (!symbol) {
            symbol = getState().chartData.selectedScript;
        }

        if (!period) {
            period = 'hour';
        }
        return MARKET_API.getChartData(symbol, period).then(res => {
            dispatch(getChartDataSuccess(res.data, symbol, period))
        })
    }
}

export function getChartDataSuccess(data, symbol, period){
    return {
        type:GET_CHART_DATA_SUCCESS,
        selectedScript: symbol,
        selectedDuration: period,
        payload:data
    }
}
