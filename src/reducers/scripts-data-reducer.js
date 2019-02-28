import * as ScriptsDataActions from '../actions/scripts-data-actions'

export function ScriptsDataReducer(state = {topGainers:[], topLoosers:[], allScriptsData:[], generalData:{}}, action) {
    switch (action.type) {
        case ScriptsDataActions.GET_SCRIPTS_DATA_SUCCESS: {
            return {
                ...state,
                topGainers:action.payload.topGainers,
                topLoosers:action.payload.topLoosers,
                allScriptsData:action.payload.allScriptsData,
                generalData:action.payload.generalData,
                sectors: action.payload.sectors
            };
        }
        default:
            return state
    }
}
