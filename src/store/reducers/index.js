import {
    combineReducers
} from 'redux';

import topicsReducer from './topics'

const allReducers = {
    topics: topicsReducer
}

const rootReducer = combineReducers(allReducers);

export default rootReducer;