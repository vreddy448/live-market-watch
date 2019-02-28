import {HttpClient} from './http-client'

// http://live-market-watch-api.herokuapp.com/market/scripts-data

// http://localhost:3020/market/scripts-data

const scriptsDataURL = 'http://live-market-watch-api.herokuapp.com/market/scripts-data';

// http://live-market-watch-api.herokuapp.com/market/two-minutes-data

// http://localhost:3020/market/two-minutes-data

const twoMinutesDataUrl = 'http://live-market-watch-api.herokuapp.com/market/two-minutes-data';
const completeDayDataUrl = 'http://live-market-watch-api.herokuapp.com/market/complete-day-data';

//Read
const getScriptsData = () => {
    return HttpClient.get(scriptsDataURL)
};

const getChartData = (symbol, period) => {
    let url;
    if (period && period === 'day') {
        url = completeDayDataUrl;
    } else {
        url = twoMinutesDataUrl;
    }
    return HttpClient.get(`${url}/${symbol}`)
};

const MARKET_API = {getScriptsData, getChartData};

export {MARKET_API}
