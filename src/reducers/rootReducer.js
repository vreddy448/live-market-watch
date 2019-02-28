import {combineReducers} from 'redux'
import {ScriptsDataReducer} from './scripts-data-reducer';
import {ChartDataReducer} from './chart-data-reducer';
import {SectorsDataReducer} from './sectors-data-reducer';

const rootReducer = combineReducers({
    scripts: ScriptsDataReducer,
    chartData: ChartDataReducer,
    sectors: SectorsDataReducer
});

export default rootReducer;
