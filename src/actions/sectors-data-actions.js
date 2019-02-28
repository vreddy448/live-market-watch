import { MARKET_API } from "../api/market-api";
import {scripts} from '../common/scripts-vs-sector';

export const GET_SECTORS_DATA = 'GET_SECTORS_DATA';
export const GET_SECTORS_DATA_SUCCESS = 'GET_SECTORS_DATA_SUCCESS';
export const GET_SECTORS_DATA_ERROR = 'GET_SECTORS_DATA_ERROR';

export function getSectorsData(){
    return (dispatch, getState) => {
        return MARKET_API.getScriptsData().then(res => {
            const processedResponse = processResponse(res.data);
            dispatch(getSectorsDataSuccess(processedResponse))
        })
    }
}

export function getSectorsDataSuccess(data){
    return {
        type:GET_SECTORS_DATA_SUCCESS,
        payload:data,
    }
}

function processResponse(inputData) {
    let processedResponse = {
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
