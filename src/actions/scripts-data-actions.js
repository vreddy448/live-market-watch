import { MARKET_API } from "../api/market-api";
import {getChartData} from './chart-data-actions';
import {scripts} from '../common/scripts-vs-sector';

export const GET_SCRIPTS_DATA = 'GET_SCRIPTS_DATA';
export const GET_SCRIPTS_DATA_SUCCESS = 'GET_SCRIPTS_DATA_SUCCESS';
export const GET_SCRIPTS_DATA_ERROR = 'GET_SCRIPTS_DATA_ERROR';

export function getScriptsData(){
    return (dispatch, getState) => {
        return MARKET_API.getScriptsData().then(res => {
            const processedResponse = processResponse(res.data);
            if (!getState().chartData.selectedScript) {
                dispatch(getChartData(processedResponse.topGainers[0].symbol));
            }
            dispatch(getScriptsDataSuccess(processedResponse))
        })
    }
}

export function getScriptsDataSuccess(data){
    return {
        type:GET_SCRIPTS_DATA_SUCCESS,
        payload:data,
    }
}

function processResponse(inputData) {
    let processedResponse = {
        topGainers: [],
        topLoosers: [],
        allScriptsData: inputData.data,
        generalData:{
            noChg:inputData.noChg,
            adv:inputData.adv,
            dec:inputData.dec
        },
        sectors:{
            niftyBank:[],
            niftyIt:[],
            niftyReality: [],
            niftyInfra: [],
            niftyEnergy: [],
            niftyFMCG: [],
            niftyPharma: [],
            niftyMetal: [],
            niftyAuto: []

        }
    };

    for(let i=0;i < 5; i ++) {
        processedResponse['topGainers'].push(inputData.data[i]);
    }

    for(let j= (inputData.data.length - 1);j >= (inputData.data.length - 5); j--) {
        processedResponse['topLoosers'].push(inputData.data[j]);
    }

    for(let k=0; k < inputData.data.length; k ++) {

        if (scripts[inputData.data[k].symbol] === 'niftyBank') {
            processedResponse.sectors.niftyBank.push(inputData.data[k]);
        } else if (scripts[inputData.data[k].symbol] === 'niftyIT') {
            processedResponse.sectors.niftyIt.push(inputData.data[k]);
        } else if (scripts[inputData.data[k].symbol] === 'niftyReality') {
            processedResponse.sectors.niftyReality.push(inputData.data[k]);
        } else if (scripts[inputData.data[k].symbol] === 'niftyInfra') {
            processedResponse.sectors.niftyInfra.push(inputData.data[k]);
        } else if (scripts[inputData.data[k].symbol] === 'niftyEnergy') {
            processedResponse.sectors.niftyEnergy.push(inputData.data[k]);
        } else if (scripts[inputData.data[k].symbol] === 'niftyFMCG') {
            processedResponse.sectors.niftyFMCG.push(inputData.data[k]);
        } else if (scripts[inputData.data[k].symbol] === 'niftyPharma') {
            processedResponse.sectors.niftyPharma.push(inputData.data[k]);
        } else if (scripts[inputData.data[k].symbol] === 'niftyMetal') {
            processedResponse.sectors.niftyMetal.push(inputData.data[k]);
        } else if (scripts[inputData.data[k].symbol] === 'niftyAuto') {
            processedResponse.sectors.niftyAuto.push(inputData.data[k]);
        }
    }

    return processedResponse;
}