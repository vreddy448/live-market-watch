import * as SectorsDataActions from '../actions/sectors-data-actions';

export function SectorsDataReducer(state = {
    sectors: {
        niftyBank:[],
        niftyIt:[],
        niftyReality: [],
        niftyInfra: [],
        niftyEnergy: [],
        niftyFMCG: [],
        niftyPharma: [],
        niftyMetal: [],
        niftyAuto: []
    }}, action) {
    switch (action.type) {
        case SectorsDataActions.GET_SECTORS_DATA_SUCCESS: {
            return {
                ...state,
                sectors: action.payload.sectors
            };
        }
        default:
            return state
    }
}
