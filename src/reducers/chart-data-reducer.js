import * as AreaChartActions from '../actions/chart-data-actions';

export function ChartDataReducer(state = {data:[], selectedScript:'', selectedDuration:'day'}, action) {
    switch (action.type) {
        case AreaChartActions.GET_CHART_DATA_SUCCESS: {
            return {
                ...state,
                data:action.payload,
                selectedScript: action.selectedScript,
                selectedDuration: action.selectedDuration};
        }
        default:
            return state
    }
}
