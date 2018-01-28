import {combineReducers} from 'redux';
import jobList from './jobList';
//===============================================================================================//

const allReducers = combineReducers({
    jobList
});

export default allReducers;